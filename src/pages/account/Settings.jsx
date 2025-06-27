import { useState, useEffect, Fragment, useRef } from "react";
import { Pencil, Globe, UserCircle2 } from "lucide-react";
import { Dialog, Transition, Tab, Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { showPromise } from "../../utils/toast";
import { maskEmail } from "../../functions/helper";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";
import {
  updateNickname,
  updateLanguage,
} from "../../redux/user/userSettingsSlice";
import { getCroppedImg } from "../../utils/cropImageUtil";

const languages = [
  "English",
  "French",
  "German",
  "Chinese",
  "Spanish",
  "Arabic",
  "Portuguese",
  "Hindi",
  "Russian",
  "Japanese",
];

const avatarList = Array.from(
  { length: 16 },
  (_, i) => `/avatars/a${i + 1}.png`
);

const Settings = () => {
  const { user: fetchedUser } = useFetchLoggedInUser();
  const username = fetchedUser?.message?.userDetails?.username;
  const email = fetchedUser?.message?.userDetails?.email;
  const userNickname = username || email;

  const fileInputRef = useRef();
  const [openModal, setOpenModal] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/a1.png");
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [rawImageFile, setRawImageFile] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImagePreview(reader.result);
      reader.readAsDataURL(file);
      setRawImageFile(file);
    }
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleAvatarSave = async () => {
    try {
      const formData = new FormData();

      if (selectedTab === 0 && selectedAvatar) {
        // 1. Convert /public avatar image to Blob
        const res = await fetch(selectedAvatar); // e.g. /avatars/a1.png
        const blob = await res.blob();
        const filename = selectedAvatar.split("/").pop(); // a1.png

        // 2. Send it as an actual file
        formData.append("documents", blob, filename);
      } else if (rawImageFile && croppedAreaPixels) {
        // 3. For uploaded and cropped image
        const croppedBlob = await getCroppedImg(
          rawImageFile,
          croppedAreaPixels,
          true
        );
        formData.append("documents", croppedBlob, rawImageFile.name);
      }

      // 4. POST to PHP backend with proper multipart headers
      await showPromise(
        axiosInstance.post("/user/updateAvatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading image...",
          success: "Profile picture updated!",
          error: "Failed to update profile picture",
        }
      );

      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const isSaveEnabled = selectedAvatar || uploadedImagePreview;

  const { nickname, language } = useSelector((state) => state.userSettings);
  const dispatch = useDispatch();

  const [nicknameInput, setNicknameInput] = useState("");
  const [languageInput, setLanguageInput] = useState("English");

  useEffect(() => {
    setNicknameInput(nickname || "");
    setLanguageInput(language || "English");
  }, [nickname, language]);

  const closeModal = () => setOpenModal(null);

  const handleSaveNickname = async () => {
    try {
      await showPromise(
        axiosInstance.patch("/user/updateNickname", {
          nickname: nicknameInput,
        }),
        {
          loading: "Updating nickname...",
          success: "Nickname updated!",
          error: "Failed to update nickname",
        }
      );
      dispatch(updateNickname(nicknameInput));
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveLanguage = async () => {
    await showPromise(dispatch(updateLanguage(languageInput)).unwrap(), {
      loading: "Updating language...",
      success: "Language updated!",
      error: "Failed to update language",
    });
    closeModal();
  };

  return (
    <div className='p-4 text-white max-w-6xl mx-auto space-y-8'>
      <section>
        <h2 className='text-xl font-bold mb-4'>Profile</h2>
        <div className='space-y-6'>
          {/* Nickname */}
          <div className='bg-[#111] p-4 rounded-md flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-3 text-lime-400'>
                <UserCircle2 size={20} />
                <h3 className='font-semibold text-white'>Nickname</h3>
              </div>
              <p className='text-gray-400 text-xs'>Customize your nickname.</p>
            </div>
            <div className='flex gap-1 items-center text-xs'>
              <span>
                {userNickname?.includes("@") ?
                  maskEmail(userNickname)
                : userNickname}{" "}
                |
              </span>
              <button
                onClick={() => setOpenModal("nickname")}
                className='text-lime-400 font-medium'
              >
                {" "}
                Change
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className='bg-[#111] p-4 rounded-md flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-3 text-lime-400'>
                <UserCircle2 size={20} />
                <h3 className='font-semibold text-white'>Profile</h3>
              </div>
              <p className='text-gray-400 text-xs'>
                Choose or upload a profile picture.
              </p>
            </div>
            <div className='flex gap-2 items-center'>
              <img
                className='w-10 h-10 rounded-full'
                src={selectedAvatar || uploadedImagePreview}
                alt=''
              />
              <button
                onClick={() => setOpenModal("avatar")}
                className='text-lime-400 font-medium text-xs'
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-xl font-bold mb-4'>Push</h2>
        <div className='bg-[#111] p-4 rounded-md'>
          <div className='flex items-center gap-3 text-lime-400'>
            <Globe size={20} />
            <h3 className='font-semibold text-white'>Language</h3>
          </div>
          <p className='text-gray-400 text-sm'>
            Used for push/email/message preferences.
          </p>
          <div className='flex justify-between mt-2'>
            <span>{language || "English"}</span>
            <button
              onClick={() => setOpenModal("language")}
              className='text-lime-400 font-medium'
            >
              Change
            </button>
          </div>
        </div>
      </section>

      {/* Nickname Modal */}
      <AnimatedModal
        isOpen={openModal === "nickname"}
        onClose={closeModal}
        title='Change Nickname'
      >
        <input
          value={nicknameInput}
          onChange={(e) => setNicknameInput(e.target.value)}
          className='bg-black border border-gray-600 rounded-md p-2 w-full'
          placeholder='Max 20 characters'
        />
        <div className='flex gap-2 mt-4'>
          <button
            onClick={closeModal}
            className='w-full py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNickname}
            className='w-full py-2 bg-lime-400 text-black font-semibold rounded-md'
          >
            Save
          </button>
        </div>
      </AnimatedModal>

      {/* Avatar Modal */}
      <AnimatedModal
        isOpen={openModal === "avatar"}
        onClose={closeModal}
        title='Change Profile Picture'
      >
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className='flex border-b mb-4'>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 ${selected ? "border-b-2 border-white font-bold" : "text-gray-400"}`
              }
            >
              Select Avatar
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-2 px-4 ${selected ? "border-b-2 border-white font-bold" : "text-gray-400"}`
              }
            >
              Upload Image
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className='grid grid-cols-4 gap-3'>
                {avatarList.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`avatar-${i}`}
                    onClick={() => {
                      setSelectedAvatar(src);
                      handleAvatarSave();
                    }}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 ${selectedAvatar === src ? "border-lime-400" : "border-transparent"}`}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {!uploadedImagePreview ?
                <div
                  className='border border-dashed border-gray-400 py-16 text-center rounded-md cursor-pointer'
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    ref={fileInputRef}
                    onChange={onSelectFile}
                  />
                  <p>Upload or drag and drop</p>
                </div>
              : <div className='relative w-full h-64 bg-black mb-4'>
                  <Cropper
                    image={uploadedImagePreview}
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
              }
              <div className='flex justify-end gap-3 mt-4'>
                <button
                  onClick={closeModal}
                  className='px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md'
                >
                  Cancel
                </button>
                <button
                  disabled={!isSaveEnabled}
                  onClick={handleAvatarSave}
                  className={`px-4 py-2 rounded-md font-semibold ${isSaveEnabled ? "bg-lime-400 text-black hover:bg-lime-500" : "bg-gray-500 text-white cursor-not-allowed"}`}
                >
                  Save
                </button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </AnimatedModal>

      {/* Language Modal */}
      <AnimatedModal
        isOpen={openModal === "language"}
        onClose={closeModal}
        title='Change Language'
      >
        <Listbox value={languageInput} onChange={setLanguageInput}>
          <div className='relative'>
            <Listbox.Button className='w-full p-2 bg-black border border-gray-600 rounded-md text-white flex justify-between items-center'>
              <span>{languageInput}</span>
              <ChevronDown className='w-4 h-4' />
            </Listbox.Button>
            <Listbox.Options className='absolute z-10 mt-2 w-full max-h-60 overflow-y-auto bg-[#111] text-white border border-gray-600 rounded-md shadow-lg'>
              {languages.map((lang, idx) => (
                <Listbox.Option
                  key={idx}
                  value={lang}
                  className={({ active }) =>
                    `cursor-pointer px-4 py-2 text-sm ${active ? "bg-lime-400 text-black" : ""}`
                  }
                >
                  {({ selected }) => (
                    <div className='flex justify-between items-center'>
                      <span>{lang}</span>
                      {selected && <Check className='w-4 h-4' />}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <button
          onClick={handleSaveLanguage}
          className='mt-4 w-full py-2 bg-lime-400 text-black font-semibold rounded-md'
        >
          Save
        </button>
      </AnimatedModal>
    </div>
  );
};

// Modal wrapper
const AnimatedModal = ({ isOpen, onClose, title, children }) => (
  <Transition show={isOpen} as={Fragment}>
    <Dialog as='div' className='relative z-50' onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
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
          leaveTo='opacity-0 scale-95'
        >
          <Dialog.Panel className='bg-[#111] p-6 rounded-md w-[90%] max-w-md space-y-4 text-white shadow-xl'>
            <Dialog.Title className='text-lg font-semibold'>
              {title}
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition>
);

export default Settings;
