import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const devices = [
	{
		device:
			'Microsoft Edge137Microsoft Edge (Microsoft EdgeWindowsMicrosoft Edge)',
		date: '2025-06-13 15:27:04',
		location: 'Lagos',
		ip: '129.205.124.244',
		isCurrent: true,
	},
	{
		device: 'Google Chrome137Google Chrome (Google ChromeWindowsGoogle Chrome)',
		date: '2025-06-13 15:10:20',
		location: 'Lagos',
		ip: '129.205.124.227',
	},
	{
		device: 'Chromium136Chromium (ChromiumWindowsChromium)',
		date: '2025-05-27 16:52:13',
		location: 'Lagos',
		ip: '197.211.57.45',
	},
	{
		device: 'Chromium136Chromium (ChromiumAndroidChromium)',
		date: '2025-05-13 15:33:00',
		location: 'Lagos',
		ip: '197.211.58.62',
	},
];

export default function DeviceManagement() {
	const navigate = useNavigate();

	return (
		<div className='max-w-7xl mx-auto px-4 py-6 text-white'>
			{/* Back Button */}
			<button
				onClick={() => navigate(-1)}
				className='mb-4 flex items-center text-gray-300 hover:text-white'>
				<ArrowLeft
					className='mr-2'
					size={18}
				/>
				<span className='text-sm'>Back</span>
			</button>

			<h2 className='text-2xl font-bold mb-6'>Device Management</h2>

			<div className='overflow-x-auto'>
				<table className='min-w-full text-[11px] text-left border-separate border-spacing-y-2'>
					<thead className='text-gray-400'>
						<tr>
							<th className='px-4 py-2'>Device</th>
							<th className='px-4 py-2'>Date</th>
							<th className='px-4 py-2'>Location</th>
							<th className='px-4 py-2'>IP</th>
							<th className='px-4 py-2'>Action</th>
						</tr>
					</thead>
					<tbody className='text-white'>
						{devices.map((d, idx) => (
							<tr
								key={idx}
								className='bg-transparent border-b border-gray-700'>
								<td className='px-4 py-2'>
									<div className='flex items-center gap-2'>
										<input
											type='checkbox'
											className='accent-zinc-600'
										/>
										<span>{d.device}</span>
										{d.isCurrent && (
											<span className='ml-2 bg-blue-800 text-blue-200 text-xs px-2 py-0.5 rounded'>
												Current
											</span>
										)}
									</div>
								</td>
								<td className='px-4 py-2'>{d.date}</td>
								<td className='px-4 py-2'>{d.location}</td>
								<td className='px-4 py-2'>{d.ip}</td>
								<td className='px-4 py-2 space-x-4'>
									<button className='text-lime-400 hover:underline'>
										Remove
									</button>
									<button className='text-lime-400 hover:underline'>
										Unfold
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
