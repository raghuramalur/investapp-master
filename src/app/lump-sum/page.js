"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LumpSum() {
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleInvest = async () => {
    if (!amount || parseInt(amount) < 100) return;
    
    setProcessing(true);
    try {
      // Simulate API call to process payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update invested amount in localStorage
      const currentInvested = parseInt(localStorage.getItem('investedAmount') || '0');
      localStorage.setItem('investedAmount', (currentInvested + parseInt(amount)).toString());
      
      // Play success sound
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToTimeValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }

      setShowSuccess(true);
      // Redirect after success animation
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setProcessing(false);
      // Handle error
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="success-animation mb-8">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Investment Added!</h2>
          <p className="text-gray-400">₹{amount} will be added to your investments</p>
        </div>
      </div>
    );
  }

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

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">Lump Sum Investment</h1>

        <div className="bg-[#1E1E1E] rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl text-teal-400">💼</span>
            </div>
            <div>
              <div className="text-xl font-medium">Enter Amount</div>
              <div className="text-gray-400">Minimum ₹100</div>
            </div>
          </div>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">₹</span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0"
              className="w-full bg-[#2A2A2A] text-3xl font-bold py-4 px-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-gray-400 text-sm">
            Amount will be deducted from your linked UPI account
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Investment Amount</span>
              <span>₹{amount || '0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Processing Fee</span>
              <span>₹0</span>
            </div>
            <div className="border-t border-gray-800 pt-4 flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹{amount || '0'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleInvest}
          disabled={processing || !amount || parseInt(amount) < 100}
          className={`w-full bg-purple-500 text-white py-5 rounded-xl text-xl font-medium transition-all duration-200 ${
            processing || !amount || parseInt(amount) < 100
              ? 'opacity-75 cursor-not-allowed'
              : 'hover:bg-purple-600 focus:ring-2 focus:ring-purple-500'
          }`}
        >
          {processing ? 'Processing...' : 'Invest Now'}
        </button>
      </div>
    </div>
  );
} 