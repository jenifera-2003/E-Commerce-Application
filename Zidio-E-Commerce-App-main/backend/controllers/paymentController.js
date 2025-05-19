import crypto from "crypto";
import nodemailer from "nodemailer";

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // ✅ Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "hero@example.com",
      subject: "✅ Payment Successful - TeeShop",
      html: `<h1>Thanks for your purchase!</h1><p>Your payment of ₹${req.body.amount / 100} was successful.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid Signature" });
  }
};
