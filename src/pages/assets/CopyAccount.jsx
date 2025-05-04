const CopyAccount = () => {
	return (
		<div className='space-y-6'>
			{/* Header Row */}
			<div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4'>
				<h2 className='text-2xl font-bold'>Copy Account</h2>
				<div className='flex flex-wrap gap-2'>
					<button className='bg-lime-400 text-black px-4 py-1.5 rounded text-sm'>
						Copy
					</button>
					<button className='bg-[#1A1A1A] text-white px-4 py-1.5 rounded text-sm border border-[#333]'>
						Become a lead trader
					</button>
					<button className='bg-[#1A1A1A] text-white px-4 py-1.5 rounded text-sm border border-[#333]'>
						Private Copy Trading
					</button>
				</div>
			</div>

			{/* Asset Summary */}
			<div>
				<p className='text-sm text-gray-400'>Total Assets</p>
				<h3 className='text-xl font-bold mt-1'>0.00 USDT</h3>
				<p className='text-xs text-gray-500'>≈ A$0.00</p>
			</div>

			{/* Card/Table */}
			<div className='bg-[#1A1A1A] rounded-xl overflow-hidden'>
				<div className='flex items-center justify-between px-4 py-3 border-b border-[#333] text-sm font-semibold'>
					<p>My copies</p>
					<p className='text-gray-400'>Details</p>
				</div>

				{/* Desktop Table */}
				<div className='hidden lg:block'>
					<table className='w-full text-sm text-left border-collapse'>
						<thead>
							<tr className='text-gray-400 border-b border-[#333]'>
								<th className='py-3 px-4'>Copy Trading</th>
								<th className='py-3 px-4'>Margin Balance</th>
								<th className='py-3 px-4'>Wallet Balance</th>
								<th className='py-3 px-4'>Unrealized PnL</th>
							</tr>
						</thead>
						<tbody>
							<tr className='text-white'>
								<td className='py-3 px-4'>Futures Copy Trading</td>
								<td className='py-3 px-4'>0.00 USDT</td>
								<td className='py-3 px-4'>0.00 USDT</td>
								<td className='py-3 px-4'>0.00000000 USDT</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Mobile Table */}
				<div className='block lg:hidden p-4 space-y-3 text-sm text-white'>
					<div className='flex items-center justify-between'>
						<p className='font-semibold'>Futures Copy Trading</p>
						<span className='text-gray-400 text-xs'>Details</span>
					</div>
					<div className='grid grid-cols-2 gap-y-1 text-xs text-gray-400'>
						<div>Margin Balance:</div>
						<div className='text-white'>0.00 USDT</div>
						<div>Wallet Balance:</div>
						<div className='text-white'>0.00 USDT</div>
						<div>Unrealized PnL:</div>
						<div className='text-white'>0.00000000 USDT</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CopyAccount;
