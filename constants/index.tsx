import { EcoSystemCardProps } from "@/components/EcoSystemCard";
import SocialsEcoSystem from "../components/SocialsEcoSystem";

export const cardsData: EcoSystemCardProps[] = [
  {
    title: "WeNode social platform",
    status: "Released",
    tag: "SOCIALIFI",
    // imageUrl: "/images/social-platform.png", // Example actual image path
    actionButton: {
      text: "JOIN NOW",
      onClick: () => console.log("Join WeNode Social Platform!"),
    },
    isBlurred: false,
  },
  {
    title: "WeNode GameFi platform",
    status: "Soon...",
    tag: "GAMEFI",
    // imageUrl: "/images/gamefi-platform.png", // Example actual image path
    icons: [
      <SocialsEcoSystem key="b1" svgPath="/browser.svg" />,
      <SocialsEcoSystem key="x1" svgPath="/x-down.svg" />,
      <SocialsEcoSystem key="d1" svgPath="/discord-down.svg" />,
    ],
    isBlurred: true,
  },
  {
    title: "Yield Hub Aggregator",
    status: "Soon...",
    tag: "YIELD AGGREGATOR",
    // imageUrl: "/images/yield-hub.png", // Example actual image path
    icons: [
      <SocialsEcoSystem key="b2" svgPath="/browser.svg" />,
      <SocialsEcoSystem key="x2" svgPath="/x-down.svg" />,
      <SocialsEcoSystem key="d2" svgPath="/discord-down.svg" />,
    ],
    isBlurred: true,
  },
  {
    title: "Real World Asset (RWA) Hub",
    status: "Soon...",
    tag: "RWA",
    // imageUrl: "/images/rwa-hub.png", // Example actual image path
    icons: [
      <SocialsEcoSystem key="b3" svgPath="/browser.svg" />,
      <SocialsEcoSystem key="x3" svgPath="/x-down.svg" />,
    ],
    isBlurred: true,
  },
];
