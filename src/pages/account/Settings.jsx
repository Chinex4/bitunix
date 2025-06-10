import { useState, useEffect, Fragment } from 'react';
import { Pencil, Globe, UserCircle2, Palette } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateNickname,
	updateLanguage,
} from '../../redux/user/userSettingsSlice';
import { showPromise } from '../../utils/toast'; // adjust import if needed

const Settings = () => {
	const [openModal, setOpenModal] = useState(null);

	const { nickname, language, status } = useSelector(
		(state) => state.userSettings
	);
	const dispatch = useDispatch();

	const [nicknameInput, setNicknameInput] = useState('');
	const [languageInput, setLanguageInput] = useState('English');

	useEffect(() => {
		setNicknameInput(nickname || '');
		setLanguageInput(language || 'English');
	}, [nickname, language]);

	const closeModal = () => setOpenModal(null);

	const handleSaveNickname = async () => {
		await showPromise(dispatch(updateNickname(nicknameInput)).unwrap(), {
			loading: 'Updating nickname...',
			success: 'Nickname updated!',
			error: 'Failed to update nickname',
		});
		closeModal();
	};

	const handleSaveLanguage = async () => {
		await showPromise(dispatch(updateLanguage(languageInput)).unwrap(), {
			loading: 'Updating language...',
			success: 'Language updated!',
			error: 'Failed to update language',
		});
		closeModal();
	};

	return (
		<div className='p-4 text-white max-w-3xl mx-auto space-y-8'>
			{/* Profile Section */}
			<section>
				<h2 className='text-xl font-bold mb-4'>Profile</h2>

				<div className='space-y-6'>
					{/* Nickname */}
					<div className='bg-[#111] p-4 rounded-md space-y-1'>
						<div className='flex items-center gap-3 text-lime-400'>
							<UserCircle2 size={20} />
							<h3 className='font-semibold text-white'>Nickname</h3>
						</div>
						<p className='text-gray-400 text-sm'>
							Customize your Bitunix nickname, which will be displayed in your
							profile and social modules.
						</p>
						<div className='flex justify-between mt-2'>
							<span>{nickname || 'hev****@bocapies.com'}</span>
							<button
								onClick={() => setOpenModal('nickname')}
								className='text-lime-400 font-medium'>
								Change
							</button>
						</div>
					</div>

					{/* Profile Picture */}
					<div className='bg-[#111] p-4 rounded-md space-y-1'>
						<div className='flex items-center gap-3 text-lime-400'>
							<UserCircle2 size={20} />
							<h3 className='font-semibold text-white'>Profile</h3>
						</div>
						<p className='text-gray-400 text-sm'>
							Personalize your profile by choosing from provided avatars.
						</p>
						<div className='flex justify-between items-center mt-2'>
							<div className='rounded-full bg-lime-400 w-8 h-8 flex items-center justify-center text-black font-bold'>
								U
							</div>
							<button
								onClick={() => setOpenModal('avatar')}
								className='text-lime-400 font-medium'>
								Change
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Settings Section */}
			<section>
				<h2 className='text-xl font-bold mb-4'>Settings</h2>

				{/* Color Settings */}
				<div className='bg-[#111] p-4 rounded-md space-y-1'>
					<div className='flex items-center gap-3 text-lime-400'>
						<Palette size={20} />
						<h3 className='font-semibold text-white'>Color Settings</h3>
					</div>
					<p className='text-gray-400 text-sm'>K-line color</p>
					<div className='flex justify-between mt-2'>
						<span>
							Green Up / Red Down <span className='text-red-500'>↓</span>
						</span>
						<span className='text-lime-400 font-medium'>Default</span>
					</div>
				</div>
			</section>

			{/* Push Section */}
			<section>
				<h2 className='text-xl font-bold mb-4'>Push</h2>

				{/* Language Settings */}
				<div className='bg-[#111] p-4 rounded-md space-y-1'>
					<div className='flex items-center gap-3 text-lime-400'>
						<Globe size={20} />
						<h3 className='font-semibold text-white'>Language</h3>
					</div>
					<p className='text-gray-400 text-sm'>
						Language settings for messages, SMS, emails, and push
					</p>
					<div className='flex justify-between mt-2'>
						<span>{language || 'English'}</span>
						<button
							onClick={() => setOpenModal('language')}
							className='text-lime-400 font-medium'>
							Change
						</button>
					</div>
				</div>
			</section>

			{/* MODALS */}
			<AnimatedModal
				isOpen={openModal === 'nickname'}
				onClose={closeModal}
				title='Change Nickname'>
				<input
					value={nicknameInput}
					onChange={(e) => setNicknameInput(e.target.value)}
					className='bg-black border border-gray-600 rounded-md p-2 w-full'
					placeholder='Enter new nickname'
				/>
				<button
					onClick={handleSaveNickname}
					className='mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded-md'>
					Save
				</button>
			</AnimatedModal>

			<AnimatedModal
				isOpen={openModal === 'avatar'}
				onClose={closeModal}
				title='Change Profile Picture'>
				<div className='grid grid-cols-4 gap-3'>
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							className='w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center font-bold text-black'>
							{i + 1}
						</div>
					))}
				</div>
				<button className='mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded-md'>
					Save Avatar
				</button>
			</AnimatedModal>

			<AnimatedModal
				isOpen={openModal === 'language'}
				onClose={closeModal}
				title='Change Language'>
				<select
					value={languageInput}
					onChange={(e) => setLanguageInput(e.target.value)}
					className='w-full p-2 bg-black border border-gray-600 rounded-md text-white'>
					<option>English</option>
					<option>French</option>
					<option>German</option>
					<option>Chinese</option>
				</select>
				<button
					onClick={handleSaveLanguage}
					className='mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded-md'>
					Save
				</button>
			</AnimatedModal>
		</div>
	);
};

// Headless UI Animated Modal
const AnimatedModal = ({ isOpen, onClose, title, children }) => {
	return (
		<Transition
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
					<div className='fixed inset-0 bg-black/80 backdrop-blur-sm' />
				</Transition.Child>

				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						<Dialog.Panel className='bg-[#111] p-6 rounded-md w-[90%] max-w-md space-y-4 text-white shadow-xl'>
							<Dialog.Title className='text-lg font-semibold'>
								{title}
							</Dialog.Title>
							{children}
							<button
								onClick={onClose}
								className='w-full py-2 bg-gray-700 rounded-md text-white mt-2'>
								Cancel
							</button>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Settings;
