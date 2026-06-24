import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class AIRecommendationRequest {
  @ApiProperty()
  @IsObject()
  userProfile: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  budgetRupees?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  preferences?: string[];
}

export class AIRecommendationResponse {
  @ApiProperty()
  artists: Array<{ id?: string; name?: string; score?: number; reasons?: string[] }>;

  @ApiProperty()
  salons: Array<{ id?: string; name?: string; city?: string; priceEstimateRupees?: number; score?: number }>;

  @ApiProperty()
  styleSuggestions: Array<{ name: string; description?: string }>; 

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  confidence?: number;
}
