import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";
import { AuthService }    from "./services/auth.service";
import { JwtStrategy }   from "./strategies/jwt.strategy";
import { UsersModule }   from "../users/users.module";
import { RefreshToken } from "./entities/refresh-token.entity";
import { TokenRepository } from "./repositories/token.repository";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:      config.getOrThrow("app.jwtSecret"),
        signOptions: { expiresIn: "15m" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers:   [AuthService, JwtStrategy, TokenRepository],
  exports:     [AuthService],
})
export class AuthModule {}
