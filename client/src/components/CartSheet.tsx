import { Minus, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSheet = ({ isOpen, onClose }: CartSheetProps) => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={onClose} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product._id}-${item.size}`}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-muted/30"
                  >
                    <img
                      src={item.product.photos[0].url}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.size}
                      </p>
                      <p className="text-sm font-semibold">
                        ₹{item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        removeFromCart(item.product._id, item.size)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total: ₹{totalPrice.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={onClose}>
                <Button className="w-full rounded-xl" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
