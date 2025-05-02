import { Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/desktop/Home';
import Layout from './layout/Layout';
import { useMediaQuery } from 'react-responsive';
import MobileHome from './pages/mobile/MobileHome';
import PurchaseCryptoPage from './pages/mobile/PurchaseCryptoPage';
import MarketsPage from './pages/mobile/MarketsPage';
import ContractTradePage from './pages/mobile/ContractTradePage';
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

function App() {
	const isMobile = useMediaQuery({ maxWidth: 767 });
	return (
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
					path='/contract-trade/BTC-USDT'
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
			</Route>
			{/* More routes can be added here later */}
		</Routes>
	);
}

export default App;
