"use client";
import { useState, useEffect, useRef } from "react";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        className="p-2 rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="h-9 w-9" // Increased size by 1.5 times (6 * 1.5 = 9)
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-1/4 bg-gray-800 bg-opacity-90 backdrop-blur-lg shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col gap-6">
          <button
            className="self-end p-2 rounded-md focus:outline-none text-gray-200 hover:text-green-500 transition-colors duration-300"
            onClick={toggleMenu}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-9 w-9" // Increased size by 1.5 times (6 * 1.5 = 9)
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <a href="#" className="block px-4 py-2 text-xl font-bold text-gray-200 hover:text-green-500 rounded transition-colors duration-300">
            About Us
          </a>
          <a href="#" className="block px-4 py-2 text-xl font-bold text-gray-200 hover:text-green-500 rounded transition-colors duration-300">
            Wise Up
          </a>
          <a href="#" className="block px-4 py-2 text-xl font-bold text-gray-200 hover:text-green-500 rounded transition-colors duration-300">
            FAQ
          </a>
          <a href="#" className="block px-4 py-2 text-xl font-bold text-gray-200 hover:text-green-500 rounded transition-colors duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}