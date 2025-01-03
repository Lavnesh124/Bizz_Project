import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "./routes/ProductRoutes.js";
import User from "./routes/UserRoutes.js";
import ProductCategory from "./routes/ProductCategoryRoutes.js";
import cors from "cors";
import Customer from "./routes/CustomerRoutes.js"
import Invoice from "./routes/InvoiceRoutes.js";





dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
}));


app.use(express.urlencoded({ extended: true }));
connectDB();

const PORT = 8088;
app.use("/api/v1/product", Product);
app.use("/api/v1/productCategory", ProductCategory);
app.use("/api/v1/customer", Customer);
app.use('/api/v1/user', User)
app.use('/api/v1/invoice', Invoice)


app.listen(PORT, () => {
    console.log("server running");
});