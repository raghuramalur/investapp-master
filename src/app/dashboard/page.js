"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get the name from localStorage when component mounts
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-end items-center mb-12">
        <button className="text-2xl">☰</button>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto">
        {userName && <h2 className="text-2xl text-gray-300 mb-4">Hello, {userName}</h2>}
        <h1 className="text-5xl font-bold mb-12">Your<br />Investments</h1>

        {/* Investment Summary Card */}
        <div className="bg-[#4A4A8A] rounded-2xl p-8 mb-8 grid grid-cols-2 gap-8">
          <div>
            <div className="text-gray-300 mb-2">Invested</div>
            <div className="text-3xl font-bold">₹12,450</div>
          </div>
          <div>
            <div className="text-gray-300 mb-2">Current Value</div>
            <div className="text-3xl font-bold">₹13,280</div>
          </div>
        </div>

        {/* Fund Details Card */}
        <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden mb-8">
          {/* Fund Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
            <div>
              <div className="text-gray-400 text-sm mb-1">Folio No.</div>
              <div>DM123456</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Invested</div>
              <div>₹12,450</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Current</div>
              <div>₹13,280</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">P and L</div>
              <div className="text-[#ADFF2F]">₹830</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Growth Rate</div>
              <div className="text-[#ADFF2F]">+6.67%</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Withdrawal</div>
              <div>₹0</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">No. of Units</div>
              <div>385.28</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Value per unit</div>
              <div>₹34.47</div>
            </div>
          </div>

          {/* Investment Methods */}
          <div className="bg-[#161616] p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-purple-400">↑</div>
              <div>
                <div className="text-sm">Via Round-Ups</div>
                <div className="text-gray-400 text-sm">₹8,450 from 156 spends</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-red-400">⚠️</div>
              <div>
                <div className="text-sm">Total Defaulted Payments</div>
                <div className="text-gray-400 text-sm">₹240 from 3 transactions</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center text-teal-400">💼</div>
              <div>
                <div className="text-sm">Via Lump-Sum</div>
                <div className="text-gray-400 text-sm">₹4,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Activation Button */}
        <button 
          onClick={() => router.push('/activation')}
          className="w-full bg-[#4A4A8A] text-white py-4 rounded-xl text-xl font-medium hover:bg-[#5A5A9A] transition-all duration-200"
        >
          Complete Activation
        </button>
      </div>
    </div>
  );
} 