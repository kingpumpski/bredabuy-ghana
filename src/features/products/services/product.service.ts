import apiClient from "@/services/api/client";
import { products as mockProducts } from "@/data/mockData";

import type {
  Product,
  ProductFilters,
  ProductSort,
  ProductVariant,
} from "../types/product.types";

export interface ProductQuery {
  page?: number;
  pageSize?: number;
  filters?: ProductFilters;
  sort?: ProductSort;
}

export interface ProductResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface LegacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const normalize = (value: string) => value.trim().toLowerCase();

const useMockCatalogue = import.meta.env.VITE_USE_MOCK_DATA !== "false";

const categoryNames: Record<string, string> = {
  electronics: "Electronics",
  fashion: "Fashion",
  "home-living": "Home & Living",
  groceries: "Groceries",
  "health-beauty": "Health & Beauty",
  sports: "Sports & Fitness",
  automotive: "Automotive",
  agriculture: "Agriculture",
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function createNikeVariants(product: LegacyProduct): ProductVariant[] {
  const colours = [
    { name: "Black", stock: 12 },
    { name: "White", stock: 8 },
    { name: "Red", stock: 5 },
  ];
  const sizes = ["39", "40", "41", "42", "43"];
  const designs = ["Standard", "Premium"];

  return colours.flatMap((colour, colourIndex) =>
    sizes.flatMap((size, sizeIndex) =>
      designs.map((design, designIndex) => {
        const outOfStock =
          (colour.name === "Black" && size === "41" && design === "Standard") ||
          (colour.name === "Red" && size === "43" && design === "Premium");
        const premiumSurcharge = design === "Premium" ? 150 : 0;
        const colourSurcharge = colourIndex === 2 ? 50 : 0;

        return {
          id: `${product.id}-variant-${colourIndex + 1}-${size}-${designIndex + 1}`,
          name: `${colour.name} / ${size} / ${design}`,
          sku: `${product.id}-${colour.name.slice(0, 2).toUpperCase()}-${size}-${design.slice(0, 2).toUpperCase()}`,
          price: product.price + premiumSurcharge + colourSurcharge,
          compareAtPrice:
            product.originalPrice &&
            product.originalPrice > product.price
              ? product.originalPrice + premiumSurcharge + colourSurcharge
              : undefined,
          stock: outOfStock
            ? 0
            : Math.max(2, colour.stock - sizeIndex),
          attributes: {
            Colour: colour.name,
            Size: size,
            Design: design,
          },
          image: product.image,
        };
      }),
    ),
  );
}

function normalizeLegacyProduct(input: LegacyProduct): Product {
  const variants =
    input.brand === "Nike" && input.name.toLowerCase().includes("air max")
      ? createNikeVariants(input)
      : undefined;

  const categoryId = input.category;
  const brandId = toSlug(input.brand);
  const now = new Date().toISOString();
  const totalVariantStock = variants?.reduce((sum, item) => sum + item.stock, 0);

  return {
    id: input.id,
    slug: toSlug(input.name),
    name: input.name,
    description: input.description,
    shortDescription: input.description,
    categoryId,
    categoryName: categoryNames[categoryId] ?? input.category,
    brandId,
    brandName: input.brand,
    sku: input.id,
    price: input.price,
    compareAtPrice: input.originalPrice,
    currency: "GHS",
    images: [
      {
        id: `${input.id}-image-1`,
        url: input.image,
        alt: input.name,
        position: 0,
      },
    ],
    variants,
    rating: {
      average: input.rating,
      count: input.reviewCount,
    },
    stock: totalVariantStock ?? (input.inStock ? 20 : 0),
    isFeatured: input.isFeatured,
    isNew: input.isNew,
    isOnSale: Boolean(input.originalPrice && input.originalPrice > input.price),
    tags: [input.brand, input.category],
    createdAt: now,
    updatedAt: now,
  };
}

const catalogue: Product[] = (mockProducts as unknown as LegacyProduct[]).map(
  normalizeLegacyProduct,
);

export const productService = {
  async getProducts(query: ProductQuery = {}): Promise<ProductResult> {
    if (!useMockCatalogue) {
      const response = await apiClient.get("/products", {
        params: {
          page: query.page,
          pageSize: query.pageSize,
          ...query.filters,
          sort: query.sort,
        },
      });

      return response.data;
    }

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 12;
    const filters = query.filters ?? {};
    const sort = query.sort ?? "featured";

    let result = catalogue.slice();

    if (filters.search) {
      const search = normalize(filters.search);
      result = result.filter((product) =>
        [
          product.name,
          product.description,
          product.categoryName,
          product.brandName ?? "",
          product.sellerName ?? "",
          ...(product.tags ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(search),
      );
    }

    if (filters.category) {
      result = result.filter(
        (product) =>
          product.categoryId === filters.category ||
          product.categoryName === filters.category,
      );
    }

    if (filters.brand) {
      result = result.filter(
        (product) =>
          product.brandId === filters.brand ||
          product.brandName === filters.brand,
      );
    }

    if (filters.seller) {
      result = result.filter((product) => product.sellerId === filters.seller);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((product) => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((product) => product.price <= filters.maxPrice!);
    }

    if (filters.rating !== undefined) {
      result = result.filter(
        (product) => product.rating.average >= filters.rating!,
      );
    }

    if (filters.inStock) {
      result = result.filter((product) => product.stock > 0);
    }

    if (filters.onSale) {
      result = result.filter(
        (product) => product.isOnSale || Boolean(product.compareAtPrice),
      );
    }

    if (filters.featured) {
      result = result.filter((product) => product.isFeatured === true);
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "popular":
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
      default:
        result.sort(
          (a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)),
        );
    }

    const total = result.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;

    return {
      items: result.slice(start, start + pageSize),
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getProduct(idOrSlug: string): Promise<Product | null> {
    if (!useMockCatalogue) {
      const response = await apiClient.get(`/products/${idOrSlug}`);
      return response.data?.item ?? response.data ?? null;
    }

    return (
      catalogue.find(
        (product) => product.id === idOrSlug || product.slug === idOrSlug,
      ) ?? null
    );
  },

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    const result = await this.getProducts({
      page: 1,
      pageSize: limit,
      filters: { featured: true },
      sort: "featured",
    });

    return result.items;
  },

  async getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
    const result = await this.getProducts({
      page: 1,
      pageSize: limit + 1,
      filters: { category: product.categoryId },
    });

    return result.items.filter((item) => item.id !== product.id).slice(0, limit);
  },
};

export default productService;
