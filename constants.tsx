import React from 'react';
import { CartoonStyle, StyleOption } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: CartoonStyle.Pixar3D,
    label: "3D Render",
    description: "Cute & smooth cinema style",
    color: "bg-blue-400",
    icon: "🎬"
  },
  {
    id: CartoonStyle.UnrealEngine5,
    label: "Unreal 5",
    description: "Hyper-realistic 3D",
    color: "bg-slate-800",
    icon: "🎮"
  },
  {
    id: CartoonStyle.PlasticToy,
    label: "Plastic Toy",
    description: "Glossy 3D Toy",
    color: "bg-red-500",
    icon: "🤖"
  },
  {
    id: CartoonStyle.Claymation,
    label: "Clay",
    description: "Plasticine stop-motion look",
    color: "bg-orange-400",
    icon: "🏺"
  },
  {
    id: CartoonStyle.VoxelArt,
    label: "Voxel",
    description: "3D Block Art",
    color: "bg-emerald-600",
    icon: "🧊"
  },
  {
    id: CartoonStyle.LowPoly,
    label: "Low Poly",
    description: "Geometric 3D art",
    color: "bg-cyan-400",
    icon: "💎"
  },
  {
    id: CartoonStyle.FunkoPop,
    label: "Funko Pop",
    description: "Vinyl figure toy style",
    color: "bg-gray-800",
    icon: "🧸"
  },
  {
    id: CartoonStyle.Caricature,
    label: "Fun 3D",
    description: "Exaggerated & humorous",
    color: "bg-purple-400",
    icon: "🤪"
  },
  {
    id: CartoonStyle.Anime,
    label: "Anime",
    description: "Japanese animation style",
    color: "bg-pink-400",
    icon: "✨"
  },
  {
    id: CartoonStyle.StudioGhibli,
    label: "Gibely",
    description: "Lush watercolor anime",
    color: "bg-green-500",
    icon: "🍃"
  },
  {
    id: CartoonStyle.DisneyClassic,
    label: "Disney 90s",
    description: "Classic hand-drawn animation",
    color: "bg-sky-400",
    icon: "🏰"
  },
  {
    id: CartoonStyle.Cyberpunk,
    label: "Cyberpunk",
    description: "Neon & futuristic",
    color: "bg-fuchsia-500",
    icon: "🌃"
  },
  {
    id: CartoonStyle.RetroGif,
    label: "Retro GIF",
    description: "Dithered glitch aesthetic",
    color: "bg-indigo-600",
    icon: "📼"
  },
  {
    id: CartoonStyle.Classic2D,
    label: "2D Toon",
    description: "Bold lines & flat colors",
    color: "bg-yellow-400",
    icon: "✏️"
  },
  {
    id: CartoonStyle.StickerArt,
    label: "Sticker",
    description: "Die-cut vector art",
    color: "bg-lime-400",
    icon: "🏷️"
  },
  {
    id: CartoonStyle.PixelArt,
    label: "Pixel Art",
    description: "Retro 8-bit style",
    color: "bg-emerald-400",
    icon: "👾"
  },
  {
    id: CartoonStyle.OilPainting,
    label: "Oil Paint",
    description: "Classic artistic look",
    color: "bg-amber-500",
    icon: "🎨"
  },
  {
    id: CartoonStyle.Watercolor,
    label: "Watercolor",
    description: "Soft & dreamy paint",
    color: "bg-teal-400",
    icon: "🖌️"
  },
  {
    id: CartoonStyle.ComicBook,
    label: "Comic",
    description: "Vintage comic book",
    color: "bg-red-400",
    icon: "💥"
  },
  {
    id: CartoonStyle.PaperCutout,
    label: "Paper Cut",
    description: "Layered craft style",
    color: "bg-rose-400",
    icon: "✂️"
  },
  {
    id: CartoonStyle.PencilSketch,
    label: "Sketch",
    description: "Graphite pencil drawing",
    color: "bg-stone-400",
    icon: "📝"
  }
];

// Simple SVG Icons
export const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const MagicWandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m2 2 20 20" style={{display:'none'}}/>
    <path d="M15 13l2 2" />
    <path d="M13 15l2 2" />
    <path d="M11 11l6 6" />
  </svg>
);

export const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);