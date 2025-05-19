// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import CartImg from '../assets/cart_empty.png';
import { loadRazorpayScript } from '../utils/loadRazorpay';

const parsePrice = (priceString) =>
  parseFloat(priceString.replace(/[^0-9.]/g, '') || 0);

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <div key={item.id} className="flex flex-col items-center bg-gray-700 p-4 rounded-lg w-full md:w-[300px]">
    <img src={item.image} alt={item.title} className="w-full h-[200px] object-contain mb-4" />
    <h2 className="text-xl font-semibold text-center">{item.title}</h2>
    <p className="text-center text-yellow-400 font-bold">{item.price}</p>
    <div className="flex items-center gap-2 my-2">
      <button
        onClick={() => onQuantityChange(item.id, -1)}
        disabled={item.quantity <= 1}
        className="px-2 py-1 bg-gray-600 rounded disabled:opacity-50"
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => onQuantityChange(item.id, 1)}
        className="px-2 py-1 bg-gray-600 rounded"
      >
        +
      </button>
    </div>
    <button
      onClick={() => onRemove(item)}
      className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-800 mt-2"
    >
      Remove
    </button>
  </div>
);

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  // --- Total Calculation ---
  const totalAmount = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    const qty = parseInt(item.quantity) || 1;
    return sum + (price * qty);
  }, 0);

  const finalAmount = Math.floor(totalAmount - discount);

  // --- Handlers ---
  const handleQuantityChange = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    updateQuantity(id, newQty);
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    switch (code) {
      case 'HERO50':
        setDiscount(50);
        setCouponMessage('🎉 ₹50 off with HERO50!');
        break;
      case 'SUPERHERO20':
        setDiscount(totalAmount * 0.2);
        setCouponMessage('🔥 20% discount applied!');
        break;
      case 'SUPERHERO10':
        setDiscount(totalAmount * 0.1);
        setCouponMessage('💥 10% discount applied!');
        break;
      default:
        setDiscount(0);
        setCouponMessage('❌ Invalid coupon code');
    }
  };

  const checkoutHandler = async (amount) => {
    if (cart.length === 0) return toast.error("🛒 Your cart is empty.");

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) return toast.error("⚠️ Razorpay failed to load.");

    try {
      const { data: { order } } = await axios.post("http://localhost:5000/api/v1/payment/checkout", { amount });
      const { data: { key } } = await axios.get("http://localhost:5000/api/v1/payment/getkey");

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "TeeShop",
        description: "Purchase Superhero Tees",
        image: "https://cdn.logojoy.com/wp-content/uploads/20240329181514/batman-superhero-logo.webp",
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post("http://localhost:5000/api/v1/payment/verify", {
              ...response,
              amount
            });

            toast.success("✅ Payment successful!");
            navigate('/checkout/success', {
              state: {
                order: {
                  items: cart,
                  total: amount,
                  discount,
                  couponUsed: coupon || null,
                  orderId: `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                  estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
                }
              }
            });
          } catch {
            toast.error("❌ Payment verification failed");
          }
        },
        prefill: {
          name: "TeeShop Fan",
          email: "hero@example.com",
          contact: "9999999999",
        },
        theme: { color: "#1e1b4b" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("❌ Checkout failed");
      console.error("Checkout error:", err);
    }
  };

  // --- Render ---
  return (
    <div className="p-6 text-white min-h-screen">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <div
            className="w-[70vh] h-[60vh] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${CartImg})` }}
          />
          <h2 className="text-xl font-bangers mb-2">Oops! Your cart is empty.</h2>
          <p className="text-gray-300 mb-4">Add some superhero drip to your wardrobe!</p>
          <Link
            to="/home"
            className="px-4 py-2 bg-yellow-600 text-gray-900 rounded hover:bg-teal-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 flex flex-wrap gap-6 justify-center">
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Coupon Section */}
          <div className="mt-6 flex items-center gap-3 justify-center">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="px-4 py-2 border rounded-lg w-60 text-black"
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Apply
            </button>
          </div>

          {couponMessage && (
            <p className={`mt-2 text-center ${discount > 0 ? "text-green-600" : "text-red-500"} font-medium`}>
              {couponMessage}
            </p>
          )}

          {/* Summary & Checkout */}
          <div className="mt-10 border-t pt-6 text-center">
            {discount > 0 && (
              <p className="text-green-600 font-semibold mb-2">
                Discount: -₹{Math.floor(discount)}
              </p>
            )}
            <h2 className="text-xl font-bold">Total: ₹{finalAmount}</h2>
            <button
              onClick={() => checkoutHandler(finalAmount)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow-lg text-lg"
            >
              🚀 Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
