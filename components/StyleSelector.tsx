import React from 'react';
import { CartoonStyle } from '../types';
import { STYLE_OPTIONS } from '../constants';

interface StyleSelectorProps {
  selectedStyle: CartoonStyle;
  onSelect: (style: CartoonStyle) => void;
  disabled?: boolean;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelect, disabled }) => {
  return (
    <div className="w-full relative z-10">
      <div className="flex items-center gap-6 mb-10">
        <h3 className="text-[9px] font-bold text-white/40 tracking-[0.5em] uppercase whitespace-nowrap">Core_Modules</h3>
        <div className="h-[1px] flex-1 bg-white/5"></div>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1">
        {STYLE_OPTIONS.map((option) => {
          const isSelected = selectedStyle === option.id;
          
          return (
            <button
              key={option.id}
              disabled={disabled}
              onClick={() => onSelect(option.id)}
              className={`
                group relative h-24 flex flex-col items-center justify-center transition-all duration-300
                border border-white/5
                ${isSelected 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-black/20 hover:bg-white/5'
                }
                ${disabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* Module Indicator LED */}
              <div className={`absolute top-2 right-2 w-1 h-1 rounded-full transition-all duration-500
                ${isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-white/10'}`}>
              </div>

              <span className={`text-2xl transition-transform duration-500 group-hover:scale-110 ${isSelected ? 'scale-110' : 'grayscale opacity-40'}`}>
                {option.icon}
              </span>
              
              <span className={`mt-3 text-[8px] font-bold tracking-[0.2em] uppercase transition-colors
                ${isSelected ? 'text-white' : 'text-white/30'}`}>
                {option.label.split(' ')[0]}
              </span>

              {/* Bottom Edge Accent */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};