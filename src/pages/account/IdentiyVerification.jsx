import { FileText, Briefcase } from 'lucide-react';

const IdentityVerification = () => {
	return (
		<div className='text-white p-4 md:p-6 lg:p-10 space-y-8'>
			{/* Basic Verification */}
			<div className='border border-[#333] rounded-lg p-4 space-y-3'>
				<h3 className='text-lg font-semibold'>Basic Verification</h3>
				<div className='overflow-x-auto'>
					<table className='w-full text-sm text-gray-300'>
						<thead>
							<tr className='border-b space-x-2 border-[#444]'>
								<th className='text-left py-2'>Support</th>
								<th className='text-left py-2'>Unverified</th>
								<th className='text-left py-2 text-lime-400'>Benefit</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='py-1'>Operational events and activities</td>
								<td>--</td>
								<td className='text-lime-400'>
									Selected events and activities
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='mt-3 space-y-2'>
					<p className='flex items-center gap-2'>
						<FileText
							size={16}
							className='text-lime-400'
						/>
						Personal information
					</p>
					<p className='flex items-center gap-2'>
						<FileText
							size={16}
							className='text-lime-400'
						/>
						ID
					</p>
				</div>
				<button className='w-full bg-lime-400 text-black rounded-md py-2 font-semibold mt-4'>
					Verify
				</button>
			</div>

			{/* Advanced Verification */}
			<div className='border border-[#333] rounded-lg p-4 space-y-3'>
				<h3 className='text-lg font-semibold'>Advanced Verification</h3>
				<div className='overflow-x-auto'>
					<table className='w-full text-sm text-gray-300'>
						<thead>
							<tr className='border-b space-x-2 border-[#444]'>
								<th className='text-left py-2'>Support</th>
								<th className='text-left py-2'>Unverified</th>
								<th className='text-left py-2 text-lime-400'>
									Benefit for Lv2 KYC
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='py-1'>Daily Withdrawal Limit</td>
								<td>2,000,000 USDT</td>
								<td className='text-lime-400'>5,000,000 USDT</td>
							</tr>
							<tr>
								<td className='py-1'>Operational events and activities</td>
								<td>Selected</td>
								<td className='text-lime-400'>More exclusive campaigns</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='mt-3'>
					<p className='flex items-center gap-2'>
						<FileText
							size={16}
							className='text-lime-400'
						/>
						Proof of address
					</p>
				</div>
				<button className='w-full bg-[#1a1a1a] text-gray-400 rounded-md py-2 font-semibold cursor-not-allowed mt-4'>
					Basic verification required
				</button>
			</div>

			{/* Institutional Certification */}
			<div className='border border-[#333] rounded-lg p-4 space-y-3'>
				<h3 className='text-lg font-semibold'>Institutional certification</h3>
				<p className='text-sm text-gray-400'>
					Level up your trading experience with Bitunix business account
				</p>
				<div className='text-sm mt-2'>
					<p className='flex items-center gap-2'>
						<Briefcase
							size={16}
							className='text-lime-400'
						/>
						Institution information
					</p>
				</div>
				<button className='w-full bg-lime-400 text-black rounded-md py-2 font-semibold'>
					Verify
				</button>
			</div>
		</div>
	);
};

export default IdentityVerification;
