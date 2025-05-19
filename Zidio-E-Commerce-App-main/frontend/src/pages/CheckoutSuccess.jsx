import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaReceipt } from 'react-icons/fa';

const CheckoutSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.order;

  // If no order data found, show an error message
  if (!orderData) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center text-white text-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">We couldn't find your order information. Please check your purchase history.</p>
          <Link to="/home" className="px-4 py-2 bg-yellow-600 text-gray-900 rounded hover:bg-yellow-500 transition">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Calculate the number of items in the order
  const totalItems = orderData.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Success Header */}
        <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-700">
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h1 className="text-3xl font-bold text-center">Order Successful!</h1>
          <p className="text-gray-300 mt-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaReceipt className="mr-2" /> Order Details
          </h2>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Order ID:</span>
              <span className="font-mono text-yellow-400">{orderData.orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Items:</span>
              <span>{totalItems} item(s)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{orderData.total + orderData.discount}</span>
            </div>
            {orderData.discount > 0 && (
              <div className="flex justify-between mb-2 text-green-400">
                <span>Discount:</span>
                <span>-₹{orderData.discount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-600 mt-2">
              <span>Total:</span>
              <span>₹{orderData.total}</span>
            </div>
          </div>
        </div>

        {/* Products Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBox className="mr-2" /> Products
          </h2>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center bg-gray-700 p-3 rounded-lg">
                <div className="w-16 h-16 bg-gray-600 rounded overflow-hidden mr-4">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex justify-between mt-1 text-sm text-gray-300">
                    <span>Qty: {item.quantity}</span>
                    <span>{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaTruck className="mr-2" /> Delivery Information
          </h2>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="mb-2">
              Estimated delivery by: <span className="font-semibold text-yellow-400">{orderData.estimatedDelivery}</span>
            </p>
            <p className="text-sm text-gray-300">
              You'll receive an email with tracking information once your order ships.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center pt-4">
          <Link 
            to="/home" 
            className="px-6 py-3 bg-yellow-600 text-gray-900 rounded-lg hover:bg-yellow-500 transition font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;