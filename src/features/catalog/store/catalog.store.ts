import { create } from "zustand";

import type {
  CatalogQuery,
  CatalogSort,
} from "../types/catalog.types";

interface CatalogStore {
  query: CatalogQuery;

  setQuery: (query: CatalogQuery) => void;
  updateQuery: (query: Partial<CatalogQuery>) => void;
  setPage: (page: number) => void;
  setSort: (sort: CatalogSort) => void;
  clearQuery: () => void;
}

const initialQuery: CatalogQuery = {
  page: 1,
  pageSize: 12,
  sort: "featured",
};

export const useCatalogStore = create<CatalogStore>((set) => ({
  query: initialQuery,

  setQuery: (query) =>
    set({
      query: {
        ...initialQuery,
        ...query,
      },
    }),

  updateQuery: (query) =>
    set((state) => ({
      query: {
        ...state.query,
        ...query,
        page:
          query.page ??
          (Object.keys(query).some(
            (key) => key !== "page"
          )
            ? 1
            : state.query.page),
      },
    })),

  setPage: (page) =>
    set((state) => ({
      query: {
        ...state.query,
        page,
      },
    })),

  setSort: (sort) =>
    set((state) => ({
      query: {
        ...state.query,
        sort,
        page: 1,
      },
    })),

  clearQuery: () =>
    set({
      query: initialQuery,
    }),
}));
