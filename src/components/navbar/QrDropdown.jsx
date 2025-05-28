import { useState, useRef, useEffect } from 'react';

const QrDropdown = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef();

	const handleClickOutside = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			{/* Trigger Icon */}
			<button
				className='btn btn-ghost btn-sm'
				onClick={() => setOpen((prev) => !prev)}>
				<svg
					width='15'
					height='15'
					viewBox='0 0 18 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M13.2856 17.5716C15.0608 17.5716 16.4999 16.1325 16.4999 14.3573L16.4999 0.428711H4.71416C2.93896 0.428711 1.49988 1.8678 1.49988 3.643V17.5716H13.2856ZM14.8927 14.3573L14.8927 2.03585L7.92845 2.03585H7.39273H6.32131L4.71416 2.03585C3.82656 2.03585 3.10702 2.7554 3.10702 3.643L3.10702 15.9644L13.2856 15.9644C14.1732 15.9644 14.8927 15.2449 14.8927 14.3573ZM9.28891 4.71436C8.69717 4.71436 8.21748 5.19405 8.21748 5.78578V8.48337L8.02807 8.29396C7.60965 7.87554 6.93126 7.87554 6.51284 8.29396L6.13403 8.67277L9.02105 11.5598L11.1504 9.43038C11.5689 9.01196 11.5689 8.33357 11.1504 7.91515L10.7716 7.53635L9.82462 8.48336V4.71436H9.28891ZM12.2142 12.75H5.78558V13.8214H12.2142V12.75Z'
						fill='white'
					/>
				</svg>
			</button>

			{/* Dropdown Content */}
			{open && (
				<div className='absolute right-0 mt-3 w-56 bg-[#121212] border border-stone-800 shadow-lg rounded-md p-4 z-50 text-white text-center'>
					<p className='text-sm mb-3'>Scan to Download App</p>
					<div className='w-36 h-36 mx-auto mb-2 relative'>
						<img
							src='/qrcodee.png' // Replace with your real QR code image
							alt='QR Code'
							className='w-full h-full object-contain'
						/>
						{/* <img
							src='/logo-center.png' // App icon/logo to place in the center of QR
							alt='logo'
							className='w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md'
						/> */}
					</div>
					{/* <p className='text-sm text-lime-400 flex items-center justify-center gap-1'>
						More Options <span className='text-white'>&rarr;</span>
					</p> */}
				</div>
			)}
		</div>
	);
};

export default QrDropdown;
