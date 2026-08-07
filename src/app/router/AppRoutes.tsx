// import { Routes, Route } from "react-router-dom";

// import Index from "@/pages/Index";
// import Products from "@/pages/Products";
// import ProductDetail from "@/pages/ProductDetail";
// import Cart from "@/pages/Cart";
// import Checkout from "@/pages/Checkout";
// import OrderSuccess from "@/pages/OrderSuccess";
// import NotFound from "@/pages/NotFound";


// export function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/"element={<Index />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/checkout" element={<Checkout />} />
//       <Route path="/order-success" element={<OrderSuccess />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            style={{
              padding: 80,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            BredaBuy is Working 🚀
          </div>
        }
      />
    </Routes>
  );
}