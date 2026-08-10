export function buildCatalogQuery(
  searchParams: URLSearchParams
) {
  const page =
    Number(
      searchParams.get("page")
    ) || 1;

  const pageSize =
    Number(
      searchParams.get("pageSize")
    ) || 12;

  const minPrice =
    searchParams.has("minPrice")
      ? Number(
          searchParams.get(
            "minPrice"
          )
        )
      : undefined;

  const maxPrice =
    searchParams.has("maxPrice")
      ? Number(
          searchParams.get(
            "maxPrice"
          )
        )
      : undefined;

  return {
    page,
    pageSize,
    search:
      searchParams.get("search") ??
      undefined,
    categoryId:
      searchParams.get("category") ??
      undefined,
    brandId:
      searchParams.get("brand") ??
      undefined,
    sellerId:
      searchParams.get("seller") ??
      undefined,
    minPrice,
    maxPrice,
    rating:
      searchParams.has("rating")
        ? Number(
            searchParams.get(
              "rating"
            )
          )
        : undefined,
    inStock:
      searchParams.get(
        "inStock"
      ) === "true",
    onSale:
      searchParams.get(
        "onSale"
      ) === "true",
    featured:
      searchParams.get(
        "featured"
      ) === "true",
    sort:
      (searchParams.get(
        "sort"
      ) as
        | "featured"
        | "newest"
        | "price-low"
        | "price-high"
        | "rating"
        | "popular"
        | null) ??
      "featured",
  };
}
