import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function IdentityPrepModal({ isOpen, onClose, onProceed }) {
	return (
		<Transition
			appear
			show={isOpen}
			as={Fragment}>
			<Dialog
				as='div'
				className='relative z-50'
				onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-50' />
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
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-bold text-white'>
									Identity Verification
								</Dialog.Title>
								<p className='mt-2 text-sm text-gray-400'>
									Please make sure that the image you take is clear and that all
									the information on your documents is complete and visible.
								</p>

								<div className='flex justify-center my-4'>
									<img
										src='/verification_samples/vsample.webp'
										alt='Correct Example'
										className='w-32'
									/>
								</div>

								<ul className='grid grid-cols-3 text-center text-xs text-gray-300 gap-2'>
									<li>
										<img
											src='/verification_samples/vmissingborder.webp'
											alt='Missing border'
											className='mx-auto w-16'
										/>
										<p className='text-red-500 mt-1'>Missing border</p>
									</li>
									<li>
										<img
											src='/verification_samples/vreflected.webp'
											alt='Reflected'
											className='mx-auto w-16'
										/>
										<p className='text-red-500 mt-1'>Reflected or obscured</p>
									</li>
									<li>
										<img
											src='/verification_samples/vblurred.webp'
											alt='Blurred'
											className='mx-auto w-16'
										/>
										<p className='text-red-500 mt-1'>Blurred photo</p>
									</li>
								</ul>

								<div className='mt-4'>
									<button
										type='button'
										className='w-full bg-lime-400 text-black font-semibold py-2 rounded-md'
										onClick={onProceed}>
										Verify Now
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
