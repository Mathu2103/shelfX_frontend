import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface OrderItem {
  id: number;
  book_id: string;
  book_title: string;
  book_cover: string;
  price: string | number;
  quantity: number;
  subtotal: string | number;
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  country: string;
  subtotal: string | number;
  shipping_cost: string | number;
  discount: string | number;
  promo_code: string | null;
  total: string | number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log('Fetching order:', id);
        const response = await axios.get(`/api/orders/${id}`);
        console.log('Order response:', response.data);
        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError("Order not found");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        console.error("Error response:", err.response?.data);
        setError(err.response?.data?.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError("No order ID provided");
      setLoading(false);
    }
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-600" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-600" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <p className="text-red-600 mb-4">{error || "Order not found"}</p>
          <Button onClick={() => navigate("/")}>Go to Home</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground mt-1">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="font-medium capitalize">{order.status}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-card rounded-lg border p-6 mb-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Customer Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
              {order.customer_phone && (
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{order.customer_phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-card rounded-lg border p-6 mb-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="text-sm">
              <p>{order.shipping_address}</p>
              <p>{order.city}, {order.postal_code}</p>
              <p>{order.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-card rounded-lg border p-6 mb-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <img
                    src={item.book_cover}
                    alt={item.book_title}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.book_title}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">${Number(item.price).toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${Number(item.subtotal).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${Number(order.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{Number(order.shipping_cost) === 0 ? "Free" : `$${Number(order.shipping_cost).toFixed(2)}`}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {order.promo_code && `(${order.promo_code})`}</span>
                  <span>-${Number(order.discount).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="font-serif">${Number(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
