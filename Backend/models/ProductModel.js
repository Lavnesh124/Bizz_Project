import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    unitOfMeasurement: {
        type: String,
        enum: ['pcs', 'box'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
    },
    cost: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;