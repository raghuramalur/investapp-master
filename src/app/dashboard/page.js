"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [isUPISetup, setIsUPISetup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [xp, setXp] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName') || '';
    const userXp = parseInt(localStorage.getItem('userXp') || '0');
    setUserName(storedName);
    setXp(userXp);

    // Check if UPI setup is complete
    const upiSetupComplete = localStorage.getItem('upiSetupComplete') === 'true';
    setIsUPISetup(upiSetupComplete);
  }, []);

  const menuItems = [
    {
      icon: '💰',
      label: 'Invest More',
      onClick: () => {
        setShowMenu(false);
        router.push('/invest-more');
      }
    },
    {
      icon: '↓',
      label: 'Withdraw Funds',
      onClick: () => {
        setShowMenu(false);
        router.push('/withdraw');
      }
    },
    {
      icon: '📊',
      label: 'Transactions',
      onClick: () => {
        setShowMenu(false);
        router.push('/transactions');
      },
      subtext: 'View your investment history'
    },
    {
      icon: '👥',
      label: 'Share With Friends',
      subtext: 'Earn rewards'
    },
    {
      icon: '🎧',
      label: 'Support',
      subtext: 'Ask, connect, explore'
    },
    {
      icon: '🔔',
      label: 'Notifications',
      subtext: '4 new notifications',
      highlight: true
    },
    {
      icon: '⚙️',
      label: 'Settings',
      onClick: () => {
        setShowMenu(false);
        router.push('/settings');
      }
    },
    {
      icon: '📚',
      label: 'Wise Up',
      subtext: 'Tips, tricks & more!'
    },
    {
      icon: '❓',
      label: 'FAQ',
      subtext: 'Qs from users like you!'
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Header with Menu Icon */}
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowProfile(true)}
              className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center text-xl font-medium hover:bg-[#3A3A3A] transition-colors duration-200"
            >
              {userName ? userName[0].toUpperCase() : 'U'}
            </button>
            <div>
              <div className="text-xl font-medium mb-1">Hello, {userName}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#2A2A2A] rounded-full px-3 py-1.5">
                  <div className="w-4 h-4 mr-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-yellow-400 text-sm font-medium">{xp.toLocaleString()} XP</span>
                </div>
                <div className="text-xs text-gray-400">Level {Math.floor(xp/1000) + 1}</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowMenu(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-200"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* Profile Details Modal */}
      {showProfile && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowProfile(false)}
          />
          
          {/* Profile Modal */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-[#1A1A1A] rounded-2xl z-50 overflow-hidden">
            {/* Profile Header */}
            <div className="relative h-32 bg-gradient-to-r from-purple-500 to-blue-500">
              <button 
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-40 transition-all duration-200"
              >
                ×
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="relative -mt-12 px-6">
              <div className="w-24 h-24 bg-[#2A2A2A] rounded-full flex items-center justify-center text-3xl font-medium border-4 border-[#1A1A1A]">
                {userName ? userName[0].toUpperCase() : 'U'}
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-1">{userName}</h2>
              <p className="text-gray-400 mb-6">Member since March 2024</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#2A2A2A] rounded-xl p-4 text-center">
                  <div className="text-yellow-400 text-xl font-bold mb-1">{xp.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">XP Points</div>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4 text-center">
                  <div className="text-purple-400 text-xl font-bold mb-1">{Math.floor(xp/1000) + 1}</div>
                  <div className="text-xs text-gray-400">Level</div>
                </div>
                <div className="bg-[#2A2A2A] rounded-xl p-4 text-center">
                  <div className="text-green-400 text-xl font-bold mb-1">156</div>
                  <div className="text-xs text-gray-400">Investments</div>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress to Level {Math.floor(xp/1000) + 2}</span>
                  <span className="text-gray-400">{xp % 1000}/1000 XP</span>
                </div>
                <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                    style={{ width: `${(xp % 1000) / 10}%` }}
                  />
                </div>
              </div>

              {/* Account Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-gray-400">UPI ID</div>
                  <div>{localStorage.getItem('upiId') || 'Not set up'}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-400">Phone</div>
                  <div>{localStorage.getItem('phoneNumber') || 'Not available'}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-400">Email</div>
                  <div>{localStorage.getItem('email') || 'Not available'}</div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button 
                onClick={() => {
                  setShowProfile(false);
                  router.push('/settings');
                }}
                className="w-full mt-6 bg-[#2A2A2A] text-white py-3 rounded-xl font-medium hover:bg-[#3A3A3A] transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}

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