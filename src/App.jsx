import { Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/desktop/Home';
import Layout from './layout/Layout';
import { useMediaQuery } from 'react-responsive';
import MobileHome from './pages/mobile/MobileHome';
import PurchaseCryptoPage from './pages/mobile/PurchaseCryptoPage';
import MarketsPage from './pages/mobile/MarketsPage';
import ContractTradePage from './pages/desktop/ContractTradePage';
import P2PTrading from './pages/desktop/P2PTrading';
import Opportunities from './pages/desktop/Opportunities';
import FlashExchange from './pages/desktop/FlashExchange';
import Earn from './pages/desktop/Earn';
import CopyTradingPage from './pages/desktop/CopyTradingPage';
import CampaignCenterPage from './pages/desktop/CampaignCenterPage';
import TaskCenterPage from './pages/desktop/TaskCenterPage';
import ReferralPage from './pages/desktop/ReferralPage';
import Login from './pages/desktop/Login';
import Signup from './pages/desktop/Signup';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import AssetsRoutes from './pages/mobile/AssetsRoutes';
import AccountRoutes from './pages/mobile/AccountRoutes';
import ForgotPassword from './pages/desktop/ForgotPassword';
import ResetPassword from './pages/desktop/ResetPassword';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserFromToken } from './redux/auth/authSlice';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import OrdersRoutes from './pages/mobile/OrdersRoutes';
import VipService from './pages/desktop/VipService';

function App() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	const dispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(setUserFromToken(token));
		}
	}, [dispatch]);
	return (
		<>
			<ScrollToTop />
			<Toaster />
			<Routes>
				<Route
					path='/'
					element={<Layout />}>
					<Route
						index
						element={isMobile ? <MobileHome /> : <Home />}
					/>
					<Route
						path='/trade/third-party'
						element={<PurchaseCryptoPage />}
					/>
					<Route
						path='/markets'
						element={<MarketsPage />}
					/>
					<Route
						path='/contract-trade/:symbol'
						element={<ContractTradePage />}
					/>
					<Route
						path='/p2p/p2p-trading'
						element={<P2PTrading />}
					/>
					<Route
						path='/markets/opportunities'
						element={<Opportunities />}
					/>
					<Route
						path='/flash-exchange'
						element={<FlashExchange />}
					/>
					<Route
						path='/earn/financial-management'
						element={<Earn />}
					/>
					<Route
						path='/copy-trading/square'
						element={<CopyTradingPage />}
					/>
					<Route
						path='/activity/act-center'
						element={<CampaignCenterPage />}
					/>
					<Route
						path='/activity/task-center'
						element={<TaskCenterPage />}
					/>
					<Route
						path='/referral'
						element={<ReferralPage />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Signup />}
					/>
					<Route
						path='/forgot-password'
						element={<ForgotPassword />}
					/>
					<Route
						path='/reset-password/:token'
						element={<ResetPassword />}
					/>
					<Route element={<PrivateRoute />}>
						<Route
							path='/assets/*'
							element={<AssetsRoutes />}
						/>

						<Route
							path='/account/*'
							element={<AccountRoutes />}
						/>
					</Route>
					<Route
						path='/orders/*'
						element={<OrdersRoutes />}
					/>
					<Route
						path='/service/vipservice'
						element={<VipService />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
				</Route>
				{/* More routes can be added here later */}
			</Routes>
		</>
	);
}

export default App;
