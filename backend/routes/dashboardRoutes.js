import express from "express";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";

const dashboardRoute = express.Router();

// CONNECT STRIPE DASHBOARD AND CLIENT DASHBOARD
dashboardRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const transfers = await Stripe.paymentIntent({
      limit: 3,
    });
    res.json(transfers);
  })
);

export default dashboardRoute;