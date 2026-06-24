import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsUUID()
  bookingId: string;

  @ApiPropertyOptional({ default: "USD" })
  @IsOptional() @IsString()
  currency?: string;
}
