"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData } from "@/constants";
import EcoSystemCard from "@/components/EcoSystemCard";
import RotatingBackgroundTorus from "@/threejs/RotatingBackgroundTorus";

gsap.registerPlugin(ScrollTrigger);

const EcoSystemSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const footerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.from(containerRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out",
        });
      }

      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      cardsRef.current.forEach((cardEl, index) => {
        if (cardEl) {
          const animateFromDirection = index % 2 === 0 ? "left" : "right";
          gsap.from(cardEl, {
            opacity: 0,
            x: animateFromDirection === "left" ? -50 : 50,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  const assignCardRef = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  return (
    <div
      id="ecosystem"
      ref={containerRef}
      className="bg-transparent max-w-[1300px] mx-auto text-white flex flex-col items-center justify-center md:pt-[188px] pt-[100px] px-4 sm:px-6 lg:px-8 relative"
    >
      <div
        ref={headingRef}
        className="text-center md:mb-[120px] mb-[50px] z-10 leading-[52.2px] font-[500]"
      >
        <h1 className="text-[58px]">
          <span className="text-yellow-400 md:text-[58px] text-[42px]">
            EXPLORE
          </span>
        </h1>
        <h2 className="font-medium text-white md:text-[58px] text-[42px]">
          THE WENODE ECOSYSTEM
        </h2>
      </div>
      <div className="w-full max-w-[1300px] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-5">
          {cardsData.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              ref={(el) => assignCardRef(el, index)}
            >
              <EcoSystemCard {...card} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-[50px] pb-10" ref={footerRef}>
        <p className="text-[18px]/[24px] font-normal text-white">
          ECOSYSTEM EXPANDING SOON...
        </p>
      </div>
      <RotatingBackgroundTorus />
    </div>
  );
};

export default EcoSystemSection;
