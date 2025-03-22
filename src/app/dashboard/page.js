"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [isUPISetup, setIsUPISetup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName') || '';
    setUserName(storedName);

    // Check if UPI setup is complete
    const upiSetupComplete = localStorage.getItem('upiSetupComplete') === 'true';
    setIsUPISetup(upiSetupComplete);
  }, []);

  const menuItems = [
    { 
      icon: '💰', 
      label: 'Invest More', 
      subtext: 'Meet your goals faster',
      onClick: () => router.push('/invest-more')
    },
    { icon: '↩️', label: 'Withdraw', subtext: 'Or just stay invested!' },
    { icon: '👥', label: 'Share With Friends', subtext: 'Earn rewards' },
    { icon: '🎧', label: 'Support', subtext: 'Ask, connect, explore' },
    { icon: '🔔', label: 'Notifications', subtext: '4 new notifications', highlight: true },
    { icon: '⚙️', label: 'Settings', subtext: 'Make Dime.On yours' },
    { icon: '📚', label: 'Wise Up', subtext: 'Tips, tricks & more!' },
    { icon: '❓', label: 'FAQ', subtext: 'Qs from users like you!' },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Header with Menu Icon */}
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center">
            <span className="text-2xl">D</span>
          </div>
          <div>
            <p className="text-sm text-gray-400">Hello!</p>
            <p className="font-semibold">{userName || 'User'}</p>
          </div>
        </div>
        <button 
          onClick={() => setShowMenu(true)}
          className="text-2xl hover:text-gray-300 transition-colors duration-200"
        >
          ☰
        </button>
      </div>

      {/* Menu Sidebar */}
      {showMenu && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#1A1A1A] z-50 overflow-y-auto">
            {/* Menu Header */}
            <div className="p-6 flex justify-between items-center border-b border-gray-800">
              <div>
                <p className="text-sm text-gray-400">Hello!</p>
                <p className="text-xl font-semibold">{userName || 'User'}</p>
              </div>
              <button 
                onClick={() => setShowMenu(false)}
                className="text-2xl hover:text-gray-300 transition-colors duration-200"
              >
                ×
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setShowMenu(false);
                    item.onClick && item.onClick();
                  }}
                  className="w-full p-4 flex items-start gap-4 hover:bg-[#2A2A2A] rounded-xl transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-[#2A2A2A] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-400">{item.subtext}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* App Version */}
            <div className="p-6 text-center text-sm text-gray-500">
              Dime.On v3.1.37 · ARN - 176587
            </div>
          </div>
        </>
      )}

      {/* Main Dashboard Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
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
      </div>

      {/* Complete Activation Button - Only show if UPI is not set up */}
      {!isUPISetup && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#121212] to-transparent">
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={() => router.push('/activation')}
              className="w-full bg-[#4A4A8A] text-white py-4 rounded-xl text-xl font-medium hover:bg-[#5A5A9A] transition-all duration-200"
            >
              Complete Activation
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 