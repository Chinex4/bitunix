import { Routes, Route, Navigate } from 'react-router-dom';
import TabHeader from '../../components/TabHeader';

import Overview from '../assets/Overview';
import SpotAccount from '../assets/SpotAccount';
import FuturesAccount from '../assets/FuteuresAccount';
import EarnAccount from '../assets/EarnAccount';
import CopyAccount from '../assets/CopyAccount';
import Deposit from '../assets/Deposit';
// import other components...

const AssetsRoutes = () => {
	return (
		<div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row'>
			<TabHeader />
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
						element={<div>Withdraw Page</div>}
					/>
					<Route
						path='transaction-history'
						element={<div>Transaction History Page</div>}
					/>
					<Route
						path='rewards'
						element={<div>Rewards Page</div>}
					/>
				</Routes>
			</div>
		</div>
	);
};

export default AssetsRoutes;
