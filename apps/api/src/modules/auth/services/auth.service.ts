@Injectable()
import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersRepository } from "../users/repositories/users.repository";
import { TokenRepository } from "../repositories/token.repository";
import { RegisterDto, LoginDto, RefreshTokenDto } from "./dtos/auth.dto";
import type { AuthTokensDto } from "@rivique/shared";
import { UserRole } from "@rivique/shared";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly tokenRepo: TokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthTokensDto> {
    const existing = await this.usersRepo.findByEmail(dto.email);
    if (existing) throw new ConflictException("Email already registered");

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersRepo.create({ ...dto, passwordHash });

    const tokens = this.issueTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async registerVendor(dto: RegisterDto): Promise<AuthTokensDto> {
    const existing = await this.usersRepo.findByEmail(dto.email);
    if (existing) throw new ConflictException("Email already registered");

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersRepo.create({ ...dto, passwordHash, role: UserRole.ARTIST });

    const tokens = this.issueTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async login(dto: LoginDto): Promise<AuthTokensDto> {
    const user = await this.usersRepo.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const tokens = this.issueTokens(user.id, user.email, user.role);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async refresh(dto: RefreshTokenDto): Promise<AuthTokensDto> {
    const existing = await this.tokenRepo.findValid(dto.refreshToken);
    if (!existing) throw new UnauthorizedException("Invalid refresh token");

    try {
      const payload = this.jwtService.verify(dto.refreshToken);
      const tokens = this.issueTokens(payload.sub, payload.email, payload.role);

      // revoke old token and save new one
      await this.tokenRepo.revoke(dto.refreshToken);
      await this.saveRefreshToken(payload.sub, tokens.refreshToken);

      return tokens;
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) throw new BadRequestException("Missing refresh token");
    await this.tokenRepo.revoke(refreshToken);
  }

  private issueTokens(userId: string, email: string, role: string): AuthTokensDto {
    const payload = { sub: userId, email, role };
    return {
      accessToken:  this.jwtService.sign(payload, { expiresIn: "15m" }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: "7d" }),
    };
  }

  private async saveRefreshToken(userId: string, token: string) {
    const decoded = this.jwtService.decode(token) as { exp?: number } | null;
    const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 3600 * 1000);
    await this.tokenRepo.save(userId, token, expiresAt);
  }
}
