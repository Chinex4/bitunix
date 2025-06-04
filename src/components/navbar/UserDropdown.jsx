import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Copy, Eye, EyeOff } from 'lucide-react';

const UserDropdown = ({handleLogout, handleCopy}) => {
	const [uid] = useState('952644127');
	const [showUID, setShowUID] = useState(false);

	return (
		<div className='hidden md:block dropdown dropdown-end'>
			<div
				tabIndex={0}
				role='button'
				className='btn btn-ghost btn-sm'>
				<img
					src='/user-icon.svg'
					alt='User'
					className='size-4 rounded-full'
				/>
			</div>
			<ul className='dropdown-content p-4 space-y-4 shadow border border-stone-800 bg-[#121212] text-white rounded-box w-72'>
				{/* User Header */}
				<li className='flex gap-3 items-center'>
					<img
						src='/user-icon.svg'
						alt='user'
						className='size-9 rounded-full'
					/>
					<div>
						<p className='text-sm font-semibold'>off****@gmail.com</p>
						<div className='flex items-center gap-2 mt-1 text-[11px] text-gray-400'>
							<span>UID {showUID ? uid : '*******'}</span>
							<button
								onClick={() => setShowUID(!showUID)}
								className='text-white hover:text-emerald-400'>
								{showUID ? <EyeOff size={12} /> : <Eye size={12} />}
							</button>
							<button
								onClick={handleCopy}
								className='text-white hover:text-emerald-400'>
								<Copy size={12} />
							</button>
						</div>
					</div>
				</li>

				{/* VIP Badge */}
				<li className=''>
					<Link
						to={'/service/vipservice'}
						className='flex justify-between items-center bg-[#1d1d1f] border border-white/10 rounded-md px-3 py-2'>
						<span className='text-white/80 font-semibold'>VIP 0</span>
						<img
							src='/vip.svg'
							alt='vip-badge'
							className='size-6'
						/>
					</Link>
				</li>

				{/* Divider */}
				<hr className='border-gray-700 my-2' />

				{/* Menu Options */}
				<li>
					<Link to='/assets/rewards'>My Rewards</Link>
				</li>
				<li className='flex items-center justify-between'>
					<Link to='/security'>Security</Link>
					<span className='w-2 h-2 bg-red-500 rounded-full' />
				</li>
				<li>
					<Link to='/kyc'>Verification</Link>
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

				{/* Divider */}
				<hr className='border-gray-700 my-2' />

				{/* Logout */}
				<li>
					<button
						onClick={handleLogout}
						className='text-red-400 hover:text-red-300 w-full text-left'>
						Log out
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserDropdown;
