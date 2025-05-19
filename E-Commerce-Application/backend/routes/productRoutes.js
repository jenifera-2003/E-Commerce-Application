import express, { Router } from 'express';
import { getKey, processPayment } from '../controllers/productController';
const router = express.Router();
router.route('/payment/process').post(processPayment);
router.route('/getKey').get(getKey)

export default router;