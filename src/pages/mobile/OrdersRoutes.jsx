import { Routes, Route, Navigate } from 'react-router-dom';
import TabHeader from '../../components/TabHeader';
import FutureOrders from '../orders/FutureOrders';
import OrdersTabHeader from '../../components/OrdersTabHeader';
import SpotOrders from '../orders/SpotOrders';
import ConversionRecords from '../orders/ConversionRecords';
import DualInvestments from '../orders/DualInvestments';
import FiatTransactions from '../orders/ThirdPartyOrders';
import P2POrders from '../orders/P2POrders';

// import other components...

const tabs = [
	{ name: 'Future Orders', path: 'future-orders' },
	{ name: 'Spot Orders', path: 'spot-orders' },
	{ name: 'Third-party Orders', path: 'third-party-orders' },
	{ name: 'Conversion Records', path: 'conversion-records' },
	{ name: 'P2P Orders', path: 'p2p-orders' },
	{ name: 'Earn History', path: 'earn-history' },
];

const OrdersRoutes = () => {
	return (
		<div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row'>
			{/* <TabHeader tabs={tabs} /> */}
            <OrdersTabHeader tabs={tabs}/>
			<div className='flex-1 px-4 py-6 max-w-full lg:max-w-6xl lg:mx-auto'>
				<Routes>
					<Route
						path='/'
						element={
							<Navigate
								to='future-orders'
								replace
							/>
						}
					/>
					<Route
						path='future-orders'
						element={<FutureOrders />}
					/>
					<Route
						path='spot-orders'
						element={<SpotOrders />}
					/>
					<Route
						path='conversion-records'
						element={<ConversionRecords />}
					/>
					<Route
						path='earn-history'
						element={<DualInvestments />}
					/>
					<Route
						path='third-party-orders'
						element={<FiatTransactions />}
					/>
					<Route
						path='p2p-orders'
						element={<P2POrders />}
					/>
					
				</Routes>
			</div>
		</div>
	);
};

export default OrdersRoutes;
