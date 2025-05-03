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
		{ name: 'Referral', path: '/referral', dropdown: false },
	];

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 flex items-center justify-between border-b border-white/10'>
			{/* Left Side */}
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
							<div className='relative'>
								{link.dropdown ? (
									<button
										tabIndex={0}
										className='btn btn-ghost btn-sm rounded-btn flex items-center gap-1'>
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
								<ul
									tabIndex={0}
									className='dropdown-content gap-5 menu px-4 py-6 rounded-lg shadow bg-stone-900 text-white rounded-box w-52'>
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

			{/* Right Side */}
			<div className='flex items-center gap-4'>
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

				{/* Mobile Menu Toggle */}
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

					{/* Optional Floating Button */}
					<div className='absolute bottom-4 right-4 bg-lime-400 p-3 rounded-full'>
						{/* Chat/help button if needed */}
					</div>
				</motion.div>
			)}
		</nav>
	);
};

export default Navbar;
