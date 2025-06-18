import { useState, useEffect, Fragment, useRef } from 'react';
import { Pencil, Globe, UserCircle2, Palette } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateNickname,
	updateLanguage,
} from '../../redux/user/userSettingsSlice';
import { showPromise } from '../../utils/toast'; // adjust import if needed
import useFetchLoggedInUser from '../../hooks/useFetchedLoggedInUser';
import { maskEmail } from '../../functions/helper';
import Cropper from 'react-easy-crop';
import { Tab } from '@headlessui/react';
import { getCroppedImg } from '../../utils/cropImageUtil';

const avatarList = Array.from(
	{ length: 16 },
	(_, i) => `/avatars/a${i + 1}.png`
);

const Settings = () => {
	const { user: fetchedUser, error, loading } = useFetchLoggedInUser();
	const email = fetchedUser?.message?.userDetails.email ?? '';
	const [openModal, setOpenModal] = useState(null);

	const fileInputRef = useRef();
	const [selectedTab, setSelectedTab] = useState(0);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const onSelectFile = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = () => setUploadedImage(reader.result);
			reader.readAsDataURL(file);
		}
	};

	const onCropComplete = (_, croppedPixels) => {
		setCroppedAreaPixels(croppedPixels);
	};

	const handleAvatarSave = async () => {
		if (selectedTab === 0 && selectedAvatar) {
			console.log('Selected Avatar:', selectedAvatar);
		} else if (uploadedImage && croppedAreaPixels) {
			const croppedImage = await getCroppedImg(
				uploadedImage,
				croppedAreaPixels
			);
			console.log('Cropped Uploaded Image:', croppedImage);
		}
		closeModal();
	};

	const isSaveEnabled = selectedAvatar || uploadedImage;

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
		<div className='p-4 text-white max-w-6xl mx-auto space-y-8'>
			{/* Profile Section */}
			<section classname=''>
				<h2 className='text-xl font-bold mb-4'>Profile</h2>

				<div className='space-y-6'>
					{/* Nickname */}
					<div className='bg-[#111] p-4 rounded-md space-y-1 flex justify-between items-center'>
						<div>
							<div className='flex items-center gap-3 text-lime-400'>
								<UserCircle2 size={20} />
								<h3 className='font-semibold text-white'>Nickname</h3>
							</div>
							<p className='text-gray-400 text-xs'>
								Customize your Bitunix nickname, which will be displayed in your
								profile and social modules.
							</p>
						</div>
						<div className='flex justify-between mt-2 text-xs gap-1 items-center'>
							<span>{nickname || maskEmail(email)} | </span>
							<button
								onClick={() => setOpenModal('nickname')}
								className='text-lime-400 font-medium'>
								{' '}
								Change
							</button>
						</div>
					</div>

					{/* Profile Picture */}
					<div className='bg-[#111] p-4 rounded-md space-y-1 flex justify-between items-center'>
						<div>
							<div className='flex items-center gap-3 text-lime-400'>
								<UserCircle2 size={20} />
								<h3 className='font-semibold text-white'>Profile</h3>
							</div>
							<p className='text-gray-400 text-xs'>
								Personalize your profile by choosing from provided avatars.
							</p>
						</div>
						<div className='flex justify-between mt-2 text-xs gap-1 items-center'>
							<img
								className='size-10 rounded-full '
								src={selectedAvatar || uploadedImage}
								alt=''
							/>
							<button
								onClick={() => setOpenModal('avatar')}
								className='text-lime-400 font-medium'>
								Change
							</button>
						</div>
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
					placeholder='Maximum 20 Characters'
				/>
				<p className='text-xs text-neutral'>
					Nicknames will be used in the personal profile, copy tradings, and
					various activity pages, and will be visible to other users. Nicknames
					can only be changed once per 1 day(s). Bitunix will review the
					nickname change request. If it contains insulting words, politically
					sensitive words, etc., it will not be approved. Bitunix reserves the
					right to change nicknames that are not in compliance with the law or
					to impose punishments such as account bans. Nickname review will take
					some time, you can not repeat the submission of changes during the
					review process, please wait patiently.
				</p>
				<div className='flex items-center gap-2 mt-4'>
					<button
						onClick={closeModal}
						className='w-full py-2 bg-neutral-700 hover:bg-neutral-600 text-black font-semibold rounded-md'>
						Cancel
					</button>
					<button
						onClick={handleSaveNickname}
						className='w-full py-2 bg-lime-400 text-black font-semibold rounded-md'>
						Save
					</button>
				</div>
			</AnimatedModal>

			<AnimatedModal
				isOpen={openModal === 'avatar'}
				onClose={closeModal}
				title='Change Profile Picture'>
				<Tab.Group
					selectedIndex={selectedTab}
					onChange={setSelectedTab}>
					<Tab.List className='flex border-b mb-4'>
						<Tab
							className={({ selected }) =>
								`py-2 px-4 ${
									selected
										? 'border-b-2 border-white font-bold'
										: 'text-gray-400'
								}`
							}>
							Select an avatar
						</Tab>
						<Tab
							className={({ selected }) =>
								`py-2 px-4 ${
									selected
										? 'border-b-2 border-white font-bold'
										: 'text-gray-400'
								}`
							}>
							Upload image
						</Tab>
					</Tab.List>

					<Tab.Panels>
						<Tab.Panel>
							<div className='grid grid-cols-4 gap-3 mb-4'>
								{avatarList.map((src, i) => (
									<img
										key={i}
										src={src}
										alt={`avatar-${i}`}
										onClick={() => setSelectedAvatar(src)}
										className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
											selectedAvatar === src
												? 'border-lime-400'
												: 'border-transparent'
										}`}
									/>
								))}
							</div>
						</Tab.Panel>

						<Tab.Panel>
							{!uploadedImage ? (
								<div
									className='border border-dashed border-gray-400 py-[7rem] text-center rounded-md cursor-pointer'
									onClick={() => fileInputRef.current.click()}>
									<input
										type='file'
										accept='image/*'
										className='hidden'
										ref={fileInputRef}
										onChange={onSelectFile}
									/>
									<p>Upload an Image or Drag and Drop</p>
									<p className='text-xs mt-1 text-gray-400'>
										Supports JPG, PNG, and GIF formats, up to 10 MB
									</p>
								</div>
							) : (
								<div className='relative w-full h-64 bg-black mb-4'>
									<Cropper
										image={uploadedImage}
										crop={crop}
										zoom={zoom}
										aspect={1}
										cropShape='round'
										showGrid={false}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
									/>
								</div>
							)}
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<div className='flex justify-end gap-3 mt-4'>
					<button
						onClick={closeModal}
						className='px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600'>
						Cancel
					</button>
					<button
						disabled={!isSaveEnabled}
						onClick={handleAvatarSave}
						className={`px-4 py-2 rounded-md font-semibold ${
							isSaveEnabled
								? 'bg-lime-400 text-black hover:bg-lime-500'
								: 'bg-gray-500 cursor-not-allowed text-white'
						}`}>
						Save
					</button>
				</div>
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
							{/* <button
								onClick={onClose}
								className='w-full py-2 bg-gray-700 rounded-md text-white mt-2'>
								Cancel
							</button> */}
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Settings;
