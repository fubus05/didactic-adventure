"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ComparasionTable from "../components/ComparasionTable";

gsap.registerPlugin(ScrollTrigger);

const TableSection = () => {
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const elements = [leftRef.current, rightRef.current].filter(Boolean);

      elements.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
              },
            }
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center pt-[106px] px-4 sm:px-8 w-full"
    >
      <div className="max-w-[1300px] w-full">
        <div className="flex lg:flex-row flex-col justify-between items-center md:gap-[220px] gap-[24px]">
          <div ref={leftRef} className="space-y-5 md:text-left text-center">
            <h1 className="text-[42px] md:text-[58px]/[52.2px] font-[500]">
              {`BIG TECH `}
              <br className="hidden md:block" />
              OWNS THE CLOUD.
              <br />
              WENODE SHARES IT.
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
              XP and node participation may influence access to
              governance-related features.
            </p>
            <button
              className="bg-[#FFD200] text-black font-bold py-3.5 px-9 rounded-[6px] text-sm tracking-wide transition duration-300 ease-in-out
                               hover:bg-yellow-400 hover:shadow-lg
                               focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50 cursor-pointer"
            >
              BUILD ON WENODE
            </button>
          </div>

          <div ref={rightRef}>
            <ComparasionTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSection;
