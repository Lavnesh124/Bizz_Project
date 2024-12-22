import express from "express";
import { registerInvoice, getAllInvoices, getInvoiceById, deleteInvoiceById, updateInvoiceById } from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/register", registerInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleteInvoiceById);
router.put("/:id", updateInvoiceById);

export default router;
