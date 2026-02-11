"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Core from "../svg/Core";
import Line from "../svg/Line";

const pathsLeftData = [
  "M903.104 326.4H579.381C565.773 326.4 552.723 323.337 543.1 317.884L1.00293 2.00018",
  "M904.103 340.03H548.047C534.426 340.03 521.364 336.967 511.732 331.513L211.217 161.364C201.585 155.91 188.523 152.847 174.903 152.847H4",
  "M904.105 353.66H516.45C502.054 353.66 488.318 350.239 478.591 344.231L429.679 314.022C419.951 308.014 406.216 304.593 391.82 304.593H2.00391",
  "M903.103 367.29H414.227C399.619 367.29 385.704 370.818 375.968 376.988L317.683 413.929C307.947 420.1 294.032 423.627 279.424 423.627H0.512207",
];

const pathsRightData = [
  "M1.00092 326.4H324.724C338.332 326.4 351.382 323.337 361.005 317.884L903.102 2.00018",
  "M0.00158691 340.03H356.058C369.679 340.03 382.74 336.967 392.373 331.513L692.888 161.364C702.52 155.91 715.582 152.847 729.202 152.847H900.105",
  "M-6.10352e-05 353.66H387.655C402.051 353.66 415.787 350.239 425.514 344.231L474.426 314.022C484.154 308.014 497.889 304.593 512.285 304.593H902.101",
  "M1.00208 367.29H489.878C504.486 367.29 518.401 370.818 528.137 376.988L586.422 413.929C596.158 420.1 610.073 423.627 624.681 423.627H903.593",
];

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

export default function NodeProcessor() {
  const container = React.useRef<null | any>(null);
  const leftLines = React.useRef<null | any>(null);
  const rightLines = React.useRef<null | any>(null);
  const coreImage = React.useRef<null | any>(null);

  useGSAP(
    () => {
      const leftNeutrons = leftLines.current.querySelectorAll(".neutron");
      const rightNeutrons = rightLines.current.querySelectorAll(".neutron");
      const allNeutrons = [...leftNeutrons, ...rightNeutrons];

      if (allNeutrons.length > 0) {
        gsap.set(allNeutrons, { display: "block", opacity: 0 });
      }

      const tl = gsap.timeline();

      tl.from(coreImage.current, {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: "power2.out",
      });

      tl.addLabel("startPathDraw", ">");

      tl.from(
        leftLines.current.querySelectorAll("path"),
        {
          duration: 1.5,
          drawSVG: 0,
          stagger: 0.2,
          ease: "power1.out",
        },
        "startPathDraw"
      );

      tl.from(
        rightLines.current.querySelectorAll("path"),
        {
          duration: 1.5,
          drawSVG: 0,
          stagger: 0.2,
          ease: "power1.out",
        },
        "<"
      );

      const neuronFadeStagger = 0.05;
      const neuronFadeDuration = 0.2;

      const neuronFadeInPosition = ">-0.75";

      tl.to(
        allNeutrons,
        {
          opacity: 1,
          stagger: neuronFadeStagger,
          duration: neuronFadeDuration,
          ease: "power1.out",
        },
        neuronFadeInPosition
      );

      let neuronFadeInActualStartTime = 0;
      if (allNeutrons.length > 0) {
        const tempTweenForStartTime = tl
          .getTweensOf(allNeutrons[0], true)
          .find((t) => t.vars.opacity === 1);
        if (tempTweenForStartTime) {
          neuronFadeInActualStartTime = tempTweenForStartTime.startTime();
        }
      }

      leftLines.current
        .querySelectorAll("path")
        .forEach((pathEl: any, i: any) => {
          const neutron = leftNeutrons[i];
          if (!neutron) return;

          const motionPathDelay =
            neuronFadeInActualStartTime +
            i * neuronFadeStagger +
            neuronFadeDuration;

          gsap.to(neutron, {
            motionPath: {
              path: pathEl,
              align: pathEl,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
            duration: 2 + Math.random() * 2,
            repeat: -1,
            ease: "power1.inOut",
            delay: motionPathDelay,
          });
        });

      rightLines.current
        .querySelectorAll("path")
        .forEach((pathEl: any, i: any) => {
          const neutron = rightNeutrons[i];
          if (!neutron) return;

          const combinedIndex = leftNeutrons.length + i;
          const motionPathDelay =
            neuronFadeInActualStartTime +
            combinedIndex * neuronFadeStagger +
            neuronFadeDuration;

          gsap.to(neutron, {
            motionPath: {
              path: pathEl,
              align: pathEl,
              autoRotate: true,
              alignOrigin: [0.5, 0.5],
              start: 1,
              end: 0,
            },
            duration: 2 + Math.random() * 2,
            repeat: -1,
            ease: "power1.inOut",
            delay: motionPathDelay,
          });
        });
    },
    { scope: container }
  );

  return (
    <div className="relative flex justify-center items-center pb-1 -mt-[237px] md:-mt-[96px] overflow-hidden">
      <div className="flex justify-center items-end" ref={container}>
        <svg
          width="905"
          height="425"
          viewBox="0 0 905 425"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={leftLines}
        >
          {pathsLeftData.map((path, i) => (
            <g key={i}>
              <path
                opacity="0.5"
                d={path}
                key={i}
                stroke="#FFD200"
                strokeWidth="2.72597"
              />
              <Line />
            </g>
          ))}
        </svg>
        <Core ref={coreImage} />
        <svg
          width="904"
          height="425"
          viewBox="0 0 904 425"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={rightLines}
        >
          {pathsRightData.map((path, i) => (
            <g key={i}>
              <path
                opacity="0.5"
                d={path}
                key={i}
                stroke="#FFD200"
                strokeWidth="2.72597"
              />
              <Line />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
