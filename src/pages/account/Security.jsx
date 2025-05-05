import { Link } from 'react-router-dom';
import {
	ShieldCheck,
	Smartphone,
	Mail,
	Lock,
	EyeOff,
	LogOut,
	Settings,
	Upload,
	ChevronDown,
	Copy,
} from 'lucide-react';

const Security = () => {
	return (
		<div className='p-4 md:p-8 text-white'>
			<div className='bg-[#111] p-4 md:p-6 rounded-lg border border-[#222] mb-6'>
				<div className='flex items-center gap-4 mb-4'>
					<img
						src='/user-icon.svg'
						alt='Profile'
						className='w-12 h-12 rounded-full border border-[#333]'
					/>
					<div>
						<p className='font-semibold text-sm md:text-base'>
							hev****@bocapies.com
						</p>
						<span className='bg-green-700 text-xs px-2 py-1 rounded'>
							Regular User
						</span>
						<p className='text-[12px] text-gray-400'>
							UID: 952948137 <Copy size={12} className='ml-1 inline cursor-pointer text-lime-400' />
						</p>
					</div>
				</div>
				<p className='text-sm text-gray-300 mb-1'>2FA Security Level</p>
				<p className='text-red-500 font-bold text-sm mb-2'>Low</p>
				<div className='w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2'>
					<div className='w-1/5 h-full bg-red-500'></div>
				</div>
			</div>

			<div className='mb-6'>
				<h2 className='text-lg font-semibold mb-4'>Verification Methods</h2>
				<div className='space-y-4'>
					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<ShieldCheck className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Google Authenticator</p>
								<p className='text-xs text-gray-400'>
									Protect your account and transactions.
								</p>
							</div>
						</div>
						<button className='text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded'>
							Set up
						</button>
					</div>

					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<Smartphone className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Mobile Verification</p>
								<p className='text-xs text-gray-400'>
									Protect your account and transactions.
								</p>
							</div>
						</div>
						<button className='text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded'>
							Set up
						</button>
					</div>

					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<Mail className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Email Verification</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='mb-6'>
				<h2 className='text-lg font-semibold mb-4'>Password</h2>
				<div className='space-y-4'>
					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<Lock className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Login Password</p>
								<p className='text-xs text-gray-400'>Protect your account</p>
							</div>
						</div>
						<button className='text-lime-400 text-xs underline'>Change</button>
					</div>

					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<EyeOff className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Anti-Phishing Code</p>
								<p className='text-xs text-gray-400'>
									Included in all official Bitunix emails.
								</p>
							</div>
						</div>
						<button className='text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded'>
							Set up
						</button>
					</div>
				</div>
			</div>

			<div className='mb-6'>
				<h2 className='text-lg font-semibold mb-4'>Withdrawal Security</h2>
				<div className='flex flex-col gap-2 bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
					<div className='flex items-center gap-3'>
						<Upload className='text-lime-400' />
						<div>
							<p className='font-semibold text-sm'>One-step Withdrawal</p>
							<p className='text-xs text-gray-400'>
								Allows withdrawal of small crypto amounts without passing 2FA.
							</p>
						</div>
					</div>
					<Link
						to='#'
						className='text-xs text-lime-400 underline ml-7'>
						Address management
					</Link>
					<button className='text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded ml-7 w-max'>
						Enable
					</button>
				</div>
			</div>

			<div className='mb-10'>
				<h2 className='text-lg font-semibold mb-4'>Account Activity</h2>
				<div className='space-y-4'>
					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<Settings className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Device Management</p>
								<p className='text-xs text-gray-400'>
									Manage authorized devices
								</p>
							</div>
						</div>
						<ChevronDown className='text-gray-400 w-4 h-4' />
					</div>

					<div className='flex justify-between items-center bg-[#1A1A1A] p-4 rounded-lg border border-[#333]'>
						<div className='flex items-center gap-3'>
							<LogOut className='text-lime-400' />
							<div>
								<p className='font-semibold text-sm'>Account Activity</p>
								<p className='text-xs text-gray-400'>Suspicious activity?</p>
							</div>
						</div>
						<span className='text-xs text-lime-400 underline'>
							Disable account
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Security;
