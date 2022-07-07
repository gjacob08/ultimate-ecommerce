import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    receipt: {
      payment_intent: { type: String, required: true },
      payment_intent_client_secret: { type: String, required: true },
      redirect_status: { type: String, required: true },
    },
    orderItems: [],
    shippingAddress: {
      line1: { type: String, required: true },
      line2: { type: String, required: true },
      city: { type: String, required: true },
      postal: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Stripe",
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
