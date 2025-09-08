import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { Order } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import Cookies from "js-cookie";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // getting orders list from server
  useEffect(() => {
    (async () => {
      const url = `${import.meta.env.VITE_API_URL}/orders`;
      const token = Cookies.get("token");
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Raw server orders:", data);

      if (data.status === "success") {
        const transformedOrders: Order[] = data.orders.map((order: any) => ({
          id: order._id,
          createdAt: order.createdAt,
          status: order.orderStatus,
          totalAmount: order.totalAmount,
          deliveryAddress: {
            fullName: order.shippingInfo.fullName,
            phone: order.shippingInfo.phone,
            address: order.shippingInfo.address,
            city: order.shippingInfo.city,
            state: order.shippingInfo.state,
            pincode: order.shippingInfo.zipCode,
            country: order.shippingInfo.country,
            instructions: order.shippingInfo.instructions,
          },
          items: order.orderItems.map((item: any) => ({
            id: item._id,
            product: item.product,
            quantity: item.quantity,
          })),
        }));

        setOrders(transformedOrders);
      }
    })();
  }, [user]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!orders.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to see your order
            history here.
          </p>
          <Button asChild>
            <Link to="/">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Order History</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}{" "}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      {/* You can fetch product data using productId or display minimal info */}
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          <img src={item.product.photos[0].url} />
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          Product : {item.product.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Delivery Address */}
                <div>
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{order.deliveryAddress.fullName}</p>
                    <p>{order.deliveryAddress.address}</p>
                    <p>
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state} -{" "}
                      {order.deliveryAddress.pincode}
                    </p>
                    <p>Phone: {order.deliveryAddress.phone}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Total */}
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Amount</span>
                  <span>₹{order.totalAmount}</span>
                </div>

                <div className="mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to={`/track/${order.id}`}>Track Order</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
