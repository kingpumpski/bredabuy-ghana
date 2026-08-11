import type { ProductVariant } from "../types/product.types";

export interface VariantOptionGroup {
  name: string;
  values: string[];
}

export type VariantSelection = Record<string, string>;

/**
 * Builds stable option groups from the arbitrary attributes attached to variants.
 * This keeps the product model flexible for Size, Colour, Material, Capacity,
 * Shape, Design, Type, Dimensions, or seller-defined attributes.
 */
export function getVariantOptionGroups(
  variants: ProductVariant[] = [],
): VariantOptionGroup[] {
  const groups = new Map<string, Set<string>>();

  variants.forEach((variant) => {
    Object.entries(variant.attributes ?? {}).forEach(([name, value]) => {
      const key = name.trim();
      const normalizedValue = value.trim();
      if (!key || !normalizedValue) return;

      if (!groups.has(key)) groups.set(key, new Set());
      groups.get(key)!.add(normalizedValue);
    });
  });

  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}

export function matchesVariantSelection(
  variant: ProductVariant,
  selection: VariantSelection,
): boolean {
  return Object.entries(selection).every(
    ([name, value]) => variant.attributes?.[name] === value,
  );
}

export function findVariantForSelection(
  variants: ProductVariant[] = [],
  selection: VariantSelection,
): ProductVariant | undefined {
  if (!Object.keys(selection).length) return undefined;

  return variants.find((variant) => {
    const attributes = variant.attributes ?? {};
    return (
      Object.keys(selection).length === Object.keys(attributes).length &&
      matchesVariantSelection(variant, selection)
    );
  });
}

/**
 * Determines whether an option remains valid after the current selections.
 * A value is available when at least one variant matches all other selected
 * options and has positive stock.
 */
export function isVariantOptionAvailable(
  variants: ProductVariant[] = [],
  selection: VariantSelection,
  optionName: string,
  optionValue: string,
): boolean {
  const candidateSelection = {
    ...selection,
    [optionName]: optionValue,
  };

  return variants.some(
    (variant) =>
      variant.stock > 0 && matchesVariantSelection(variant, candidateSelection),
  );
}

export function getAvailableValues(
  variants: ProductVariant[] = [],
  selection: VariantSelection,
  optionName: string,
  values: string[],
): string[] {
  return values.filter((value) =>
    isVariantOptionAvailable(variants, selection, optionName, value),
  );
}

export function getVariantSelectionLabel(
  variant?: ProductVariant,
): string {
  if (!variant) return "";

  return Object.entries(variant.attributes ?? {})
    .map(([name, value]) => `${name}: ${value}`)
    .join(" • ");
}
