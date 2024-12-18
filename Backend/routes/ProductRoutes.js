import express from "express";
import { registerProduct, getProductId, getAllProducts, deleateProduct, updateProfile } from "../controllers/productController.js"

const router = express.Router();



router.route("/").post(registerProduct);
router.route("/get/:id").get(getProductId);
router.route("/getall").get(getAllProducts);
router.route("/update/:id").put(updateProfile);
router.route("/deleate/:id").delete(deleateProduct);


export default router;