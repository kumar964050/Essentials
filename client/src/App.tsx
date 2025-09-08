import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// context
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartSheet } from "./components/CartSheet";

// pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <main>
            <Header onCartClick={() => setIsCartOpen(true)} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/shirts" element={<ProductList />} />
              <Route path="/pants" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/track/:id" element={<OrderTracking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <CartSheet
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
