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

  // Example transactions to show how round-up works
  const exampleTransactions = [
    { amount: 45, roundUp: 5 },
    { amount: 132, roundUp: 8 },
    { amount: 99, roundUp: 1 },
  ];

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

        <div className="mb-8 p-6 bg-[#1E1E1E] rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <div className="space-y-4">
            {exampleTransactions.map((tx, index) => (
              <div key={index} className="flex justify-between items-center text-lg">
                <span className="text-gray-400">₹{tx.amount}</span>
                <span className="text-purple-400">+₹{tx.roundUp}</span>
                <span>₹{tx.amount + tx.roundUp}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400">
              We'll round up your transactions to the nearest ₹{roundUpAmount} and invest the difference.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <label className="block text-xl text-gray-300">Round up to nearest</label>
            <div className="grid grid-cols-3 gap-4">
              {['5', '10', '20'].map((amount) => (
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