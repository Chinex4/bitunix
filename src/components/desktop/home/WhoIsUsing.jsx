import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ChevronRight } from 'lucide-react'; // If you're using lucide-react for the chevron icon

const users = [
	{
		name: 'Invest With Jaxx',
		followers: '67.9K',
		message: 'Every trade is a lesson, every loss a tuition',
		image: '/whoisusing/jack.webp', // replace with real image path
		youtube: 'https://www.youtube.com/@investtradewithjaxx',
	},
	{
		name: 'Trade Travel Chill',
		followers: '37.9K',
		message: 'Every trade is a lesson, every loss a tuition',
		image: '/whoisusing/trade-travel.webp', // replace with real image path
		youtube: 'https://www.youtube.com/@TradeTravelChill',
	},
	{
		name: 'Oracle Fast Money Trader',
		followers: '55K',
		message: 'Every trade is a lesson, every loss a tuition',
		image: '/whoisusing/oracle.webp', // replace with real image path
		youtube: 'https://twitter.com/OracleFastMoney',
	},
	{
		name: 'Crash Trading',
		followers: '51.8K',
		message: 'Every trade is a lesson, every loss a tuition',
		image: '/whoisusing/cash-trading.webp', // replace with real image path
		youtube: 'https://www.youtube.com/c/CrashTrading',
	},
	{
		name: 'AltCrypto',
		followers: '314K',
		message: 'The exchange with one of the smoothest user interfaces...',
		image: '/whoisusing/altcrypto.jpg',
		youtube: 'https://www.youtube.com/live/QXEPzsOzaBg?si=Vbl1G5s03P35A-Nx',
	},
	{
		name: 'TrippaTrad',
		followers: '17.1K',
		message: 'I like the fact that Bitunix is completely focused on trading...',
		image: '/whoisusing/trypa.webp',
		youtube:
			'https://www.instagram.com/tigersmc_crypto?igsh=cWhqaHZ2dDgxZHd6&utm_source=qr',
	},
	{
		name: '加密狙击王',
		followers: '1.65K',
		message: "I chose Bitunix because it's professional, safe, secure...",
		image: '/whoisusing/china1.webp',
		youtube: 'https://youtube.com/@crypto_trader_kai?si=36qDfYRdrATAQngp',
	},
];

export default function WhoIsUsing() {
	return (
		<div className='px-4 md:px-0 py-10 bg-black text-white'>
			<h2 className='text-left md:text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10 md:mb-24'>
				Who is using Bitunix?
			</h2>

			<Swiper
				modules={[Autoplay]}
				slidesPerView={1.2}
				spaceBetween={20}
				loop={true}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				breakpoints={{
					640: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
					1280: { slidesPerView: 4 },
				}}>
				{users.map((user, index) => (
					<SwiperSlide key={index}>
						<div
							onClick={() => window.open(user.youtube, '_blank')}
							className='cursor-pointer bg-[#121212] rounded-xl p-5 flex flex-col justify-between h-[280px] group transition-all hover:scale-105'>
							{/* Top - Image and Name */}
							<div className='flex items-center space-x-3'>
								<div className='w-12 h-12 rounded-full overflow-hidden'>
									<img
										src={user.image}
										alt={user.name}
										width={48}
										height={48}
									/>
								</div>
								<div className='font-semibold'>{user.name}</div>
							</div>

							{/* Middle - Message */}
							<p className='text-sm md:text-xl text-white/50 mt-4 line-clamp-4'>
								{user.message}
							</p>

							{/* Bottom - Followers and Arrow */}
							<div className='flex items-center justify-between mt-6 pt-4 pb-4 px-4 border-t border-white/10 group-hover:bg-lime-400/10 rounded-md transition'>
								<div className='text-xs text-gray-400'>
									Followers: {user.followers}
								</div>
								<ChevronRight
									size={18}
									className='text-gray-400 group-hover:text-lime-400 transition'
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
