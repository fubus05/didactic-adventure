"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LatestSection() {
  const card1Ref = React.useRef<HTMLDivElement>(null);
  const card2Ref = React.useRef<HTMLDivElement>(null);
  const card3Ref = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.1,
          }
        );
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cards = [card1Ref, card2Ref, card3Ref];

      cards.forEach((ref, index) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [] }
  );
  return (
    <section
      id="blog"
      ref={containerRef}
      className="flex justify-center mb-[80px] bg-transparent"
    >
      <div className="max-w-[1300px] w-full px-4">
        <div
          ref={headingRef}
          className="text-[42px] md:text-[58px] md:leading-[52.2px] text-center md:mb-[81px] mb-[40px] mt-[120px]"
        >
          LATEST FROM <br /> <span className="text-[#FFD200]">WENODE</span>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-[20px]">
          <div
            ref={card1Ref}
            className="md:col-span-1 md:row-span-2 bg-black rounded-[10px] border border-[#2C2C2C] p-[21px] pb-[16px] flex flex-col"
          >
            <div className="relative w-full h-[336px] mb-[30px] rounded-[10px] overflow-hidden">
              <img
                src="/dashboard.webp"
                alt="Season 5 Dashboard Preview"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div>
              <p className="text-[18px]/[24px] font-normal uppercase text-white">
                Season 5 dashboard
              </p>
              <p className="text-[14px]/[18.76px] font-normal text-[#787878] mb-[12px]">
                Vote for your favourite protocols, streamers, and trading agents
              </p>
              <button
                className="font-semibold rounded-[6px] text-black text-[12px] uppercase px-[60px] py-[14px] cursor-pointer
                  bg-[#FFD200] hover:bg-yellow-500 
                  transition duration-300 ease-in-out
                  hover:shadow-lg
                  focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              >
                Vote Now
              </button>
            </div>
          </div>

          <div
            ref={card2Ref}
            className="md:col-span-1 md:row-span-1 h-[240px] rounded-[10px] border border-[#313131] relative cursor-pointer overflow-hidden group"
          >
            <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
              <img
                src="/agent.webp"
                alt="Season 5 WEnode Trading Agents & Streamers"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div
              className="absolute w-full bottom-0 py-[7.5px] px-[20px] rounded-b-[10px] flex justify-between items-center 
              bg-[rgba(0,0,0,0.6)] group-hover:bg-[rgba(0,0,0,0.8)] transition-colors duration-300 ease-in-out"
            >
              <p className="uppercase text-[14px]/[20px] font-normal text-white">
                Season 5: WEnode Trading Agents & Streamers
              </p>
              <div className="p-[10.5px] rounded-[10px] bg-[#1a1a1a] group-hover:bg-[#FFD200] transition-colors duration-300 ease-in-out">
                <img
                  src="/arrow.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                  className="group-hover:brightness-0 transition-filter duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>

          <div
            ref={card3Ref}
            className="md:col-span-1 md:row-span-1 h-[240px] rounded-[10px] border border-[#313131] relative cursor-pointer overflow-hidden group"
          >
            <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
              <img
                src="/economy.webp"
                alt="WEnode: Building The DeFAI Economy"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div
              className="absolute w-full bottom-0 py-[7.5px] px-[20px] rounded-b-[10px] flex justify-between items-center 
              bg-[rgba(0,0,0,0.6)] group-hover:bg-[rgba(0,0,0,0.8)] transition-colors duration-300 ease-in-out"
            >
              <p className="uppercase text-[14px]/[20px] font-normal text-white">
                wenode: Building The DeFAI Economy
              </p>
              <div className="p-[10.5px] rounded-[10px] bg-[#1a1a1a] group-hover:bg-[#FFD200] transition-colors duration-300 ease-in-out">
                <img
                  src="/arrow.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                  className="group-hover:brightness-0 transition-filter duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestSection;
