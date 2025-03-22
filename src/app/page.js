"use client";
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import introGif from "../assets/intro.gif";
import howGif from "../assets/how.gif";
import Image from "next/image";
import Box from "../components/Box"; // Import the Box component

export default function Home() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleBoxClick = (box) => {
    setExpandedBox(expandedBox === box ? null : box);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width="12.5rem"
            height="12.5rem"
            className="mr-1 sm:mr-2"
          />
        </div>
        <div className="flex gap-4 items-center">
          <button className="bg-transparent hover:bg-purple-50 text-purple-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 border border-purple-200">
            Login
          </button>
          <Link href="/signup">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Start Investing
            </button>
          </Link>
        </div>
      </header>
      <Image
        src={introGif}
        alt="Intro"
        width="80vw"
        height="80vh"
        className="w-[80vw] h-[80vh] rounded-2xl mb-2 p-2 mt-2"
      />
      <div className="w-[80vw] h-[60vh] flex items-center">
        <Image
          src={howGif}
          alt="How"
          width="50%"
          height="auto"
          className="w-[40%] h-[70%] rounded-lg"
        />
        <div className="ml-auto p-8 rounded-lg w-[50%] h-[70%] flex flex-col justify-center items-center">
          <h1 className="text-green-500 text-4xl font-bold mb-4 font-serif">How To Dime.On</h1>
          <p className="text-white text-lg">You just continue spending on the things you love – Dime.On will automatically round up all online transactions, and invest the difference in a fund of your choice.</p>
        </div>
      </div>
      <h1 className="text-center text-5xl font-bold font-serif mt-2">Your investment, Your way</h1>
      <div className="w-[80vw] flex justify-between mt-4">
        <div onClick={() => handleBoxClick("ROUND-UP")}>
          <Box
            heading="ROUND-UP"
            description="With Dimeon, you can invest your spare change effortlessly every time you make an online payment.
For example, if you spend ₹257 on an item, Dimeon will round up the amount and invest ₹3 — making your total debit ₹260.
Tiny Rounds, Big Rewards — Let your spare change build your future with Dimeon!"
            bgColor="bg-purple-200"
            isExpanded={expandedBox === "ROUND-UP"}
          />
        </div>
        <div onClick={() => handleBoxClick("INVEST2BORROW")}>
          <Box
            heading="INVEST2BORROW"
            description="Earn Loyalty Points by investing daily. The longer your streak, the faster you reach the threshold.
 Hit the target, play a game, and stand a chance to win a loan — a percentage of your invested amount"
            bgColor="bg-red-200"
            isExpanded={expandedBox === "INVEST2BORROW"}
          />
        </div>
        <div onClick={() => handleBoxClick("LUMP-SUM")}>
          <Box
            heading="LUMP-SUM"
            description="With Dimeon, you can automate your investments by setting up High-Amount Deposits — allowing you to invest a fixed amount of your choice every day.
Whether it's as little as ₹10 or as much as ₹5000, Dimeon ensures your money keeps growing consistently"
            bgColor="bg-blue-200"
            isExpanded={expandedBox === "LUMP-SUM"}
          />
        </div>
      </div>
      <div className="w-[80vw] flex justify-between mt-8">
        <div className="w-[30%] h-[60vh] rounded-lg flex flex-col">
          <div className="bg-red-200 h-1/2 rounded-t-lg"></div>
          <div className="bg-white h-1/2 rounded-b-lg p-4">
            <p className="text-black text-lg font-bold">Asset Management Companies (AMCs): An Overview for Young Investors</p>
          </div>
        </div>
        <div className="w-[30%] h-[60vh] rounded-lg flex flex-col">
          <div className="bg-purple-200 h-1/2 rounded-t-lg"></div>
          <div className="bg-white h-1/2 rounded-b-lg p-4">
            <p className="text-black text-lg font-bold">Beginners Guide to Micro Investing: How to Choose the Right App for You</p>
          </div>
        </div>
        <div className="w-[30%] h-[60vh] rounded-lg flex flex-col">
          <div className="bg-blue-200 h-1/2 rounded-t-lg"></div>
          <div className="bg-white h-1/2 rounded-b-lg p-4">
            <p className="text-black text-lg font-bold">Power Of Tiny Gains</p>
          </div>
        </div>
      </div>
    </div>
  );
}
