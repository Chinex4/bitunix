const DepositConfirmModal = ({ address, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
      <div className='bg-[#1A1A1A] p-6 rounded max-w-sm w-full text-center border border-gray-700'>
        <div className='text-yellow-400 text-3xl mb-3'>⚠️</div>
        <h3 className='text-white font-semibold mb-2'>
          To prevent loss of funds due to incorrect address,
        </h3>
        <p className='text-sm text-gray-400 mb-4'>
          please <strong>double check</strong> the wallet address when pasting.
        </p>
        <div className='bg-[#111] py-2 px-4 text-lime-400 font-semibold rounded mb-4'>
          {address.slice(0, 4)}
          <span className='text-white text-[10px]'>{address.slice(4, -4)}</span>
          <span className='text-lime-400 text-sm font-semibold'>{address.slice(-4)}</span>
        </div>
        <button
          onClick={onClose}
          className='bg-gray-700 hover:bg-gray-600 text-sm text-white px-4 py-2 rounded'
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default DepositConfirmModal;
