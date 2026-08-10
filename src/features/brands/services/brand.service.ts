import { products as mockProducts } from "@/data/mockData";

import type { Brand } from "../types/brand.types";

export const brandService = {
  async getBrands(): Promise<Brand[]> {
    // const products = mockProducts as any[];
    const products = mockProducts as unknown as Brand[];
    
    const map = new Map<string, Brand>();

    for (const product of products) {
      if (!product.brandName) {
        continue;
      }

      const id = product.brandId || product.brandName;

      if (!map.has(id)) {
        map.set(id, {
          id,
          name: product.brandName,
          slug: product.brandName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-"),
          productCount: 0,
        });
      }

      const brand = map.get(id)!;
      brand.productCount = (brand.productCount || 0) + 1;
    }

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  },

  async getBrand(
    idOrSlug: string,
  ): Promise<Brand | null> {
    const brands = await this.getBrands();

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
