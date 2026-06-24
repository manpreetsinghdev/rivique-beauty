import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateBookingDto } from "./booking.dto";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}
