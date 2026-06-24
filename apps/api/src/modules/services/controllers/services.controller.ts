import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ServicesService } from "../services/services.service";
import { ServiceQueryDto } from "../dtos/service-query.dto";

@ApiTags("services")
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(@Query() query: ServiceQueryDto) {
    return this.servicesService.findAll(query);
  }

  @Get("featured")
  findFeatured() {
    return this.servicesService.findFeatured();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.servicesService.findBySlug(slug);
  }
}
