import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useCartLogic } from "../hooks/useCartLogic";

const CartContext = createContext<ReturnType<typeof useCartLogic> | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useCartLogic();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
