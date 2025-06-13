export default function UploadIDPage({ data, onBack }) {
	return (
		<div className='max-w-6xl mx-auto text-white px-4 py-6'>
			<h2 className='text-2xl font-bold mb-4'>Basic Verification</h2>
			<div className='bg-[#1a1a1a] p-3 text-sm text-gray-400 rounded-md mb-6'>
				❗Please upload a clear photo ID. Only PNG, JPEG formats supported, max
				5MB.
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
				<div className='border border-dashed border-gray-600 p-6 text-center rounded-md'>
					<p className='mb-2'>Upload front side of the ID</p>
					<input
						type='file'
						accept='image/*'
						className='hidden'
						id='front'
					/>
					<label
						htmlFor='front'
						className='bg-zinc-800 text-sm px-4 py-2 rounded-md inline-block cursor-pointer'>
						📤 Upload image
					</label>
				</div>

				<div className='border border-dashed border-gray-600 p-6 text-center rounded-md'>
					<p className='mb-2'>Upload back side of the ID</p>
					<input
						type='file'
						accept='image/*'
						className='hidden'
						id='back'
					/>
					<label
						htmlFor='back'
						className='bg-zinc-800 text-sm px-4 py-2 rounded-md inline-block cursor-pointer'>
						📤 Upload image
					</label>
				</div>
			</div>

			<div className='flex gap-4'>
				<button
					type='button'
					onClick={onBack}
					className='bg-zinc-700 text-gray-400 py-2 px-6 rounded-md'>
					Back
				</button>
				<button className='bg-lime-500 hover:bg-lime-600 text-black py-2 px-6 rounded-md'>
					Submit
				</button>
			</div>
		</div>
	);
}
