"use client";

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Circle from "../svg/Circle";
import Wenode from "../components/Wenode";
import CombinedWireframeScene from "../threejs/WireframeScene";
import ValidatorAnimation from "../components/ValidatorAnimation";

gsap.registerPlugin(ScrollTrigger);

const PerformanceSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  const [playWenode, setPlayWenode] = React.useState(false);
  const [playValidatorAnimation, setPlayValidatorAnimation] =
    React.useState(false);
  const [playCircle, setPlayCircle] = React.useState(false);

  const assignCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      }).from(
        headingRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      );

      cardRefs.current.forEach((card, index) => {
        if (card) {
          tl.from(
            card,
            {
              opacity: 0,
              x: index % 2 === 0 ? -100 : 100,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }
      });

      tl.call(() => setPlayWenode(true))
        .call(() => setPlayCircle(true))
        .call(() => setPlayValidatorAnimation(true));
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      className="px-4 md:px-8 flex flex-col items-center justify-center relative overflow-x-hidden"
      ref={containerRef}
    >
      <CombinedWireframeScene type={"upper"} />
      <div className="text-center mb-[60px]" ref={headingRef}>
        <h1 className="text-5xl md:text-[58px]/[52.2px] font-medium uppercase pt-[120px]">
          <span className="text-[#FFD200]">WENODE</span> <br />
          PERFORMANCE
        </h1>
        <p className="text-gray-400 mt-[21px] text-[16px]/[20px] font-normal">
          Just a few numbers...
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-[1300px]">
        <div
          className="bg-[#0d0d0d] border border-[#2b2b2b] rounded-[10px] shadow-xl md:col-span-1 flex flex-col text-2xl gap-[14px] md:p-[32px] p-[16px]"
          ref={(el) => assignCardRef(el, 0)}
        >
          <div>
            <h2 className="text-[24px]/[30px] mb-[10px] uppercase font-normal">
              Active Validators
            </h2>
            <p className="text-[#808080] text-[16px]/[20px] font-normal">
              Light nodes provide GPU power to fuel AI. <br />
              Geodesia’s fast, efficient spatial data processing.
            </p>
          </div>
          <ValidatorAnimation play={playValidatorAnimation} />
        </div>

        <div
          className="bg-[#0d0d0d] border border-[#2b2b2b] md:p-[38px] p-[16px] rounded-[10px] shadow-xl md:col-span-2 flex justify-between flex-col lg:flex-row"
          ref={(el) => assignCardRef(el, 1)}
        >
          <div>
            <h2 className="text-[24px]/[30px] mb-[10px] uppercase font-normal">
              Total Revenue
            </h2>
            <p className="text-[#808080] mb-[40px] text-[16px]/[20px] font-normal">
              Distributed $1M to validators for contributing <br />
              GPU power to support our AI Geodesia model.
            </p>
            <p className="text-[#808080] text-[16px]/[20px] font-normal pb-[16px]">
              Get all details on the WeNode Dashboard
            </p>
          </div>
          <Wenode play={playWenode} />
        </div>

        <div
          className="bg-[#0d0d0d] border border-[#2b2b2b] md:p-[38px] p-[16px] rounded-[10px] shadow-xl md:col-span-2 flex lg:flex-row flex-col md:justify-between gap-[20px]"
          ref={(el) => assignCardRef(el, 2)}
        >
          <div>
            <h2 className="text-[24px]/[30px] mb-[10px] uppercase font-normal">
              Optimized resources usage
            </h2>
            <p className="text-[#808080] text-[16px]/[20px] font-normal w-full max-w-[300px]">
              Over 85% resource savings in powering our AI model through
              efficient GPU sharing.
            </p>
          </div>
          <div className="py-[30px] px-[94px] bg-[#1A1A1A] rounded-[10px] flex justify-center items-center">
            <Circle play={playCircle} />
          </div>
        </div>
        <div
          className="bg-[#0d0d0d] border border-[#2b2b2b] md:p-[38px] p-[16px] rounded-[10px] shadow-xl md:col-span-1 flex flex-col"
          ref={(el) => assignCardRef(el, 3)}
        >
          <div>
            <h2 className="text-[24px]/[30px] mb-[10px] uppercase font-normal">
              Low Hardware Requirements
            </h2>
          </div>
          <ul className="text-[#808080] text-[16px]/[20px] font-normal pl-1">
            <li>CPU: 8 cores CPU; RAM: 16 GB; SSD: 100 GB+;</li>
            <li>CPU: ~40x machines with 16 cores; RAM: 128GB</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
