import React from 'react';
import { SubmissionStatus, CORRECT_ANSWERS } from '../types';

interface InputSlotProps {
  id: number;
  value: string;
  onChange: (id: number, val: string) => void;
  status: SubmissionStatus;
}

const InputSlot: React.FC<InputSlotProps> = ({ id, value, onChange, status }) => {
  
  let borderColor = "border-gray-300";
  let focusStyles = "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 z-10";
  let bgColor = "bg-white";
  let textColor = "text-gray-900";
  let icon = null;

  if (status === 'submitted') {
    const cleanUserAnswer = value.trim().toLowerCase();
    const correctOptions = CORRECT_ANSWERS[id] || [];
    const isCorrect = correctOptions.includes(cleanUserAnswer);

    // Disable focus styles when submitted
    focusStyles = "";

    if (isCorrect) {
      borderColor = "border-green-500";
      bgColor = "bg-green-50";
      textColor = "text-green-800 font-semibold";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else {
      borderColor = "border-red-500";
      bgColor = "bg-red-50";
      textColor = "text-red-800";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    }
  }

  return (
    <div className="inline-flex relative items-center mx-1 align-middle group">
      {/* Label ID */}
      <span className={`text-xs font-bold px-2 py-0.5 rounded-l border-y border-l h-[34px] flex items-center justify-center bg-gray-100 text-gray-500 transition-colors ${borderColor}`}>
        {id}
      </span>
      
      {/* Input Wrapper for Icon Positioning */}
      <div className="relative">
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
            disabled={status === 'submitted'}
            className={`h-[34px] w-32 pl-2 pr-7 text-sm border-y border-r rounded-r outline-none transition-colors ${borderColor} ${bgColor} ${textColor} ${focusStyles}`}
            autoComplete="off"
            aria-label={`Question ${id}`}
        />
        {/* Status Icon positioned inside the input on the right */}
        {icon && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                {icon}
            </span>
        )}
      </div>
    </div>
  );
};

export default InputSlot;