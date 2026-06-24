import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaymentsService } from "../services/payments.service";
import { CreatePaymentIntentDto, WebhookPayloadDto } from "../dtos/payment.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@ApiTags("payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post("intent")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createIntent(
    @CurrentUser("sub") userId: string,
    @Body() dto: CreatePaymentIntentDto,
  ) {
    return this.paymentsService.createIntent(userId, dto);
  }

  @Post("webhook")
  webhook(@Body() dto: WebhookPayloadDto) {
    // Verify webhook signature in production via provider-specific guard
    return { received: true };
  }
}
