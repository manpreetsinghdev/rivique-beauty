import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString() @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString() @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  avatarUrl?: string;
}
