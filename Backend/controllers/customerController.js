import Customer from "../models/CustomerModel.js";


// Register a new customer
export const registerCustomer = async (req, res) => {
    try {
        const { BusinessName, email, mobileNumber, gstNumber, BillingAddress } = req.body;

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        // Create a new customer
        const newCustomer = new Customer({
            BusinessName,
            email,
            mobileNumber,
            gstNumber,
            BillingAddress,
        });

        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer by ID
export const getCustomerId = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update customer by ID
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete customer by ID
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find(); // Retrieve all customers
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
