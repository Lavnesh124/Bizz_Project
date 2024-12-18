import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import InvoiceForm from "../components/Invoice/InvoiceForm"
import Sidebar from "../components/common/Sidebar";

const InvoicePage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto bg-gray-900'>
			
			<Header title={"Invoice"} />
			<main className='max-w-10xl mx-auto py-6 px-4 lg:px-8'>
				<InvoiceForm />
			</main>
		</div>
	);
};
export default InvoicePage;
