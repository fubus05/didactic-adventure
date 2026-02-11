"use client";

import React from "react";
import gsap from "gsap";

interface WenodeProps {
  play: boolean;
}

const Wenode = ({ play }: WenodeProps) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const weTextRef = React.useRef<HTMLSpanElement | null>(null);
  const nodeTextRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (!container.current || !weTextRef.current || !nodeTextRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      if (play) {
        const allBars = gsap.utils.toArray(
          container.current!.querySelectorAll(".charge-bar")
        ) as SVGRectElement[];
        const animatedBars = allBars.slice(0, -1);

        gsap.set(allBars, {
          fill: "white",
          opacity: 0.25,
        });

        gsap.to(animatedBars, {
          fill: "#FFD200",
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "power1.out",
          repeat: -1,
          repeatDelay: 2,
        });

        gsap.fromTo(
          weTextRef.current!,
          { opacity: 0.7 },
          {
            opacity: 1,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut",
            repeatDelay: 2,
          }
        );

        gsap.fromTo(
          nodeTextRef.current!,
          { textShadow: "0 0 0px rgba(255, 210, 0, 0.0)" },
          {
            textShadow: "0 0 12px rgba(255, 210, 0, 0.7)",
            repeat: -1,
            yoyo: true,
            duration: 0.7,
            ease: "power1.inOut",
            repeatDelay: 2,
          }
        );
      }
    }, [container, weTextRef, nodeTextRef]);

    return () => {
      ctx.revert();
    };
  }, [play]);

  return (
    <div className="flex justify-center items-center bg-[#1A1A1A] rounded-[10px] py-[12px] px-6">
      <div className="flex justify-center items-end" ref={container}>
        <div>
          <h3 className="uppercase text-[#FFD200] text-[55px] md:text-[72px] text-center font-[500]">
            <span className="text-[#808080]" ref={weTextRef}>
              we
            </span>
            <span ref={nodeTextRef}>node</span>{" "}
          </h3>
          <div className="flex justify-between items-center mb-[5px] text-[#808080]">
            <span>$0</span>
            <span>$500k</span>
            <span>$1M</span>
          </div>
          <svg
            width="296"
            height="50"
            viewBox="0 0 296 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: 19 }).map((_, i) => (
              <rect
                key={i}
                x={i * 16}
                width="8"
                height="50"
                fill="#535353"
                rx="4"
                className="charge-bar"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Wenode;
