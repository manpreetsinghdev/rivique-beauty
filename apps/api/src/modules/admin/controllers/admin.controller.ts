import { Controller, Get, Patch, Param, Body, Post, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserRole } from '@rivique/shared';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  overview() {
    return this.adminService.overview();
  }

  @Get('users')
  users() {
    return this.adminService.listUsers();
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateUserRole(id, body.role);
  }

  @Get('vendors')
  vendors() {
    return this.adminService.listVendors();
  }

  @Post('vendors/:id/verify')
  verifyVendor(@Param('id') id: string, @Body() body: { verify: boolean }) {
    return this.adminService.setVendorVerified(id, !!body.verify);
  }

  @Get('bookings')
  bookings() {
    return this.adminService.listBookings();
  }

  @Get('reviews')
  reviews() {
    // reviews not yet modelled in TypeORM; return empty list for now
    return [];
  }

  @Post('reviews/:id')
  moderateReview(@Param('id') id: string, @Body() body: { action: string }) {
    // placeholder: accept actions 'approve'|'remove'
    return { id, action: body.action, ok: true };
  }

  @Get('analytics')
  analytics() {
    return this.adminService.analytics();
  }
}
