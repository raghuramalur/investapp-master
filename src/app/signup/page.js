"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Clear all previous user data when someone starts signing up
    localStorage.clear();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to send OTP
    // For now, we'll just navigate to the verify page
    if (phoneNumber.length === 10) {
      localStorage.setItem('phoneNumber', phoneNumber);
      router.push('/verify');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-700 rounded-full mb-12">
        <div className="w-1/4 h-full bg-purple-500 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
        <h1 className="text-5xl font-bold mb-4">Sign Up</h1>
        
        <p className="text-2xl text-gray-300 mb-8">
          Link your mobile number for regular investment updates.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <div className="flex items-center bg-[#1E1E1E] rounded-lg">
              <span className="text-gray-400 pl-4 pr-2 text-lg">+91</span>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-transparent text-lg py-4 px-2 focus:outline-none text-white placeholder-gray-500"
                maxLength="10"
              />
            </div>
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
            Continue To Verify
          </button>
        </form>
      </div>
    </div>
  );
} 