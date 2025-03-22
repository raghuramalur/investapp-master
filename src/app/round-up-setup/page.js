"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoundUpSetup() {
  const [roundUpAmount, setRoundUpAmount] = useState('10');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save the round-up preference
    router.push('/upi-setup');
  };

  // Generate dynamic examples based on selected round-up amount
  const getExampleTransactions = (amount) => {
    const numAmount = parseInt(amount);
    switch(numAmount) {
      case 5:
        return [
          { amount: 43, roundUp: 2 },
          { amount: 156, roundUp: 4 },
          { amount: 95, roundUp: 5 },
        ];
      case 10:
        return [
          { amount: 82, roundUp: 8 },
          { amount: 195, roundUp: 5 },
          { amount: 144, roundUp: 6 },
        ];
      case 50:
        return [
          { amount: 276, roundUp: 24 },
          { amount: 430, roundUp: 20 },
          { amount: 168, roundUp: 32 },
        ];
      case 100:
        return [
          { amount: 445, roundUp: 55 },
          { amount: 720, roundUp: 80 },
          { amount: 834, roundUp: 66 },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="w-full px-6">
        <div className="h-16 flex items-center">
          <button 
            onClick={() => router.back()}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ←
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div className="w-3/4 h-full bg-purple-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Round-Up Settings</h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            Choose how much to round up each transaction for micro-investing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <label className="block text-xl text-gray-300">Round up to nearest</label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {['5', '10', '50', '100'].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setRoundUpAmount(amount)}
                  className={`p-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                    roundUpAmount === amount
                      ? 'bg-purple-500 text-white'
                      : 'bg-[#2A2A2A] text-gray-400 hover:bg-[#333333]'
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 p-6 bg-[#1E1E1E] rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">How it works</h2>
            <p className="text-gray-400 mb-6">
              When you spend, we'll round up to the nearest ₹{roundUpAmount} and invest the difference:
            </p>
            <div className="space-y-4">
              {getExampleTransactions(roundUpAmount).map((tx, index) => (
                <div key={index} className="flex justify-between items-center text-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">You spend ₹{tx.amount}</span>
                    <span className="text-gray-600">→</span>
                    <span>Rounded to ₹{tx.amount + tx.roundUp}</span>
                  </div>
                  <span className="text-purple-400">+₹{tx.roundUp} invested</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-5 rounded-xl text-xl font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              Continue
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            You can change this setting anytime from your profile.
          </p>
        </div>
      </div>
    </div>
  );
} 