import mongoose from "mongoose";


const CustomerSchema = new mongoose.Schema({
    BusinessName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    gstNumber: {
        type: Number,
        required: true,
    },
    BillingAddress: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
