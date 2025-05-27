import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyEmailOtp } from '../../redux/auth/authThunk';

const VerifyEmailModal = ({ isOpen, setIsOpen, userEmail, onResend }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector((state) => state.auth.verifyLoading);
	const [otpArray, setOtpArray] = useState(new Array(6).fill(''));
	const inputRefs = useRef([]);
	const [error, setError] = useState('');
	const [cooldown, setCooldown] = useState(30);

	useEffect(() => {
		if (!isOpen) setOtpArray(new Array(6).fill(''));
	}, [isOpen]);

	useEffect(() => {
		let timer;
		if (cooldown > 0) {
			timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [cooldown]);

	const handleChange = (index, value) => {
		if (!/^[0-9]?$/.test(value)) return;

		const newOtp = [...otpArray];
		newOtp[index] = value;
		setOtpArray(newOtp);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleVerify = async () => {
		const otp = otpArray.join('');
		if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
			setError('Please enter a valid 6-digit code');
			return;
		}
		setError('');
		const result = await dispatch(
			verifyEmailOtp({ email: userEmail, otp, role: 'user' })
		).unwrap();

		if (result?.status === 'success' || result?.verified) {
			setIsOpen(false);
			navigate('/dashboard'); // or any route
		}
	};

	return (
		<Transition
			appear
			show={isOpen}
			as={Fragment}>
			<Dialog
				as='div'
				className='relative z-50'
				onClose={() => setIsOpen(false)}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black bg-opacity-60' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-xl bg-[#171717] p-6 text-left align-middle shadow-xl transition-all'>
								<Dialog.Title
									as='h3'
									className='text-lg font-bold leading-6 text-white text-center'>
									Security Verification
								</Dialog.Title>

								<div className='mt-4 text-sm text-gray-300 text-center'>
									Email verification sent to <br />
									<span className='font-medium text-lime-400'>{userEmail}</span>
								</div>

								<div className='mt-6'>
									<label className='block mb-1 text-sm font-medium text-gray-200 text-center'>
										Enter 6-digit OTP
									</label>
									<div className='flex justify-center gap-2'>
										{otpArray.map((digit, idx) => (
											<input
												key={idx}
												ref={(el) => (inputRefs.current[idx] = el)}
												type='text'
												maxLength={1}
												value={digit}
												onChange={(e) => handleChange(idx, e.target.value)}
												className='w-10 h-12 text-center rounded-md border border-gray-600 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-lime-400'
											/>
										))}
									</div>
									{error && (
										<p className='text-red-500 text-sm mt-2 text-center'>
											{error}
										</p>
									)}
									<div className='mt-4 text-center'>
										<button
											type='button'
											onClick={() => {
												if (cooldown === 0) {
													onResend();
													setCooldown(30);
												}
											}}
											disabled={cooldown > 0}
											className={`text-sm ${
												cooldown === 0
													? 'text-lime-400 hover:underline'
													: 'text-gray-500 cursor-not-allowed'
											}`}>
											{cooldown === 0
												? 'Resend Code'
												: `Resend in ${cooldown}s`}
										</button>
									</div>
								</div>

								<div className='mt-6'>
									<button
										type='button'
										onClick={handleVerify}
										className='w-full inline-flex justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-white hover:bg-lime-700 transition'>
										{loading ? (
											<div className='flex items-center justify-center gap-2'>
												<svg
													className='animate-spin h-4 w-4 text-white'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'>
													<circle
														className='opacity-25'
														cx='12'
														cy='12'
														r='10'
														stroke='currentColor'
														strokeWidth='4'></circle>
													<path
														className='opacity-75'
														fill='currentColor'
														d='M4 12a8 8 0 018-8v8H4z'></path>
												</svg>
												Verifying...
											</div>
										) : (
											'Submit'
										)}
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default VerifyEmailModal;
