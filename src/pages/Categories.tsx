import { Link } from "react-router-dom";
import { ArrowRight, FolderTree, PackageSearch } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/categories/hooks/useCategories";

export default function Categories() {
  const { data: categories = [], isLoading, isError } = useCategories();

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 text-sm font-medium text-primary">BredaBuy Marketplace</p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Shop by category</h1>
        <p className="mt-3 text-muted-foreground">
          Explore products organized into categories to find what you need faster.
        </p>
      </header>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {isError && (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <PackageSearch className="mb-4 h-10 w-10 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Categories unavailable</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please try again shortly.</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !isError && categories.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">No categories available yet.</CardContent>
        </Card>
      )}

      {!isLoading && !isError && categories.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/products?category=${encodeURIComponent(category.id)}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex h-full items-start justify-between gap-4 p-6">
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FolderTree className="h-5 w-5" />
                    </div>
                    <h2 className="font-semibold">{category.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{category.productCount ?? 0} products</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
