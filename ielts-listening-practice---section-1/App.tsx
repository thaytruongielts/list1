import React, { useState, useMemo } from 'react';
import AudioPlayer from './components/AudioPlayer';
import QuizTable from './components/QuizTable';
import { SubmissionStatus, CORRECT_ANSWERS } from './types';

// IELTS Listening Band Score conversion table (approximated for 10 questions scaled to 40)
// 10 -> 40 -> 9.0
// 9  -> 36 -> 8.0
// 8  -> 32 -> 7.5
// 7  -> 28 -> 6.5
// 6  -> 24 -> 6.0
// 5  -> 20 -> 5.5
// 4  -> 16 -> 5.0
// 3  -> 12 -> 4.0
// 2  -> 8  -> 3.5
// 1  -> 4  -> 3.0
// 0  -> 0  -> 0.0
const BAND_SCORE_MAP: Record<number, number> = {
  10: 9.0,
  9: 8.0,
  8: 7.5,
  7: 6.5,
  6: 6.0,
  5: 5.5,
  4: 5.0,
  3: 4.0,
  2: 3.5,
  1: 3.0,
  0: 0.0
};

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const handleAnswerChange = (id: number, value: string) => {
    if (status === 'submitted') return;
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    Object.keys(CORRECT_ANSWERS).forEach((key) => {
      const qId = parseInt(key);
      const userAnswer = (answers[qId] || '').trim().toLowerCase();
      if (CORRECT_ANSWERS[qId].includes(userAnswer)) {
        correctCount++;
      }
    });
    
    const bandScore = BAND_SCORE_MAP[correctCount] || 0.0;
    
    return { correctCount, bandScore };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Removed window.confirm to ensure immediate feedback without popup blockers interfering
    setStatus('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { correctCount, bandScore } = useMemo(() => calculateResults(), [answers, status]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-red-600 text-white font-bold p-1.5 rounded text-sm tracking-wider">IELTS</div>
             <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Listening Practice: Section 1</h1>
             <h1 className="text-xl font-bold text-gray-800 sm:hidden">Listening Sec 1</h1>
          </div>
          
          {status === 'submitted' && (
             <div className="flex items-center gap-4 animate-fade-in">
                <div className="hidden sm:block text-right">
                  <div className="text-xs text-gray-500 uppercase font-semibold">Correct</div>
                  <div className="text-gray-900 font-bold">{correctCount}/10</div>
                </div>
                <div className="text-right">
                   <div className="text-xs text-gray-500 uppercase font-semibold">Band Score</div>
                   <div className={`text-2xl font-bold ${bandScore >= 7.0 ? 'text-green-600' : bandScore >= 5.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                     {bandScore}
                   </div>
                </div>
             </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Instruction Card */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Complete the table below. Write <strong className="font-semibold">ONE WORD AND/OR A NUMBER</strong> for each answer.
              </p>
            </div>
          </div>
        </div>

        <AudioPlayer />

        {/* Results Banner (Mobile mainly) */}
        {status === 'submitted' && (
           <div className={`mb-6 p-4 rounded-lg flex justify-between items-center ${bandScore >= 5.0 ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-100 text-red-900 border border-red-200'} md:hidden`}>
              <div>
                <p className="font-bold text-lg">Band Score: {bandScore}</p>
                <p className="text-sm opacity-80">{correctCount}/10 Correct</p>
              </div>
              <div className="text-3xl">
                {bandScore >= 7.0 ? '🌟' : bandScore >= 5.0 ? '👍' : '📝'}
              </div>
           </div>
        )}

        <form onSubmit={handleSubmit}>
          <QuizTable 
            answers={answers} 
            onAnswerChange={handleAnswerChange}
            status={status}
          />
          
          {/* Sticky Footer Actions */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg md:relative md:bg-transparent md:border-0 md:shadow-none md:mt-8 md:p-0 z-40">
             <div className="max-w-6xl mx-auto flex justify-end gap-4">
                {status === 'idle' ? (
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Check Answers
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full md:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded shadow transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Reset Test
                  </button>
                )}
             </div>
          </div>
        </form>

      </main>
      
      {/* Spacer for fixed footer on mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default App;