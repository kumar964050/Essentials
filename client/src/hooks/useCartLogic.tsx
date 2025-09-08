import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types";
// import { useToast } from "@/hooks/use-toast";

const CART_STORAGE_KEY = "cart_items";
export const useCartLogic = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product._id === product._id && item.size === size
      );

      if (existingItem) {
        // toast({
        //   title: "Updated cart",
        //   description: `Increased quantity of ${product.name} (${size})`,
        // });
        return prev.map((item) =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // toast({
      //   title: "Added to cart",
      //   description: `${product.name} (${size}) added to your cart`,
      // });

      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product._id === productId && item.size === size)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);
      console.log("Parsed cart from localStorage:", parsedCart);
      setCartItems(parsedCart);
    }
  }, []);

  useEffect(() => {
    if (!cartItems) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};
