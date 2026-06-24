import { Injectable, NotFoundException } from "@nestjs/common";
import { ServicesRepository } from "../repositories/services.repository";
import { ServiceQueryDto } from "../dtos/service-query.dto";
import { Service } from "../entities/service.entity";
import type { PaginatedDto } from "@rivique/shared";

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepo: ServicesRepository) {}

  findAll(query: ServiceQueryDto): Promise<PaginatedDto<Service>> {
    return this.servicesRepo.findAll(query);
  }

  findFeatured(): Promise<Service[]> {
    return this.servicesRepo.findFeatured();
  }

  async findBySlug(slug: string): Promise<Service> {
    const service = await this.servicesRepo.findBySlug(slug);
    if (!service) throw new NotFoundException("Service not found");
    return service;
  }
}
