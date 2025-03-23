"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";

export default function About() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 mb-12">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={200}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
          Back to Home
        </Link>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <h1 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          About Dime.On
        </h1>
        <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
          Making investing effortless through smart round-ups on your daily transactions.
        </p>
      </div>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
        <div className="bg-[#3A3A6A] rounded-2xl p-8 shadow-xl">
          <p className="text-lg leading-relaxed mb-6">
            At Dime.On, we're transforming the way people think about investing. Our mission is simple: 
            to help you build wealth automatically through your everyday transactions.
          </p>
          <p className="text-lg leading-relaxed">
            We believe that small, consistent investments can lead to significant growth over time. 
            That's why we've created a platform that makes investing as simple as spending.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-12 text-center">How Round-Up Investing Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1C1C1C] rounded-xl p-6 hover:bg-[#2A2A2A] transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">1. Spend Normally</h3>
            <p className="text-gray-300">
              Make your regular purchases as you always do. Whether it's your morning coffee for ₹80 
              or groceries for ₹470, every transaction is an opportunity to invest.
            </p>
          </div>
          <div className="bg-[#1C1C1C] rounded-xl p-6 hover:bg-[#2A2A2A] transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">2. Automatic Round-Up</h3>
            <p className="text-gray-300">
              We round up each purchase to the nearest hundred. So, ₹80 becomes ₹100, and ₹470 
              becomes ₹500. The difference (₹20 and ₹30) is set aside for investment.
            </p>
          </div>
          <div className="bg-[#1C1C1C] rounded-xl p-6 hover:bg-[#2A2A2A] transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">3. Smart Investment</h3>
            <p className="text-gray-300">
              Once your round-ups reach ₹100, we automatically invest it in your chosen portfolio. 
              You can track your investments and round-ups in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-8 text-center">See It In Action</h2>
        <div className="bg-gradient-to-r from-[#3A3A6A] to-[#4A4A8A] rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Daily Transactions</h3>
              <ul className="space-y-4 text-gray-200">
                <li>• Morning Coffee: ₹85 → ₹15 invested</li>
                <li>• Lunch: ₹240 → ₹60 invested</li>
                <li>• Groceries: ₹670 → ₹30 invested</li>
                <li>• Movie Ticket: ₹350 → ₹50 invested</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Investment Growth</h3>
              <p className="text-gray-200 mb-4">
                In this example, you've invested ₹155 in a single day, just from regular spending. 
                Over a month, these small round-ups could add up to ₹3000-5000 in investments.
              </p>
              <p className="text-gray-200">
                The best part? It's all automatic. You don't need to think about it or change your 
                spending habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Why Round-Up Investing Works</h2>
        <div className="bg-[#1C1C1C] rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Effortless Saving</h3>
              <p className="text-gray-300">
                No need to manually set aside money or remember to invest. Your everyday 
                transactions automatically build your investment portfolio.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Painless Investment</h3>
              <p className="text-gray-300">
                Small round-ups are barely noticeable in your daily spending, but they add up 
                to significant investments over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold mb-6">Start Your Investment Journey Today</h2>
        <p className="text-xl text-gray-300 mb-8">
          Turn your everyday transactions into investment opportunities
        </p>
        <Link href="/signup">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200">
            Start Investing Now
          </button>
        </Link>
      </section>
    </div>
  );
} 