import React from "react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

interface ValidatorAnimationProps {
  play: boolean;
}

export default function ValidatorAnimation({ play }: ValidatorAnimationProps) {
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const numberRef = React.useRef<HTMLSpanElement>(null);
  const masterTlRef = React.useRef<gsap.core.Timeline | null>(null);

  React.useEffect(() => {
    if (!containerRef.current || !numberRef.current) {
      return;
    }

    const containerElement = containerRef.current;
    const numberElement = numberRef.current;
    const paths = Array.from(containerElement.querySelectorAll("path"));

    const ctx = gsap.context(() => {
      masterTlRef.current = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 2,
        onStart: () => {
          numberElement.textContent = "0";
          gsap.set(paths, {
            drawSVG: "0% 0%",
            stroke: "white",
            strokeWidth: 1.2,
            fill: "transparent",
            opacity: 1,
            strokeOpacity: 1,
          });
        },
        onRepeat: () => {
          numberElement.textContent = "0";
          gsap.set(paths, {
            drawSVG: "0% 0%",
            stroke: "white",
            strokeWidth: 1.2,
            fill: "transparent",
            opacity: 1,
            strokeOpacity: 1,
          });
        },
      });

      const numObj = { val: 0 };
      masterTlRef.current.to(
        numObj,
        {
          val: 10000,
          duration: 4,
          ease: "power2.out",
          onUpdate: () => {
            numberElement.textContent = Math.floor(numObj.val).toLocaleString();
          },
        },
        "start"
      );

      masterTlRef.current.to(
        paths,
        {
          drawSVG: "0% 100%",
          duration: 1.2,
          ease: "power1.inOut",
        },
        "start"
      );

      masterTlRef.current.to(
        paths,
        {
          strokeOpacity: 0,
          duration: 0.05,
          stagger: {
            each: 0.05,
            from: "random",
          },
          repeat: 1,
          yoyo: true,
        },
        "start+=1.3"
      );

      masterTlRef.current.add(() => {
        const shuffledPaths = gsap.utils.shuffle(paths);
        const selectedPaths = shuffledPaths.slice(0, 3);

        gsap.to(selectedPaths, {
          fill: "#FFD200",
          stroke: "transparent",
          duration: 0.5,
          ease: "power1.inOut",
        });
      }, "start+=1.6");
    }, containerElement);

    return () => {
      ctx.revert();
      masterTlRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!masterTlRef.current || !numberRef.current || !containerRef.current)
      return;

    const paths = Array.from(containerRef.current.querySelectorAll("path"));

    if (play) {
      masterTlRef.current.restart();
    } else {
      masterTlRef.current.pause().progress(0);

      if (numberRef.current) {
        numberRef.current.textContent = "0";
      }
      gsap.set(paths, {
        drawSVG: "0% 0%",
        stroke: "white",
        strokeWidth: 1.2,
        fill: "transparent",
        opacity: 1,
        strokeOpacity: 1,
      });
    }
  }, [play]);

  return (
    <div className="flex justify-center items-center bg-[#1A1A1A] rounded-[10px] py-[9px] px-[20px]">
      <div
        className="flex justify-center items-end relative"
        ref={containerRef}
      >
        <span
          ref={numberRef}
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-[30px] font-[600]"
        >
          0
        </span>
        <svg
          width="310"
          height="108"
          viewBox="0 0 310 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.4707 0.5L29.5 8.52148V29.5H0.5V0.5H22.4707Z"
            stroke="white"
          />
          <path
            d="M62.4707 0.5L69.5 8.52148V29.5H40.5V0.5H62.4707Z"
            stroke="white"
          />
          <path
            d="M102.471 0.5L109.5 8.52148V29.5H80.5V0.5H102.471Z"
            stroke="white"
          />
          <path
            d="M142.471 0.5L149.5 8.52148V29.5H120.5V0.5H142.471Z"
            stroke="white"
          />
          <path
            d="M182.471 0.5L189.5 8.52148V29.5H160.5V0.5H182.471Z"
            stroke="white"
          />
          <path
            d="M222.471 0.5L229.5 8.52148V29.5H200.5V0.5H222.471Z"
            stroke="white"
          />
          <path
            d="M262.471 0.5L269.5 8.52148V29.5H240.5V0.5H262.471Z"
            stroke="white"
          />
          <path
            d="M302.471 0.5L309.5 8.52148V29.5H280.5V0.5H302.471Z"
            stroke="white"
          />
          <path
            d="M22.4707 78.5L29.5 86.5215V107.5H0.5V78.5H22.4707Z"
            stroke="white"
          />
          <path
            d="M62.4707 78.5L69.5 86.5215V107.5H40.5V78.5H62.4707Z"
            stroke="white"
          />
          <path
            d="M102.471 78.5L109.5 86.5215V107.5H80.5V78.5H102.471Z"
            stroke="white"
          />
          <path
            d="M142.471 78.5L149.5 86.5215V107.5H120.5V78.5H142.471Z"
            stroke="white"
          />
          <path
            d="M182.471 78.5L189.5 86.5215V107.5H160.5V78.5H182.471Z"
            stroke="white"
          />
          <path
            d="M222.471 78.5L229.5 86.5215V107.5H200.5V78.5H222.471Z"
            stroke="white"
          />
          <path
            d="M262.471 78.5L269.5 86.5215V107.5H240.5V78.5H262.471Z"
            stroke="white"
          />
          <path
            d="M302.471 78.5L309.5 86.5215V107.5H280.5V78.5H302.471Z"
            stroke="white"
          />
          <path
            d="M22.4707 39.5L29.5 47.5215V68.5H0.5V39.5H22.4707Z"
            stroke="white"
          />
          <path
            d="M302.471 39.5L309.5 47.5215V68.5H280.5V39.5H302.471Z"
            stroke="white"
          />
        </svg>
      </div>
    </div>
  );
}
