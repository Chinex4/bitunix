import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DisableAccount() {
	const navigate = useNavigate();
	const [confirmed, setConfirmed] = useState(false);

	const handleDisable = () => {
		console.log('Account disabled');
		// Handle disable logic
	};

	return (
		<div className='max-w-2xl mx-auto text-white px-4 py-6'>
			{/* Go Back */}
			<button
				onClick={() => navigate(-1)}
				className='mb-4 flex items-center text-gray-300 hover:text-white'>
				<ArrowLeft
					className='mr-2'
					size={18}
				/>
				<span className='text-sm'>Back</span>
			</button>

			<h2 className='text-2xl font-bold mb-4'>Disable account</h2>

			<div className='bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6 space-y-2'>
				<p>
					*After disabling your account, most operations will be restricted,
					including login, trading, deposits, and withdrawals. Please proceed
					with caution.
				</p>
				<p>
					*Ensure that you have no active positions and have completed all
					deposit, withdrawal, and trading processes before disabling your
					account.
				</p>
			</div>

			<div className='text-sm text-gray-300 space-y-2 mb-6'>
				<p className='font-semibold text-white'>
					After disabling your account, the following actions will occur:
				</p>
				<ul className='list-disc list-inside space-y-1'>
					<li>Account will be forced log out and suspended from login</li>
					<li>Trading, deposits, and withdrawals will be disabled</li>
					<li>All pending orders linked to this account will be canceled</li>
					<li>
						All pending withdrawal requests for this account will be canceled
					</li>
					<li>
						API keys associated with this account and API functionality will be
						deleted and disabled
					</li>
					<li>
						To restore your account, please contact customer service and
						complete identity verification
					</li>
				</ul>
			</div>

			{/* Checkbox */}
			<div className='mb-6'>
				<label className='inline-flex items-start gap-2 text-sm'>
					<input
						type='checkbox'
						checked={confirmed}
						onChange={(e) => setConfirmed(e.target.checked)}
						className='mt-1 accent-lime-500'
					/>
					<span>
						I understand and accept all the consequences of disabling my account
					</span>
				</label>
			</div>

			{/* Submit Button */}
			<button
				disabled={!confirmed}
				onClick={handleDisable}
				className={`w-full py-2 rounded-md font-semibold ${
					!confirmed
						? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
						: 'bg-red-600 hover:bg-red-700 text-white'
				}`}>
				Disable account
			</button>
		</div>
	);
}
