import { FaGoogle, FaApple, FaFacebookF, FaXTwitter } from 'react-icons/fa6';
import video from '../../../assets/hero-video.mp4';
import phoneFrame from '../../../assets/images/phone-frame.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import TradeNowButton from '../../ui/TradeNowButton';

const HeroSection = () => {
	// const [isAuthenticated, setIsAuthenticated] = useState(true);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = !!user;
	const navigate = useNavigate();
	return (
		<section className='bg-black text-white px-4 py-4 flex flex-col lg:flex-row items-center justify-between gap-24'>
			{/* Left Side */}
			<div className='w-full lg:w-1/2 flex flex-col gap-6'>
				<p className='text-lime-400 font-semibold'>
					Better Liquidity, Better Trading
				</p>
				<h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
					Global Crypto <br /> Derivatives Exchange
				</h1>

				{!isAuthenticated ? (
					<div>
						{/* Email / Mobile Input and Button */}
						<div className='flex flex-col sm:flex-row items-center gap-4'>
							<input
								type='text'
								placeholder='Email / Mobile'
								className='input py-6 rounded-xl input-bordered w-full sm:w-2/3 bg-neutral-800 text-white placeholder-gray-400'
							/>
							<Link
								to='/register'
								className='btn text-xl px-12 py-6 rounded-xl bg-lime-400 border-none text-black w-full sm:w-auto'>
								Sign up now
							</Link>
						</div>
						{/* Bonus text */}
						<p className=''>
							Sign up to Win up to{' '}
							<span className='text-lime-400'>🤑 8000+ USDT</span>
						</p>

						{/* Social icons */}
						<div className='flex items-center gap-4'>
							<p className='text-sm'>Or continue with</p>
							<div className='flex gap-2'>
								<button className='btn btn-circle bg-neutral-800 border-none'>
									<FaGoogle className='text-white' />
								</button>
								<button className='btn btn-circle bg-neutral-800 border-none'>
									<FaApple className='text-white' />
								</button>
								<button className='btn btn-circle bg-neutral-800 border-none'>
									<FaFacebookF className='text-white' />
								</button>
								<button className='btn btn-circle bg-neutral-800 border-none'>
									<FaXTwitter className='text-white' />
								</button>
							</div>
						</div>
					</div>
				) : (
					<TradeNowButton />
				)}
			</div>

			{/* Right Side (Video inside Phone Frame) */}
			<div className='hidden md:flex relative md:w-[340px] h-[522.5px] lg:w-1/2 justify-center mb-10 lg:mb-0'>
				{/* Phone Frame */}
				<img
					src={phoneFrame}
					alt='Phone Frame'
					className='z-10 '
				/>

				{/* Video */}
				<video
					src={video}
					autoPlay
					muted
					loop
					playsInline
					className='absolute top-[12%] w-[190px] h-[400.5px] md:left-[22.8%] lg:left-[33.5%] object-cover rounded-[2rem] z-0'
				/>
			</div>
		</section>
	);
};

export default HeroSection;
