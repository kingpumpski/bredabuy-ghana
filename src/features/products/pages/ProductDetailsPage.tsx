import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useState,
} from "react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import ProductCard from "@/components/product/ProductCard";

import {
  useCart,
} from "@/context/CartContext";

import {
  useProduct,
} from "../hooks/useProducts";

import {
  productService,
} from "../services/product.service";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(id);

  const {
    addToCart,
  } = useCart();

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
    isWishlisted,
    setIsWishlisted,
  ] = useState(false);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-5">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Product not found
        </h1>

        <p className="mt-3 text-muted-foreground">
          The product you're looking for
          doesn't exist or is no longer available.
        </p>

        <Button
          className="mt-6"
          onClick={() =>
            navigate("/shop")
          }
        >
          Browse Products
        </Button>
      </main>
    );
  }

  const image =
    product.images?.[selectedImage]?.url;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <main className="container mx-auto px-4 py-8">

      <Link
        to="/shop"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">

        <section>

          <div className="overflow-hidden rounded-xl border bg-muted/20">
            {image ? (
              <img
                src={image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center">
                No image available
              </div>
            )}
          </div>

          {product.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">

              {product.images.map(
                (item, index) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    className={`overflow-hidden rounded-lg border ${
                      selectedImage === index
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                )
              )}

            </div>
          )}

        </section>

        <section>

          <div className="flex flex-wrap gap-2">
            {product.isNew && (
              <Badge>New</Badge>
            )}

            {product.isOnSale && (
              <Badge variant="destructive">
                Sale
              </Badge>
            )}

            {product.categoryName && (
              <Badge variant="secondary">
                {product.categoryName}
              </Badge>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">

            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-current" />

              <span className="font-medium">
                {product.rating?.average ??
                  0}
              </span>
            </div>

            <span className="text-sm text-muted-foreground">
              {product.rating?.count ??
                0} reviews
            </span>

            {product.brandName && (
              <span className="text-sm text-muted-foreground">
                Brand:{" "}
                {product.brandName}
              </span>
            )}

          </div>

          <div className="mt-6 flex items-end gap-3">

            <span className="text-3xl font-bold">
              GH₵{" "}
              {Number(
                product.price
              ).toLocaleString()}
            </span>

            {product.compareAtPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">
                GH₵{" "}
                {Number(
                  product.compareAtPrice
                ).toLocaleString()}
              </span>
            )}

          </div>

          <p className="mt-6 leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 rounded-lg border p-4">
            <p className="text-sm">
              Availability
            </p>

            <p
              className={
                product.stock > 0
                  ? "mt-1 font-medium text-green-600"
                  : "mt-1 font-medium text-destructive"
              }
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">

            <div className="flex items-center rounded-lg border">

              <Button
                variant="ghost"
                size="icon"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity(
                    Math.max(
                      1,
                      quantity - 1
                    )
                  )
                }
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-10 text-center">
                {quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                disabled={
                  quantity >= product.stock
                }
                onClick={() =>
                  setQuantity(
                    Math.min(
                      product.stock,
                      quantity + 1
                    )
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </Button>

            </div>

            <Button
              size="lg"
              disabled={
                product.stock <= 0
              }
              onClick={
                handleAddToCart
              }
              className="flex-1 sm:flex-none"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <Button
              variant={
                isWishlisted
                  ? "default"
                  : "outline"
              }
              size="icon"
              onClick={() =>
                setIsWishlisted(
                  !isWishlisted
                )
              }
              aria-label="Add to wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted
                    ? "fill-current"
                    : ""
                }`}
              />
            </Button>

          </div>

          {product.sellerName && (
            <Card className="mt-8">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Sold by
                </p>

                <p className="mt-1 font-semibold">
                  {product.sellerName}
                </p>
              </CardContent>
            </Card>
          )}

        </section>

      </div>

      {product.specifications &&
        Object.keys(
          product.specifications
        ).length > 0 && (
          <section className="mt-16">

            <h2 className="text-2xl font-bold">
              Specifications
            </h2>

            <div className="mt-5 overflow-hidden rounded-xl border">

              {Object.entries(
                product.specifications
              ).map(
                ([key, value]) => (
                  <div
                    key={key}
                    className="grid grid-cols-2 border-b p-4 last:border-0"
                  >
                    <span className="font-medium">
                      {key}
                    </span>

                    <span className="text-muted-foreground">
                      {value}
                    </span>
                  </div>
                )
              )}

            </div>

          </section>
        )}

      <RelatedProducts
        product={product}
      />

    </main>
  );
};

// const RelatedProducts = ({
//   product,
// }: {
//   product: any;
// }) => {
//   const [
//     related,
//     setRelated,
//   ] = useState<any[]>([]);

  const RelatedProducts = ({
    product,
  }: {
    product: Product;
  }) => {
    const [related, setRelated] = useState<Product[]>([]);

  useState(() => {
    productService
      .getRelatedProducts(product)
      .then(setRelated);
  });

  if (!related.length) {
    return null;
  }

  return (
    <section className="mt-16">

      <h2 className="text-2xl font-bold">
        You May Also Like
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {related.map(
          (item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          )
        )}
      </div>

    </section>
  );
};

export default ProductDetailsPage;
