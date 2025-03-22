"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AadhaarVerification() {
  const [aadhaar, setAadhaar] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  // Mock phone number (in real app, this would come from signup data)
  const userPhone = "9876543210";
  const maskedPhone = userPhone.slice(0, -3) + "XXX";

  const validateAadhaar = (aadhaar) => {
    const numbers = aadhaar.replace(/\s/g, '');
    return numbers.length === 12 && /^\d+$/.test(numbers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateAadhaar(aadhaar)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    // Show OTP screen instead of redirecting
    setShowOTP(true);
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    // If OTP validation passes, proceed to round-up setup
    router.push('/round-up-setup');
  };

  // Format Aadhaar number with spaces
  const formatAadhaar = (value) => {
    const numbers = value.replace(/\D/g, '');
    const chars = numbers.split('');
    const formatted = chars.reduce((acc, curr, i) => {
      if (i % 4 === 0 && i !== 0) return `${acc} ${curr}`;
      return `${acc}${curr}`;
    }, '');
    return formatted.slice(0, 14); // Limit to 12 digits + 2 spaces
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="w-full px-6">
        <div className="h-16 flex items-center">
          <button 
            onClick={() => showOTP ? setShowOTP(false) : router.back()}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ←
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800">
        <div className="w-2/3 h-full bg-purple-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {!showOTP ? (
          <>
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Verify Aadhaar</h1>
              <p className="text-xl sm:text-2xl text-gray-400">
                Enter your Aadhaar number for verification.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Aadhaar Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Aadhaar Number"
                  value={aadhaar}
                  onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                  className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-200"
                  maxLength="14"
                />
              </div>

              {/* Verify Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#2A2A2A] text-gray-400 py-5 rounded-xl text-xl font-medium hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Verify & Continue
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Enter OTP</h1>
              <p className="text-xl sm:text-2xl text-gray-400">
                Enter the OTP sent to {maskedPhone}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleOTPSubmit} className="space-y-6">
              {/* OTP Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-200"
                  maxLength="6"
                />
              </div>

              {/* Verify OTP Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-[#2A2A2A] text-gray-400 py-5 rounded-xl text-xl font-medium hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                >
                  Verify OTP
                </button>
              </div>

              {/* Resend OTP */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  className="text-gray-400 underline text-lg hover:text-white transition-colors duration-200"
                  onClick={() => {
                    // In a real app, this would trigger the OTP resend
                    setError('New OTP sent successfully');
                    setTimeout(() => setError(''), 3000);
                  }}
                >
                  Resend OTP
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 