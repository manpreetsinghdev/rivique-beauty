import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "../entities/payment.entity";
import { PaymentStatus } from "@rivique/shared";

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  findByBooking(bookingId: string): Promise<Payment | null> {
    return this.repo.findOneBy({ bookingId });
  }

  create(data: Partial<Payment>): Promise<Payment> {
    return this.repo.save(this.repo.create(data));
  }

  updateStatus(id: string, status: PaymentStatus, providerPaymentId?: string): Promise<Payment> {
    return this.repo.save({ id, status, ...(providerPaymentId && { providerPaymentId }) });
  }
}
