import React from "react";
import { gsap } from "gsap";

interface BurgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenu = ({ isOpen, toggleMenu }: BurgerMenuProps) => {
  const topBarRef = React.useRef<HTMLSpanElement>(null);
  const middleBarRef = React.useRef<HTMLSpanElement>(null);
  const bottomBarRef = React.useRef<HTMLSpanElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (topBarRef.current && middleBarRef.current && bottomBarRef.current) {
      const tl = gsap.timeline({ paused: true });

      tl.to(topBarRef.current, {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.inOut",
      })
        .to(
          middleBarRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          bottomBarRef.current,
          {
            rotation: -45,
            y: -8,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        );

      if (isOpen) {
        tl.play();
      } else {
        if (tl.progress() > 0 && tl.progress() < 1) {
          tl.reverse();
        } else {
          gsap.to(topBarRef.current, {
            rotation: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(middleBarRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
          gsap.to(bottomBarRef.current, {
            rotation: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      }

      return () => {
        tl.kill();
      };
    }
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleMenu}
      className="relative z-20 flex flex-col items-center justify-center w-10 h-10 space-y-1.5 focus:outline-none"
      aria-label="Открыть/Закрыть меню"
      aria-expanded={isOpen}
    >
      <span ref={topBarRef} className="block w-6 h-0.5 bg-white"></span>
      <span ref={middleBarRef} className="block w-6 h-0.5 bg-white"></span>
      <span ref={bottomBarRef} className="block w-6 h-0.5 bg-white"></span>
    </button>
  );
};

export default BurgerMenu;
