import {
  BadRequestException, ForbiddenException,
  Injectable, NotFoundException,
} from "@nestjs/common";
import { BookingsRepository } from "../repositories/bookings.repository";
import { ServicesRepository } from "../../services/repositories/services.repository";
import { CreateBookingDto, UpdateBookingDto, CancelBookingDto, ReserveSlotDto, ConfirmBookingDto } from "../dtos/booking.dto";
import { Booking } from "../entities/booking.entity";
import { BookingStatus } from "@rivique/shared";
import { BookingLocksRepository } from "../repositories/booking-locks.repository";
import { DataSource } from "typeorm";

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingsRepo: BookingsRepository,
    private readonly servicesRepo: ServicesRepository,
    private readonly locksRepo: BookingLocksRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId: string, dto: CreateBookingDto): Promise<Booking> {
    const service = await this.servicesRepo.findBySlug(dto.serviceId);
    if (!service) throw new NotFoundException("Service not found");

    // For backward compatibility, use confirm path without lock
    const confirmDto: ConfirmBookingDto = { serviceId: dto.serviceId, scheduledAt: dto.scheduledAt } as any;
    return this.confirmBooking(userId, confirmDto);
  }

  async reserveSlot(userId: string, dto: ReserveSlotDto) {
    const service = await this.servicesRepo.findBySlug(dto.serviceId);
    if (!service) throw new NotFoundException("Service not found");

    const start = new Date(dto.scheduledAt);
    if (start <= new Date()) throw new BadRequestException("Scheduled date must be in the future");

    const end = new Date(start.getTime() + service.duration * 60 * 1000);

    // Check existing confirmed/pending bookings for the same service
    const conflicts = await this.bookingsRepo.findOverlappingForService(service.id, start, end);
    if (conflicts.length) throw new BadRequestException("Selected slot is no longer available");

    // Check active locks
    const activeLocks = await this.locksRepo.findActiveOverlapping(service.id, start, end);
    if (activeLocks.length) throw new BadRequestException("Selected slot is locked by another user");

    // Create a short-lived lock (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const lock = await this.locksRepo.create({ userId, serviceId: service.id, start, end, expiresAt });
    return { lockId: lock.id, expiresAt: lock.expiresAt };
  }

  async confirmBooking(userId: string, dto: ConfirmBookingDto): Promise<Booking> {
    const service = await this.servicesRepo.findBySlug(dto.serviceId);
    if (!service) throw new NotFoundException("Service not found");

    const start = new Date(dto.scheduledAt);
    if (start <= new Date()) throw new BadRequestException("Scheduled date must be in the future");
    const end = new Date(start.getTime() + service.duration * 60 * 1000);

    // Use transaction to ensure atomicity and avoid race conditions
    return this.dataSource.transaction(async (manager) => {
      // re-check conflicts inside transaction
      const conflicts = await this.bookingsRepo.findOverlappingForService(service.id, start, end);
      if (conflicts.length) throw new BadRequestException("Selected slot is no longer available");

      if (dto.lockId) {
        const lock = await this.locksRepo.findById(dto.lockId);
        if (!lock) throw new BadRequestException("Invalid lock");
        if (lock.userId !== userId) throw new ForbiddenException("Lock belongs to another user");
        if (lock.expiresAt <= new Date()) throw new BadRequestException("Lock has expired");
        // revoke lock
        await this.locksRepo.revoke(lock.id);
      }

      const booking = await this.bookingsRepo.create({
        userId,
        serviceId: service.id,
        scheduledAt: start,
        notes: dto.notes,
        totalPrice: service.price,
        currency: service.currency,
        status: BookingStatus.CONFIRMED,
      });

      return booking;
    });
  }

  async getMyBookings(userId: string): Promise<Booking[]> {
    return this.bookingsRepo.findByUser(userId);
  }

  async getById(id: string, userId: string): Promise<Booking> {
    const booking = await this.bookingsRepo.findById(id);
    if (!booking) throw new NotFoundException("Booking not found");
    if (booking.userId !== userId) throw new ForbiddenException();
    return booking;
  }

  async cancel(id: string, userId: string, dto: CancelBookingDto): Promise<Booking> {
    const booking = await this.getById(id, userId);

    if (booking.status === BookingStatus.CANCELLED)
      throw new BadRequestException("Booking is already cancelled");

    if (booking.status === BookingStatus.COMPLETED)
      throw new BadRequestException("Cannot cancel a completed booking");

    return this.bookingsRepo.update(id, {
      status: BookingStatus.CANCELLED,
      notes: dto.reason ? `Cancellation reason: ${dto.reason}` : booking.notes,
    });
  }

  async update(id: string, userId: string, dto: UpdateBookingDto): Promise<Booking> {
    await this.getById(id, userId);
    return this.bookingsRepo.update(id, {
      ...(dto.scheduledAt && { scheduledAt: new Date(dto.scheduledAt) }),
      ...(dto.notes       && { notes: dto.notes }),
    });
  }
}
