"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NodeNetworkLive from "./NodeNetworkLive";

const MainContent = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".container-item",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" }
      );

      gsap.fromTo(
        ".stagger-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power1.out",
          stagger: 0.1,
          delay: 0.1,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="container-item relative pt-[52px] md:pt-[185px] flex flex-col items-center gap-6 px-5 z-99"
    >
      <div className="hidden md:block stagger-item">
        <NodeNetworkLive />
      </div>
      <h2 className="stagger-item text-center w-full m-0 tracking-em-008 leading-1_4 text-gradient-gold uppercase md:normal-case text-[42px] md:text-[80px]">
        Decentralized Gold Mining. <br />
        Power UP geodesy.
      </h2>
      <p className="stagger-item text-center w-full text-[clamp(16px,2.5vw,18px)] tracking-em-008 leading-1_4 text-[#D4D4D4]">
        Browser-based AI compute. Weekly yield. Delegate your GPU.
      </p>
      <button
        type="button"
        className="stagger-item cursor-pointer text-black bg-[#FFD200] px-[35px] py-[14px] text-[12px] font-[600] rounded-[6px] hover:bg-yellow-400 hover:shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default MainContent;
