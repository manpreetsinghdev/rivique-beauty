import { IsDateString, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty({ description: "ISO 8601 datetime" })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  notes?: string;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

export class CancelBookingDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  reason?: string;
}

export class ReserveSlotDto {
  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty({ description: "ISO 8601 datetime" })
  @IsDateString()
  scheduledAt: string;
}

export class ConfirmBookingDto {
  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  lockId?: string;

  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty({ description: "ISO 8601 datetime" })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  notes?: string;
}
