import { Injectable, NotFoundException } from "@nestjs/common";
import { PaymentsRepository } from "../repositories/payments.repository";
import { BookingsRepository } from "../../bookings/repositories/bookings.repository";
import { CreatePaymentIntentDto } from "../dtos/payment.dto";
import { Payment } from "../entities/payment.entity";
import { PaymentStatus } from "@rivique/shared";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly bookingsRepo: BookingsRepository,
  ) {}

  async createIntent(userId: string, dto: CreatePaymentIntentDto): Promise<Payment> {
    const booking = await this.bookingsRepo.findById(dto.bookingId);
    if (!booking || booking.userId !== userId)
      throw new NotFoundException("Booking not found");

    return this.paymentsRepo.create({
      bookingId: booking.id,
      amount:    booking.totalPrice,
      currency:  dto.currency ?? booking.currency,
      status:    PaymentStatus.UNPAID,
      provider:  "stripe",
    });
  }

  async handleWebhook(providerPaymentId: string, status: PaymentStatus): Promise<void> {
    const payment = await this.paymentsRepo.findByBooking(providerPaymentId);
    if (!payment) return;
    await this.paymentsRepo.updateStatus(payment.id, status, providerPaymentId);
  }
}
