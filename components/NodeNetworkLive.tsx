import React from "react";

const NodeNetworkLive = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white rounded-full border border-[#444444] max-w-max mx-auto">
      <div className="flex items-center justify-between px-[15px] py-[5px]">
        <span className="text-lg mr-[5px] tracking-wide">
          Node Network Live
        </span>

        <div className="w-4 h-4 rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0D2D19] rounded-full"></div>
          <div className="absolute inset-0 bg-[#22C55E] rounded-full animate-ping shadow-[0_0_6px_3px_rgba(34,197,94,0.8)]"></div>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(34,197,94,0)_60%)]"></div>
        </div>
      </div>
    </div>
  );
};

export default NodeNetworkLive;
