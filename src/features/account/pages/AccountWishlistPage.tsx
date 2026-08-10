import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountWishlistPage() {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 850,
    },
    {
      id: 2,
      name: "Smart LED Television",
      price: 4200,
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: 420,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Wishlist
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-xl border p-5"
          >
            <div className="mb-6 flex h-32 items-center justify-center rounded-lg bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 font-bold">
              GH₵ {product.price.toLocaleString()}
            </p>

            <Button className="mt-4 w-full">
              Add to Cart
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
