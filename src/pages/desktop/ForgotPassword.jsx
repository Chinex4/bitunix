import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
	});

	const {
		handleSubmit,
		register,
		formState: { errors, touchedFields },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className='md:min-h-screen grid grid-cols-1 lg:grid-cols-2'>
			{/* Left (desktop only) */}
			<div className='hidden lg:flex items-center justify-center bg-black text-white px-8'>
				<div className='text-center'>
					<img
						src='/mobile/login-img.webp'
						alt='Bitunix chest'
						className='max-w-sm mx-auto mb-6'
					/>
					<h2 className='text-3xl font-bold mb-2'>
						The crypto derivatives exchange with expertise
					</h2>
					<p className='text-gray-400'>Better Liquidity, Better Trading</p>
				</div>
			</div>

			{/* Right (Login Form) */}
			<div className='md:bg-white bg-black flex md:items-center justify-center px-6 py-12'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full max-w-md space-y-6'>
					<h2 className='text-3xl font-bold md:text-black text-white'>
						Forgot Password
					</h2>
					<p className='text-white px-4 py-2 rounded-lg text-xs bg-blue-300'>
						*For the security of your assets, you are not allowed to withdraw
						money within 24 hours after resetting your login password
					</p>

					{/* Email Input */}
					<div>
						<label
							htmlFor='email'
							className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
							Email
						</label>
						<input
							id='email'
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

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full bg-lime-500 hover:bg-lime-600 text-white md:text-black font-medium py-2 rounded-md hover:opacity-90'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
