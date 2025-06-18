import React, { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import GoBack from "../../components/ui/GoBack";

const BindGoogleAuthenticator = () => {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const secretKey = "T6VUQP3TUGG5HO6B";
  const qrValue = `otpauth://totp/YourAppName?secret=${secretKey}&issuer=YourApp`;
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    showSuccess("Backup Key Copied");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted code:", code);
    // Send to backend for verification
  };

  return (
    <div className='max-w-3xl mx-auto text-white px-4 py-8'>
      {/* Header */}
      <GoBack />
      <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>
        Bind Google Authenticator
      </h2>

      {/* Step 1 */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>1. Download Google Authenticator</h3>
        <p className='text-sm text-gray-300 mb-3'>
          iOS: search "Authenticator" in the App Store to download
          <br />
          Android: Search "Google Authenticator" in app store or mobile browser
          to download.
        </p>
        <div className='flex gap-4'>
          <a
            href='https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-gray-600 rounded-md px-4 py-2'
          >
            ▶ Google Play
          </a>
          <a
            href='https://apps.apple.com/app/google-authenticator/id388497605'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-gray-600 rounded-md px-4 py-2'
          >
             APP Store
          </a>
        </div>
      </div>

      {/* Step 2 */}
      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>2. Configure and backup the key.</h3>
        <p className='text-sm text-gray-300 mb-2'>
          Open Google Authenticator and scan the QR code or manually enter the
          key below to add the verification token.
        </p>
        <p className='text-sm text-red-500 font-medium mb-3'>
          In case you lose Google Authenticator, you can recover it using the
          provided key. Keep the key safe and do not share it with anyone.
        </p>
        <div className='flex items-center gap-3 mb-2'>
          <QRCodeCanvas value={qrValue} size={128} />
          <div>
            <p className='mt-3 font-semibold'>{secretKey}</p>
            <button
              onClick={handleCopy}
              className='text-green-400 text-sm mt-1 flex items-center gap-1'
            >
              {copied ?
                <>
                  <Check className='w-4 h-4' /> Copied
                </>
              : "Copy the key"}
            </button>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div>
        <h3 className='font-semibold mb-2'>
          3. Enter Google Authenticator code to verify
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full p-2 rounded bg-[#1f1f1f] text-white border border-gray-600 mb-4'
          />
          <button
            type='submit'
            disabled={!code}
            className={`w-full py-2 rounded ${
              code ?
                "bg-white text-black"
              : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BindGoogleAuthenticator;
