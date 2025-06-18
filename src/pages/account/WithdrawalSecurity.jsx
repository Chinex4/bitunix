import { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { Upload, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const withdrawalLimits = ['500 USDT', '1000 USDT', '2000 USDT'];

export default function WithdrawalSecurity() {
	const [showQuickModal, setShowQuickModal] = useState(false);
	const [showVerifyModal, setShowVerifyModal] = useState(false);
	const [selectedLimit, setSelectedLimit] = useState(withdrawalLimits[0]);
	const [sendingCode, setSendingCode] = useState(false);

	const sendVerificationCode = () => {
		setSendingCode(true);
		setTimeout(() => setSendingCode(false), 2000);
	};

	return (
		<div className='mb-6'>
			<h2 className='text-lg font-semibold mb-4'>Withdrawal Security</h2>
			<div className='flex items-center justify-between gap-2 bg-[#1A1A1A] hover:bg-black/80 transition-all duration-300 p-4 rounded-lg border border-[#333]'>
				<div>
					<div className='flex items-center gap-3'>
						<Upload className='text-lime-400' />
						<div>
							<p className='font-semibold text-sm'>One-step Withdrawal</p>
							<p className='text-xs text-white/35'>
								Allows withdrawal of small crypto amounts without passing 2FA.
							</p>
						</div>
					</div>
					<Link
						to='#'
						className='text-xs text-lime-400 underline ml-7'>
						Address management
					</Link>
				</div>
				<button
					onClick={() => setShowQuickModal(true)}
					className='text-lime-400 border border-lime-400 text-xs px-3 py-1 rounded ml-7 w-max'>
					Enable
				</button>
			</div>

			{/* Quick Withdrawal Modal */}
			<Transition
				appear
				show={showQuickModal}
				as={Fragment}>
				<Dialog
					as='div'
					className='relative z-50'
					onClose={() => setShowQuickModal(false)}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black/60' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex items-center justify-center min-h-full px-4 py-8'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-md bg-[#121212] text-white px-6 py-10 align-middle shadow-xl'>
									<Dialog.Title className='text-base font-bold text-center'>
										Quick Withdrawal
									</Dialog.Title>
									<div className='bg-blue-900 text-xs text-blue-200 px-3 py-2 rounded my-4'>
										No security verification required for small withdrawals to
										verification-free addresses.
									</div>

									<p className='text-xs mb-2'>
										24h password-free limit{' '}
										<span className='font-semibold'>10000 USDT</span>
									</p>

									<label className='text-xs mb-1 block'>
										Single quick withdrawal limit
									</label>
									<Listbox
										value={selectedLimit}
										onChange={setSelectedLimit}>
										<div className='relative z-50 mb-6 text-[11px]'>
											<Listbox.Button className='w-full bg-zinc-800 border border-gray-600 px-4 py-2 text-left rounded text-xs flex items-center justify-between'>
												{selectedLimit}
												<ChevronDown className='w-4 h-4 text-gray-400' />
											</Listbox.Button>
											<Listbox.Options className='absolute z-[9999] mt-1 w-full bg-zinc-900 border border-gray-700 rounded-md text-xs'>
												{withdrawalLimits.map((limit, i) => (
													<Listbox.Option
														key={i}
														value={limit}
														className='px-4 py-2 hover:bg-zinc-700 cursor-pointer flex items-center justify-between'>
														{limit}
														{limit === selectedLimit && (
															<Check
																size={14}
																className='text-lime-400'
															/>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</div>
									</Listbox>

									<button
										onClick={() => {
											setShowQuickModal(false);
											setShowVerifyModal(true);
										}}
										className='w-full py-2 bg-lime-400 text-black font-semibold rounded-md'>
										Confirm
									</button>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Security Verification Modal */}
			<Transition
				appear
				show={showVerifyModal}
				as={Fragment}>
				<Dialog
					as='div'
					className='relative z-50'
					onClose={() => setShowVerifyModal(false)}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black/60' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex items-center justify-center min-h-full p-4'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='w-full max-w-sm transform overflow-hidden rounded-md bg-[#121212] text-white p-6 align-middle shadow-xl'>
									<Dialog.Title className='text-base font-bold text-center mb-4'>
										Security Verification
									</Dialog.Title>

									<label className='text-xs mb-1 block'>
										Email Verification (off****@gmail.com)
									</label>
									<div className='flex mb-6'>
										<input
											type='text'
											placeholder='Enter code'
											className='flex-1 bg-zinc-900 border border-gray-700 px-4 py-2 rounded-l-md text-xs'
										/>
										<button
											type='button'
											onClick={sendVerificationCode}
											className='bg-zinc-800 border border-l-0 border-gray-700 px-4 py-2 text-xs rounded-r-md text-lime-400 hover:text-lime-300'>
											{sendingCode ? 'Sending...' : 'Get code'}
										</button>
									</div>

									<button
										disabled
										className='w-full py-2 bg-zinc-700 text-gray-400 font-semibold rounded-md cursor-not-allowed'>
										Submit
									</button>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
