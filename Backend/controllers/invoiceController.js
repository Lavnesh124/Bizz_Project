import Invoice from "../models/InvoicesModel.js";

export const registerInvoices = async (req, res) => {
    try {
        const { name, type, unitOfMeasurement, quantity } = req.body;
        if (!name || !type || !unitOfMeasurement || !quantity) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await Invoice.findOne({ name });
        if (user) {
            // Corrected condition to check if the user exists
            return res.status(400).json({
                message: "Invoice already exists with this email",
                success: false,
            });
        }
        return res.status(201).json({
            message: "Product created successfully",
            success: true
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const getInvoices = async (req, res) => {
    try {

        const invoices = await Invoice.find();


        if (!invoices || invoices.length === 0) {
            return res.status(404).json({
                message: "No invoices found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Invoices fetched successfully",
            success: true,
            data: invoices
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}

export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: "Invoice ID is required",
                success: false
            });
        }

        const invoice = await Invoice.findById(id);

        if (!invoice) {
            return res.status(404).json({
                message: `Invoice with ID ${id} not found`,
                success: false
            });
        }
        return res.status(200).json({
            message: "Invoice fetched successfully",
            success: true,
            data: invoice
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


