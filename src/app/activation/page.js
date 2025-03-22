"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../../assets/logo.png';

export default function Activation() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      {/* Main Card */}
      <div className="bg-[#1E1E1E] rounded-3xl p-8 flex flex-col items-center max-w-xl mx-auto mt-12">
        {/* Logo */}
        <div className="w-32 h-32 mb-12">
          <Image
            src={logo}
            alt="Dime.On Logo"
            width={128}
            height={128}
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold mb-12 text-center">
          Here's what's next:
        </h1>

        {/* Steps */}
        <div className="space-y-12 w-full text-center mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Step 1 - Account Setup
            </h2>
            <p className="text-gray-400 text-lg italic">
              SEBI verification of your PAN/<br />
              Aadhaar for your complete<br />
              security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Step 2 - Automatic Investing
            </h2>
            <p className="text-gray-400 text-lg italic">
              UPI autopay setup for easy<br />
              investing.
            </p>
          </div>
        </div>

        {/* Start Investing Button */}
        <button 
          onClick={() => router.push('/account-setup')}
          className="w-full bg-[#4A4A8A] text-white py-4 rounded-full text-xl font-medium hover:bg-[#5A5A9A] transition-all duration-200"
        >
          Start Investing
        </button>
      </div>
    </div>
  );
} 