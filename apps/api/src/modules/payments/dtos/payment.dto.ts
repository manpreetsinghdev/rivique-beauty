import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsUUID()
  bookingId: string;

  @ApiPropertyOptional({ default: "USD" })
  @IsOptional() @IsString()
  currency?: string;
}

export class WebhookPayloadDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  provider: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  event: string;

  payload: Record<string, unknown>;
}
