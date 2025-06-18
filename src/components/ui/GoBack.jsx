import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className='mb-4 flex items-center text-gray-300 hover:text-white'
    >
      <ArrowLeft className='mr-2' size={18} />
      <span className='text-sm'>Back</span>
    </button>
  );
};

export default GoBack;
