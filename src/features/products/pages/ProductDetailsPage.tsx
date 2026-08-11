import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product/ProductCard";
import { useCart } from "@/context/CartContext";

import { useProduct } from "../hooks/useProducts";
import { productService } from "../services/product.service";
import type { Product } from "../types/product.types";
import {
  findVariantForSelection,
  getVariantOptionGroups,
  getVariantSelectionLabel,
  isVariantOptionAvailable,
  type VariantSelection,
} from "../utils/variant.utils";

const RECENTLY_VIEWED_KEY = "bredabuy:recently-viewed";
const MAX_RECENTLY_VIEWED = 6;

function readRecentlyViewed(): Product[] {
  try {
    const value = localStorage.getItem(RECENTLY_VIEWED_KEY);
    return value ? (JSON.parse(value) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveRecentlyViewed(product: Product) {
  try {
    const existing = readRecentlyViewed().filter((item) => item.id !== product.id);
    localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify([product, ...existing].slice(0, MAX_RECENTLY_VIEWED)),
    );
  } catch {
    // Local storage is optional; browsing must continue if unavailable.
  }
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selection, setSelection] = useState<VariantSelection>({});
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [related, setRelated] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [shareMessage, setShareMessage] = useState("");

  const variants = product?.variants ?? [];
  const optionGroups = useMemo(() => getVariantOptionGroups(variants), [variants]);

  useEffect(() => {
    if (!product) return;

    saveRecentlyViewed(product);
    setRecentlyViewed(readRecentlyViewed().filter((item) => item.id !== product.id));

    let active = true;
    productService.getRelatedProducts(product).then((items) => {
      if (active) setRelated(items);
    });

    return () => {
      active = false;
    };
  }, [product]);

  useEffect(() => {
    if (!variants.length) {
      setSelection({});
      setQuantity(1);
      return;
    }

    const firstAvailable = variants.find((item) => item.stock > 0) ?? variants[0];
    setSelection({ ...(firstAvailable?.attributes ?? {}) });
    setQuantity(1);
    setSelectedImage(0);
  }, [product?.id, variants]);

  const variant = useMemo(
    () => findVariantForSelection(variants, selection),
    [variants, selection],
  );

  const images = product?.images ?? [];
  const variantImageIndex = variant?.image
    ? images.findIndex((item) => item.url === variant.image)
    : -1;
  const image = variant?.image ?? images[selectedImage]?.url;
  const effectivePrice = variant?.price ?? product?.price ?? 0;
  const effectiveStock = variant?.stock ?? product?.stock ?? 0;
  const effectiveCompareAtPrice = variant?.compareAtPrice ?? product?.compareAtPrice;
  const hasVariants = variants.length > 0;
  const isCompleteSelection = !hasVariants || Boolean(variant);

  useEffect(() => {
    if (variantImageIndex >= 0) setSelectedImage(variantImageIndex);
  }, [variantImageIndex]);

  useEffect(() => {
    setQuantity((current) => Math.max(1, Math.min(current, effectiveStock || 1)));
  }, [effectiveStock]);

  const handleSelectOption = (name: string, value: string) => {
    setSelection((current) => ({ ...current, [name]: value }));
  };

  const handleAddToCart = () => {
    if (hasVariants && !variant) return;
    addToCart(product, quantity, variant);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.shortDescription || product.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied");
        window.setTimeout(() => setShareMessage(""), 1800);
      }
    } catch {
      // Sharing can be cancelled by the user.
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
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
        <h1 className="text-3xl font-bold">Product not found</h1>
        <p className="mt-3 text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist or is no longer available.
        </p>
        <Button className="mt-6" onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | BredaBuy Ghana</title>
        <meta name="description" content={product.shortDescription || product.description} />
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.categoryId)}`} className="hover:text-foreground">
            {product.categoryName}
          </Link>
          {product.brandName && (
            <>
              <span>/</span>
              <Link to={`/products?brand=${encodeURIComponent(product.brandId || product.brandName)}`} className="hover:text-foreground">
                {product.brandName}
              </Link>
            </>
          )}
        </nav>

        <Link to="/products" className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <div className="overflow-hidden rounded-2xl border bg-muted/20 shadow-soft">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  width={800}
                  height={800}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center text-muted-foreground">No image available</div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-lg border ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img
                      src={item.url}
                      alt={item.alt || product.name}
                      width={160}
                      height={160}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex flex-wrap gap-2">
              {product.isNew && <Badge>New</Badge>}
              {product.isOnSale && <Badge variant="destructive">Sale</Badge>}
              <Badge variant="secondary">{product.categoryName}</Badge>
              {product.brandName && <Badge variant="outline">{product.brandName}</Badge>}
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-current" />
                <span className="font-medium">{product.rating?.average ?? 0}</span>
              </div>
              <span className="text-sm text-muted-foreground">{product.rating?.count ?? 0} reviews</span>
              <span className="text-sm text-muted-foreground">SKU: {variant?.sku ?? product.sku}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-bold">GH₵ {Number(effectivePrice).toLocaleString()}</span>
              {effectiveCompareAtPrice && (
                <span className="pb-1 text-lg text-muted-foreground line-through">GH₵ {Number(effectiveCompareAtPrice).toLocaleString()}</span>
              )}
            </div>

            <p className="mt-6 leading-7 text-muted-foreground">{product.description}</p>

            {hasVariants && (
              <div className="mt-7 space-y-6 rounded-2xl border bg-card p-5">
                <div>
                  <p className="text-sm font-semibold">Configure your product</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Choose the options you want. Unavailable combinations are automatically disabled.
                  </p>
                </div>

                {optionGroups.map((group) => (
                  <div key={group.name}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{group.name}</p>
                      {selection[group.name] && (
                        <span className="text-xs text-muted-foreground">Selected: {selection[group.name]}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.values.map((value) => {
                        const available = isVariantOptionAvailable(
                          variants,
                          selection,
                          group.name,
                          value,
                        );
                        const selected = selection[group.name] === value;

                        return (
                          <Button
                            key={`${group.name}-${value}`}
                            type="button"
                            variant={selected ? "default" : "outline"}
                            disabled={!available}
                            onClick={() => handleSelectOption(group.name, value)}
                            className={!available ? "cursor-not-allowed opacity-50 line-through" : ""}
                            title={!available ? `${value} is unavailable with the current selection` : undefined}
                          >
                            {value}
                            {!available && <span className="ml-1 text-[10px]">Out of stock</span>}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="rounded-xl bg-muted/50 p-4">
                  {variant ? (
                    <>
                      <p className="text-sm font-semibold">Selected configuration</p>
                      <p className="mt-1 text-sm text-muted-foreground">{getVariantSelectionLabel(variant)}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>SKU: {variant.sku}</span>
                        <span>{variant.stock > 0 ? `${variant.stock} available` : "Out of stock"}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Select an available combination to continue.
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border p-4">
              <p className="text-sm text-muted-foreground">Availability</p>
              <p className={effectiveStock > 0 ? "mt-1 font-medium text-green-600" : "mt-1 font-medium text-destructive"}>
                {effectiveStock > 0 ? `${effectiveStock} available` : "Out of stock"}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border">
                <Button variant="ghost" size="icon" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" disabled={quantity >= effectiveStock} onClick={() => setQuantity((value) => Math.min(effectiveStock, value + 1))}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                disabled={effectiveStock <= 0 || !isCompleteSelection}
                onClick={handleAddToCart}
                className="flex-1 sm:flex-none"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant={isWishlisted ? "default" : "outline"} size="icon" onClick={() => setIsWishlisted((value) => !value)} aria-label="Add to wishlist">
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share product">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            {shareMessage && <p className="mt-2 text-sm text-muted-foreground">{shareMessage}</p>}

            <p className="mt-3 text-xs text-muted-foreground">
              You can change the configuration and add another combination without leaving this product page.
            </p>

            {product.sellerName && (
              <Card className="mt-8">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">Sold by</p>
                  <p className="mt-1 font-semibold">{product.sellerName}</p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <div className="mt-5 overflow-hidden rounded-xl border">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-1 gap-2 border-b p-4 last:border-0 sm:grid-cols-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">You May Also Like</h2>
                <p className="mt-1 text-muted-foreground">More products from the same category.</p>
              </div>
              <Link to={`/products?category=${encodeURIComponent(product.categoryId)}`} className="text-sm font-semibold hover:underline">View category</Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )}

        {recentlyViewed.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold">Recently Viewed</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {recentlyViewed.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default ProductDetailsPage;
