import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);

	const schema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(6, 'Minimum 6 characters')
			.required('Password is required'),
		agreement: Yup.boolean().oneOf([true], 'You must accept the terms'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log('Signup submitted:', data);
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
			{/* Left side image/marketing */}
			<div className='hidden lg:flex items-center justify-center bg-black text-white px-8'>
				<div className='text-center'>
					<img
						src='/mobile/signup-img.webp' // Update your image path
						alt='Bitunix vending'
						className='max-w-sm mx-auto mb-6'
					/>
					<h2 className='text-2xl font-bold mb-2'>Exclusive for newcomers!</h2>
					<p className='text-lime-400 text-lg font-semibold'>
						Avail 8000+ USDT Worth of <br />
						Newcomer Rewards
					</p>
				</div>
			</div>

			{/* Right side form */}
			<div className='md:bg-white bg-black flex md:items-center justify-center px-6 py-12'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full max-w-md space-y-6'>
					<h2 className='text-4xl font-bold md:text-black text-white'>
						Sign up
					</h2>

					{/* Email */}
					<div>
						<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
							Email
						</label>
						<input
							type='email'
							{...register('email')}
							className={`w-full px-4 py-2 border rounded-md md:bg-white bg-zinc-900 md:text-black text-white ${
								errors.email ? 'border-red-500' : 'border-gray-300'
							}`}
							placeholder='Enter email address'
						/>
						{errors.email && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
							Password
						</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
								className={`w-full px-4 py-2 border rounded-md md:bg-white bg-zinc-900 md:text-black text-white ${
									errors.password ? 'border-red-500' : 'border-gray-300'
								}`}
								placeholder='Please Enter Your Password'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-2 text-gray-500'>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
						{errors.password && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Referral Code */}
					<div>
						<label className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
							Referral Code <span className='text-gray-400'>(Optional)</span>
						</label>
						<input
							type='text'
							{...register('referral')}
							className='w-full px-4 py-2 border border-gray-300 rounded-md md:bg-white bg-zinc-900 md:text-black text-white'
							placeholder='Enter code if any'
						/>
					</div>

					{/* Agreement */}
					<div className='text-sm md:text-gray-700 text-gray-300 flex items-start gap-2'>
						<input
							type='checkbox'
							{...register('agreement')}
							className='mt-1'
						/>
						<p>
							I have read and agree to the{' '}
							<Link
								to='/terms'
								className='underline text-lime-400'>
								Bitunix User Agreement
							</Link>{' '}
							and{' '}
							<Link
								href='/privacy'
								className='underline text-lime-400'>
								Bitunix Privacy Policy
							</Link>
							.
						</p>
					</div>
					{errors.agreement && (
						<p className='text-red-500 text-sm'>{errors.agreement.message}</p>
					)}

					{/* Submit */}
					<button
						type='submit'
						className='w-full bg-lime-500 hover:bg-lime-600 md:text-black text-white font-medium py-2 rounded-md hover:opacity-90'>
						Sign up
					</button>

					{/* Footer */}
					<div className='text-sm md:text-gray-500 text-gray-400 text-center'>
						Already have an account?{' '}
						<Link
							to='/login'
							className='underline text-white md:text-lime-400 font-semibold'>
							Log in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
