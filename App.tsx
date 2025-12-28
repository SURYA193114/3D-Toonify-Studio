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
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGenerate = async () => {
    if (!originalImage) return;
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const result = await generateCartoonImage(originalImage, selectedStyle);
      setGeneratedImage(result);
    } catch (err: any) {
      setError("CORE_RECONSTRUCTION_FAILED: Processing Protocol Error");
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
      
      {/* Precision HUD */}
      <div className="fixed top-6 left-12 right-12 flex justify-between items-center text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase pointer-events-none z-50 hidden lg:flex">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="neural-dot"></div>
            <span>STABLE_BUILD_2.5</span>
          </div>
          <span>POWER_INDEX: 98.4</span>
        </div>
        <div className="flex items-center gap-8">
          <span>THROUGHPUT: 1.2 GB/S</span>
          <span>{systemTime}</span>
        </div>
      </div>

      <header className="mb-20 text-center z-10 w-full max-w-5xl">
        <div className="inline-flex items-center gap-4 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/50">Titanium Core Reconstruction</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl titanium-text mb-4 tracking-[-0.05em] filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          RUSH.X
        </h1>
        
        <p className="text-white/30 text-xs font-light tracking-[0.3em] max-w-lg mx-auto uppercase">
          Neural Synthesis / Cinematic Rendering
        </p>
      </header>

      <main className="w-full max-w-6xl z-10">
        
        {!originalImage ? (
          <div className="max-w-xl mx-auto transform transition-all hover:scale-[1.01]">
            <div className="hardware-shroud rounded-3xl p-1 bg-gradient-to-br from-white/10 to-transparent">
              <ImageUploader onImageSelect={setOriginalImage} />
            </div>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            {/* Visual Workspace Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Hardware Input Module */}
              <div className="hardware-shroud rounded-[40px] p-4 group">
                <div className="aspect-square rounded-[30px] bg-black/40 relative overflow-hidden shadow-inner">
                  <img 
                    src={originalImage} 
                    alt="Source" 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                  />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <span className="bg-black/60 backdrop-blur-xl text-white/40 text-[9px] font-black px-4 py-1.5 rounded-sm border border-white/10 tracking-widest uppercase">
                      RAW_DATA_SOURCE
                    </span>
                  </div>
                  <button 
                    onClick={handleReset} 
                    className="absolute top-6 right-6 bg-white/5 hover:bg-white/20 p-3 rounded-full transition-all text-white/40 hover:text-white border border-white/10 backdrop-blur-xl"
                  >
                    <RefreshIcon />
                  </button>
                </div>
              </div>

              {/* Hardware Output Module */}
              <div className="hardware-shroud rounded-[40px] p-4">
                <div className="aspect-square rounded-[30px] bg-black/60 relative flex items-center justify-center border border-white/5 shadow-inner">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-8">
                      <div className="relative">
                        <div className="w-24 h-24 border border-white/5 border-t-cyan-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-cyan-400">RX</div>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black text-white/80 tracking-[0.5em] uppercase">Synthesizing</p>
                        <p className="text-[8px] text-white/20 font-mono mt-2 animate-pulse tracking-[0.2em]">RENDERING_LAYER_7...</p>
                      </div>
                    </div>
                  ) : generatedImage ? (
                    <div 
                      className="w-full h-full cursor-zoom-in relative group"
                      onClick={() => setPreviewImage(generatedImage)}
                    >
                      <img 
                        src={generatedImage} 
                        alt="Synthesis Result" 
                        className="w-full h-full object-cover rounded-[30px] transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black tracking-widest uppercase">View Full Render</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-white/5 flex flex-col items-center gap-6">
                      <div className="w-20 h-20 border border-white/5 rounded-full flex items-center justify-center opacity-40">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Standby_Buffer</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Core Logic Console */}
            <div className="hardware-shroud rounded-[40px] p-10 md:p-16 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <StyleSelector 
                selectedStyle={selectedStyle} 
                onSelect={setSelectedStyle} 
                disabled={isGenerating} 
              />

              <div className="mt-16 pt-16 border-t border-white/5 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleGenerate} 
                  disabled={isGenerating} 
                  className={`flex-1 py-6 rounded-sm font-black tracking-[0.5em] uppercase text-xs transition-all relative group overflow-hidden
                    ${isGenerating 
                      ? 'bg-white/5 text-white/10 cursor-wait' 
                      : 'bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]'}`}
                >
                  <span className="relative z-10">{isGenerating ? 'Computing Vector Map' : 'Begin Synthesis'}</span>
                  {!isGenerating && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>}
                </button>
                
                {generatedImage && (
                  <button 
                    onClick={handleDownload}
                    className="px-12 py-6 bg-white/5 hover:bg-white/10 text-white/50 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-white"
                  >
                    Export_Archive
                  </button>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <footer className="mt-32 py-12 text-center border-t border-white/5 w-full max-w-6xl">
        <div className="flex justify-center gap-12 mb-6">
          <span className="text-[8px] font-black text-white/10 tracking-[0.4em] uppercase">Protocol: AES-256</span>
          <span className="text-[8px] font-black text-white/10 tracking-[0.4em] uppercase">Auth: Verified</span>
        </div>
        <p className="text-[10px] font-black text-white/20 tracking-[0.8em] uppercase">RUSH.X Advanced Visuals</p>
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