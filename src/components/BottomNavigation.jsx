import React, { useEffect, useState } from 'react';
import {
	FaHome,
	FaChartLine,
	FaExchangeAlt,
	FaGift,
	FaWallet,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
	const location = useLocation();
	const [hidden, setHidden] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (Math.abs(currentScrollY - lastScrollY) < 10) {
				// Ignore small scrolls (user slightly touching screen)
				return;
			}

			if (currentScrollY > lastScrollY && currentScrollY > 80) {
				// Scrolling Down and past 80px height
				setHidden(true);
			} else {
				// Scrolling Up
				setHidden(false);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	const navItems = [
		{ path: '/', label: 'Home', icon: <FaHome size={20} /> },
		{ path: '/markets', label: 'Markets', icon: <FaChartLine size={20} /> },
		{ path: '/contact-trade/BTC-USDT', label: 'Trade', icon: <FaExchangeAlt size={24} /> },
		{ path: '/campaign', label: 'Campaign', icon: <FaGift size={20} /> },
		{ path: '/assets', label: 'Assets', icon: <FaWallet size={20} /> },
	];

	return (
		<nav
			className={`fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800 flex justify-between items-center px-4 py-2 z-40 transition-transform duration-300 ${
				hidden ? 'translate-y-full' : 'translate-y-0'
			}`}>
			{navItems.map((item, index) => (
				<Link
					key={index}
					to={item.path}
					className={`flex flex-col items-center justify-center flex-1 text-xs ${
						location.pathname === item.path ? 'text-lime-400' : 'text-gray-400'
					}`}>
					{/* Special case: center "Trade" button */}
					<div
						className={`flex items-center justify-center rounded-full ${
							item.label === 'Trade' ? 'bg-lime-400 p-4 -mt-8' : ''
						}`}>
						{React.cloneElement(item.icon, {
							className: `${item.label === 'Trade' ? 'text-black' : ''}`,
						})}
					</div>
					{item.label !== 'Trade' && <span className='mt-1'>{item.label}</span>}
				</Link>
			))}
		</nav>
	);
};

export default BottomNavigation;
