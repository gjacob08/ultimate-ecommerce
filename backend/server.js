import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/mongodb.js";
import ImportData from "./DataImport.js";
import productRoute from "./routes/ProductRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import dashboardRoute from "./routes/dashboardRoutes.js"
import { errorHandler, notFound } from "./Middleware/Errors.js";
import bodyParser from "body-parser";
import cors from "cors";
import Stripe from 'stripe';

dotenv.config();
connectDb();

const stripe = new Stripe("sk_test_51LFHRvLxfwPetDmzhRnx0GCzFdTO12cww4b8VAOJZeoxndIdngaHzFKAIGmq2EOPhEtwa7bL84CR39ocVqpxtW8a00C0c92ncs");  
const app = express();



app.use(express.json());
app.use( cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true, exposedHeaders: ['set-cookie'] }) );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(bodyParser.json())

// CALCULATE TOTAL PRICE TO PAY
const calculateOrderAmount = ( items ) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 2800;
};

// STRIPE API
app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
});

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);
app.use("/api/transfers", dashboardRoute);



// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running on port ${PORT}...`));


