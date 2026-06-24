import type { ServiceQueryDto } from "@rivique/shared";

export type SearchFiltersState = Required<Pick<ServiceQueryDto, "category" | "minPrice" | "maxPrice" | "search" | "page">>;
