import mongoose from "mongoose";

gstNumber, companyName, billingAddress, state, pincode

const BillingConfigurationSchema = new mongoose.Schema({
    gstNumber: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    billingAddress: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const BillingConfiguration = mongoose.model('BillingConfiguration', BillingConfigurationSchema);
export default BillingConfiguration;
