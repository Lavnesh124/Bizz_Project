import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    InvoiceNumber: {
        type: Number,
        required: true,
    },
    productDetails: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },],
    },
    InvoiceAmount: {
        type: Number,
    },
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;
