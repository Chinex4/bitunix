import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Controller } from 'react-hook-form';

const CountrySelector = ({ control, errors, setTouched }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
				const data = await res.json();
				const formatted = data
					.map((country) => ({
						name: country.name.common,
						flag: country.flags?.svg || country.flags?.png,
					}))
					.sort((a, b) => a.name.localeCompare(b.name));
				setCountries(formatted);
			} catch (error) {
				console.error('Failed to fetch countries:', error);
			}
		};

		fetchCountries();
	}, []);

	return (
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
							<Listbox.Button className='w-full bg-zinc-900 border border-gray-700 text-left px-4 py-2 rounded-md text-sm flex items-center justify-between'>
								{field.value ? (
									<div className='flex items-center gap-2'>
										<img
											src={field.value.flag}
											alt='flag'
											className='w-5 h-3 object-cover'
										/>
										<span>{field.value.name}</span>
									</div>
								) : (
									<span className='text-gray-400'>Select your country</span>
								)}
								<ChevronUpDownIcon className='w-4 h-4 text-gray-400' />
							</Listbox.Button>
							<Listbox.Options className='absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-zinc-800 border border-gray-700 rounded-md text-sm'>
								{countries.map((c) => (
									<Listbox.Option
										key={c.name}
										value={c}
										className='px-4 py-2 flex items-center gap-2 hover:bg-zinc-700 cursor-pointer'>
										<img
											src={c.flag}
											alt={`${c.name} flag`}
											className='w-5 h-3 object-cover'
										/>
										{c.name}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</div>
					</Listbox>
				)}
			/>
			{errors.country && (
				<p className='text-red-500 text-sm mt-1'>{errors.country.message}</p>
			)}
		</div>
	);
};

export default CountrySelector;
