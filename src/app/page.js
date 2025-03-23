"use client";
import { useState } from "react";
import Link from "next/link";
import logo from "../assets/logo.png";
import howGif from "../assets/how.gif";
import investingImage from "../assets/Investing.webp";
import stepUpSIP from "../assets/steu-up-SIP.webp";
import tax from "../assets/tax.webp";
import Image from "next/image";
import Box from "../components/Box"; // Import the Box component
import card1 from "../assets/card1.svg";
import card2 from "../assets/card2.svg";
import card3 from "../assets/card3.svg";

export default function Home() {
  const [expandedBox, setExpandedBox] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleBoxClick = (box) => {
    setExpandedBox(expandedBox === box ? null : box);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 1 ? prevSlide - 1 : 6));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide < 6 ? prevSlide + 1 : 1));
  };

  const handleDotClick = (dot) => {
    setCurrentSlide(dot);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] scroll-smooth">
      <header className="w-full flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center gap-16">
          <Image
            src={logo}
            alt="Logo"
            width="12.5rem"
            height="12.5rem"
            className="mr-1 sm:mr-2"
          />
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-white hover:text-purple-300 transition-colors duration-200 text-lg font-medium">
              • About Us
            </Link>
            <Link href="#get-smart-articles" className="text-white hover:text-purple-300 transition-colors duration-200 text-lg font-medium">
              • Wise Up
            </Link>
            <Link href="#faq-section" className="text-white hover:text-purple-300 transition-colors duration-200 text-lg font-medium">
              • FAQ
            </Link>
            <Link href="/contact" className="text-white hover:text-purple-300 transition-colors duration-200 text-lg font-medium">
              • Contact Us
            </Link>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <button className="bg-transparent hover:bg-purple-50 text-purple-600 px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200 border border-purple-200">
            Login
          </button>
          <Link href="/signup">
            <button className="bg-[#3A3A6A] hover:bg-[#4A4A8A] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-200">
              Start Investing
            </button>
          </Link>
        </div>
      </header>
      <div className="w-[95vw] h-[55vh] rounded-2xl mb-2 p-2 mt-2 overflow-hidden ml-[-2rem] relative">
        <video
          src="/videos/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-4 text-center text-white drop-shadow-lg">
            Invest Your Spare Change
          </h1>
          <p className="text-2xl text-center max-w-2xl drop-shadow-lg">
            Turn your everyday transactions into investment opportunities
          </p>
        </div>
      </div>
      <div className="w-[80vw] h-[60vh] flex items-center">
        <div className="w-[40%] h-[70%] relative">
          <Image
            src={howGif}
            alt="How"
            width="50%"
            height="auto"
            className="w-full h-full rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Simplifying Investments
            </h2>
          </div>
        </div>
        <div className="ml-auto p-8 rounded-lg w-[50%] h-[70%] flex flex-col justify-center items-center bg-[#3A3A6A] bg-opacity-95">
          <h1 className="text-purple-400 text-5xl font-bold mb-6 font-serif">How To Dime.On</h1>
          <p className="text-white text-xl text-center">You just continue spending on the things you love – Dime.On will automatically round up all online transactions, and invest the difference in a fund of your choice.</p>
        </div>
      </div>
      <h1 className="text-center text-5xl font-bold font-serif mt-2">Your investment, Your way</h1>
      <div className="w-[80vw] flex justify-between mt-4">
        <div onClick={() => handleBoxClick("ROUND-UP")}>
          <Box
            heading="ROUND-UP"
            description="With Dimeon, you can invest your spare change effortlessly every time you make an online payment.
For example, if you spend ₹257 on an item, Dimeon will round up the amount and invest ₹3 — making your total debit ₹260.
Tiny Rounds, Big Rewards — Let your spare change build your future with Dimeon!"
            bgColor="bg-purple-200"
            isExpanded={expandedBox === "ROUND-UP"}
          />
        </div>
        <div onClick={() => handleBoxClick("INVEST2BORROW")}>
          <Box
            heading="INVEST2BORROW"
            description="Earn Loyalty Points by investing daily. The longer your streak, the faster you reach the threshold.
 Hit the target, play a game, and stand a chance to win a loan — a percentage of your invested amount"
            bgColor="bg-red-200"
            isExpanded={expandedBox === "INVEST2BORROW"}
          />
        </div>
        <div onClick={() => handleBoxClick("LUMP-SUM")}>
          <Box
            heading="LUMP-SUM"
            description="With Dimeon, you can automate your investments by setting up High-Amount Deposits — allowing you to invest a fixed amount of your choice every day.
Whether it's as little as ₹10 or as much as ₹5000, Dimeon ensures your money keeps growing consistently"
            bgColor="bg-blue-200"
            isExpanded={expandedBox === "LUMP-SUM"}
          />
        </div>
      </div>
      <div id="get-smart-articles" className="w-full flex flex-col items-center gap-8">
        <h1 className="text-center text-5xl font-bold font-serif text-white mb-12">Wise Up</h1>
        <div className="w-[90vw] max-w-[1400px] flex justify-center gap-6">
          {/* Card 1 */}
          <Link 
            href="https://zerodha.com/varsity/module/introduction-to-stock-markets/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-[400px] h-[300px] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={card1}
              alt="Card 1"
              width={400}
              height={300}
              priority
              className="w-full h-full"
            />
          </Link>

          {/* Card 2 */}
          <Link 
            href="https://zerodha.com/varsity/module/technical-analysis/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-[400px] h-[300px] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={card2}
              alt="Card 2"
              width={400}
              height={300}
              priority
              className="w-full h-full"
            />
          </Link>

          {/* Card 3 */}
          <Link 
            href="https://zerodha.com/varsity/module/fundamental-analysis/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-[400px] h-[300px] rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={card3}
              alt="Card 3"
              width={400}
              height={300}
              priority
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>
      <div id="faq-section" className="w-full flex flex-col items-center gap-8">
        <h1 className="text-center text-5xl font-bold font-serif text-white">FAQ</h1>
        
        <div className="w-[80vw] flex justify-center gap-4 mb-4">
          <button 
            onClick={() => setExpandedBox("about")}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 
              ${expandedBox === "about" ? "bg-purple-600 text-white" : "bg-[#1C1C1C] text-white hover:bg-gray-800"}`}
          >
            About The App
          </button>
          
          <button 
            onClick={() => setExpandedBox("investments")}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 
              ${expandedBox === "investments" ? "bg-purple-600 text-white" : "bg-[#1C1C1C] text-white hover:bg-gray-800"}`}
          >
            Investments And Returns
          </button>
          
          <button 
            onClick={() => setExpandedBox("account")}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 
              ${expandedBox === "account" ? "bg-purple-600 text-white" : "bg-[#1C1C1C] text-white hover:bg-gray-800"}`}
          >
            Account Setup
          </button>
          
          <button 
            onClick={() => setExpandedBox("autopay")}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors duration-200 
              ${expandedBox === "autopay" ? "bg-purple-600 text-white" : "bg-[#1C1C1C] text-white hover:bg-gray-800"}`}
          >
            Autopay
          </button>
        </div>

        <div className="w-[80vw] bg-[#1C1C1C] rounded-lg overflow-hidden">
          {expandedBox === "account" && (
            <>
              <button 
                onClick={() => setExpandedBox("account_q1")}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-purple-700 transition-colors duration-200 border-b border-purple-500"
              >
                <span className="text-lg font-medium text-white">How to set up Deciml and start investing?</span>
                <span className={`transform transition-transform duration-200 text-white ${expandedBox === "account_q1" ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              <button 
                onClick={() => setExpandedBox("account_q2")}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-purple-700 transition-colors duration-200 border-b border-purple-500"
              >
                <span className="text-lg font-medium text-white">Why is PAN required for account setup?</span>
                <span className={`transform transition-transform duration-200 text-white ${expandedBox === "account_q2" ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              <button 
                onClick={() => setExpandedBox("account_q3")}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-purple-700 transition-colors duration-200"
              >
                <span className="text-lg font-medium text-white">What to do if I don't have PAN?</span>
                <span className={`transform transition-transform duration-200 text-white ${expandedBox === "account_q3" ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
            </>
          )}

          {expandedBox === "investments" && (
            <>
              <div className="bg-[#9ACD32] text-black p-4 font-medium text-lg rounded-t-lg">
                Investments And Returns
              </div>
              <button 
                onClick={() => setExpandedBox("invest_q1")}
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-purple-700 transition-colors duration-200 border-b border-purple-500"
              >
                <span className="text-lg font-medium text-white">What are the investment options available?</span>
                <span className={`transform transition-transform duration-200 text-white ${expandedBox === "invest_q1" ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
            </>
          )}

          {!expandedBox && (
            <div className="p-4 text-white text-center">
              Please select a category above to view relevant FAQs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}