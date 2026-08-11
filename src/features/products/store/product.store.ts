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

const filtersEqual = (
  first: ProductFilters,
  second: ProductFilters,
) =>
  first.search === second.search &&
  first.category === second.category &&
  first.brand === second.brand &&
  first.seller === second.seller &&
  first.minPrice === second.minPrice &&
  first.maxPrice === second.maxPrice &&
  first.rating === second.rating &&
  first.inStock === second.inStock &&
  first.onSale === second.onSale &&
  first.featured === second.featured;

export const useProductStore =
  create<ProductStore>((set) => ({
    filters: {},
    sort: "featured",
    page: 1,

    setFilters: (filters) =>
      set((state) =>
        filtersEqual(state.filters, filters) && state.page === 1
          ? state
          : {
              filters,
              page: 1,
            },
      ),

    updateFilters: (filters) =>
      set((state) => {
        const nextFilters = {
          ...state.filters,
          ...filters,
        };

        return filtersEqual(state.filters, nextFilters) && state.page === 1
          ? state
          : {
              filters: nextFilters,
              page: 1,
            };
      }),

    clearFilters: () =>
      set((state) =>
        filtersEqual(state.filters, {}) && state.page === 1
          ? state
          : {
              filters: {},
              page: 1,
            },
      ),

    setSort: (sort) =>
      set((state) =>
        state.sort === sort && state.page === 1
          ? state
          : {
              sort,
              page: 1,
            },
      ),

    setPage: (page) =>
      set((state) => (state.page === page ? state : { page })),

    // URL hydration happens whenever React Router reports a new query string.
    // Returning the existing state when values are unchanged prevents needless
    // renders and avoids catalogue query churn during search/filter navigation.
    hydrate: (filters, sort, page) =>
      set((state) =>
        filtersEqual(state.filters, filters) &&
        state.sort === sort &&
        state.page === page
          ? state
          : {
              filters,
              sort,
              page,
            },
      ),
  }));
