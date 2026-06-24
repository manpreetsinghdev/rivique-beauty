import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { ServiceCategory } from "@rivique/shared";

export class ServiceQueryDto {
  @ApiPropertyOptional({ enum: ServiceCategory })
  @IsOptional() @IsEnum(ServiceCategory)
  category?: ServiceCategory;

  @ApiPropertyOptional()
  @IsOptional() @Transform(({ value }) => value === "true")
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional() @Type(() => Number) @IsNumber() @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional() @Type(() => Number) @IsNumber() @Min(1)
  pageSize?: number;
}
