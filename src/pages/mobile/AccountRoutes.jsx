import { Routes, Route, Navigate } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';

import Security from '../account/Security';
import IdentityVerification from '../account/IdentiyVerification';
import Settings from '../account/Settings';

// import other components...

const AccountRoutes = () => {
	return (
		<div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row'>
			<AccountHeader />
			<div className='flex-1 px-4 py-6 max-w-full lg:max-w-6xl lg:mx-auto'>
				<Routes>
					<Route
						path='/'
						element={
							<Navigate
								to='security'
								replace
							/>
						}
					/>
					<Route
						path='security'
						element={<Security />}
					/>
					<Route
						path='identity-verification'
						element={<IdentityVerification />}
					/>
					<Route
						path='settings'
						element={<Settings />}
					/>
					
				</Routes>
			</div>
		</div>
	);
};

export default AccountRoutes;
