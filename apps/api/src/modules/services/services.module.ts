import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { ServicesRepository } from "./repositories/services.repository";
import { ServicesService } from "./services/services.service";
import { ServicesController } from "./controllers/services.controller";

@Module({
  imports:     [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers:   [ServicesService, ServicesRepository],
  exports:     [ServicesRepository],
})
export class ServicesModule {}
