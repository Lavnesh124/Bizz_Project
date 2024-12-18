import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";

const PRODUCT_DATA = [
	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState(PRODUCT_DATA); // Use state to store products
	const [isAddingProduct, setIsAddingProduct] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "",
		price: "",
		stock: "",
		sales: "",
	});

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const handleAddProductToggle = () => {
		setIsAddingProduct(!isAddingProduct);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddProduct = () => {
		const newProductData = {
			...newProduct,
			id: products.length + 1,
			price: parseFloat(newProduct.price) || 0,
			stock: parseInt(newProduct.stock) || 0,
			sales: parseInt(newProduct.sales) || 0,
		};
		setProducts((prevProducts) => [...prevProducts, newProductData]); // Update state
		setNewProduct({
			name: "",
			category: "",
			price: "",
			stock: "",
			sales: "",
		});
		setIsAddingProduct(false);
	};

	// Filter products based on the search term
	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm) ||
			product.category.toLowerCase().includes(searchTerm)
	);
    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    {/* Add Product Button */}
                    <button
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
                        onClick={handleAddProductToggle}
                    >
                        Add Product
                    </button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
            </div>

            {/* Add Product Form */}
            {isAddingProduct && (
                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold text-gray-100">Add New Product</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            placeholder="Sales"
                            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
                            name="sales"
                            value={newProduct.sales}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Sales
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredProducts.map((product) => (
                            <motion.tr
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                    <img
                                        src="https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lyZWxlc3MlMjBlYXJidWRzfGVufDB8fDB8fHww"
                                        alt="Product img"
                                        className="size-10 rounded-full"
                                    />
                                    {product.name}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    {product.category}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.sales}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                                        <Edit size={18} />
                                    </button>
                                    <button className="text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ProductsTable;
