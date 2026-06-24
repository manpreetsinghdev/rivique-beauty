import {
  Body, Controller, Delete, Get,
  Param, Patch, Post, UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BookingsService } from "../services/bookings.service";
import { CreateBookingDto, UpdateBookingDto, CancelBookingDto, ReserveSlotDto, ConfirmBookingDto } from "../dtos/booking.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@ApiTags("bookings")
@Controller("bookings")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(
    @CurrentUser("sub") userId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(userId, dto);
  }

  @Post("lock")
  reserve(
    @CurrentUser("sub") userId: string,
    @Body() dto: ReserveSlotDto,
  ) {
    return this.bookingsService.reserveSlot(userId, dto);
  }

  @Post("confirm")
  confirm(
    @CurrentUser("sub") userId: string,
    @Body() dto: ConfirmBookingDto,
  ) {
    return this.bookingsService.confirmBooking(userId, dto);
  }

  @Get("me")
  getMyBookings(@CurrentUser("sub") userId: string) {
    return this.bookingsService.getMyBookings(userId);
  }

  @Get(":id")
  getById(
    @Param("id") id: string,
    @CurrentUser("sub") userId: string,
  ) {
    return this.bookingsService.getById(id, userId);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @CurrentUser("sub") userId: string,
    @Body() dto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(id, userId, dto);
  }

  @Delete(":id/cancel")
  cancel(
    @Param("id") id: string,
    @CurrentUser("sub") userId: string,
    @Body() dto: CancelBookingDto,
  ) {
    return this.bookingsService.cancel(id, userId, dto);
  }
}
