import React from "react";
import CombinedWireframeScene from "../threejs/WireframeScene";

function Footer() {
  return (
    <div className="md:h-[320px] md:min-h-auto min-h-[320px] relative border-t-[#333333] border-t flex justify-center overflow-hidden">
      <img
        src="/footer.svg"
        alt="footer background"
        height={620}
        width={3000}
        className="w-full max-h-[300px] absolute bottom-0 md:-right-[400px] z-[-1] object-contain"
      />
      <div className="flex md:flex-row flex-col text-[#6d6d6d] max-w-[1300px] md:justify-center md:items-start items-center w-full px-4 sm:px-6 lg:px-8 gap-x-8 md:gap-x-16 lg:gap-x-[180px] gap-y-8 md:gap-y-0 z-10 pt-8 pb-[140px] md:pb-0">
        <div className="flex flex-col items-center md:items-start text-[14px] uppercase gap-[25px] text-center md:text-left border-b border-b-[#6D6D6D] md:border-none w-full md:w-auto pb-[21px] md:pb-0">
          <a href="/">
            <img
              src="/logo-footer.svg"
              alt="Company Logo"
              width={162.6}
              height={44.76}
            />
          </a>
          <a
            href="mailto:info@wenode.io"
            className="w-full bg-[#FFD200] text-[#000000] px-[62px] py-[14px]
                  rounded-[6px] font-semibold cursor-pointer
                  transition duration-300 ease-in-out text-sm
                  hover:bg-yellow-400 hover:shadow-lg
                  focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50
                "
          >
            CONTACT
          </a>
        </div>

        <ul className="flex flex-col text-[14px] uppercase gap-[6px] text-center md:text-left border-b border-b-[#6D6D6D] md:border-none w-full md:w-auto pb-[21px] md:pb-0">
          <li className="text-white font-semibold mb-0.5">Resources</li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://docsend.com/v/z2xkv/wenode-mediakit"
              target="_blank"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Media Kit
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Blog
            </a>
          </li>
        </ul>

        <ul className="flex flex-col text-[14px] uppercase gap-[6px] text-center md:text-left border-b border-b-[#6D6D6D] md:border-none w-full md:w-auto pb-[21px] md:pb-0">
          <li className="text-white font-semibold mb-0.5">Legal</li>
          <li>
            <a
              href="/terms-of-use"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Terms of Use
            </a>
          </li>
          <li>
            <a
              href="/privacy-policy"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Privacy Policy
            </a>
          </li>
        </ul>

        <ul className="flex flex-col text-[14px] uppercase gap-[6px] text-center md:text-left w-full md:w-auto mb-[21px] md:mb-0">
          <li className="text-white font-semibold mb-0.5">Community</li>
          <li>
            <a
              target="_blank"
              href="https://t.me/+sx2sJHbOFctkZjA0"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://mee6.xyz/i/dRO0fQCn5J"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              Discord
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://x.com/WenodeIO"
              className="hover:text-white transition-colors duration-200 cursor-pointer block py-0.5"
            >
              X
            </a>
          </li>

          {/* <li className="text-white font-semibold">Community</li>
          <li className="flex flex-col items-center md:items-start gap-4 mt-2 md:mt-0">
            <div className="flex flex-row gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our X profile"
              >
                <img
                  src="/logo-x.svg"
                  alt="X logo"
                  height={24}
                  width={24}
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord server"
              >
                <img
                  src="/logo-ds.svg"
                  alt="Discord logo"
                  height={24}
                  width={24}
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </a>
            </div>
            <div className="flex flex-row gap-4">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Door profile"
              >
                <img
                  src="/door-footer.svg"
                  alt="Door logo"
                  height={24}
                  width={24}
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Telegram group"
              >
                <img
                  src="/tg-footer.svg"
                  alt="Telegram logo"
                  height={24}
                  width={24}
                  className="h-[24px] w-[24px] cursor-pointer"
                />
              </a>
            </div>
          </li> */}
        </ul>
      </div>
      <div className="absolute w-full text-center bottom-[8px] left-1/2 -translate-x-1/2">
        All rights reserved © WENODE 2025
      </div>
      <div className="absolute md:h-full w-[1000px] bg-transparent md:w-full md:top-[120px] md:-left-[100px] bottom-30">
        <CombinedWireframeScene type={"lower"} />
      </div>
    </div>
  );
}

export default Footer;
