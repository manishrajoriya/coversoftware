"use client"
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import MobileCover from './mobileCover';

const App: React.FC = () => {
  const coverRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (coverRef.current) {
      html2canvas(coverRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'mobile-cover.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div ref={coverRef}>
        <MobileCover innerImageUrl="/inner.jpg" />
      </div>
      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download Image
      </button>
    </div>
  );
};

export default App;
