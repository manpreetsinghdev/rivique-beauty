import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "./entities/booking.entity";
import { BookingLock } from "./entities/booking-lock.entity";
import { AvailabilitySlot } from "./entities/availability-slot.entity";
import { BookingsRepository } from "./repositories/bookings.repository";
import { BookingsService } from "./services/bookings.service";
import { BookingsController } from "./controllers/bookings.controller";
import { ServicesModule } from "../services/services.module";
import { BookingLocksRepository } from "./repositories/booking-locks.repository";

@Module({
  imports:     [TypeOrmModule.forFeature([Booking, BookingLock, AvailabilitySlot]), ServicesModule],
  controllers: [BookingsController],
  providers:   [BookingsService, BookingsRepository, BookingLocksRepository],
  exports:     [BookingsService],
})
export class BookingsModule {}
