"use client";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Box({ heading, description, bgColor, isExpanded }) {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`p-4 rounded-lg w-[25vw] ${bgColor} cursor-pointer`}
      onClick={toggleOpen}
    >
      {!isOpen ? (
        <div className="flex justify-between items-center h-24">
          <h2 className="text-2xl font-bold text-black text-center flex-grow">{heading}</h2>
          <ExpandMoreIcon className="text-black text-xl font-bold ml-2" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold text-black text-center flex-grow">{heading}</h2>
            <ExpandLessIcon className="text-black text-xl font-bold ml-2" />
          </div>
          <p className="mt-2 text-lg text-black text-center">{description}</p>
        </div>
      )}
    </div>
  );
}