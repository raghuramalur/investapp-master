"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [isUPISetup, setIsUPISetup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [xp, setXp] = useState(0);
  const [investmentData, setInvestmentData] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [showPandLGraph, setShowPandLGraph] = useState(false);
  const [showGrowthGraph, setShowGrowthGraph] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [showTimeout, setShowTimeout] = useState(null);
  const [streak, setStreak] = useState(40);
  const [totalSolved, setTotalSolved] = useState(158);
  const [totalAvailable, setTotalAvailable] = useState(3491);
  const [showStreakDetails, setShowStreakDetails] = useState(false);
  const [installDate, setInstallDate] = useState(null);
  const [activeInvestmentDays, setActiveInvestmentDays] = useState(52);
  const [maxStreak, setMaxStreak] = useState(40);
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: '50 Days Badge 2024',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FFD700"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18Z" fill="#FFD700"/>
        </svg>
      ),
      isRecent: true,
      earnedDate: '2024-03-15',
      color: '#FFD700'
    },
    {
      id: 2,
      name: 'Early Investor',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B8A3"/>
        </svg>
      ),
      isRecent: false,
      earnedDate: '2024-03-01',
      color: '#00B8A3'
    }
  ]);
  const router = useRouter();

  useEffect(() => {
    // Get user name from localStorage
    const storedName = localStorage.getItem('userName') || '';
    const userXp = parseInt(localStorage.getItem('userXp') || '0');
    setUserName(storedName);
    setXp(userXp);

    // Set install date if not already set
    const storedInstallDate = localStorage.getItem('installDate');
    if (!storedInstallDate) {
      const currentDate = new Date().toISOString();
      localStorage.setItem('installDate', currentDate);
      setInstallDate(new Date(currentDate));
    } else {
      setInstallDate(new Date(storedInstallDate));
    }

    // Check if UPI setup is complete
    const upiSetupComplete = localStorage.getItem('upiSetupComplete') === 'true';
    setIsUPISetup(upiSetupComplete);

    // Generate mock data for graphs
    generateMockData();
  }, []);

  const generateMockData = () => {
    // Generate last 30 days of data
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let investments = [];
    let returns = [];
    let cumulativeInvestment = 4000; // Starting with base investment
    let cumulativeReturns = 4000;

    for (let i = 0; i < 30; i++) {
      const date = new Date(thirtyDaysAgo);
      date.setDate(date.getDate() + i);

      // Random investment between 50-200 per day
      const dailyInvestment = Math.floor(Math.random() * 150) + 50;
      cumulativeInvestment += dailyInvestment;

      // Returns with some volatility (±2% daily change)
      const dailyReturnChange = (Math.random() * 4 - 2) / 100; // -2% to +2%
      cumulativeReturns = cumulativeReturns * (1 + dailyReturnChange);

      investments.push({
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        value: Math.round(cumulativeInvestment)
      });

      returns.push({
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        value: Math.round(cumulativeReturns)
      });
    }

    setInvestmentData(investments);
    setReturnsData(returns);
  };

  // Chart options and data
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
      axis: 'x'
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: '#2A2A2A'
        },
        ticks: {
          color: '#9CA3AF',
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: '#2A2A2A'
        },
        ticks: {
          color: '#9CA3AF',
          callback: (value) => '₹' + value.toLocaleString()
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 16,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        borderColor: '#2A2A2A',
        borderWidth: 1,
        caretSize: 10,
        caretPadding: 8,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            const value = context.parsed.y;
            const formattedValue = '₹' + value.toLocaleString();
            if (context.dataset.label === 'returns') {
              const baseValue = 12450; // Your base investment
              const percentageChange = ((value - baseValue) / baseValue * 100).toFixed(2);
              return [`${formattedValue}`, `${percentageChange}% return`];
            }
            return formattedValue;
          }
        }
      }
    }
  };

  const investmentChartData = {
    labels: investmentData.map(d => d.date),
    datasets: [
      {
        data: investmentData.map(d => d.value),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#A78BFA',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8B5CF6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }
    ]
  };

  const returnsChartData = {
    labels: returnsData.map(d => d.date),
    datasets: [
      {
        label: 'returns',
        data: returnsData.map(d => d.value),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 20,
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#34D399',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#10B981',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }
    ]
  };

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
      {/* Streak Notification - Shows at the top */}
      {showStreakDetails && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-2.5 shadow-2xl relative overflow-hidden flex items-center justify-center gap-2 animate-streak-fade">
            <button 
              onClick={() => setShowStreakDetails(false)}
              className="absolute -top-1 -right-1 w-6 h-6 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-lg font-bold text-white/90 hover:text-white hover:bg-black/40 transition-all"
            >
              ×
            </button>
            <div className="text-3xl animate-bounce">🔥</div>
            <div className="text-center text-white flex items-center gap-2">
              <span className="text-lg font-bold whitespace-nowrap">{streak} Day Streak!</span>
              <div className="bg-white/20 rounded-md px-2 py-0.5 text-sm">
                <span className="font-bold">{totalSolved}/{totalAvailable}</span>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <div className="flex items-center gap-4">
            {/* Remove Badges Preview and keep only menu button */}
            <button 
              onClick={() => setShowMenu(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-200"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details Modal */}
      {showProfile && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowProfile(false)}
          />
          
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-5xl h-[90vh] bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col md:flex-row">
              {/* Left Column - Header and Basic Info */}
              <div className="w-full md:w-[320px] relative">
                {/* Profile Header */}
                <div className="h-32 bg-gradient-to-r from-purple-500 to-blue-500">
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

                {/* Basic Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-1">{userName}</h2>
                  <p className="text-gray-400 mb-6">Member since March 2024</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-yellow-400 text-lg font-bold mb-1">{xp.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">XP Points</div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-purple-400 text-lg font-bold mb-1">{Math.floor(xp/1000) + 1}</div>
                      <div className="text-xs text-gray-400">Level</div>
                    </div>
                    <div className="bg-[#2A2A2A] rounded-xl p-3 text-center">
                      <div className="text-green-400 text-lg font-bold mb-1">156</div>
                      <div className="text-xs text-gray-400">Investments</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Scrollable Content */}
              <div className="flex-1 overflow-y-auto border-t md:border-t-0 md:border-l border-[#2A2A2A]">
                <div className="p-6">
                  {/* Badges Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Badges</h3>
                      <span className="text-gray-400 text-sm">{badges.length} earned</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {badges.map(badge => (
                        <div key={badge.id} className="flex items-center gap-3 bg-[#2A2A2A] rounded-xl p-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center">
                            {badge.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{badge.name}</div>
                            <div className="text-sm text-gray-400">
                              Earned {new Date(badge.earnedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                          {badge.isRecent && (
                            <div className="flex-shrink-0 px-2 py-1 bg-[#4A4A8A] text-xs rounded-full">
                              Recent
                            </div>
                          )}
                        </div>
                      ))}
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
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300"
                        style={{ width: `${(xp % 1000) / 10}%` }}
                      />
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-[#2A2A2A]">
                      <div className="text-gray-400">UPI ID</div>
                      <div>{localStorage.getItem('upiId') || 'Not set up'}</div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[#2A2A2A]">
                      <div className="text-gray-400">Phone</div>
                      <div>{localStorage.getItem('phoneNumber') || 'Not available'}</div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[#2A2A2A]">
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
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Investment Summary Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Investment Summary Card */}
          <div className="md:col-span-7 bg-[#4A4A8A] rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-gray-300 mb-2">Invested</div>
                <div className="text-3xl font-bold">₹12,450</div>
              </div>
              <div>
                <div className="text-gray-300 mb-2">Current Value</div>
                <div className="text-3xl font-bold">₹13,280</div>
              </div>
            </div>
          </div>

          {/* Streak Display Card */}
          <div 
            className="md:col-span-5 bg-[#1E1E1E] rounded-2xl p-6 cursor-pointer hover:bg-[#252525] transition-colors duration-200"
            onClick={() => setShowStreakDetails(!showStreakDetails)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🔥</div>
                <div>
                  <div className="text-xl font-bold">{streak} Day Streak</div>
                  <div className="text-gray-400 text-sm mt-1">
                    {totalSolved}/{totalAvailable} Invested
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-sm text-right">
                <div>Active days: {activeInvestmentDays}</div>
                <div>Max streak: {maxStreak}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fund Details Card */}
        <div className="bg-[#1E1E1E] rounded-2xl overflow-hidden mb-8">
          {/* Fund Stats Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 p-6">
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
              <div 
                onClick={() => setShowPandLGraph(true)}
                className="w-full text-left hover:opacity-80 transition-opacity duration-200 cursor-pointer relative"
              >
                <div className="text-gray-400 text-sm mb-1">P and L</div>
                <div className="text-[#ADFF2F]">₹830</div>
              </div>
            </div>
            <div>
              <div 
                onClick={() => setShowGrowthGraph(true)}
                className="w-full text-left hover:opacity-80 transition-opacity duration-200 cursor-pointer relative"
              >
                <div className="text-gray-400 text-sm mb-1">Growth Rate</div>
                <div className="text-[#ADFF2F]">+6.67%</div>
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Withdrawal</div>
              <div>₹0</div>
            </div>
          </div>

          {/* Investment Methods */}
          <div className="bg-[#161616] p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* P&L Chart */}
          <div className="bg-[#1E1E1E] rounded-2xl p-6">
            <h2 className="text-xl font-medium mb-6">Investment Returns</h2>
            <div className="h-64 relative">
              <Line data={returnsChartData} options={chartOptions} />
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-[#1E1E1E] rounded-2xl p-6">
            <h2 className="text-xl font-medium mb-6">Investment Growth</h2>
            <div className="h-64 relative">
              <Line data={investmentChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* P&L Graph Modal */}
      {showPandLGraph && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowPandLGraph(false)}
          />
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1A1A1A] rounded-2xl z-50 p-6 shadow-2xl transform transition-transform duration-200 ease-out"
            onMouseEnter={() => {
              clearTimeout(showTimeout);
              setShowPandLGraph(true);
            }}
            onMouseLeave={() => {
              setShowPandLGraph(false);
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Investment Returns</h2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPandLGraph(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="h-80 relative">
              <Line data={returnsChartData} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#2A2A2A] rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Total P&L</div>
                <div className="text-xl font-bold text-[#ADFF2F]">₹830</div>
              </div>
              <div className="bg-[#2A2A2A] rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Return Rate</div>
                <div className="text-xl font-bold text-[#ADFF2F]">+6.67%</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Growth Graph Modal */}
      {showGrowthGraph && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowGrowthGraph(false)}
          />
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#1A1A1A] rounded-2xl z-50 p-6 shadow-2xl transform transition-transform duration-200 ease-out"
            onMouseEnter={() => {
              clearTimeout(showTimeout);
              setShowGrowthGraph(true);
            }}
            onMouseLeave={() => {
              setShowGrowthGraph(false);
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Investment Growth</h2>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGrowthGraph(false);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="h-80 relative">
              <Line data={investmentChartData} options={chartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-[#2A2A2A] rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Total Invested</div>
                <div className="text-xl font-bold">₹12,450</div>
              </div>
              <div className="bg-[#2A2A2A] rounded-xl p-4">
                <div className="text-sm text-gray-400 mb-1">Current Value</div>
                <div className="text-xl font-bold">₹13,280</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Complete Activation Button - Only show if UPI is not set up */}
      {!isUPISetup && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4">
          <div className="bg-[#4A4A8A] rounded-2xl p-4 shadow-2xl backdrop-blur-lg border border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Complete Your Setup</h3>
                <p className="text-sm text-gray-300">Link your UPI ID to start investing</p>
              </div>
              <button 
                onClick={() => router.push('/activation')}
                className="bg-white text-[#4A4A8A] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
              >
                Activate Now
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes streakFade {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          85% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }
        .animate-streak-fade {
          animation: streakFade 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 