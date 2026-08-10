import {
  Search,
  SlidersHorizontal,
  PackageSearch,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import ProductCard from "@/components/product/ProductCard";

import ProductFilters from "../components/ProductFilters";
import ProductSort from "../components/ProductSort";
import ProductPagination from "../components/ProductPagination";

import {
  useProducts,
} from "../hooks/useProducts";

import {
  useProductStore,
} from "../store/product.store";

import type {
  ProductFilters as ProductFiltersType,
  ProductSort as ProductSortType,
} from "../types/product.types";

const PRODUCT_SORTS: ProductSortType[] = [
  "featured",
  "newest",
  "price-low",
  "price-high",
  "rating",
  "popular",
];

const parseNumber = (
  value: string | null
) => {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed)
    ? parsed
    : undefined;
};

const parseBoolean = (
  value: string | null
) => value === "1";

const ProductCataloguePage = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [
    search,
    setSearch,
  ] = useState(
    searchParams.get("q") ?? ""
  );

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);

  const filters = useProductStore(
    (state) => state.filters
  );

  const sort = useProductStore(
    (state) => state.sort
  );

  const page = useProductStore(
    (state) => state.page
  );

  const updateFilters = useProductStore(
    (state) => state.updateFilters
  );

  const hydrate = useProductStore(
    (state) => state.hydrate
  );

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts();

  useEffect(() => {
    const nextFilters: ProductFiltersType = {
      search:
        searchParams.get("q") ??
        undefined,
      category:
        searchParams.get("category") ??
        undefined,
      brand:
        searchParams.get("brand") ??
        undefined,
      minPrice: parseNumber(
        searchParams.get("minPrice")
      ),
      maxPrice: parseNumber(
        searchParams.get("maxPrice")
      ),
      rating: parseNumber(
        searchParams.get("rating")
      ),
      inStock: searchParams.has(
        "inStock"
      )
        ? parseBoolean(
            searchParams.get("inStock")
          )
        : undefined,
      onSale: searchParams.has("onSale")
        ? parseBoolean(
            searchParams.get("onSale")
          )
        : undefined,
    };

    const nextSortValue =
      searchParams.get("sort");

    const nextSort: ProductSortType =
      PRODUCT_SORTS.includes(
        nextSortValue as ProductSortType
      )
        ? (nextSortValue as ProductSortType)
        : "featured";

    const parsedPage = Number(
      searchParams.get("page") ?? "1"
    );

    const nextPage =
      Number.isInteger(parsedPage) &&
      parsedPage > 0
        ? parsedPage
        : 1;

    setSearch(
      searchParams.get("q") ?? ""
    );

    hydrate(
      nextFilters,
      nextSort,
      nextPage
    );
  }, [
    searchParams,
    hydrate,
  ]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (filters.search) {
      nextParams.set(
        "q",
        filters.search
      );
    }

    if (filters.category) {
      nextParams.set(
        "category",
        filters.category
      );
    }

    if (filters.brand) {
      nextParams.set(
        "brand",
        filters.brand
      );
    }

    if (filters.minPrice !== undefined) {
      nextParams.set(
        "minPrice",
        String(filters.minPrice)
      );
    }

    if (filters.maxPrice !== undefined) {
      nextParams.set(
        "maxPrice",
        String(filters.maxPrice)
      );
    }

    if (filters.rating !== undefined) {
      nextParams.set(
        "rating",
        String(filters.rating)
      );
    }

    if (filters.inStock) {
      nextParams.set("inStock", "1");
    }

    if (filters.onSale) {
      nextParams.set("onSale", "1");
    }

    if (sort !== "featured") {
      nextParams.set("sort", sort);
    }

    if (page > 1) {
      nextParams.set(
        "page",
        String(page)
      );
    }

    const nextQuery =
      nextParams.toString();
    const currentQuery =
      searchParams.toString();

    if (nextQuery !== currentQuery) {
      setSearchParams(
        nextParams,
        { replace: true }
      );
    }
  }, [
    filters,
    sort,
    page,
    searchParams,
    setSearchParams,
  ]);

  const submitSearch = () => {
    const value = search.trim();

    updateFilters({
      search: value || undefined,
    });
  };

  const heading = useMemo(() => {
    if (filters.search) {
      return `Search results for "${filters.search}"`;
    }

    if (filters.category) {
      return `${filters.category}`;
    }

    if (filters.brand) {
      return `${filters.brand}`;
    }

    return "Shop All Products";
  }, [filters]);

  return (
    <div className="min-h-screen">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-medium text-primary">
              BredaBuy Marketplace
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {heading}
            </h1>

            <p className="mt-3 text-muted-foreground">
              Discover products from trusted sellers
              across Ghana.
            </p>
          </div>

          <div className="mt-7 flex max-w-3xl gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter"
                  ) {
                    submitSearch();
                  }
                }}
                placeholder="Search products..."
                className="h-11 pl-10"
              />
            </div>

            <Button
              onClick={submitSearch}
              className="h-11"
            >
              Search
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading products..."
                : `${data?.total ?? 0} products found`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() =>
                setFiltersOpen(
                  !filtersOpen
                )
              }
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <ProductSort />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside
            className={
              filtersOpen
                ? "block"
                : "hidden lg:block"
            }
          >
            <Card>
              <CardContent className="p-5">
                <ProductFilters />
              </CardContent>
            </Card>
          </aside>

          <section>
            {isLoading && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({
                  length: 8,
                }).map((_, index) => (
                  <Card key={index}>
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="space-y-3 p-4">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-6 w-1/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {isError && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />

                  <h2 className="text-xl font-semibold">
                    Unable to load products
                  </h2>

                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {error instanceof Error
                      ? error.message
                      : "Something went wrong while loading the catalogue."}
                  </p>
                </CardContent>
              </Card>
            )}

            {!isLoading &&
              !isError &&
              data?.items.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />

                    <h2 className="text-xl font-semibold">
                      No products found
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Try changing your search or
                      removing some filters.
                    </p>
                  </CardContent>
                </Card>
              )}

            {!isLoading &&
              !isError &&
              data &&
              data.items.length > 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {data.items.map(
                      (product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      )
                    )}
                  </div>

                  <div className="mt-10">
                    <ProductPagination
                      totalPages={
                        data.totalPages
                      }
                    />
                  </div>
                </>
              )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductCataloguePage;
