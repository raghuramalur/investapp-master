"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Verify() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const playVerificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set a pleasant frequency and very short duration
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }

    // Check if all digits are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      // Play sound and navigate after a short delay
      playVerificationSound();
      setTimeout(() => {
        router.push('/welcome');
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      playVerificationSound();
      setTimeout(() => {
        router.push('/welcome');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-700 rounded-full mb-12">
        <div className="w-2/4 h-full bg-purple-500 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
        <h1 className="text-5xl font-bold mb-4">Verify</h1>
        
        <p className="text-2xl text-gray-300 mb-8">
          Enter the 6-digit code sent to your phone.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyUp={(e) => {
                  if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
                    e.target.previousSibling.focus();
                  }
                }}
                className="w-12 h-12 text-center bg-[#1E1E1E] rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-purple-500 hover:text-purple-400 transition-colors duration-200"
            >
              Resend Code
            </button>
          </div>

          {/* Terms and conditions */}
          <div className="mt-auto text-center text-gray-400 text-sm">
            By continuing, you agree to the{' '}
            <Link href="/terms" className="underline text-white">
              Terms & Conditions
            </Link>
            .
          </div>

          {/* Continue button */}
          <button
            type="submit"
            className="w-full bg-[#1E1E1E] text-gray-300 py-4 rounded-lg text-lg font-medium mt-4 hover:bg-[#2A2A2A] transition-colors duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
} 