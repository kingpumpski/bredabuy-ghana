import { create } from "zustand";

import type {
  ProductFilters,
  ProductSort,
} from "../types/product.types";

interface ProductStore {
  filters: ProductFilters;
  sort: ProductSort;
  page: number;

  setFilters: (
    filters: ProductFilters
  ) => void;

  updateFilters: (
    filters: Partial<ProductFilters>
  ) => void;

  clearFilters: () => void;

  setSort: (
    sort: ProductSort
  ) => void;

  setPage: (
    page: number
  ) => void;

  hydrate: (
    filters: ProductFilters,
    sort: ProductSort,
    page: number
  ) => void;
}

export const useProductStore =
  create<ProductStore>((set) => ({
    filters: {},
    sort: "featured",
    page: 1,

    setFilters: (filters) =>
      set({
        filters,
        page: 1,
      }),

    updateFilters: (filters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
        page: 1,
      })),

    clearFilters: () =>
      set({
        filters: {},
        page: 1,
      }),

    setSort: (sort) =>
      set({
        sort,
        page: 1,
      }),

    setPage: (page) =>
      set({
        page,
      }),

    hydrate: (filters, sort, page) =>
      set({
        filters,
        sort,
        page,
      }),
  }));
