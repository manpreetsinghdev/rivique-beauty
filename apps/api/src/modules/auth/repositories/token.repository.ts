import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repo: Repository<RefreshToken>,
  ) {}

  save(userId: string, token: string, expiresAt: Date): Promise<RefreshToken> {
    return this.repo.save(this.repo.create({ userId, token, expiresAt }));
  }

  findValid(token: string): Promise<RefreshToken | null> {
    return this.repo.findOne({
      where: { token, revoked: false },
      relations: ["user"],
    });
  }

  revoke(token: string): Promise<void> {
    return this.repo.update({ token }, { revoked: true }).then(() => undefined);
  }

  revokeAllForUser(userId: string): Promise<void> {
    return this.repo.update({ userId }, { revoked: true }).then(() => undefined);
  }
}
