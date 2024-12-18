import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Product from "./routes/ProductRoutes.js";
import User from "./routes/UserRoutes.js";
import ProductCategory from "./routes/ProductCategoryRoutes.js";



dotenv.config();

const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
connectDB();

const PORT = 8088;
app.use("/api/v1/product", Product);
app.use("/api/v1/productCategory", ProductCategory);


app.use('/api/v1/user', User)


app.listen(PORT, () => {
    console.log("server running");
});