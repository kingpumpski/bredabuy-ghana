import type { Brand } from "../types/brand.types";

import { mockBrands } from "@/data/mockData";

const brands = mockBrands as unknown as Brand[];

export const brandService = {
  async getBrands(): Promise<Brand[]> {
    return [...brands].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  },

  async getFeaturedBrands(
    limit = 12,
  ): Promise<Brand[]> {
    return brands
      .filter((brand) => brand.isFeatured)
      .slice(0, limit);
  },

  async getBrand(
    idOrSlug: string,
  ): Promise<Brand | null> {
    return (
      brands.find(
        (brand) =>
          brand.id === idOrSlug ||
          brand.slug === idOrSlug,
      ) ?? null
    );
  },
};

export default brandService;
