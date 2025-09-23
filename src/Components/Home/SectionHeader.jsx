import React from "react";

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl text-[#242253] font-bold leading-snug">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-500 text-base mt-2">{subtitle}</p>
      )}

      {/* Divider */}
      <div className="flex justify-center mt-4 mb-5">
        <div className="w-24 h-[2px] bg-[#bfbdff]"></div>
      </div>
    </div>
  );
};

export default SectionHeader;
