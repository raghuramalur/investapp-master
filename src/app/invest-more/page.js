"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvestMore() {
  const [currentRoundUp, setCurrentRoundUp] = useState('10');
  const [defaultAmount, setDefaultAmount] = useState(240);
  const [defaultTransactions, setDefaultTransactions] = useState(3);
  const router = useRouter();

  useEffect(() => {
    // Get the current round-up amount from localStorage
    const savedRoundUp = localStorage.getItem('roundUpAmount') || '10';
    setCurrentRoundUp(savedRoundUp);
  }, []);

  const handleRoundUpClick = () => {
    router.push('/round-up-setup');
  };

  const handleClearDefaults = () => {
    router.push('/clear-defaults');
  };

  const handleLumpSum = () => {
    router.push('/lump-sum');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="w-full px-6">
        <div className="h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ←
          </button>
          <button 
            onClick={() => router.push('/menu')}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <h1 className="text-5xl font-bold mb-12">Invest More</h1>

        {/* Investment Options */}
        <div className="space-y-3">
          {/* Round-Up Option */}
          <button
            onClick={handleRoundUpClick}
            className="w-full bg-[#1E1E1E] p-4 rounded-xl flex items-center justify-between hover:bg-[#2A2A2A] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl text-purple-400">⟲</span>
              </div>
              <div className="text-left">
                <div className="text-lg font-medium">Round-Up</div>
                <div className="text-sm text-gray-400">Invest more with every spend</div>
              </div>
            </div>
            <div className="text-lg text-gray-400">₹{currentRoundUp}</div>
          </button>

          {/* Clear Defaults Option */}
          <button
            onClick={handleClearDefaults}
            className="w-full bg-[#1E1E1E] p-4 rounded-xl flex items-center justify-between hover:bg-[#2A2A2A] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-yellow-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl text-yellow-400">₹</span>
              </div>
              <div className="text-left">
                <div className="text-lg font-medium">Clear Default Payments</div>
                <div className="text-sm text-gray-400">{defaultTransactions} failed transactions</div>
              </div>
            </div>
            <div className="text-lg text-gray-400">₹{defaultAmount}</div>
          </button>

          {/* Lump-Sum Option */}
          <button
            onClick={handleLumpSum}
            className="w-full bg-[#1E1E1E] p-4 rounded-xl flex items-center justify-between hover:bg-[#2A2A2A] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl text-teal-400">💼</span>
              </div>
              <div className="text-left">
                <div className="text-lg font-medium">Lump-Sum</div>
                <div className="text-sm text-gray-400">Invest it before you spend it</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 