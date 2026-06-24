import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { PaymentsRepository } from "./repositories/payments.repository";
import { PaymentsService } from "./services/payments.service";
import { PaymentsController } from "./controllers/payments.controller";
import { BookingsModule } from "../bookings/bookings.module";

@Module({
  imports:     [TypeOrmModule.forFeature([Payment]), BookingsModule],
  controllers: [PaymentsController],
  providers:   [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
