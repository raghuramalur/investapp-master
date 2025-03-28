"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UPISetup() {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const validateUPI = (upi) => {
    // Basic UPI validation: username@provider
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
    return upiRegex.test(upi);
  };

  const handleSetupComplete = async () => {
    setProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update UPI setup status in localStorage
      localStorage.setItem('isUPISetup', 'true');
      localStorage.setItem('upiId', upiId);

      // Award XP for completing activation
      const currentXp = parseInt(localStorage.getItem('userXp') || '0');
      localStorage.setItem('userXp', (currentXp + 500).toString());
      
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
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setProcessing(false);
      // Handle error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateUPI(upiId)) {
      setError('Please enter a valid UPI ID (e.g., username@okicici)');
      return;
    }

    await handleSetupComplete();
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
          <h2 className="text-3xl font-bold mb-4">Setup Complete!</h2>
          <p className="text-gray-400">Your micro-investing journey begins now</p>
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

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div className="w-full h-full bg-purple-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Set Up Auto-Pay</h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            Link your UPI ID for automatic round-up investments
          </p>
        </div>

        <div className="mb-8 p-6 bg-[#1E1E1E] rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">How it works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">1</div>
              <p className="text-gray-400">Link your UPI ID (Google Pay, PhonePe, Paytm, etc.)</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">2</div>
              <p className="text-gray-400">We'll automatically deduct the round-up amount after each of your transactions</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">3</div>
              <p className="text-gray-400">The rounded-up amount will be invested in your portfolio instantly</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <label className="block text-xl text-gray-300">Your UPI ID</label>
            <input
              type="text"
              placeholder="username@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value.toLowerCase())}
              className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-200"
            />
            <p className="text-sm text-gray-400">
              Example: username@okicici, number@okhdfc, etc.
            </p>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-5 rounded-xl text-xl font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
            >
              Set Up Auto-Pay
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
} 