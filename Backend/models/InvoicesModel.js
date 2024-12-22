import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
    {
        InvoiceNumber: {
            type: Number,
            required: true,
        },
        productDetails: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                ProductQuantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        customerDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
        InvoiceAmount: {
            type: Number,
        },
        DateofIssue: {
            type: String,
        },
        subTotal: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;
