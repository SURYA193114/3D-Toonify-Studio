import React, { useCallback, useRef, useState } from 'react';
import { UploadIcon } from '../constants';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`
        relative w-full h-80 flex flex-col items-center justify-center cursor-pointer
        transition-all duration-700 bg-black/20 group overflow-hidden
        ${isDragging ? 'bg-white/5' : ''}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />
      
      <div className={`mb-6 text-white/10 group-hover:text-cyan-400 transition-all duration-700 transform ${isDragging ? 'scale-110' : ''}`}>
        <UploadIcon />
      </div>
      
      <div className="text-center relative z-10 px-8">
        <h3 className="text-sm font-bold text-white tracking-[0.5em] uppercase mb-2">
            Load_Asset
        </h3>
        <p className="text-white/20 text-[10px] font-medium tracking-[0.2em] uppercase">
          Drag and drop into bay
        </p>
      </div>

      {/* Industrial markings */}
      <div className="absolute bottom-4 left-4 text-white/5 font-mono text-[8px] uppercase tracking-widest">
        Buffer_Wait: 0.0s
      </div>
      <div className="absolute top-4 right-4 text-white/5 font-mono text-[8px] uppercase tracking-widest">
        Ready_Port: A1
      </div>
    </div>
  );
};