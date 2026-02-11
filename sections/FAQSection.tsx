"use client";

import { useGSAP } from "@gsap/react";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type AccordionItemProps = {
  question: string;
  answer: string;
};

gsap.registerPlugin(ScrollTrigger);

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [open]);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      onClick={toggle}
      className="accordion-item cursor-pointer select-none border-b border-gray-700 py-4 transition-colors "
    >
      <div className="flex justify-between items-center w-full text-left text-white font-normal">
        <span className="text-[18px]/[24px] ont-normal">{question}</span>
        <span
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <img
            src="/arrow-accordion.svg"
            alt="Arrow accordion"
            width={16}
            height={16}
          />
        </span>
      </div>

      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
        }}
        className="text-sm text-gray-400 mt-2"
      >
        <div className="py-2">{answer}</div>
      </div>
    </div>
  );
};

const Accordion: React.FC = () => {
  const items: AccordionItemProps[] = [
    {
      question: "What is WeNode?",
      answer:
        "A decentralized network that converts spare CPU/GPU power into AI compute for gold-exploration models.",
    },
    {
      question: "Why use a DePIN model?",
      answer:
        "Decentralized Physical Infrastructure Networks crowd-source compute worldwide, slashing cloud costs and removing single-point failures.",
    },
    {
      question: "How do contributors earn?",
      answer:
        "Node operators receive on-chain rewards proportional to compute time, task accuracy and uptime—paid automatically on Solana.",
    },
    {
      question: "Minimum hardware requirements?",
      answer:
        "8-core CPU, 16 GB RAM; any modern GPU adds bonus throughput and higher rewards. One-click installer available for Mac, Windows, Linux.",
    },
    {
      question: "Is satellite data required?",
      answer:
        "No. WeNode focuses on structured ground datasets (radar, seismic, magnetic surveys, historical logs) for higher-confidence predictions.",
    },
    {
      question: "Is WeNode available to U.S. users?",
      answer:
        "No. Services are restricted from U.S. citizens, residents and entities; access is geo-blocked and self-certified during onboarding.",
    },
    {
      question: "How is data secured?",
      answer:
        "Jobs run in container sandboxes; results are hashed on Solana. TLS 1.3, encryption-at-rest and periodic security audits protect the network.",
    },
    {
      question: "Where can I learn more?",
      answer:
        "Read the May 2025 whitepaper and the bilingual Terms & Privacy at wenode.io/docs, or join the Discord for weekly build updates.",
    },
  ];

  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = gsap.utils.toArray(".accordion-item", containerRef.current);

      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="max-w-[984px] mx-auto bg-black text-white px-4 pt-[84px] pb-[140px]"
    >
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Accordion;
