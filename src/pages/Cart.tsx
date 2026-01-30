import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { getAuthorById } from "@/data/mockData";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoStatus, setPromoStatus] = useState("");
  const [loadingPromo, setLoadingPromo] = useState(false);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold">Your Cart is Empty</h1>
            <p className="text-muted-foreground mt-2">
              Looks like you haven't added any books yet. Start exploring our collection!
            </p>
            <Link to="/books">
              <Button className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Browse Books
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice >= 35 ? 0 : 4.99;
  const discountAmount = discount > 0 ? (totalPrice * discount) / 100 : 0;
  const grandTotal = totalPrice - discountAmount + shipping;

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const author = getAuthorById(item.book.authorId);
              return (
                <motion.div
                  key={item.book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-card rounded-lg border"
                >
                  <Link to={`/book/${item.book.id}`} className="shrink-0">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-24 h-36 object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          to={`/book/${item.book.id}`}
                          className="font-serif text-lg font-semibold hover:text-accent transition-colors line-clamp-1"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">{author?.name}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.book.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          disabled={item.quantity >= item.book.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-serif text-lg font-bold">
                          ${(item.book.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">
                            ${item.book.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="flex justify-between pt-4">
              <Link to="/books">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="ghost" className="text-destructive" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-card rounded-lg border p-6"
            >
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">
                    Add ${(35 - totalPrice).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="font-serif">${grandTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs text-green-600 mt-1">
                      <span>Promo Discount</span>
                      <span>- ${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="text-sm font-medium mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    className="flex-1"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    disabled={loadingPromo}
                  />
                  <Button
                    variant="secondary"
                    disabled={loadingPromo || !promoCode}
                    onClick={async () => {
                      setLoadingPromo(true);
                      setPromoStatus("");
                      try {
                        const res = await axios.post("/api/validate-promo", { code: promoCode });
                        if (res.data.valid) {
                          setDiscount(res.data.discount);
                          setPromoStatus(`Promo applied: ${res.data.discount}% off!`);
                        } else {
                          setDiscount(0);
                          setPromoStatus("Invalid promo code.");
                        }
                      } catch (err) {
                        console.error("Promo code validation error:", err);
                        setPromoStatus("Error validating promo code.");
                      }
                      setLoadingPromo(false);
                    }}
                  >
                    {loadingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>
                {promoStatus && (
                  <p className={`mt-2 text-sm ${discount > 0 ? "text-green-600" : "text-red-600"}`}>{promoStatus}</p>
                )}
                {discount > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">You saved ${discountAmount.toFixed(2)}!</p>
                )}
              </div>

              <Button
                size="lg"
                className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
