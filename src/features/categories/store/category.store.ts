import { create } from "zustand";

interface CategoryStore {
  selectedCategoryId: string | null;
  setSelectedCategory: (id: string | null) => void;
  clearSelectedCategory: () => void;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({
    selectedCategoryId: null,

    setSelectedCategory: (id) =>
      set({
        selectedCategoryId: id,
      }),

    clearSelectedCategory: () =>
      set({
        selectedCategoryId: null,
      }),
  }));
