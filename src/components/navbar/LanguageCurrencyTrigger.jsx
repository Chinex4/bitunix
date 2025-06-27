import { useState, useRef, useEffect, Fragment } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import axiosInstance from "../../api/axiosInstance";
import { showPromise } from "../../utils/toast"; // if you use toast loading

export default function LanguageCurrencyTrigger() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("AUD – A$");
  const dropdownRef = useRef();

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = async (lang, code) => {
    setSelectedLanguage(lang);
    await showPromise(
      axiosInstance.post("/user/updateLanguage", { language: code }),
      {
        loading: "Saving language...",
        success: "Language saved successfully!",
        error: "Failed to save language.",
      }
    );
    setModalOpen(false);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    setModalOpen(false);
  };

  return (
    <div className='relative hidden md:block' ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className='btn btn-ghost btn-sm'
      >
        <Menu size={15} />
      </button>

      {dropdownOpen && (
        <div className='absolute right-0 mt-3 w-64 bg-[#121212] border border-stone-800 shadow-lg rounded-md p-4 z-50 text-white'>
          <div
            className='flex justify-between items-center cursor-pointer py-2 hover:bg-white/10 rounded'
            onClick={() => {
              setModalOpen(true);
              setDropdownOpen(false);
            }}
          >
            <p>Language & Region</p>
            <span className='text-gray-400 text-sm'>{selectedLanguage}</span>
          </div>
          <div
            className='flex justify-between items-center cursor-pointer py-2 hover:bg-white/10 rounded'
            onClick={() => {
              setModalOpen(true);
              setDropdownOpen(false);
            }}
          >
            <p>Currency</p>
            <span className='text-gray-400 text-sm'>{selectedCurrency}</span>
          </div>
        </div>
      )}

      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={() => setModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-60' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-md bg-[#121212] text-white p-6 text-left align-middle shadow-xl transition-all'>
                  <button
                    onClick={() => setModalOpen(false)}
                    className='absolute top-4 right-4 text-gray-400 hover:text-white'
                  >
                    <X size={18} />
                  </button>

                  <Tab.Group>
                    <Tab.List className='flex border-b border-gray-700 mb-4 text-sm'>
                      <Tab
                        className={({ selected }) =>
                          `px-4 py-2 outline-none ${selected ? "border-b-2 border-white text-white" : "text-gray-400"}`
                        }
                      >
                        Language & Region
                      </Tab>
                      <Tab
                        className={({ selected }) =>
                          `px-4 py-2 outline-none ${selected ? "border-b-2 border-white text-white" : "text-gray-400"}`
                        }
                      >
                        Currency
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <LanguageDropdown
                          selected={selectedLanguage}
                          onChange={handleLanguageChange}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <CurrencyDropdown
                          selected={selectedCurrency}
                          onChange={handleCurrencyChange}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
