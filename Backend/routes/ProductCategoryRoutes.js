import express from "express";
import { register, updateProductCategory, deleteProduct } from "../controllers/productCategory.js"

const router = express.Router();


router.route("/post").post(register);
router.route("/update/:id").get(updateProductCategory);
router.route("/delete/:id").delete(deleteProduct);


export default router;