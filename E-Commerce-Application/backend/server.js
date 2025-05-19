import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay"; 
import crypto from 'crypto';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create Razorpay instance with fallback for development
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET 
});

// Add console log to debug
console.log("Razorpay Key ID available:", !!process.env.RAZORPAY_API_KEY);

// Add this endpoint for getting Razorpay key
app.get('/api/v1/payment/getkey', (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY
  });
});

// Add this endpoint for creating order
app.post('/api/v1/payment/checkout', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add this endpoint for verifying payment
app.post('/api/v1/payment/verify', async (req, res) => {
  try {
    // Payment verification logic
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    
    const verifySignature = (orderId, paymentId, signature) => {
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
      
      return generatedSignature === signature;
    };
    
    // Verify the signature
    const isSignatureValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    
    if (isSignatureValid) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });
    } else {
      throw new Error("Invalid signature");
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
  }
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("⚠ MongoDB connection error:", err));

app.get('/', (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);