import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/mongodb.js";
import ImportData from "./DataImport.js";
import productRoute from "./routes/ProductRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use( cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true, exposedHeaders: ['set-cookie'] }) );

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/users", userRoute);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running on port ${PORT}...`));

