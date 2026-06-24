import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Booking } from "../entities/booking.entity";
import { BookingStatus } from "@rivique/shared";

@Injectable()
export class BookingsRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly repo: Repository<Booking>,
  ) {}

  findById(id: string): Promise<Booking | null> {
    return this.repo.findOne({
      where: { id },
      relations: ["user", "service", "payment"],
    });
  }

  findByUser(userId: string): Promise<Booking[]> {
    return this.repo.find({
      where: { userId },
      relations: ["service"],
      order: { scheduledAt: "DESC" },
    });
  }

  findByStatus(status: BookingStatus): Promise<Booking[]> {
    return this.repo.findBy({ status });
  }

  findOverlappingForService(serviceId: string, start: Date, end: Date): Promise<Booking[]> {
    return this.repo.createQueryBuilder("b")
      .leftJoinAndSelect("b.service", "s")
      .where("b.serviceId = :serviceId", { serviceId })
      .andWhere("(b.scheduledAt < :end AND (b.scheduledAt + (s.duration || 60) * INTERVAL '1 minute') > :start)", { start, end })
      .andWhere("b.status IN (:...statuses)", { statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED] })
      .getMany();
  }

  create(data: Partial<Booking>): Promise<Booking> {
    const booking = this.repo.create(data);
    return this.repo.save(booking);
  }

  update(id: string, data: Partial<Booking>): Promise<Booking> {
    return this.repo.save({ id, ...data });
  }
}
