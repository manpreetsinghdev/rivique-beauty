import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../users/repositories/users.repository';
import { BookingsRepository } from '../../bookings/repositories/bookings.repository';
import { ServicesRepository } from '../../services/repositories/services.repository';
import { UserRole } from '@rivique/shared';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly bookingsRepo: BookingsRepository,
    private readonly servicesRepo: ServicesRepository,
  ) {}

  async overview() {
    const totalUsers = (await this.usersRepo.findAll()).length;
    const totalVendors = (await this.usersRepo.findByRole(UserRole.VENDOR)).length;
    const bookings30d = (await this.bookingsRepo.findByStatus(undefined as any)).length; // fallback
    return { totalUsers, totalVendors, pendingVendors: 0, bookings30d };
  }

  async listUsers() {
    return this.usersRepo.findAll();
  }

  async updateUserRole(userId: string, role: UserRole) {
    return this.usersRepo.update(userId, { role });
  }

  async listVendors() {
    return this.usersRepo.findByRole(UserRole.VENDOR);
  }

  async setVendorVerified(vendorId: string, verify: boolean) {
    // as a lightweight approach toggle isActive to represent verification
    return this.usersRepo.update(vendorId, { isActive: !!verify });
  }

  async listBookings() {
    return this.bookingsRepo.findByStatus(undefined as any);
  }

  async analytics() {
    return { revenue30d: 0, avgRating: null, activeVendors: (await this.usersRepo.findByRole(UserRole.VENDOR)).length };
  }
}
