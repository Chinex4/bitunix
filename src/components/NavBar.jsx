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
		{ name: 'Futures', dropdown: false },
		{
			name: 'Spot',
			dropdown: true,
			dropdownItems: [
				{
					text: 'Spot',
					path: '/spot',
					icon: <GiTargeting size={20} />,
				},
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
					icon: <MdOutlineCurrencyExchange size={20} />
				}
			],
			badge: 'NEW',
		},
		{ name: 'Copy Trading', path: '/copy-trading/square'},
		{ name: 'Campaign Center', path: '/activity/act-center', badge: 'NEW' },
		{ name: 'Task Center', path: '/activity/task-center', badge: 'NEW' },
		{ name: 'Referral', dropdown: false },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 flex items-center justify-between border-b border-white/10'>
			{/* Left side */}
			<div className='flex items-center gap-4'>
				<Link
					to='/'
					className='text-lime-400 font-bold text-xl italic flex items-center gap-1'>
					<div className='bg-lime-400 rounded-full p-1'></div> Bitunix
				</Link>

				{/* Desktop Menu */}
				<div className='hidden lg:flex items-center gap-4'>
					{navLinks.map((link, index) => (
						<div
							className='dropdown dropdown-hover'
							key={index}>
							<label
								tabIndex={0}
								className='btn btn-ghost btn-sm rounded-btn relative'>
								{link.path ? (
									<Link to={link.path}>{link.name}</Link>
								) : (
									<span>{link.name}</span>
								)}

								{link.dropdown && (
									<span className='ml-1'>
										<ChevronDown size={16} />
									</span>
								)}
								{link.badge && (
									<span className='bg-lime-400 absolute -top-2 -right-3 text-black text-[8px] ml-1 px-1 py-0.5 rounded'>
										NEW
									</span>
								)}
							</label>
							{link.dropdown && (
								<ul
									tabIndex={0}
									className='dropdown-content gap-5 menu px-4 py-6 rounded-lg shadow bg-stone-900 text-white rounded-box w-52'>
									{link.dropdownItems.map((item) => {
										return (
											<Link
												className='flex gap-3 items-center'
												key={item.text}
												to={item.path}>
												<span className='text-lime-400'>{item.icon}</span>
												<span>{item.text}</span>
											</Link>
										);
									})}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>

			{/* Right side */}
			<div className='flex items-center gap-4'>
				<Link
					to='/login'
					className='hidden lg:block'>
					Log in
				</Link>
				<Link
					to='/register'
					className='px-6 py-2 rounded-md hover:bg-lime-300 duration-300 transition-colors text-center bg-lime-400 border-none text-black inline-block'>
					Sign Up
				</Link>

				{/* Mobile Hamburger */}
				<button
					className='lg:hidden'
					onClick={() => setIsOpen(true)}>
					<Menu size={24} />
				</button>
			</div>

			{/* Mobile Drawer */}
			{isOpen && (
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: 0 }}
					exit={{ x: '100%' }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					className='fixed top-0 lg:hidden right-0 h-full w-full md:w-72 bg-black text-white p-4 z-50'>
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
						<li>
							<Link to='/trade/third-party'>Third-party</Link>
						</li>
						<li>
							<Link to='/markets'>Markets</Link>
						</li>
						<li>
							<Link to='/contract-trade/BTC-USDT'>Futures</Link>
						</li>
						<li>
							<Link to='/spot'>Spot</Link>
						</li>
						<li>
							<Link to='/flash-exchange'>Convert</Link>
						</li>
						<li>
							<Link to='/earn/financial-management'>Earn</Link>
						</li>
						<li>
							<Link to='/login'>Log in</Link>
						</li>
					</ul>

					{/* Bottom Right Button */}
					<div className='absolute bottom-4 right-4 bg-lime-400 p-3 rounded-full'>
						{/* You can put a chat or help icon here */}
					</div>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;
