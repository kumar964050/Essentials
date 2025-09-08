import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, Truck } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
import Cookies from "js-cookie";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  //   const { toast } = useToast();

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    instructions: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    // Validate required fields
    if (
      !deliveryInfo.fullName ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.state ||
      !deliveryInfo.zipCode
    ) {
      //   toast({
      //     title: "Missing Information",
      //     description: "Please fill in all required delivery information",
      //     variant: "destructive",
      //   });
      return;
    }

    try {
      const token = Cookies.get("token");
      const url = `${import.meta.env.VITE_API_URL}/orders`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          shippingInfo: {
            fullName: deliveryInfo.fullName,
            phone: deliveryInfo.phone,
            address: deliveryInfo.address,
            city: deliveryInfo.city,
            zipCode: deliveryInfo.zipCode,
            state: deliveryInfo.state,
            country: "india",
            instructions: deliveryInfo.instructions,
          },
          orderItems: cartItems,
          paymentInfo: {
            id: "pay_123456789",
          },
          taxAmount: totalPrice * 0.18,
          shippingAmount: 0,
          totalAmount: totalPrice + totalPrice * 0.18,
          orderStatus: "processing",
        }),
      });
      const data = await res.json();

      const options = {
        key: "rzp_test_RF29RUxLg1DLw0", // your Razorpay key_id
        amount: data.amount, // amount from backend (in paise)
        currency: data.currency,
        order_id: data.id, // ✅ use "id" from backend, not "_id"
        name: "Essentials",
        description: "Test Transaction",
        handler: function (response: any) {
          console.log("Payment Success", response);
          clearCart();
          window.location.href = "/";
        },
        prefill: {
          name: "Narendra Kumar",
          email: "test@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("error ", error);
    } finally {
      // console.log("first");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart before checking out
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Forms Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Delivery Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={deliveryInfo.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="House/Flat No, Street Name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={deliveryInfo.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={deliveryInfo.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">PIN Code *</Label>
                    <Input
                      id="zipCode"
                      value={deliveryInfo.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Delivery Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={deliveryInfo.instructions}
                    onChange={(e) =>
                      handleInputChange("instructions", e.target.value)
                    }
                    placeholder="Leave at front door, ring doorbell, etc."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Column */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product._id}-${item.size}`}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{(item.product.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{(totalPrice * 0.18).toFixed(0)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(totalPrice * 1.18).toFixed(0)}</span>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full mt-6"
                    size="lg"
                  >
                    Pay with Razorpay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
