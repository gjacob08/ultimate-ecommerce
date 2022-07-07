import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import Order from "../models/OrderModel.js";

const orderRoute = express.Router();

const FRONTEND_URL = "http://localhost:3000"

// CREATE ORDER
orderRoute.post("/", asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const { user, cartItems, receipt, transaction_record } = req.body.data

  // Searches the Database for Existing Order
  Order.findOne({ 'receipt.payment_intent': receipt.payment_intent }, async function (error, order) {
    if (error) return res.send(error)
    if (order) console.log("Order already exist.")

    // Creates a new product base on the request body
    if (cartItems && cartItems.length === 0) res.status(400).redirect(FRONTEND_URL)
    else {
      const newOrder = new Order({
        user: { 
          id: user._id,
          name: transaction_record.data.charges.data[0].billing_details.name,
          email: transaction_record.data.charges.data[0].billing_details.email,
          phone: transaction_record.data.charges.data[0].billing_details.phone,
        },
        receipt: {
          payment_intent: receipt.payment_intent,
          payment_intent_client_secret: receipt.payment_intent_client_secret,
          redirect_status: receipt.redirect_status,
        },
        orderItems: cartItems,
        shippingAddress: {
          line1: transaction_record.data.charges.data[0].billing_details.address.line1,
          line2: transaction_record.data.charges.data[0].billing_details.address.line2,
          city: transaction_record.data.charges.data[0].billing_details.address.city,
          postal: transaction_record.data.charges.data[0].billing_details.address.postal_code,
          state: transaction_record.data.charges.data[0].billing_details.address.state,
          country: transaction_record.data.charges.data[0].billing_details.address.country,
        },
        paymentMethod: transaction_record.data.payment_method,
        itemsPrice: transaction_record.data.amount,
        shippingPrice: transaction_record.data.amount * 0.08 / 100,
        totalPrice: (transaction_record.data.amount + transaction_record.data.amount * 0.01) / 100,
        isPaid: transaction_record.data.charges.data[0].paid,
      })

      const createOrder = await newOrder.save()
      res.status(201).json(createOrder)
    }
  })
})
);

// GET ALL ORDER
orderRoute.get("/", asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const orders = await Order.find()
  res.json(orders);
})
);

// USER LOGIN ORDERS
orderRoute.get("/", protect, asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const order = await Order.find({ user: req.user._id }).sort

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})
);

// GET ORDER BY ID
orderRoute.get("/:id", protect, asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})
);

// ORDER IS PAID
orderRoute.put("/:id/pay", protect, asyncHandler(async (req, res) => {

  // Log this request
  console.log((new Date()).toISOString(), req.method, req.baseUrl)

  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder);
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})
);

export default orderRoute;
