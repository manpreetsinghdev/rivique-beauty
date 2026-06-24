import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo
      .createQueryBuilder("u")
      .addSelect("u.passwordHash")
      .where("u.email = :email", { email })
      .getOne();
  }

  create(data: Partial<User>): Promise<User> {
    return this.repo.save(this.repo.create(data));
  }

  update(id: string, data: Partial<User>): Promise<User> {
    return this.repo.save({ id, ...data });
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findByRole(role: string): Promise<User[]> {
    return this.repo.findBy({ role } as any);
  }
}
