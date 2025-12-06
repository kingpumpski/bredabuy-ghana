import { Product, Category, Brand } from "@/types";

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    productCount: 245,
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    productCount: 532,
  },
  {
    id: "home-living",
    name: "Home & Living",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400",
    productCount: 189,
  },
  {
    id: "groceries",
    name: "Groceries",
    icon: "🛒",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    productCount: 423,
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: "💄",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    productCount: 312,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "⚽",
    image: "https://images.unsplash.com/photo-1461896836934- voices5eb1af0?w=400",
    productCount: 156,
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "🚗",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    productCount: 89,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "🌾",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400",
    productCount: 67,
  },
];

export const brands: Brand[] = [
  { id: "samsung", name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { id: "apple", name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { id: "nike", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { id: "adidas", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { id: "lg", name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg" },
  { id: "hp", name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg" },
];

export const products: Product[] = [
  {
    id: "PRD-001",
    name: "Samsung Galaxy S24 Ultra",
    description: "Experience the future with Samsung's flagship smartphone featuring an advanced AI camera system, S Pen, and stunning 6.8-inch Dynamic AMOLED display.",
    price: 8999,
    originalPrice: 10499,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600",
    category: "electronics",
    brand: "Samsung",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    discount: 15,
    isFeatured: true,
  },
  {
    id: "PRD-002",
    name: "Nike Air Max 270",
    description: "Step into comfort with Nike's revolutionary Air Max 270, featuring the tallest Air unit yet for maximum cushioning.",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "fashion",
    brand: "Nike",
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    discount: 18,
    isNew: true,
  },
  {
    id: "PRD-003",
    name: "MacBook Pro 14-inch M3",
    description: "Power meets portability. The new MacBook Pro with M3 chip delivers exceptional performance for professionals.",
    price: 14999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    category: "electronics",
    brand: "Apple",
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    isFeatured: true,
  },
  {
    id: "PRD-004",
    name: "Premium Kente Cloth Set",
    description: "Authentic Ghanaian Kente cloth, handwoven by skilled artisans. Perfect for special occasions and celebrations.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=600",
    category: "fashion",
    brand: "Ghana Kente",
    rating: 5.0,
    reviewCount: 78,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "PRD-005",
    name: "LG 65-inch OLED TV",
    description: "Immerse yourself in perfect blacks and infinite contrast with LG's stunning OLED technology.",
    price: 12999,
    originalPrice: 15999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
    category: "electronics",
    brand: "LG",
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    discount: 19,
  },
  {
    id: "PRD-006",
    name: "Organic Cocoa Beans 1kg",
    description: "Premium quality organic cocoa beans sourced directly from Ghanaian farms. Rich flavor for authentic chocolate.",
    price: 89,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600",
    category: "groceries",
    brand: "Ghana Cocoa",
    rating: 4.9,
    reviewCount: 234,
    inStock: true,
    isNew: true,
  },
  {
    id: "PRD-007",
    name: "Shea Butter Natural 500g",
    description: "100% pure unrefined shea butter from Northern Ghana. Perfect for skin and hair care.",
    price: 45,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
    category: "health-beauty",
    brand: "Ghana Natural",
    rating: 4.8,
    reviewCount: 456,
    inStock: true,
  },
  {
    id: "PRD-008",
    name: "HP Pavilion Gaming Laptop",
    description: "Powerful gaming laptop with RTX graphics and high-refresh display for immersive gaming experiences.",
    price: 7499,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600",
    category: "electronics",
    brand: "HP",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    discount: 17,
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);
export const newArrivals = products.filter(p => p.isNew);
export const discountedProducts = products.filter(p => p.discount);

export const VAT_RATE = 0.125; // Ghana's VAT rate is 12.5%

export const calculateVAT = (price: number): number => {
  return price * VAT_RATE;
};

export const calculateTotalWithVAT = (price: number): number => {
  return price * (1 + VAT_RATE);
};
