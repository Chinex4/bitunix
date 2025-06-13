import { Routes, Route, Navigate } from 'react-router-dom';
import TabHeader from '../../components/TabHeader';

import Overview from '../assets/Overview';
import SpotAccount from '../assets/SpotAccount';
import FuturesAccount from '../assets/FuteuresAccount';
import EarnAccount from '../assets/EarnAccount';
import CopyAccount from '../assets/CopyAccount';
import Deposit from '../assets/Deposit';
import Withdraw from '../assets/Withdraw';
import Rewards from '../assets/Rewards';
import SpotTransactions from '../assets/SpotTransactions';
import FuturesTransactions from '../assets/FuturesTransactions';
import EarnTransactions from '../assets/EarnTransactions';
import SyncCryptoToBackend from '../../components/wallets/SyncCryptoToBackend';
import ViewWallets from '../assets/ViewWallets';
// import other components...

const tabs = [
	{ name: 'Asset Overview', path: 'overview' },
	{ name: 'Spot Account', path: 'spot-account' },
	{ name: 'Futures Account', path: 'futures-account' },
	{ name: 'Earn Account', path: 'earn-account' },
	{ name: 'Copy Account', path: 'copy-account' },
	{ name: 'Deposit', path: 'deposit' },
	{ name: 'Withdraw', path: 'withdraw' },
	{ name: 'Spot Transactions', path: 'spot-transactions' },
	{ name: 'Futures Transactions', path: 'futures-transactions' },
	{ name: 'Earn Transactions', path: 'earn-transactions' },
	{ name: 'My Rewards', path: 'rewards' },
];

const AssetsRoutes = () => {
	return (
		<div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row'>
			<SyncCryptoToBackend />
			<TabHeader tabs={tabs} />
			<div className='flex-1 px-4 py-6 max-w-full lg:max-w-6xl lg:mx-auto'>
				<Routes>
					<Route
						path='/'
						element={
							<Navigate
								to='overview'
								replace
							/>
						}
					/>
					<Route
						path='overview'
						element={<Overview />}
					/>
					<Route
						path='spot-account'
						element={<SpotAccount />}
					/>
					<Route
						path='futures-account'
						element={<FuturesAccount />}
					/>
					<Route
						path='earn-account'
						element={<EarnAccount />}
					/>
					<Route
						path='copy-account'
						element={<CopyAccount />}
					/>
					<Route
						path='deposit'
						element={<Deposit />}
					/>
					<Route
						path='withdraw'
						element={<Withdraw />}
					/>
					<Route
						path='view-wallets'
						element={<ViewWallets />}
					/>
					<Route
						path='spot-transactions'
						element={<SpotTransactions />}
					/>
					<Route
						path='futures-transactions'
						element={<FuturesTransactions />}
					/>
					<Route
						path='earn-transactions'
						element={<EarnTransactions />}
					/>
					{/* <Route
						path='transaction-history'
						element={<div>Transaction History Page</div>}
					/> */}
					<Route
						path='rewards'
						element={<Rewards />}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default AssetsRoutes;
