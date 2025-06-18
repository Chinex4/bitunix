import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
	const location = useLocation();
	const [hidden, setHidden] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (Math.abs(currentScrollY - lastScrollY) < 10) return;

			if (currentScrollY > lastScrollY && currentScrollY > 80) {
				setHidden(true);
			} else {
				setHidden(false);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	const navItems = [
		{
			path: '/',
			label: 'Home',
			icon: (
				<svg
					width='22'
					height='22'>
					<path
						fill='currentColor'
						d='M3 10.1111L11 3L19 10.1111V19H15H13.6667H8.33333H7H3V10.1111Z'
					/>
				</svg>
			),
		},
		{
			path: '/markets',
			label: 'Markets',
			icon: (
				// <svg
				// 	width='23'
				// 	height='22'>
				// 	<path
				// 		fill='currentColor'
				// 		d='M6 3C6 2.44772 6.44772 2 7 2H7.5V4.75H10.5V14.75C10.5 16.1307 9.38071 17.25 8 17.25H7.5V19C7.5 19.5523 7.05228 20 6.5 20H6V17.25H3V7.25C3 5.86929 4.11929 4.75 5.5 4.75H6V3Z'
				// 	/>
				// </svg>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 23 22'
					width='23'
					height='22'>
					<g fill='currentColor'>
						<mask
							id='path-2-inside-1_225_3560'
							fill='white'>
							{' '}
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M6 3C6 2.44772 6.44772 2 7 2H7.5V4.75H10.5V14.75C10.5 16.1307 9.38071 17.25 8 17.25H7.5V19C7.5 19.5523 7.05228 20 6.5 20H6V17.25H3V7.25C3 5.86929 4.11929 4.75 5.5 4.75H6V3ZM14.5 4.75C13.1193 4.75 12 5.86929 12 7.25V17.25H15V20H15.5C16.0523 20 16.5 19.5523 16.5 19V17.25H17C18.3807 17.25 19.5 16.1307 19.5 14.75V4.75H16.5V2H16C15.4477 2 15 2.44772 15 3V4.75H14.5Z'
							/>{' '}
						</mask>{' '}
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M6 3C6 2.44772 6.44772 2 7 2H7.5V4.75H10.5V14.75C10.5 16.1307 9.38071 17.25 8 17.25H7.5V19C7.5 19.5523 7.05228 20 6.5 20H6V17.25H3V7.25C3 5.86929 4.11929 4.75 5.5 4.75H6V3ZM14.5 4.75C13.1193 4.75 12 5.86929 12 7.25V17.25H15V20H15.5C16.0523 20 16.5 19.5523 16.5 19V17.25H17C18.3807 17.25 19.5 16.1307 19.5 14.75V4.75H16.5V2H16C15.4477 2 15 2.44772 15 3V4.75H14.5Z'
							fill='currentColor'
						/>{' '}
						<path
							d='M7.5 2H8.8V0.7H7.5V2ZM7.5 4.75H6.2V6.05H7.5V4.75ZM10.5 4.75H11.8V3.45H10.5V4.75ZM7.5 17.25V15.95H6.2V17.25H7.5ZM6 20H4.7V21.3H6V20ZM6 17.25H7.3V15.95H6V17.25ZM3 17.25H1.7V18.55H3V17.25ZM6 4.75V6.05H7.3V4.75H6ZM12 17.25H10.7V18.55H12V17.25ZM15 17.25H16.3V15.95H15V17.25ZM15 20H13.7V21.3H15V20ZM16.5 17.25V15.95H15.2V17.25H16.5ZM19.5 4.75H20.8V3.45H19.5V4.75ZM16.5 4.75H15.2V6.05H16.5V4.75ZM16.5 2H17.8V0.7H16.5V2ZM15 4.75V6.05H16.3V4.75H15ZM7 0.7C5.72974 0.7 4.7 1.72975 4.7 3H7.3C7.3 3.16569 7.16569 3.3 7 3.3V0.7ZM7.5 0.7H7V3.3H7.5V0.7ZM8.8 4.75V2H6.2V4.75H8.8ZM10.5 3.45H7.5V6.05H10.5V3.45ZM11.8 14.75V4.75H9.2V14.75H11.8ZM8 18.55C10.0987 18.55 11.8 16.8487 11.8 14.75H9.2C9.2 15.4127 8.66274 15.95 8 15.95V18.55ZM7.5 18.55H8V15.95H7.5V18.55ZM8.8 19V17.25H6.2V19H8.8ZM6.5 21.3C7.77026 21.3 8.8 20.2703 8.8 19H6.2C6.2 18.8343 6.33431 18.7 6.5 18.7V21.3ZM6 21.3H6.5V18.7H6V21.3ZM4.7 17.25V20H7.3V17.25H4.7ZM3 18.55H6V15.95H3V18.55ZM1.7 7.25V17.25H4.3V7.25H1.7ZM5.5 3.45C3.40132 3.45 1.7 5.15132 1.7 7.25H4.3C4.3 6.58726 4.83726 6.05 5.5 6.05V3.45ZM6 3.45H5.5V6.05H6V3.45ZM4.7 3V4.75H7.3V3H4.7ZM13.3 7.25C13.3 6.58726 13.8373 6.05 14.5 6.05V3.45C12.4013 3.45 10.7 5.15132 10.7 7.25H13.3ZM13.3 17.25V7.25H10.7V17.25H13.3ZM15 15.95H12V18.55H15V15.95ZM16.3 20V17.25H13.7V20H16.3ZM15.5 18.7H15V21.3H15.5V18.7ZM15.2 19C15.2 18.8343 15.3343 18.7 15.5 18.7V21.3C16.7703 21.3 17.8 20.2703 17.8 19H15.2ZM15.2 17.25V19H17.8V17.25H15.2ZM17 15.95H16.5V18.55H17V15.95ZM18.2 14.75C18.2 15.4127 17.6627 15.95 17 15.95V18.55C19.0987 18.55 20.8 16.8487 20.8 14.75H18.2ZM18.2 4.75V14.75H20.8V4.75H18.2ZM16.5 6.05H19.5V3.45H16.5V6.05ZM15.2 2V4.75H17.8V2H15.2ZM16 3.3H16.5V0.7H16V3.3ZM16.3 3C16.3 3.16569 16.1657 3.3 16 3.3V0.7C14.7297 0.7 13.7 1.72975 13.7 3H16.3ZM16.3 4.75V3H13.7V4.75H16.3ZM14.5 6.05H15V3.45H14.5V6.05Z'
							fill='currentColor'
							mask='url(#path-2-inside-1_225_3560)'
						/>
					</g>
				</svg>
			),
		},
		{
			path: '/contract-trade/BTC-USDT',
			label: 'Trade',
			icon: <img src='/favicon.ico' />,
		},
		{
			path: '/copy-trading/square',
			label: 'Campaign',
			icon: (
				<svg
					width='23'
					height='22'>
					<path
						fill='currentColor'
						d='M11.8 5.8H11.2L7.7 2.35L6.2 3.87L8.17 5.83H4.02C2.84 5.83 1.88 6.78 1.88 7.96H19.32C20.31 7.16 21.12 6.17 21.12 5.83H14.83L16.79 3.87L15.28 2.36L11.8 5.8ZM2.97 9.22H20.03V20H2.97V9.22ZM14.64 16.86H19.13V18.65H14.64V16.86Z'
					/>
				</svg>
			),
		},
		{
			path: '/assets/overview',
			label: 'Assets',
			icon: (
				<svg
					width='23'
					height='22'>
					<path
						fill='currentColor'
						d='M7 3.25C4.79 3.25 3 5.04 3 7.25V18.75H16C18.21 18.75 20 16.96 20 14.75V14.25H16.25C14.46 14.25 13 12.79 13 11C13 9.21 14.46 7.75 16.25 7.75H20V3.25H7ZM16.25 9.25C15.28 9.25 14.5 10.03 14.5 11C14.5 11.97 15.28 12.75 16.25 12.75H20V9.25H16.25Z'
					/>
				</svg>
			),
		},
	];

	return (
		<nav
			className={`fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800 flex justify-between items-center px-4 py-2 z-40 transition-transform duration-300 ${
				hidden ? 'translate-y-full' : 'translate-y-0'
			}`}>
			{navItems.map((item, index) => {
				const isActive = location.pathname === item.path;
				const isTrade = item.label === 'Trade';

				return (
					<Link
						key={index}
						to={item.path}
						className={`flex flex-col items-center justify-center flex-1 text-xs ${
							isTrade ? '' : isActive ? 'text-white' : 'text-gray-400'
						}`}>
						<div
							className={`flex items-center justify-center rounded-full ${
								isTrade
									? `p-4 -mt-10 ${
											isActive
												? 'bg-lime-400 text-black'
												: 'bg-[#121212] shadow-lg border border-neutral-300/20 text-white'
									  }`
									: ''
							}`}>
							{React.cloneElement(item.icon, {
								className: `${isTrade ? 'text-[22px]' : 'text-[20px]'}`,
								color: !isTrade && isActive ? '#fff' : '#9ca3af', // Tailwind's gray-400
							})}
						</div>
						<span className='mt-1'>{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
};

export default BottomNavigation;
