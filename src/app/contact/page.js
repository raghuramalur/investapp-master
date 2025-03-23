"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 2000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <div className="w-full px-6">
        <div className="h-16 flex items-center">
          <button 
            onClick={() => router.push('/')}
            className="text-2xl hover:text-gray-300 transition-colors duration-200"
          >
            ←
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-[#1E1E1E] rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-purple-400 font-medium mb-2">Email</h3>
                  <p>support@dimeon.com</p>
                  <p>business@dimeon.com</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-medium mb-2">Phone</h3>
                  <p>+91 (800) 123-4567</p>
                  <p>Mon - Fri, 9:00 AM - 6:00 PM IST</p>
                </div>

                <div>
                  <h3 className="text-purple-400 font-medium mb-2">Office</h3>
                  <p>123 Startup Hub,</p>
                  <p>Koramangala 5th Block,</p>
                  <p>Bangalore - 560095</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                  𝕏
                </button>
                <button className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                  in
                </button>
                <button className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                  f
                </button>
                <button className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200">
                  IG
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1E1E1E] rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#2A2A2A] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Send Message
              </button>
            </form>

            {showSuccess && (
              <div className="mt-4 p-4 bg-green-500 bg-opacity-20 text-green-400 rounded-lg text-center">
                Message sent successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 