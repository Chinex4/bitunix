import React, { useState } from 'react';
import bgImage from '/mobile/task-img.webp'; // update to your actual path

const TaskCenter = () => {
	const [tab, setTab] = useState('in-progress');

	return (
		<div
			className=' min-h-screen bg-cover text-white px-4 py-10'
			style={{ backgroundImage: `url(${bgImage})` }}>
			<div className='max-w-6xl mx-auto'>
				{/* Header */}
				<h1 className='text-3xl font-bold mb-1'>Task Center</h1>
				<p className='text-gray-400 mb-6'>
					Complete daily tasks to unlock amazing rewards!
				</p>

				{/* Tabs */}
				<div className='flex items-center space-x-4 mb-10'>
					<button
						className={`text-sm font-semibold ${
							tab === 'in-progress' ? 'text-lime-400' : 'text-gray-400'
						}`}
						onClick={() => setTab('in-progress')}>
						In Progress
					</button>
					<span className='text-gray-600'>|</span>
					<button
						className={`text-sm font-semibold ${
							tab === 'completed' ? 'text-white' : 'text-gray-400'
						}`}
						onClick={() => setTab('completed')}>
						Completed
					</button>
				</div>

				{/* Task List */}
				{tab === 'in-progress' && (
					<div className='space-y-6'>
						{/* First-Time Deposit Task */}
						<div className='bg-zinc-900 border border-zinc-700 rounded-lg p-6'>
							<h3 className='text-lg font-semibold mb-1'>
								🪙 First-Time Deposit Task
							</h3>
							<p className='text-sm text-gray-400 mb-4'>
								Complete your first deposit with an amount of 100 USDT or more
								to receive 5.00 USDT futures bonus in reward.
							</p>

							<div className='flex items-center justify-between bg-zinc-800 p-4 rounded-lg'>
								<div>
									<div className='text-2xl font-bold text-lime-400'>5.00</div>
									<p className='text-xs text-gray-400'>USDT Futures Bonus</p>
									<p className='text-xs text-gray-500 mt-1'>
										Deduction ratio: 50%. Redeem within 3 days and can be used
										for 7 days after redemption.
									</p>
								</div>
								<button className='border border-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black'>
									Deposit now
								</button>
							</div>
						</div>

						{/* Cumulative Futures Volume Task */}
						<div className='bg-zinc-900 border border-zinc-700 rounded-lg p-6'>
							<div className='flex items-center justify-between mb-2'>
								<h3 className='text-lg font-semibold'>
									🔥 Cumulative Futures Volume Task
								</h3>
								<button className='border border-white rounded px-4 py-1 text-sm hover:bg-white hover:text-black'>
									Trade now
								</button>
							</div>
							<p className='text-sm text-gray-400 mb-3'>
								(Task Period: 2025/04/30 13:00:00 - 2025/05/14 13:00:00 UTC+1){' '}
								<br />
								Cumulative trading volume 0.00 USDT. Claim 2 USDT Futures Bonus
								when the cumulative trading volume reaches 5,000 USDT or more!
								(Rewards not claimed by the time the task ends are considered
								forfeited, so please participate in the task and claim your
								rewards on time.)
							</p>

							<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-xs text-center'>
								<div className='bg-zinc-800 p-2 rounded'>
									🎁 2 USDT Futures Bonus
								</div>
								<div className='bg-zinc-800 p-2 rounded'>
									🎁 15 USDT Futures Bonus
								</div>
								<div className='bg-zinc-800 p-2 rounded'>
									🎁 50 USDT Futures Bonus
								</div>
								<div className='bg-zinc-800 p-2 rounded text-gray-500 line-through'>
									🔒 500 USDT Futures Bonus
								</div>
							</div>
						</div>
					</div>
				)}

				{tab === 'completed' && (
					<div className='text-gray-400 text-center py-20'>
						No completed tasks yet.
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskCenter;
