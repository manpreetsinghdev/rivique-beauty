import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "../entities/service.entity";
import type { ServiceQueryDto, PaginatedDto } from "@rivique/shared";

@Injectable()
export class ServicesRepository {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
  ) {}

  findBySlug(slug: string): Promise<Service | null> {
    return this.repo.findOneBy({ slug, isActive: true });
  }

  findFeatured(): Promise<Service[]> {
    return this.repo.findBy({ featured: true, isActive: true });
  }

  async findAll(query: ServiceQueryDto): Promise<PaginatedDto<Service>> {
    const { category, featured, minPrice, maxPrice, search, page = 1, pageSize = 12 } = query;

    const qb = this.repo.createQueryBuilder("s").where("s.isActive = true");

    if (category)  qb.andWhere("s.category = :category", { category });
    if (featured !== undefined) qb.andWhere("s.featured = :featured", { featured });
    if (minPrice)  qb.andWhere("s.price >= :minPrice", { minPrice });
    if (maxPrice)  qb.andWhere("s.price <= :maxPrice", { maxPrice });
    if (search)    qb.andWhere("s.name ILIKE :search OR s.description ILIKE :search", { search: `%${search}%` });

    const [data, total] = await qb
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }
}
