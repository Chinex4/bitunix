import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RiP2pFill } from 'react-icons/ri';
import { BsWallet } from 'react-icons/bs';
import { TbTargetArrow } from 'react-icons/tb';
import { Eye, EyeOff } from 'lucide-react';
import {
	MdOutlineCurrencyExchange,
	MdScreenSearchDesktop,
} from 'react-icons/md';
import { Bell } from 'lucide-react'; // or any other bell icon
import { GiTargeting } from 'react-icons/gi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice'; // ✅ Update path as needed
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Select,
} from '@headlessui/react';
import UserDropdown from './navbar/UserDropdown';
import SearchBar from './navbar/SearchBar';
import SearchModal from './navbar/SearchModal';
import QrDropdown from './navbar/QrDropdown';
import LanguageCurrencyDropdown from './navbar/LanguageCurrencyDropdown';

const Navbar = () => {
	const [notifications] = useState([
		{
			id: 1,
			type: 'New Listings',
			title: '🔥 Civic (CVC) Gets Listed on Bitunix!',
			content:
				'The CVC/USDT trading pair will be available on both the spot and perpetual futures markets…',
			date: '2025-05-16 10:32:30',
		},
		{
			id: 2,
			type: 'Latest',
			title: 'Notice on Adjustment to Risk Limits of BABY/USDT Perpetual…',
			content:
				'Bitunix will update the risk limits for BABY/USDT perpetual futures trading pair at 10:00 on May 16, 2025 (UTC). This applies to all open and new positions…',
			date: '2025-05-16 08:58:55',
		},
		{
			id: 3,
			type: 'New Listings',
			title: '🚀 NEXPACE (NXPC) Gets Listed on Bitunix!',
			content:
				'The NXPC/USDT trading pair will be available on both the spot and perpetual futures markets…',
			date: '2025-05-15 08:54:55',
		},
		{
			id: 4,
			type: 'New Listings',
			title: '📢 Privasea AI (PRAI) Gets Listed on Bitunix!',
			content:
				'Privasea AI (PRAI) is getting listed with the PRAI/USDT trading pair on the spot market…',
			date: '2025-05-15 08:37:52',
		},
		{
			id: 5,
			type: 'Price Alert',
			title: '🔔 BTC crossed $70,000!',
			content: 'Bitcoin price surged past $70,000. Check your portfolio now!',
			date: '2025-05-15 07:25:00',
		},
	]);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	// const isAuthenticated = !!user;
	const isAuthenticated = true;
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/login');
		// Optional: redirect or reload if needed
		// window.location.href = '/login';
	};

	const [isOpen, setIsOpen] = useState(false);
	const [isUserOpen, setIsUserOpen] = useState(false);
	// const [isAuthenticated] = useState(true); // toggle this for testing
	const [showBalance, setShowBalance] = useState(true);
	const dropdownRef = useRef(null);
	const [dropdowns, setDropdowns] = useState({
		notifications: false,
		user: false,
		assets: false,
	});
	const [unread, setUnread] = useState(notifications.length);
	const [selectedCurrency, setSelectedCurrency] = useState('USDT');
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const markAllAsRead = () => {
		setUnread(0);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdowns({ notifications: false, user: false, assets: false });
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const [activeTab, setActiveTab] = useState('All');

	const filteredNotifications =
		activeTab === 'All'
			? notifications
			: notifications.filter((n) => n.type === activeTab);

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
					path: '/markets',
					icon: <MdScreenSearchDesktop size={20} />,
				},
			],
		},
		{ name: 'Futures', path: '/contract-trade/BTC-USDT', dropdown: false },
		{
			name: 'Convert',
			dropdown: true,
			dropdownItems: [
				// { text: 'Spot', path: '/spot', icon: <GiTargeting size={20} /> },
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
				<div className='hidden lg:flex items-center gap-1'>
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
										className='btn btn-ghost btn-xs  rounded-btn relative flex items-center gap-1 text-xs'>
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
			<div className='flex items-center gap-2'>
				{isAuthenticated ? (
					<>
						{/* Search bar */}
						<div className='hidden lg:flex items-center gap-4'>
							<SearchBar openModal={() => setIsSearchOpen(true)} />
							<SearchModal
								isOpen={isSearchOpen}
								closeModal={() => setIsSearchOpen(false)}
							/>
						</div>
						{/* Assets Icon */}
						<div className='hidden md:block dropdown dropdown-end'>
							<div
								tabIndex={0}
								role='button'
								className='btn btn-ghost btn-sm'>
								<img
									src='/wallet.png'
									alt='Assets'
									className='size-4 rounded-full'
								/>
							</div>
							<ul className='dropdown-content p-4 space-y-7 shadow border rounded-md border-stone-800 bg-[#121212] text-white rounded-box w-64 lg:w-[20rem]'>
								<li className='hover:bg-[#121212]/80 px-4 py-3'>
									<Link
										to='/assets/overview'
										className='block'>
										<div className='flex justify-between items-center'>
											<p className='font-semibold'>Total Assets</p>
											<button
												type='button'
												onClick={(e) => {
													e.preventDefault(); // Prevent link redirect
													setShowBalance((prev) => !prev);
												}}>
												{showBalance ? (
													<Eye
														size={16}
														className='text-gray-400'
													/>
												) : (
													<EyeOff
														size={16}
														className='text-gray-400'
													/>
												)}
											</button>
										</div>
										<p className='text-2xl mb-2 flex items-center gap-2'>
											{showBalance ? '0' : '****'}
											<select
												value={selectedCurrency}
												onChange={(e) => setSelectedCurrency(e.target.value)}
												className='text-sm bg-[#121212] text-white border-none rounded outline-none'>
												<option value='USDT'>USDT</option>
												<option value='BTC'>BTC</option>
											</select>
										</p>
										<p className='text-xs text-white/30'>=A$0.00</p>
									</Link>
								</li>
								<li className='flex items-center gap-4 w-full'>
									<Link
										to='/activity/act-center'
										className='btn btn-sm border border-neutral/20 mb-2'>
										Campaign Center
									</Link>
									<Link
										to='/activity/task-center'
										className='btn btn-sm border border-neutral/20 mb-2'>
										Task Center
									</Link>
								</li>
								<li>
									<Link
										className='flex justify-between items-center'
										to='/assets/spot-account'>
										<span>Spot Account</span>
										<span>--%</span>
									</Link>
								</li>
								<li>
									<Link
										className='flex justify-between items-center'
										to='/assets/futures-account'>
										<span>Futures Account</span>
										<span>--%</span>
									</Link>
								</li>
								<li>
									<Link
										className='flex justify-between items-center'
										to='/assets/earn-account'>
										<span>Earn Account</span>
										<span>--%</span>
									</Link>
								</li>
								<li>
									<Link
										className='flex justify-between items-center'
										to='/assets/copy-account'>
										<span>Copy Account</span>
										<span>--%</span>
									</Link>
								</li>

								<div className='size-[1px] w-full bg-white/10 my-3' />

								<li>
									<Popover className='relative'>
										<span className='flex justify-between items-center'>
											<PopoverButton>Orders Center</PopoverButton>
											<ChevronRight />
										</span>
										<PopoverPanel
											anchor='left'
											className='mt-2 flex flex-col space-y-6 bg-[#121212] border border-white/20 px-5 pr-24 py-5 z-50'>
											<Link to='/analytics'>Future Orders</Link>
											<Link to='/engagement'>Spot Orders</Link>
											<Link to='/security'>Third-Party Orders</Link>
											<Link to='/integrations'>Conversion Records</Link>
											<Link to='/integrations'>P2P Orders</Link>
											<Link to='/integrations'>Earn History</Link>
										</PopoverPanel>
									</Popover>
								</li>

								<li>
									<Link to='/assets/copy-account'>
										<span>Transaction History</span>
									</Link>
								</li>
								<li>
									<Link to='/assets/copy-account'>
										<span>My Rewards</span>
									</Link>
								</li>
							</ul>
						</div>

						{/* User Icon */}
						<UserDropdown />

						<QrDropdown />

						{/* Notification Icon */}
						<div
							className='relative'
							ref={dropdownRef}>
							<button
								className='btn btn-ghost btn-sm relative'
								onClick={() =>
									setDropdowns({
										notifications: !dropdowns.notifications,
										assets: false,
										user: false,
									})
								}>
								<Bell size={15} />
								{unread > 0 && (
									<span className='absolute -top-1 -right-1 bg-red-500 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center'>
										{unread}
									</span>
								)}
							</button>

							{dropdowns.notifications && (
								<div className='absolute -right-20 md:right-0 mt-3 w-[300px] md:w-[500px] bg-[#121212] text-white rounded-lg border border-neutral/20 shadow-xl p-4 z-50 max-h-[400px] overflow-y-auto noo-scrollbar'>
									<div className='flex justify-between items-center mb-3'>
										<h3 className='text-lg font-semibold border-b border-gray-600 w-full pb-2'>
											Messages
										</h3>
										<button
											onClick={markAllAsRead}
											className='text-[12px] text-lime-400 underline ml-2'>
											Mark all as read
										</button>
									</div>

									{/* Scrollable Tabs */}
									<div className='relative mb-4'>
										<button
											onClick={() => {
												document.getElementById('tabScroll').scrollLeft -= 100;
											}}
											className='absolute left-0 top-0 h-full z-10 px-2 bg-gradient-to-r from-[#121212] to-transparent'>
											<ChevronLeft
												size={16}
												className='text-white'
											/>
										</button>

										<div
											id='tabScroll'
											className='flex gap-2 overflow-x-auto no-scrollbar text-xs font-medium px-6'>
											{['All', 'Price Alert', 'New Listings', 'Latest'].map(
												(tab) => (
													<button
														key={tab}
														onClick={() => setActiveTab(tab)}
														className={`px-3 py-1 whitespace-nowrap rounded-full border ${
															activeTab === tab
																? 'bg-lime-400 text-black'
																: 'border-gray-600 text-gray-300'
														}`}>
														{tab}
													</button>
												)
											)}
										</div>

										<button
											onClick={() => {
												document.getElementById('tabScroll').scrollLeft += 100;
											}}
											className='absolute right-0 top-0 h-full z-10 px-2 bg-gradient-to-l from-[#121212] to-transparent'>
											<ChevronRight
												size={16}
												className='text-white'
											/>
										</button>
									</div>

									{filteredNotifications.length === 0 ? (
										<p className='text-sm text-gray-400'>
											No notifications for "{activeTab}"
										</p>
									) : (
										filteredNotifications.map((item) => (
											<div
												key={item.id}
												className='pb-2 mb-3 border-b border-gray-700'>
												<p className='font-semibold'>{item.title}</p>
												<p className='text-xs text-white/50'>{item.content}</p>
												<p className='text-[10px] text-gray-500 mt-1'>
													{item.date}
												</p>
											</div>
										))
									)}
								</div>
							)}
						</div>

						<LanguageCurrencyDropdown />

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
					className='md:hidden'
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
							<li className='hover:bg-stone-800 px-4 py-3'>
								<Link to='/assets/overview'>
									<p className='text-sm font-semibold'>Total Assets</p>
									<p className='text-xl mb-2'>0 USDT</p>
								</Link>
							</li>

							<li>
								<Link
									to={'/activity/act-center'}
									className='btn btn-sm w-full mb-2'>
									Campaign Center
								</Link>
								<Link
									to={'/activity/task-center'}
									className='btn btn-sm w-full mb-2'>
									Task Center
								</Link>
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

							<li>
								<Link to='/assets/rewards'>My Rewards</Link>
							</li>
							<li>
								<Link to='/account/security'>Security</Link>
							</li>
							<li>
								<Link to='/account/kyc'>KYC</Link>
							</li>
							<li>
								<Link to='/referral'>Referral Hub</Link>
							</li>
							<li>
								<Link to='/account/settings'>Settings</Link>
							</li>

							<li>
								<button
									className='text-red-400'
									onClick={handleLogout}>
									Log out
								</button>
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
