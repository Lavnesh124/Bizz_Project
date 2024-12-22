import Invoice from "../models/InvoicesModel.js"; // Adjust the path as necessary
import Customer from "../models/CustomerModel.js"; // Ensure you have access to the Customer model for validation
import Product from "../models/ProductModel.js"; // Ensure you have access to the Product model for validation

export const registerInvoice = async (req, res) => {
    try {
        const { InvoiceNumber, productDetails, customerDetails, InvoiceAmount, DateofIssue, subTotal } = req.body;

        // Check if invoice already exists
        const existingInvoice = await Invoice.findOne({ InvoiceNumber });
        if (existingInvoice) {
            return res.status(400).json({ message: "Invoice already exists" });
        }

        // Validate customer existence
        const customer = await Customer.findById(customerDetails);
        if (!customer) {
            return res.status(400).json({ message: "Customer not found" });
        }

        // Validate products and quantities
        for (const item of productDetails) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(400).json({ message: `Product with ID ${item.product} not found` });
            }
            if (!item.ProductQuantity || item.ProductQuantity <= 0) {
                return res.status(400).json({ message: "Invalid product quantity" });
            }
        }

        // Create a new invoice
        const newInvoice = new Invoice({
            InvoiceNumber,
            productDetails,
            customerDetails,
            InvoiceAmount,
            DateofIssue,
            subTotal,
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("customerDetails", "BusinessName email") // Adjust fields as needed
            .populate("productDetails.product", "name price"); // Adjust fields as needed
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id)
            .populate("customerDetails", "BusinessName email")
            .populate("productDetails.product", "name price");

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(id);

        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const { InvoiceNumber, productDetails, customerDetails, InvoiceAmount, DateofIssue, subTotal } = req.body;

        // Validate customer existence if updated
        if (customerDetails) {
            const customer = await Customer.findById(customerDetails);
            if (!customer) {
                return res.status(400).json({ message: "Customer not found" });
            }
        }

        // Validate products and quantities if updated
        if (productDetails) {
            for (const item of productDetails) {
                const product = await Product.findById(item.product);
                if (!product) {
                    return res.status(400).json({ message: `Product with ID ${item.product} not found` });
                }
                if (!item.ProductQuantity || item.ProductQuantity <= 0) {
                    return res.status(400).json({ message: "Invalid product quantity" });
                }
            }
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            { InvoiceNumber, productDetails, customerDetails, InvoiceAmount, DateofIssue, subTotal },
            { new: true }
        )
            .populate("customerDetails", "BusinessName email")
            .populate("productDetails.product", "name price");

        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
