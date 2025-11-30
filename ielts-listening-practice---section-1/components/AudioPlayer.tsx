import React from 'react';

const AudioPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 shadow-md rounded-lg overflow-hidden bg-white">
      <div className="p-4 bg-orange-600 text-white font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        <span>Audio Track</span>
      </div>
      <iframe 
        width="100%" 
        height="166" 
        scrolling="no" 
        frameBorder="no" 
        allow="autoplay" 
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2221376600&color=%23ea580c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        title="IELTS Listening Audio"
        className="w-full"
      ></iframe>
    </div>
  );
};

export default AudioPlayer;