"use client";

import React from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";

const SOCIAL_ICONS = [
  { link: "https://x.com/WenodeIO", path: "/logo-x.svg" },
  { link: "https://t.me/+sx2sJHbOFctkZjA0", path: "/logo-tg.svg" },
  { link: "https://mee6.xyz/i/dRO0fQCn5J", path: "/logo-ds.svg" },
];
const NAVIGATION_LINKS = [
  { title: "DOCS", href: "#docs" },
  { title: "BLOG", href: "#blog" },
  { title: "ECOSYSTEM", href: "#ecosystem" },
];

const Header = () => {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState<boolean>(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);
  const burgerIconRef = React.useRef<HTMLDivElement>(null);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((prevOpen) => !prevOpen);
  };

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    const menuElement = mobileMenuRef.current;
    if (!menuElement) return;

    gsap.killTweensOf(menuElement);

    if (isMobileMenuOpen) {
      gsap.set(menuElement, { display: "block", height: "auto" });
      const targetHeight = menuElement.scrollHeight;
      gsap.fromTo(
        menuElement,
        { opacity: 0, height: 0 },
        {
          opacity: 1,
          height: targetHeight,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(menuElement, { height: "auto" });
          },
        }
      );
    } else {
      gsap.to(menuElement, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(menuElement, { display: "none" });
        },
      });
    }
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        burgerIconRef.current &&
        !burgerIconRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-[100]">
      <header className="bg-[#0A0A0A] text-white p-4 md:px-5 shadow-md border-b-[#474747] border-b md:border-none z-40 relative">
        <div className="flex justify-between items-center max-w-[1300px] mx-auto">
          <div className="flex items-center h-full gap-x-[25px]">
            <a href="/">
              <img
                src="/logo.svg"
                alt="Company Logo"
                width={108.38}
                height={30}
              />
            </a>
            <nav className="hidden md:flex">
              {NAVIGATION_LINKS.map(({ title, href }) => {
                return (
                  <a
                    href={href}
                    key={title}
                    className={`
                      group
                      text-white
                      transition
                      duration-300
                      w-[110px]
                      text-center
                      py-2
                      relative
                      hover:text-[#FFD200]
                    `}
                  >
                    {title}
                    <span
                      className={`
                        absolute bottom-0 left-1/2
                        h-[2px] bg-[#FFD200]
                        transition-all duration-300 ease-in-out
                        w-0
                        group-hover:w-full
                        origin-center
                        transform -translate-x-1/2
                      `}
                    />
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="items-center space-x-4 justify-center hidden md:flex">
            {SOCIAL_ICONS.map((item) => {
              const fileName = item.path.substring(
                item.path.lastIndexOf("/") + 1
              );
              const socialName = fileName
                .replace("logo-", "")
                .replace(/\..+$/, "");

              return (
                <a
                  key={item.path}
                  target="_blank"
                  href={item.link}
                  className="minimal-hover-button px-[10px] py-[12px]"
                  aria-label={`${socialName} link`}
                  onClick={() => console.log(`Maps to ${socialName}`)}
                >
                  <img
                    src={item.path}
                    alt={`${socialName} logo`}
                    height={16}
                    width={16}
                  />
                </a>
              );
            })}
            <button
              type="button"
              className="
                bg-[#FFD200]
                text-[#000000]
                px-[20px]
                py-[14px]
                rounded-md
                font-[600]
                cursor-pointer
                transition
                duration-300
                ease-in-out
                text-[12px]
                hover:bg-yellow-400
                hover:shadow-lg
                focus:outline-none
                focus:ring
                focus:ring-yellow-400
                focus:ring-opacity-50
                whitespace-nowrap
              "
              onClick={() => {
                console.log("Launch App Clicked");
              }}
            >
              LAUNCH APP
            </button>
          </div>
          <div className="md:hidden" ref={burgerIconRef}>
            <BurgerMenu
              isOpen={isMobileMenuOpen}
              toggleMenu={toggleMobileMenu}
            />
          </div>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-full left-0 w-full z-30 overflow-hidden"
        style={{ display: "none" }}
      >
        <div className="container mx-auto">
          <div className="bg-[#0A0A0A] p-5 shadow-xl">
            <nav className="flex flex-col items-start space-y-3">
              {NAVIGATION_LINKS.map(({ title, href }) => (
                <a
                  href={href}
                  key={title}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    text-white py-2 text-left w-full block text-base
                    hover:text-[#FFD200] transition-colors duration-200
                  `}
                >
                  {title}
                </a>
              ))}
              <button
                type="button"
                className="
                  mt-4 w-full bg-[#FFD200] text-[#000000] px-4 py-3
                  rounded-[6px] font-semibold cursor-pointer
                  transition duration-300 ease-in-out text-sm
                  hover:bg-yellow-400 hover:shadow-lg
                  focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50
                "
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  console.log("Mobile Launch App Clicked");
                }}
              >
                LAUNCH APP
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
