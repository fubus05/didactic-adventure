"use client";

import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RotatingSphere from "../threejs/RotatingSphere";

import anim1 from "@/animations/anim1.json";
import anim2 from "@/animations/anim2.json";
import anim3 from "@/animations/anim3.json";

gsap.registerPlugin(ScrollTrigger);

const FEATURES_LIST_DATA = [
  {
    id: "feat1_geodesia",
    title: "Geodesia AI model",
    text: "Geodesia AI model analyzes spatial data using shared GPU power to map, measure, and optimize terrain with high accuracy and speed.",
    animation: anim1,
  },
  {
    id: "feat2_gpu",
    title: "GPU sharing",
    text: "Split computing tasks across multiple users GPUs, pulling power for AI geodesy model, rendering, or processing. Boosting speed, efficiency, and cost-effectiveness.",
    animation: anim2,
  },
  {
    id: "feat3_graf",
    title: "GRAF (backing)",
    text: "GRAF backs WeGold ecosystem by providing stable gold-pegged funding, reducing volatility and boosting investor confidence during development.",
    animation: anim3,
  },
];

const FeaturesSection = () => {
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const lottieInstanceRefs = React.useRef<
    Array<React.RefObject<LottieRefCurrentProps | null>>
  >(FEATURES_LIST_DATA.map(() => React.createRef()));
  const lottieWrapperRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const playLottieTimeouts = React.useRef<NodeJS.Timeout[]>([]);
  const lottiePlayAttempts = React.useRef(new Map<number, number>());

  React.useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, FEATURES_LIST_DATA.length);
    lottieWrapperRefs.current = lottieWrapperRefs.current.slice(
      0,
      FEATURES_LIST_DATA.length
    );
  }, []);

  useGSAP(() => {
    itemRefs.current.forEach((itemEl) => {
      if (!itemEl) return;
      gsap.fromTo(
        itemEl,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: itemEl,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const playLottie = (lottieIndex: number) => {
      const lottieControl = lottieInstanceRefs.current[lottieIndex]?.current;
      const currentAttempt = lottiePlayAttempts.current.get(lottieIndex) || 1;

      if (lottieControl && typeof lottieControl.goToAndPlay === "function") {
        //@ts-ignore
        if (lottieControl.getDuration(true) > 0) {
          requestAnimationFrame(() => {
            lottieControl.stop();
            lottieControl.goToAndPlay(0, true);
          });
          lottiePlayAttempts.current.delete(lottieIndex);
        } else {
          lottiePlayAttempts.current.delete(lottieIndex);
        }
      } else {
        if (currentAttempt < 5) {
          lottiePlayAttempts.current.set(lottieIndex, currentAttempt + 1);
          const timeoutId = setTimeout(
            () => playLottie(lottieIndex),
            100 * currentAttempt
          );
          playLottieTimeouts.current.push(timeoutId);
        } else {
          lottiePlayAttempts.current.delete(lottieIndex);
        }
      }
    };

    const stopLottie = (lottieIndex: number) => {
      const lottieControl = lottieInstanceRefs.current[lottieIndex]?.current;
      if (lottieControl && typeof lottieControl.stop === "function") {
        requestAnimationFrame(() => {
          lottieControl.stop();
        });
      }
      lottiePlayAttempts.current.delete(lottieIndex);
    };

    lottieWrapperRefs.current.forEach((lottieWrapper, index) => {
      if (!lottieWrapper) return;
      const feature = FEATURES_LIST_DATA[index];

      ScrollTrigger.create({
        trigger: lottieWrapper,
        id: `lottie-st-${feature.id}`,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => playLottie(index),
        onEnterBack: () => playLottie(index),
        onLeave: () => stopLottie(index),
        onLeaveBack: () => stopLottie(index),
      });
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimeout);
      playLottieTimeouts.current.forEach(clearTimeout);
      playLottieTimeouts.current = [];

      lottieInstanceRefs.current.forEach((lottieRef) => {
        const lottieControl = lottieRef?.current;
        if (lottieControl && typeof lottieControl.stop === "function") {
          lottieControl.stop();
        }
      });
      lottiePlayAttempts.current.clear();
    };
  }, []);

  return (
    <section id="docs">
      <div className="mx-auto flex lg:flex-row flex-col h-full md:px-0 px-[20px] md:pt-[112px] pt-[80px] max-w-[1300px]">
        <div className="flex-1 flex justify-center items-start relative">
          <RotatingSphere />
          <div className="absolute w-full h-full bg-transparent z-1000 md:hidden" />
        </div>
        <div className="flex justify-center p-4">
          <div className="md:w-[520px] justify-center w-full flex flex-col gap-[62px]">
            {FEATURES_LIST_DATA.map((item, index) => (
              <div
                key={item.id}
                className="feature-item flex gap-[24px] items-start"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <div
                  className="min-w-20 min-h-20 border-[#2C2C2C] flex items-center justify-center border bg-ecosystem-card-bg rounded-[10px]"
                  ref={(el) => {
                    lottieWrapperRefs.current[index] = el;
                  }}
                >
                  <Lottie
                    lottieRef={lottieInstanceRefs.current[index]}
                    className="w-[48px] h-[48px]"
                    animationData={item.animation}
                    loop={true}
                    autoplay={false}
                  />
                </div>
                <div className="feature-content flex flex-col gap-[10px]">
                  <div className="feature-heading text-[24px] uppercase">
                    {item.title}
                  </div>
                  <div className="feature-description text-[16px] text-feature-text-muted">
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
