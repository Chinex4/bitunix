import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const countries = ['Nigeria', 'Ghana', 'South Africa'];
const documentTypes = ['National ID', 'Driver’s License', 'Passport'];

const schema = Yup.object().shape({
	country: Yup.string().required('Country is required'),
	documentType: Yup.string().required('Document type is required'),
	idNumber: Yup.string().required('ID number is required'),
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	dateOfBirth: Yup.string().required('Date of birth is required'),
});

export default function BasicVerificationForm() {
	const [touched, setTouched] = useState(false);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			country: '',
			documentType: '',
			idNumber: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
		},
	});

	const onSubmit = (data) => {
		console.log('Submitted:', data);
	};

	return (
		<div className='max-w-2xl mx-auto text-white px-4 py-6 space-y-6'>
			<h2 className='text-2xl font-bold'>Basic Verification</h2>
			<div className='bg-[#1a1a1a] p-3 text-sm text-gray-400 rounded-md'>
				⚠ Make sure that the information entered matches the documents to be
				uploaded, otherwise they will be rejected.
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4'>
				{/* Country */}
				<div>
					<label className='block text-sm mb-1'>Country / Region</label>
					<Controller
						name='country'
						control={control}
						render={({ field }) => (
							<Listbox
								value={field.value}
								onChange={(value) => {
									field.onChange(value);
									setTouched(true);
								}}>
								<div className='relative'>
									<Listbox.Button className='w-full bg-zinc-900 border border-gray-700 text-left px-4 py-2 rounded-md text-sm'>
										{field.value || 'Select your country'}
										<ChevronUpDownIcon className='w-4 h-4 absolute right-2 top-2.5 text-gray-400' />
									</Listbox.Button>
									<Listbox.Options className='absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-md text-sm'>
										{countries.map((c) => (
											<Listbox.Option
												key={c}
												value={c}
												className='px-4 py-2 hover:bg-zinc-700 cursor-pointer'>
												{c}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</div>
							</Listbox>
						)}
					/>
					{errors.country && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.country.message}
						</p>
					)}
				</div>

				{/* Document Type */}
				<div>
					<label className='block text-sm mb-1'>Document Type</label>
					<Controller
						name='documentType'
						control={control}
						render={({ field }) => (
							<Listbox
								value={field.value}
								onChange={(value) => {
									field.onChange(value);
									setTouched(true);
								}}>
								<div className='relative'>
									<Listbox.Button className='w-full bg-zinc-900 border border-gray-700 text-left px-4 py-2 rounded-md text-sm'>
										{field.value || 'Select your document'}
										<ChevronUpDownIcon className='w-4 h-4 absolute right-2 top-2.5 text-gray-400' />
									</Listbox.Button>
									<Listbox.Options className='absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-md text-sm'>
										{documentTypes.map((doc) => (
											<Listbox.Option
												key={doc}
												value={doc}
												className='px-4 py-2 hover:bg-zinc-700 cursor-pointer'>
												{doc}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</div>
							</Listbox>
						)}
					/>
					{errors.documentType && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.documentType.message}
						</p>
					)}
				</div>

				{/* ID Number */}
				<div>
					<label className='block text-sm mb-1'>ID Number</label>
					<input
						{...register('idNumber', {
							onChange: () => setTouched(true),
						})}
						className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
						placeholder='Enter your ID number'
					/>
					{errors.idNumber && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.idNumber.message}
						</p>
					)}
				</div>

				{/* Name */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm mb-1'>First Name</label>
						<input
							{...register('firstName', {
								onChange: () => setTouched(true),
							})}
							className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
							placeholder='Enter your first name'
						/>
						{errors.firstName && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div>
						<label className='block text-sm mb-1'>Last Name</label>
						<input
							{...register('lastName', {
								onChange: () => setTouched(true),
							})}
							className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
							placeholder='Enter your last name'
						/>
						{errors.lastName && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				{/* Date of Birth */}
				<div>
					<label className='block text-sm mb-1'>Date of Birth</label>
					<input
						type='date'
						{...register('dateOfBirth', {
							onChange: () => setTouched(true),
						})}
						className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
					/>
					{errors.dateOfBirth && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.dateOfBirth.message}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={!isValid || !touched}
					className={`w-full py-2 rounded-md font-semibold ${
						!isValid || !touched
							? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
							: 'bg-lime-500 text-black hover:bg-lime-600'
					}`}>
					Next
				</button>
			</form>
		</div>
	);
}
