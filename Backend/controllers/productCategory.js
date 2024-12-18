import ProductCategory from "../models/ProductCategoryModel.js";


export const register = async (req, res) => {
    try {
        const { category, gstRate } = req.body;
        if (!category || !gstRate) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const productCategory = await ProductCategory.findOne({ category });
        if (productCategory) {
            // Corrected condition to check if the user exists
            return res.status(400).json({
                message: "category already exists with this ProductCategory",
                success: false,
            });
        }
        return res.status(201).json({
            message: "ProductCategory created successfully",
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


export const updateProductCategory = async (req, res) => {
    try {
        const { category, gstRate } = req.body;
        const productCatId = req.id;
        let productcat = await ProductCategory.findById(productCatId);
        if (!productcat) {
            return res.status(400).json({
                message: "Product Category not found",
                success: false
            });
        }

        if (category) productcat.category = category;
        if (gstRate) productcat.gstRate = gstRate;

        await productcat.save();

        productcat = {
            _id: productcat._id,
            category: productcat.category,
            gstRate: productcat.gstRate,
        }

        return res.status(200).json({
            message: `Profile updated successfully`,
            productcat,
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const productCatId = req.params.id;
        const productcat = await ProductCategory.findByIdAndDelete({ _id: productCatId });
        if (!productcat) {
            return res.status(400).json({
                message: "Category not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "ProductCategory Deleated!!",
            success: true
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
}


