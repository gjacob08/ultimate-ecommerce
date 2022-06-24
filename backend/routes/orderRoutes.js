import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";

const orderRoute = express.Router();

//LOGIN
orderRoute.post(
    "/",
    asyncHandler(async (req, res) => {
      const { orderItems, shippingAddress, payment} = req.body;
  
    })
  );