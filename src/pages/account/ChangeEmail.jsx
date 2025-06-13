import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useFetchLoggedInUser from '../../hooks/useFetchedLoggedInUser';
import { maskEmail } from '../../functions/helper';

const schema = Yup.object().shape({
	newEmail: Yup.string()
		.email('Invalid email')
		.required('New email is required'),
	newEmailCode: Yup.string().required('Code is required'),
	currentEmailCode: Yup.string().required('Code is required'),
});

export default function ChangeEmail() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
    const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
	const email = fetchedUser?.message?.userDetails.email ?? '';
	const navigate = useNavigate();

	const [sendingNewCode, setSendingNewCode] = useState(false);
	const [sendingCurrentCode, setSendingCurrentCode] = useState(false);

	const onSubmit = (data) => {
		console.log('Change Email Submission:', data);
		// TODO: dispatch action or call API
	};

	const sendNewEmailCode = () => {
		setSendingNewCode(true);
		// Simulate delay
		setTimeout(() => setSendingNewCode(false), 2000);
	};

	const sendCurrentEmailCode = () => {
		setSendingCurrentCode(true);
		// Simulate delay
		setTimeout(() => setSendingCurrentCode(false), 2000);
	};

	return (
		<div className='max-w-xl mx-auto text-white px-4 py-6'>
			<button
				onClick={() => navigate(-1)}
				className='mb-4 flex items-center text-gray-300 hover:text-white'>
				<ArrowLeft
					className='mr-2'
					size={18}
				/>
				<span className='text-sm'>Back</span>
			</button>
			<h2 className='text-2xl font-bold mb-4'>Change email</h2>
			<div className='bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6'>
				For fund safety, withdrawals prohibited within 24 hours after changing
				email.
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-6'>
				{/* New Email */}
				<div>
					<label className='block text-sm mb-1'>New email</label>
					<input
						type='email'
						{...register('newEmail')}
						placeholder='Enter new email'
						className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
					/>
					{errors.newEmail && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.newEmail.message}
						</p>
					)}
				</div>

				{/* New Email Code */}
				<div>
					<label className='block text-sm mb-1'>New email code</label>
					<div className='flex'>
						<input
							type='text'
							{...register('newEmailCode')}
							placeholder='Enter code'
							className='flex-1 bg-zinc-900 border border-gray-700 px-4 py-2 rounded-l-md text-sm'
						/>
						<button
							type='button'
							onClick={sendNewEmailCode}
							className='bg-zinc-800 border border-l-0 border-gray-700 px-4 py-2 text-sm rounded-r-md text-lime-400 hover:text-lime-300'>
							{sendingNewCode ? 'Sending...' : 'Get code'}
						</button>
					</div>
					{errors.newEmailCode && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.newEmailCode.message}
						</p>
					)}
				</div>

				{/* Security Verification */}
				<div>
					<h3 className='font-semibold text-xl mb-2'>
						Security Verification
					</h3>
					<label className='block text-sm mb-1'>
						Email Verification ({maskEmail(email)})
					</label>
					<div className='flex'>
						<input
							type='text'
							{...register('currentEmailCode')}
							placeholder='Enter code'
							className='flex-1 bg-zinc-900 border border-gray-700 px-4 py-2 rounded-l-md text-sm'
						/>
						<button
							type='button'
							onClick={sendCurrentEmailCode}
							className='bg-zinc-800 border border-l-0 border-gray-700 px-4 py-2 text-sm rounded-r-md text-lime-400 hover:text-lime-300'>
							{sendingCurrentCode ? 'Sending...' : 'Get code'}
						</button>
					</div>
					{errors.currentEmailCode && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.currentEmailCode.message}
						</p>
					)}
				</div>

				{/* Submit */}
				<button
					type='submit'
					disabled={!isValid}
					className={`w-full py-2 rounded-md font-semibold ${
						!isValid
							? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
							: 'bg-lime-500 hover:bg-lime-600 text-black'
					}`}>
					Submit
				</button>
			</form>
		</div>
	);
}
