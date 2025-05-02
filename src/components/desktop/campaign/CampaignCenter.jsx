import React, { useState } from 'react';
import campaignTrophy from '/mobile/act-center.webp'; // Update with correct path

const CampaignCenter = () => {
	const [activeTab, setActiveTab] = useState('ongoing');

	return (
		<div className='bg-black text-white px-4 py-10 md:py-24 flex items-center justify-center'>
			<div className='max-w-7xl w-full flex flex-col lg:flex-row gap-10 items-center'>
				{/* Left Section */}
				<div>
					<h1 className='text-3xl md:text-4xl font-bold mb-2'>
						Campaign Center
					</h1>
					<p className='text-gray-400 mb-6'>
						Enter the campaign, receive rewards and start your crypto journey!
					</p>

					{/* Tabs */}
					<div className='flex items-center space-x-4 mb-8'>
						<button
							className={`text-sm font-semibold ${
								activeTab === 'ongoing' ? 'text-lime-400' : 'text-gray-400'
							}`}
							onClick={() => setActiveTab('ongoing')}>
							Ongoing Campaigns
						</button>
						<span className='text-gray-500'>|</span>
						<button
							className={`text-sm font-semibold ${
								activeTab === 'past' ? 'text-white' : 'text-gray-400'
							}`}
							onClick={() => setActiveTab('past')}>
							Past Campaigns
						</button>
					</div>

					{/* Login Prompt */}
					<div className='text-center md:text-left'>
						<p className='text-sm font-semibold mb-1'>
							Exciting activities are happening all around!
						</p>
						<p className='text-gray-400 mb-4'>Login and enter now!</p>
						<button className='border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition'>
							Log in
						</button>
					</div>
				</div>

				{/* Right Image Section */}
				<div className='w-[350px] lg:w-[50rem] flex justify-center'>
					<img
						src={campaignTrophy}
						alt='Trophy'
						className='w-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default CampaignCenter;
