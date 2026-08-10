import apiClient from "@/services/api/client";

import type { Brand } from "../types/brand.types";

export const brandService = {
  async getBrands(): Promise<Brand[]> {
    const response = await apiClient.get("/brands");

    return response.data?.items ??
      response.data ??
      [];
  },

  async getBrand(
    idOrSlug: string
  ): Promise<Brand | null> {
    const response = await apiClient.get(
      `/brands/${idOrSlug}`
    );

    return response.data?.item ??
      response.data ??
      null;
  },
};

export default brandService;
