import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AiService } from "./ai.service";
import { AIRecommendationRequest } from "./dtos/ai.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("ai")
@Controller("ai")
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post("/recommendations")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  recommend(@Body() dto: AIRecommendationRequest) {
    return this.ai.recommend(dto);
  }
}
