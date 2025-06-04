import React from "react";

const MobileUserTrigger = ({ setIsUserOpen }) => {
  return (
    <div className='md:hidden'>
      <div
        tabIndex={0}
        role='button'
        onClick={() => setIsUserOpen(true)}
        className='btn btn-ghost btn-sm'
      >
        <img src='/user-icon.svg' alt='User' className='w-6 h-6 rounded-full' />
      </div>
    </div>
  );
};

export default MobileUserTrigger;
