import BillingConfiguration from "../models/billingConfiguration.js";

export const registerBillCongig = async (req, res) => {
    try {
        const { gstNumber, companyName, billingAddress, state, pincode } = req.body;
        if (!gstNumber || !companyName || !billingAddress || !state || !pincode) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const billing = await BillingConfiguration.findOne({ gstNumber });
        if (billing) {
            // Corrected condition to check if the user exists
            return res.status(400).json({
                message: " already exists with this gstNumber",
                success: false,
            });
        }
        return res.status(201).json({
            message: "BillingConfig created successfully",
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