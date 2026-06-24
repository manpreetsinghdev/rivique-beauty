import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AdminController } from './controllers/admin.controller';
import { UsersModule } from '../users/users.module';
import { BookingsModule } from '../bookings/bookings.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [UsersModule, BookingsModule, ServicesModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
