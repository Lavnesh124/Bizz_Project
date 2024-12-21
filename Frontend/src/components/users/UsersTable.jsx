import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from 'axios'

const userData = [
	{ id: 1, name: "Abhishek", email: "abhi@example.com", Mobile: 7459986158, status: "Active" },
	{ id: 2, name: "Ashwani aggrawal", email: "Ashwani@example.com", Mobile: 8456838383, status: "Active" },
	{ id: 3, name: "Aditya", email: "Aditya@example.com", Mobile: 7459986158, status: "Inactive" },
	{ id: 4, name: "Harsh singh", email: "alice@example.com", Mobile: 8456838383, status: "Active" },
	{ id: 5, name: "Rahul", email: "charlie@example.com", Mobile: 8456838383, status: "Active" },
];

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [customerData, setCustomerData] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState(customerData);



	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/customer/getall`);
				if (response.status == 200) {
					setCustomerData(response.data);
					console.log(response.data);
					setFilteredUsers(response.data);
				} // Initialize filtered users
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};
		fetchData();
	}, []);

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = customerData.filter(
			(user) =>
				user.BusinessName?.toLowerCase().includes(term) ||
				String(user.mobileNumber).includes(term)
		);
		setFilteredUsers(filtered);
	};


	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Users</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search users...'
						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Name
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Email
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Mobile
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								GST
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-700'>
						{filteredUsers.map((customerData, index) => (
							<motion.tr
								key={customerData.id || index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-10 w-10'>
											<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
												{customerData.BusinessName.charAt(0)}
											</div>
										</div>
										<div className='ml-4'>
											<div className='text-sm font-medium text-gray-100'>{customerData.BusinessName}</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{customerData.email}</div>
								</td>
								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{customerData.mobileNumber}</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-sm text-gray-300'>{customerData.gstNumber}</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
									<button className='text-indigo-400 hover:text-indigo-300 mr-2'>Edit</button>
									<button className='text-red-400 hover:text-red-300'>Delete</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default UsersTable;
