import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { Button } from './components/Button';
import { ImageModal } from './components/ImageModal';
import { generateCartoonImage } from './services/geminiService';
import { CartoonStyle } from './types';
import { MagicWandIcon, DownloadIcon, RefreshIcon } from './constants';

const App = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<CartoonStyle>(CartoonStyle.Anime);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!originalImage) return;
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateCartoonImage(originalImage, selectedStyle);
      setGeneratedImage(result);
    } catch (err: any) {
      setError("CORE_RECONSTRUCTION_FAILED: Protocol Error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `rushx-render-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 flex flex-col items-center">
      
      {/* Telemetry HUD */}
      <div className="fixed top-6 left-12 right-12 flex justify-between items-center text-[10px] font-medium tracking-[0.4em] text-white/20 uppercase pointer-events-none z-50 hidden lg:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="neural-dot"></div>
            <span>System: Optimal</span>
          </div>
          <span>Ref: RX-8000</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Engine: Gemini-2.5-F</span>
          <span>Clock: {new Date().getHours()}:{new Date().getMinutes()}</span>
        </div>
      </div>

      <header className="mb-20 text-center z-10 w-full max-w-5xl">
        <div className="inline-flex items-center gap-4 px-3 py-1 bg-white/5 border border-white/10 rounded-sm mb-8">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">Neural Studio v2.0</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl titanium-text mb-4">
          RUSH.X
        </h1>
        
        <p className="text-white/40 text-sm font-light tracking-[0.2em] max-w-lg mx-auto uppercase">
          Precision Visual Synthesis Engine
        </p>
      </header>

      <main className="w-full max-w-6xl z-10">
        
        {!originalImage ? (
          <div className="max-w-xl mx-auto">
            <div className="hardware-shroud rounded-2xl p-1">
              <ImageUploader onImageSelect={setOriginalImage} />
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700">
            
            {/* Main Render Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Source Tray */}
              <div className="hardware-shroud rounded-3xl p-3 overflow-hidden group">
                <div className="aspect-square rounded-2xl bg-black/40 relative overflow-hidden">
                  <img 
                    src={originalImage} 
                    alt="Source" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0" 
                  />
                  <div className="absolute top-4 left-4 bg-black/80 text-white/40 text-[9px] font-bold px-3 py-1 rounded-sm border border-white/5 tracking-widest uppercase">
                    Input_Feed
                  </div>
                  <button onClick={handleReset} className="absolute top-4 right-4 bg-white/5 hover:bg-white/20 p-2 rounded-sm transition-colors text-white/60">
                    <RefreshIcon />
                  </button>
                </div>
              </div>

              {/* Result Tray */}
              <div className="hardware-shroud rounded-3xl p-3 overflow-hidden">
                <div className="aspect-square rounded-2xl bg-black/60 relative flex items-center justify-center border border-white/5">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-16 h-16 border border-white/5 border-t-cyan-400 rounded-full animate-spin"></div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-cyan-400 tracking-[0.4em] uppercase">Synthesizing</p>
                        <p className="text-[8px] text-white/20 font-mono mt-1">BIT_MAP_PROCESSING...</p>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div 
                      className="w-full h-full cursor-zoom-in"
                      onClick={() => setPreviewImage(generatedImage)}
                    >
                      <img 
                        src={generatedImage} 
                        alt="Render" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="text-white/10 flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center opacity-40">?</div>
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Ready_for_Render</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controller Module */}
            <div className="hardware-shroud rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 100 100" className="rotate-45">
                   <rect x="0" y="45" width="100" height="10" fill="white" />
                   <rect x="45" y="0" width="10" height="100" fill="white" />
                </svg>
              </div>

              <StyleSelector 
                selectedStyle={selectedStyle} 
                onSelect={setSelectedStyle} 
                disabled={isGenerating} 
              />

              <div className="mt-12 pt-12 border-t border-white/5 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className={`flex-1 py-5 rounded-sm font-bold tracking-[0.4em] uppercase text-xs transition-all
                    ${isGenerating 
                      ? 'bg-white/5 text-white/20 cursor-wait' 
                      : 'bg-white text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]'}`}
                >
                  {isGenerating ? 'Computing...' : 'Initialize Render'}
                </button>
                
                {generatedImage && (
                  <button 
                    onClick={handleDownload}
                    className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white/60 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
                  >
                    Archive Render
                  </button>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="mt-32 py-12 text-center border-t border-white/5 w-full max-w-6xl">
        <p className="text-[10px] font-bold text-white/10 tracking-[0.5em] uppercase">Rush.X Technical Solutions</p>
      </footer>

      <ImageModal 
        isOpen={!!previewImage} 
        imageUrl={previewImage} 
        onClose={() => setPreviewImage(null)} 
      />
    </div>
  );
};

export default App;