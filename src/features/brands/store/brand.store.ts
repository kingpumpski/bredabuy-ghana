import { create } from "zustand";

interface BrandStore {
  selectedBrandId: string | null;
  setSelectedBrand: (id: string | null) => void;
  clearSelectedBrand: () => void;
}

export const useBrandStore =
  create<BrandStore>((set) => ({
    selectedBrandId: null,

    setSelectedBrand: (id) =>
      set({
        selectedBrandId: id,
      }),

    clearSelectedBrand: () =>
      set({
        selectedBrandId: null,
      }),
  }));
