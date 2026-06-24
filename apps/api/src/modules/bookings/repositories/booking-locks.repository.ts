import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookingLock } from "../entities/booking-lock.entity";

@Injectable()
export class BookingLocksRepository {
  constructor(
    @InjectRepository(BookingLock)
    private readonly repo: Repository<BookingLock>,
  ) {}

  create(data: Partial<BookingLock>): Promise<BookingLock> {
    return this.repo.save(this.repo.create(data));
  }

  findActiveOverlapping(serviceId: string, start: Date, end: Date): Promise<BookingLock[]> {
    return this.repo.createQueryBuilder("l")
      .where("l.serviceId = :serviceId", { serviceId })
      .andWhere("l.expiresAt > now()")
      .andWhere("(l.start < :end AND l.end > :start)", { start, end })
      .getMany();
  }

  findById(id: string): Promise<BookingLock | null> {
    return this.repo.findOneBy({ id });
  }

  revoke(id: string): Promise<void> {
    return this.repo.delete({ id }).then(() => undefined);
  }
}
