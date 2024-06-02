
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import dataRoute from "./route/data.route.js";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const URI = process.env.MongoDBURI;
const razorpayKeyId = process.env.RAZORPAY_ID_KEY;
const razorpayKeySecret = process.env.RAZORPAY_SECRET_KEY;

mongoose
  .connect(URI)
  .then(() => {
    console.log("App connected");
    app.listen(PORT, () => {
      console.log(`Listening at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

app.post("/order", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", dataRoute);

export default app;
