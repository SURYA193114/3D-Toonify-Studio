import React, { useEffect } from 'react';
import { DownloadIcon } from '../constants';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageUrl) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `toonify-hd-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-indigo-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 max-w-6xl w-full max-h-[90vh] flex flex-col items-center animate-scale-in pointer-events-none">
        <div className="relative bg-white p-3 rounded-[32px] shadow-2xl pointer-events-auto flex flex-col items-center">
            <img 
              src={imageUrl} 
              alt="Full Preview" 
              className="max-w-full max-h-[75vh] rounded-3xl object-contain border-4 border-gray-100"
            />
            
            <button 
                onClick={onClose}
                className="absolute -top-4 -right-4 bg-white text-gray-700 hover:text-red-500 rounded-full p-3 shadow-xl hover:bg-gray-50 transition-all border-4 border-gray-100 hover:scale-110"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
               <button 
                 onClick={handleDownload}
                 className="clay-btn bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-lg whitespace-nowrap"
               >
                 Save Graphic <DownloadIcon />
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};