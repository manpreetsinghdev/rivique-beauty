import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString() @MinLength(8)
  password: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  phone?: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString() @IsNotEmpty()
  refreshToken: string;
}
