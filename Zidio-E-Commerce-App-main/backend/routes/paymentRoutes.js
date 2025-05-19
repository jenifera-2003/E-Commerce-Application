import express from "express";
import { createOrder, getKey, verifyPayment } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/checkout", createOrder);
router.get("/getkey", getKey);
router.post("/verify", verifyPayment);


export default router;
