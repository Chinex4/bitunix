import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import GoBack from "../../components/ui/GoBack";

const BindMobile = ({ onBack }) => {
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,idd");
        const data = await res.json();
        const formatted = data
          .filter((c) => c.idd?.root && c.idd?.suffixes?.length)
          .map((c) => ({
            name: c.name.common,
            code: `${c.idd.root}${c.idd.suffixes[0]}`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      } catch (err) {
        console.error("Failed to load countries:", err);
      }
    };
    fetchCountryCodes();
  }, []);

  const handleSendCode = () => {
    if (!phone) return;
    console.log(`Sending SMS to ${countryCode}${phone}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { phone, smsCode });
  };

  const isSubmitDisabled = !phone || !smsCode;

  return (
    <div className='max-w-2xl mx-auto px-4 py-8 text-white'>
      {/* Header */}
      <GoBack />
      <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>Bind mobile</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Mobile input */}
        <div>
          <label className='block mb-2 text-sm text-white'>Mobile</label>
          <div className='flex'>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className='bg-zinc-900 text-white border border-zinc-800 px-3 py-2 rounded-l-md text-sm w-[150px]'
            >
              {countries.map(({ name, code }) => (
                <option key={name} value={code}>
                  {name} ({code})
                </option>
              ))}
            </select>
            <input
              type='tel'
              placeholder='Enter mobile number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='flex-1 bg-zinc-900 text-white border border-l-0 border-zinc-800 px-3 py-2 rounded-r-md text-sm'
            />
          </div>
        </div>

        {/* SMS code input */}
        <div>
          <label className='block mb-2 text-sm text-white'>SMS code</label>
          <div className='flex'>
            <input
              type='text'
              placeholder='Enter code'
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value)}
              className='flex-1 bg-zinc-900 text-white border border-zinc-800 px-3 py-2 rounded-l-md text-sm'
            />
            <button
              type='button'
              onClick={handleSendCode}
              disabled={!phone}
              className='bg-transparent border border-zinc-800 px-4 py-2 text-sm text-gray-400 rounded-r-md hover:text-white'
            >
              Get code
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isSubmitDisabled}
          className={`w-full py-2 rounded text-sm ${
            isSubmitDisabled ?
              "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BindMobile;
