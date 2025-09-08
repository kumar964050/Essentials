import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Order } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
} from "lucide-react";
import { Separator } from "../components/ui/separator";

import Cookies from "js-cookie";

const statusSteps = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle },
  { key: "shipped", label: "Shipped", icon: Package },
  { key: "delivered", label: "Delivered", icon: Truck },
];

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchOrderId, setSearchOrderId] = useState(id || "");
  const [order, setOrder] = useState<Order | null>(null);
  const [trackingNumber] = useState(`TRK${Date.now().toString().slice(-8)}`);

  useEffect(() => {
    (async () => {
      const url = `${import.meta.env.VITE_API_URL}/orders/${id}`;
      const token = Cookies.get("token");
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.status === "success") {
        const transformedOrder: Order = {
          id: data.order._id,
          createdAt: data.order.createdAt,
          status: data.order.Status,
          totalAmount: data.order.totalAmount,
          deliveryAddress: {
            fullName: data.order.shippingInfo.fullName,
            phone: data.order.shippingInfo.phone,
            address: data.order.shippingInfo.address,
            city: data.order.shippingInfo.city,
            state: data.order.shippingInfo.state,
            pincode: data.order.shippingInfo.zipCode,
            country: data.order.shippingInfo.country,
            instructions: data.order.shippingInfo.instructions,
          },
          items: data.order.orderItems.map((item: any) => ({
            id: item._id,
            product: item.product,
            quantity: item.quantity,
          })),
        };
        setOrder(transformedOrder);
      }
    })();
  }, [id]);

  const findOrder = (id: string) => {
    const allOrders = JSON.parse(
      localStorage.getItem("essentials-orders") || "[]"
    );
    const foundOrder = allOrders.find((order: Order) => order.id === id);
    setOrder(foundOrder || null);
  };

  const handleSearch = () => {
    if (searchOrderId.trim()) {
      findOrder(searchOrderId.trim());
      navigate(`/track/${searchOrderId.trim()}`);
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  const getEstimatedDelivery = () => {
    if (!order) return "";
    const orderDate = new Date(order.createdAt);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 3); // 3 days delivery
    return deliveryDate.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Track Your Order</h1>
      </div>

      {order ? (
        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tracking Number:{" "}
                    <span className="font-mono">{trackingNumber}</span>
                  </p>
                </div>
                <Badge
                  className={
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "shipped"
                      ? "bg-blue-500"
                      : order.status === "confirmed"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }
                >
                  Processing
                  {/* {order.status.charAt(0).toUpperCase() + order.status.slice(1)} */}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Tracking Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Order Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.status !== "cancelled" && (
                  <div className="text-sm text-muted-foreground mb-4">
                    Estimated Delivery:{" "}
                    <span className="font-medium text-foreground">
                      {getEstimatedDelivery()}
                    </span>
                  </div>
                )}

                <div className="relative">
                  {statusSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    const currentIndex = getStatusIndex(order.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                      <div
                        key={step.key}
                        className="flex items-center gap-4 pb-4"
                      >
                        <div
                          className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            isCompleted
                              ? "bg-primary border-primary text-primary-foreground"
                              : "bg-background border-muted-foreground text-muted-foreground"
                          }`}
                        >
                          {isCompleted ? (
                            <StepIcon className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>

                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isCompleted
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-primary">In Progress</p>
                          )}
                        </div>

                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 w-0.5 h-8 ${
                              index < currentIndex ? "bg-primary" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.product.photos[0].url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-medium">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium">{order.deliveryAddress.fullName}</p>
                <p>{order.deliveryAddress.address}</p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state} -{" "}
                  {order.deliveryAddress.pincode}
                </p>
                <p className="text-muted-foreground">
                  Phone: {order.deliveryAddress.phone}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        searchOrderId && (
          <Card>
            <CardContent className="py-8 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">
                We couldn't find an order with ID:{" "}
                <span className="font-mono">{searchOrderId}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please check your order ID and try again.
              </p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
};

export default OrderTracking;
