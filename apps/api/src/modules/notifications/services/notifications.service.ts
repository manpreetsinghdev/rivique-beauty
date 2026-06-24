import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { IBooking, IPayment } from "@rivique/shared";

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly config: ConfigService) {}

  async sendBookingConfirmation(booking: IBooking, email: string): Promise<void> {
    this.logger.log(`Sending booking confirmation to ${email} for booking ${booking.id}`);
    // Wire up nodemailer / SES / Resend here
  }

  async sendPaymentReceipt(payment: IPayment, email: string): Promise<void> {
    this.logger.log(`Sending payment receipt to ${email} for payment ${payment.id}`);
    // Wire up nodemailer / SES / Resend here
  }

  async sendBookingCancellation(booking: IBooking, email: string): Promise<void> {
    this.logger.log(`Sending cancellation notice to ${email} for booking ${booking.id}`);
  }
}
