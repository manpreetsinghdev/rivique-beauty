import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { UpdateProfileDto } from "../dtos/user.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getProfile(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateProfile(id: string, dto: UpdateProfileDto): Promise<User> {
    await this.getProfile(id);
    return this.usersRepo.update(id, dto);
  }
}
