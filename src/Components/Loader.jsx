import React from "react";

const Loader = () => {
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50 transition-opacity duration-500">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-[#5BBC2E]/20 border-t-[#5BBC2E] rounded-full animate-spin"></div>

        {/* Middle ring */}
        <div className="absolute inset-2 border-4 border-[#5BBC2E]/30 border-t-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-[#5BBC2E] rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
