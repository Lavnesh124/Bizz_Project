import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    gstRate: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
export default ProductCategory;