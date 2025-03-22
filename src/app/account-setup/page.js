"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountSetup() {
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validatePAN = (pan) => {
    // PAN format: ABCDE1234F
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validatePAN(pan)) {
      setError('Please enter a valid PAN number');
      return;
    }

    if (!dob) {
      setError('Please enter your date of birth');
      return;
    }

    if (!gender) {
      setError('Please select your gender');
      return;
    }

    // If all validations pass, proceed to Aadhaar verification
    router.push('/aadhaar-verification');
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
        <div className="w-1/3 h-full bg-purple-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Account Setup</h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            Enter and verify PAN to secure your details.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-xl text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PAN Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="PAN"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-200"
              maxLength="10"
            />
          </div>

          {/* Date of Birth Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Date of Birth: dd-mm-yyyy"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 transition-all duration-200"
            />
          </div>

          {/* Gender Select */}
          <div className="relative">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#1E1E1E] text-xl px-6 py-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-500 appearance-none cursor-pointer transition-all duration-200"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Verify Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-[#2A2A2A] text-gray-400 py-5 rounded-xl text-xl font-medium hover:bg-[#333333] focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
            >
              Verify
            </button>
          </div>

          {/* Aadhaar Link */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => router.push('/aadhaar-setup')}
              className="text-gray-400 underline text-lg hover:text-white transition-colors duration-200"
            >
              Can't remember PAN? Set up with Aadhaar.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 