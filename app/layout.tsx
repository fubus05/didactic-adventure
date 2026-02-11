import type { Metadata } from "next";
import { Chakra_Petch } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import { HotJar } from '@/app/third-parties/Hotjar'
import Header from "@/components/Header";
import Splash from "@/components/Splash";
import Footer from "@/components/Footer";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
  title: "WeNode Project",
  description: "Decentralized Gold Mining. Power UP geodesy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <body className={`${chakraPetch.variable} antialiased`}>
        {/* <div id="splash" className="fixed inset-0 bg-black z-9999"></div>
        <Splash /> */}
        <Header />
        {children}
      </body>
        {isProd && <GoogleTagManager gtmId="GTM-W2SBCTTG" />}
        {isProd && <HotJar />}
    </html>
  );
}
