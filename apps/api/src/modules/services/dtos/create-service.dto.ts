import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateServiceDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  shortDescription: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  price: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  currency?: string;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
