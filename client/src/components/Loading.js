import React from "react";
import backgroundImage from '../assets/background-image.jpg'; 

const Loading = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="backdrop-blur-sm bg-[#8a88af4d] border border-[#3831bd4d] p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-white mb-4">Please Wait</h1>
        <p className="text-lg text-gray-200 mb-2">We are processing your request.</p>
        <p className="text-md text-gray-300">This might take a few seconds, thank you for your patience.</p>
      </div>
    </div>
  );
};

export default Loading;
