import Product from "../models/ProductModel.js";



export const registerProduct = async (req, res) => {
    try {
        const { ProductName, unitOfMeasurement, quantity, cost } = req.body;
        if (!ProductName || !unitOfMeasurement || !quantity || !cost) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await Product.findOne({ ProductName });
        if (user) {
            // Corrected condition to check if the user exists
            return res.status(400).json({
                message: "User already exists with this email",
                success: false,
            });
        }
        const newProduct = new Product({
            ProductName,
            unitOfMeasurement,
            quantity,
            cost,
        });

        // Save the product to the database
        await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product: newProduct,
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

export const getProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById({ _id: productId });
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        return res.status(200).json({
            product,
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


export const getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).json({
                message: "No products found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export const deleateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete({ _id: productId });
        if (!product) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Product Deleated!!",
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

//later
export const updateProfile = async (req, res) => {
    try {
        const { ProductName, unitOfMeasurement, quantity, cost } = req.body;
        const productId = req.id;
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({
                message: "Product not found",
                success: false
            });
        }

        if (ProductName) product.name = ProductName;
        if (cost) product.cost = cost;
        if (unitOfMeasurement) product.unitOfMeasurement = unitOfMeasurement;
        if (quantity) product.quantity = quantity;

        await product.save();

        product = {
            _id: product._id,
            ProductName: product.ProductName,
            cost: product.cost,
            unitOfMeasurement: product.unitOfMeasurement,
            quantity: product.quantity,
        }

        return res.status(200).json({
            message: `Profile updated successfully`,
            product,
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
