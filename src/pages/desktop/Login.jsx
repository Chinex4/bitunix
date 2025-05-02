import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const schema = Yup.object().shape({
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	const {
		handleSubmit,
		register,
		formState: { errors, touchedFields },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log('Login submitted:', data);
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
					<h2 className='text-4xl font-bold md:text-black text-white'>
						Log in
					</h2>

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

					{/* Password Input */}
					<div>
						<label
							htmlFor='password'
							className='block text-sm md:text-gray-700 text-gray-300 mb-1'>
							Password
						</label>
						<div className='relative'>
							<input
								id='password'
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
								className='absolute right-3 top-2.5 text-gray-400 hover:text-white'>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
						</div>
						{errors.password && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full bg-lime-500 hover:bg-lime-600 text-white md:text-black font-medium py-2 rounded-md hover:opacity-90'>
						Log in
					</button>

					{/* Links */}
					<div className='flex justify-between text-sm text-gray-500 md:text-gray-400'>
						<p>
							No account yet?{' '}
							<Link
								href='/register'
								className='underline text-white md:text-lime-400 font-semibold'>
								Sign up
							</Link>
						</p>
						<Link
							to='/forgot-password'
							className='underline text-white md:text-lime-400 font-semibold'>
							Forgot password
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
