import {
  Search,
  SlidersHorizontal,
  PackageSearch,
} from "lucide-react";

import { useMemo, useState } from "react";

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

const ProductCataloguePage = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const initialSearch =
    searchParams.get("q") ?? "";

  const [
    search,
    setSearch,
  ] = useState(initialSearch);

  const [
    filtersOpen,
    setFiltersOpen,
  ] = useState(false);

  const updateFilters =
    useProductStore(
      (state) => state.updateFilters
    );

  const filters =
    useProductStore(
      (state) => state.filters
    );

  const {
    data,
    isLoading,
    isError,
    error,
  } = useProducts();

  const submitSearch = () => {
    const value = search.trim();

    if (value) {
      updateFilters({
        search: value,
      });

      setSearchParams({
        q: value,
      });
    } else {
      updateFilters({
        search: undefined,
      });

      setSearchParams({});
    }
  };

  const heading = useMemo(() => {
    if (filters.search) {
      return `Search results for "${filters.search}"`;
    }

    if (filters.category) {
      return `${filters.category}`;
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
