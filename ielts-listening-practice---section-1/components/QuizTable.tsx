import React from 'react';
import InputSlot from './InputSlot';
import { SubmissionStatus } from '../types';

interface QuizTableProps {
  answers: Record<number, string>;
  onAnswerChange: (id: number, val: string) => void;
  status: SubmissionStatus;
}

const QuizTable: React.FC<QuizTableProps> = ({ answers, onAnswerChange, status }) => {
  
  const renderInput = (id: number) => (
    <InputSlot 
      id={id} 
      value={answers[id] || ''} 
      onChange={onAnswerChange}
      status={status}
    />
  );

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden bg-white shadow-lg rounded-lg border border-gray-200">
      
      {/* Table Header (Desktop) - Hidden on mobile, Flex on md+ */}
      <div className="hidden md:grid md:grid-cols-10 bg-gray-100 border-b border-gray-300 font-bold text-gray-700 divide-x divide-gray-300">
        <div className="col-span-2 p-4 flex items-center justify-center text-center">Name of restaurant</div>
        <div className="col-span-2 p-4 flex items-center justify-center text-center">Location</div>
        <div className="col-span-3 p-4 flex items-center justify-center text-center">Reason for recommendation</div>
        <div className="col-span-3 p-4 flex items-center justify-center text-center">Other comments</div>
      </div>

      {/* Row 1: The Junction */}
      <div className="grid grid-cols-1 md:grid-cols-10 border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Mobile Label included in cell */}
        <div className="col-span-2 p-4 md:flex items-center justify-center font-bold text-lg md:text-base text-gray-800 bg-gray-50 md:bg-white">
          <span className="md:hidden block text-xs uppercase text-gray-500 mb-1">Restaurant</span>
          The Junction
        </div>
        
        <div className="col-span-2 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Location</span>
          Greyson Street, near the station
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Recommendation</span>
          Good for people who are especially keen on {renderInput(1)}
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Comments</span>
          <ul className="list-disc pl-5 space-y-2">
            <li>Quite expensive</li>
            <li>The {renderInput(2)} is a good place for a drink</li>
          </ul>
        </div>
      </div>

      {/* Row 2: Paloma */}
      <div className="grid grid-cols-1 md:grid-cols-10 border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="col-span-2 p-4 md:flex items-center justify-center font-bold text-lg md:text-base text-gray-800 bg-gray-50 md:bg-white">
          <span className="md:hidden block text-xs uppercase text-gray-500 mb-1">Restaurant</span>
          Paloma
        </div>
        
        <div className="col-span-2 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Location</span>
          In Bow Street next to the cinema
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Recommendation</span>
          {renderInput(3)} food, good for sharing
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Comments</span>
          <ul className="list-disc pl-5 space-y-2">
            <li>Staff are very friendly</li>
            <li>Need to pay £50 deposit</li>
            <li>A limited selection of {renderInput(4)} food on the menu</li>
          </ul>
        </div>
      </div>

      {/* Row 3: The [5] */}
      <div className="grid grid-cols-1 md:grid-cols-10 border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-orange-50/30">
        <div className="col-span-2 p-4 md:flex items-center justify-center font-bold text-lg md:text-base text-gray-800 bg-gray-50 md:bg-white">
          <span className="md:hidden block text-xs uppercase text-gray-500 mb-1">Restaurant</span>
          The {renderInput(5)}
        </div>
        
        <div className="col-span-2 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Location</span>
          At the top of a {renderInput(6)}
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Recommendation</span>
          <ul className="list-disc pl-5 space-y-2">
            <li>A famous chef</li>
            <li>All the {renderInput(7)} are very good</li>
            <li>Only uses {renderInput(8)} ingredients</li>
          </ul>
        </div>
        
        <div className="col-span-3 p-4 text-sm md:text-base">
          <span className="md:hidden block text-xs uppercase font-bold text-gray-500 mb-1">Comments</span>
          <ul className="list-disc pl-5 space-y-2">
            <li>Set lunch costs £{renderInput(9)} per person</li>
            <li>Portions probably of {renderInput(10)} size</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default QuizTable;