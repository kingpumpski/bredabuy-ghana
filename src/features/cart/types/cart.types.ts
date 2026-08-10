export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image?: string;
  unitPrice: number;
  compareAtPrice?: number;
  quantity: number;
  availableStock: number;
  sellerId?: string;
  sellerName?: string;
  attributes?: Record<string, string>;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface CartState {
  items: CartItem[];
  couponCode?: string;
}
