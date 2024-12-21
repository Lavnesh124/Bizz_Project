import express from "express";
import { registerCustomer, getCustomerId, updateCustomer, deleteCustomer, getAllCustomers } from "../controllers/customerController.js"



const router = express.Router();



router.route("/").post(registerCustomer);
router.route("/getall").get(getAllCustomers);
router.route("/get/:id").get(getCustomerId);
router.route("/update/:id").put(updateCustomer);
router.route("/deleate/:id").delete(deleteCustomer);


export default router;