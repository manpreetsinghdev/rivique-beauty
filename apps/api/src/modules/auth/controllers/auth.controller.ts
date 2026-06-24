import { Body, Controller, Get, HttpCode, Post, UseGuards, Req, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto, RefreshTokenDto } from "../dtos/auth.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import type { AuthTokensDto } from "@rivique/shared";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.register(dto);
    // set refresh token as httpOnly cookie
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    return { accessToken: tokens.accessToken } as { accessToken: string };
  }

  @Post("register/vendor")
  async registerVendor(@Body() dto: RegisterDto, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.registerVendor(dto);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    return { accessToken: tokens.accessToken } as { accessToken: string };
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res) {
    const tokens = await this.authService.login(dto);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    return { accessToken: tokens.accessToken } as { accessToken: string };
  }

  @Post("refresh")
  @HttpCode(200)
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const cookie = req.cookies?.refreshToken;
    if (!cookie) return { accessToken: null };
    const tokens = await this.authService.refresh({ refreshToken: cookie });
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    return { accessToken: tokens.accessToken } as { accessToken: string };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    const cookie = req.cookies?.refreshToken;
    if (cookie) await this.authService.logout(cookie);
    res.clearCookie("refreshToken", { path: "/" });
    return { ok: true };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@CurrentUser() user: { sub: string; email: string; role: string }) {
    return user;
  }
}
