import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiP2pFill } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import { TbTargetArrow } from 'react-icons/tb';
import {
	MdOutlineCurrencyExchange,
	MdScreenSearchDesktop,
} from 'react-icons/md';
import { GiTargeting } from 'react-icons/gi';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);
	const [isAuthenticated] = useState(false); // toggle this for testing

	const navLinks = [
		{
			name: 'Buy Crypto',
			dropdown: true,
			dropdownItems: [
				{
					text: 'P2P Trading',
					path: '/p2p/p2p-trading',
					icon: <RiP2pFill size={20} />,
				},
				{
					text: 'Third Party',
					path: '/trade/third-party',
					icon: <BsWallet size={20} />,
				},
			],
		},
		{
			name: 'Markets',
			dropdown: true,
			dropdownItems: [
				{
					text: 'Opportunities',
					path: '/markets/opportunities',
					icon: <TbTargetArrow size={20} />,
				},
				{
					text: 'Marketplace',
					path: '/marketplace',
					icon: <MdScreenSearchDesktop size={20} />,
				},
			],
		},
		{ name: 'Futures', path: '/contract-trade/BTC-USDT', dropdown: false },
		{
			name: 'Spot',
			dropdown: true,
			dropdownItems: [
				{ text: 'Spot', path: '/spot', icon: <GiTargeting size={20} /> },
				{
					text: 'Convert',
					path: '/flash-exchange',
					icon: <MdOutlineCurrencyExchange size={20} />,
				},
			],
		},
		{
			name: 'Earn',
			dropdown: true,
			dropdownItems: [
				{
					text: 'Flexible/Fixed Term',
					path: '/earn/financial-management',
					icon: <MdOutlineCurrencyExchange size={20} />,
				},
			],
			badge: 'NEW',
		},
		{ name: 'Copy Trading', path: '/copy-trading/square' },
		{ name: 'Campaign Center', path: '/activity/act-center', badge: 'NEW' },
		{ name: 'Task Center', path: '/activity/task-center', badge: 'NEW' },
		{ name: 'Referral', path: '/referral' },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 flex items-center justify-between border-b border-white/10'>
			{/* Left */}
			<div className='flex items-center gap-4'>
				<Link
					to='/'
					className='text-lime-400 font-bold text-xl italic flex items-center gap-1'>
					<div className='bg-lime-400 rounded-full p-1'></div> Bitunix
				</Link>
				<div className='hidden lg:flex items-center gap-4'>
					{navLinks.map((link, index) => (
						<div
							className='dropdown dropdown-hover'
							key={index}>
							<div className='relative'>
								{link.dropdown ? (
									<button className='btn btn-ghost btn-sm rounded-btn flex items-center gap-1'>
										{link.name}
										<ChevronDown size={16} />
										{link.badge && (
											<span className='bg-lime-400 absolute -top-2 -right-3 text-black text-[8px] px-1 py-0.5 rounded'>
												{link.badge}
											</span>
										)}
									</button>
								) : (
									<Link
										to={link.path}
										className='btn btn-ghost btn-sm rounded-btn relative flex items-center gap-1'>
										{link.name}
										{link.badge && (
											<span className='bg-lime-400 absolute -top-2 -right-3 text-black text-[8px] px-1 py-0.5 rounded'>
												{link.badge}
											</span>
										)}
									</Link>
								)}
							</div>
							{link.dropdown && (
								<ul className='dropdown-content gap-5 menu px-4 py-6 rounded-lg shadow bg-stone-900 text-white w-52'>
									{link.dropdownItems.map((item) => (
										<Link
											key={item.path}
											to={item.path}
											className='flex gap-3 items-center'>
											<span className='text-lime-400'>{item.icon}</span>
											<span>{item.text}</span>
										</Link>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Right */}
			<div className='flex items-center gap-4'>
				{isAuthenticated ? (
					<>
						{/* Assets Icon */}
						<div className='hidden md:block dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-sm'>
								<img
									src='/wallet.png'
									alt='Assets'
									className='w-6 h-6 rounded-full'
								/>
							</div>
							<ul className='dropdown-content p-4 space-y-4 shadow border rounded-md border-stone-800 bg-[#000000] text-white rounded-box w-64'>
								<li className='hover:bg-stone-800 px-4 py-3'>
									<Link to='/assets/overview'>
										<p className='text-sm font-semibold'>Total Assets</p>
										<p className='text-xl mb-2'>0 USDT</p>
									</Link>
								</li>
								<li>
									<Link to={'/activity/act-center'} className='btn btn-sm w-full mb-2'>
										Campaign Center
									</Link>
									<Link to={'/activity/task-center'}  className='btn btn-sm w-full mb-2'>Task Center</Link>
								</li>
								<li>
									<Link to='/assets/spot-account'>Spot Account</Link>
								</li>
								<li>
									<Link to='/assets/futures-account'>Futures Account</Link>
								</li>
								<li>
									<Link to='/assets/earn-account'>Earn Account</Link>
								</li>
								<li>
									<Link to='/assets/copy-account'>Copy Account</Link>
								</li>
								{/* <li>
									<Link to='/assets/transaction-history'>
										Transaction History
									</Link>
								</li> */}
							</ul>
						</div>

						{/* User Icon */}
						<div className='md:block dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-sm'>
								<img
									src='/user-icon.svg'
									alt='User'
									className='w-6 h-6 rounded-full'
								/>
							</div>
							<ul className='dropdown-content space-y-4 p-4 border rounded-md border-stone-800 bg-[#000000] shadow text-white rounded-box w-64'>
								<li className='flex gap-4 items-center'>
									<div>
										<img
											src='/user-icon.svg'
											alt='user'
											className='size-8 rounded-full'
										/>
									</div>
									<div className='space-y-2'>
										<p className='text-sm font-medium mb-1'>
											off****@gmail.com
										</p>
										<p className='text-[10px] mb-3'>UID 952644127</p>
									</div>
								</li>
								<li>
									<Link to='/assets/rewards'>My Rewards</Link>
								</li>
								<li>
									<Link to='/security'>Security</Link>
								</li>
								<li>
									<Link to='/kyc'>KYC</Link>
								</li>
								<li>
									<Link to='/referral'>Referral Hub</Link>
								</li>
								<li>
									<Link to='/settings'>Settings</Link>
								</li>
								{/* <li>
									<Link to='/api'>API</Link>
								</li> */}
								<li>
									<button className='text-red-400'>Log out</button>
								</li>
							</ul>
						</div>
						{/* User Icon */}
						<div className='md:hidden'>
							<div
								tabIndex={0}
								role='button'
								onClick={() => setIsUserOpen(true)}
								className='btn btn-ghost btn-sm'>
								<img
									src='/user-icon.svg'
									alt='User'
									className='w-6 h-6 rounded-full'
								/>
							</div>
						</div>
					</>
				) : (
					<>
						<Link
							to='/login'
							className='hidden lg:block'>
							Log in
						</Link>
						<Link
							to='/register'
							className='px-6 py-2 rounded-md hover:bg-lime-300 transition-colors bg-lime-400 text-black'>
							Sign Up
						</Link>
					</>
				)}

				<button
					className='lg:hidden'
					onClick={() => setIsOpen(true)}>
					<Menu size={24} />
				</button>
			</div>

			{/* Mobile Drawer */}
			{isUserOpen && isAuthenticated && (
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					className='fixed top-0 right-0 h-full w-full md:w-72 bg-black text-white p-4 z-50 lg:hidden'>
					<div className='flex justify-between items-center mb-6'>
						<Link
							to='/'
							className='text-lime-400 font-bold text-xl italic flex items-center gap-1'>
							<div className='bg-lime-400 rounded-full p-1'></div> Bitunix
						</Link>
						<button onClick={() => setIsUserOpen(false)}>
							<X size={24} />
						</button>
					</div>
					{isAuthenticated && (
						<ul className='flex flex-col gap-4'>
							<li className='font-medium'>off****@gmail.com</li>
							<li>UID 952644127</li>
							<li>
								<Link to='/assets/rewards'>My Rewards</Link>
							</li>
							<li>
								<Link to='/security'>Security</Link>
							</li>
							<li>
								<Link to='/kyc'>KYC</Link>
							</li>
							<li>
								<Link to='/referral'>Referral Hub</Link>
							</li>
							<li>
								<Link to='/settings'>Settings</Link>
							</li>
							<li>
								<Link to='/api'>API</Link>
							</li>
							<li>
								<button className='text-red-400'>Log out</button>
							</li>
						</ul>
					)}
				</motion.div>
			)}
			{/* Mobile Drawer */}
			{isOpen && (
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					className='fixed top-0 right-0 h-full w-full md:w-72 bg-black text-white p-4 z-50 lg:hidden'>
					<div className='flex justify-between items-center mb-6'>
						<Link
							to='/'
							className='text-lime-400 font-bold text-xl italic flex items-center gap-1'>
							<div className='bg-lime-400 rounded-full p-1'></div> Bitunix
						</Link>
						<button onClick={() => setIsOpen(false)}>
							<X size={24} />
						</button>
					</div>

					<ul className='flex flex-col gap-4'>
						{navLinks.map((link) =>
							link.dropdown && link.dropdownItems ? (
								link.dropdownItems.map((item) => (
									<li key={item.path}>
										<Link
											to={item.path}
											onClick={() => setIsOpen(false)}>
											{item.text}
										</Link>
									</li>
								))
							) : link.path ? (
								<li key={link.name}>
									<Link
										to={link.path}
										onClick={() => setIsOpen(false)}>
										{link.name}
									</Link>
								</li>
							) : null
						)}
					</ul>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;
