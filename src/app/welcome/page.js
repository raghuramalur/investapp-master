"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Welcome() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName) {
      // Clear all previous user data
      localStorage.clear();
      
      // Store new user data
      localStorage.setItem('userName', firstName);
      localStorage.setItem('upiSetupComplete', 'false'); // Explicitly set UPI setup as incomplete
      
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-700 rounded-full mb-12">
        <div className="w-3/4 h-full bg-purple-500 rounded-full"></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
        <h1 className="text-5xl font-bold mb-4">Hello There!</h1>
        
        <p className="text-2xl text-gray-300 mb-2">
          Let's get introduced properly?
        </p>
        
        <p className="text-sm text-gray-400 mb-6">
          *Please enter name as per your PAN.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-[#1E1E1E] text-lg py-4 px-4 rounded-lg focus:outline-none text-white placeholder-gray-500"
          />
          
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-[#1E1E1E] text-lg py-4 px-4 rounded-lg focus:outline-none text-white placeholder-gray-500"
          />

          <div className="mt-auto text-center text-gray-400 text-sm">
            By continuing, you allow Dime.On to{' '}
            <Link href="/sms-policy" className="underline text-white">
              view transaction SMS
            </Link>{' '}
            for automatic<br />savings and investments.
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E1E1E] text-gray-300 py-4 rounded-lg text-lg font-medium mt-4 hover:bg-[#2A2A2A] transition-colors duration-200"
          >
            Continue
          </button>

          <Link href="/privacy" className="text-center underline text-gray-400 text-sm">
            View Privacy Policy
          </Link>
        </form>
      </div>
    </div>
  );
} 