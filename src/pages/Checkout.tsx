import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    city: "",
    postal_code: "",
    country: "USA",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = totalPrice >= 35 ? 0 : 4.99;
  const discount = 0; // You can get this from Cart context if you add it
  const total = totalPrice - discount + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customer_name.trim()) newErrors.customer_name = "Name is required";
    if (!formData.customer_email.trim()) newErrors.customer_email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.customer_email)) newErrors.customer_email = "Email is invalid";
    if (!formData.shipping_address.trim()) newErrors.shipping_address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postal_code.trim()) newErrors.postal_code = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          book_id: item.book.id,
          book_title: item.book.title,
          book_cover: item.book.cover,
          price: item.book.price,
          quantity: item.quantity,
        })),
        subtotal: totalPrice,
        shipping_cost: shipping,
        discount,
        promo_code: null, // Add promo code from cart if available
        total,
      };

      const response = await axios.post("/api/checkout", orderData);
      
      if (response.data.success) {
        setOrderId(response.data.order_id);
        setOrderComplete(true);
        clearCart();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    navigate("/cart");
    return null;
  }

  if (orderComplete) {
    return (
      <Layout>
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. We've sent a confirmation email to{" "}
              <strong>{formData.customer_email}</strong>
            </p>
            <p className="text-muted-foreground mb-8">
              Order ID: <strong>#{orderId}</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                variant="outline"
              >
                Continue Shopping
              </Button>
              <Button
                onClick={() => navigate(`/orders/${orderId}`)}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                View Order Details
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/cart")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                    {errors.customer_name && (
                      <p className="text-sm text-red-600 mt-1">{errors.customer_name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address *</label>
                    <Input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                    {errors.customer_email && (
                      <p className="text-sm text-red-600 mt-1">{errors.customer_email}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Street Address *</label>
                    <Input
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                    />
                    {errors.shipping_address && (
                      <p className="text-sm text-red-600 mt-1">{errors.shipping_address}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Postal Code *</label>
                      <Input
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        placeholder="10001"
                      />
                      {errors.postal_code && (
                        <p className="text-sm text-red-600 mt-1">{errors.postal_code}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Country *</label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="USA"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
                <CreditCard className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-lg border p-6">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.book.id} className="flex gap-3">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.book.title}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">${(item.book.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="font-serif">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
