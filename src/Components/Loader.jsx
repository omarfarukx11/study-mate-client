import React from "react";

const Loader = ({ fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen
          ? "fixed inset-0 bg-white/70 backdrop-blur-sm z-50"
          : "w-full h-64"
      }`}
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#5BBC2E]/20 border-t-[#5BBC2E] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-[#5BBC2E]/30 border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-[#5BBC2E] rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
