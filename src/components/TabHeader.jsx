import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
	{ name: 'Asset Overview', path: 'overview' },
	{ name: 'Spot Account', path: 'spot-account' },
	{ name: 'Futures Account', path: 'futures-account' },
	{ name: 'Earn Account', path: 'earn-account' },
	{ name: 'Copy Account', path: 'copy-account' },
	{ name: 'Deposit', path: 'deposit' },
	{ name: 'Withdraw', path: 'withdraw' },
	{ name: 'Transaction History', path: 'transaction-history' },
	{ name: 'My Rewards', path: 'rewards' },
];

const TabHeader = () => {
	const { pathname } = useLocation();

	return (
		<>
			{/* Mobile Scrollable Tabs */}
			<div className='block lg:hidden'>
				<div className='flex whitespace-nowrap gap-2 overflow-x-auto hide-scrollbar mb-6'>
					{tabs.map(({ name, path }) => {
						const isActive = pathname === `/assets/${path}`;
						return (
							<NavLink
								to={`/assets/${path}`}
								key={path}
								className={`px-4 py-1.5 rounded-full text-sm border whitespace-nowrap flex items-center ${
									isActive
										? 'bg-lime-400 text-black border-lime-400'
										: 'bg-[#1A1A1A] text-white border-[#333]'
								}`}>
								{name}
							</NavLink>
						);
					})}
				</div>
			</div>

			{/* Desktop Sidebar Tabs */}
			<aside className='hidden lg:flex flex-col w-60 shrink-0 pr-6 border-r border-[#333] pt-4'>
				{tabs.map(({ name, path }) => {
					const isActive = pathname === `/assets/${path}`;
					return (
						<NavLink
							to={`/assets/${path}`}
							key={path}
							className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md mb-1 ${
								isActive
									? 'bg-lime-400 text-black font-semibold'
									: 'text-white hover:bg-[#222]'
							}`}>
							{name}
						</NavLink>
					);
				})}
			</aside>
		</>
	);
};

export default TabHeader;
