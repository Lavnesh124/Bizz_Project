import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import InvoicePage from "./pages/InvoicePage";

import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";

function App() {
	const isLoginPage = window.location.pathname.includes('/login');
	const isSigninPage = window.location.pathname.includes('/signin');

	// const isSidebarVisible1 = window.location.pathname.includes('/signin');

	return (
		<div className='flex h-screen  text-gray-100 overflow-hidden'>

			{!(isLoginPage || isSigninPage) ? <Sidebar /> : ""}
			{/* {!isSidebarVisible1 ? <Sidebar /> : ""} */}

			<Routes>
				<Route path='/login' element={<RegisterPage />} />
				<Route path='/signin' element={<SignInPage />} />
				<Route path='/' element={<OverviewPage />} />
				<Route path='/overview' element={<OverviewPage />} />
				<Route path='/invoice' element={<InvoicePage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />

			</Routes>
		</div>
	);
}

export default App;
