export enum CartoonStyle {
  Pixar3D = 'Pixar 3D',
  UnrealEngine5 = 'Unreal Engine 5',
  PlasticToy = 'Plastic Toy',
  Claymation = 'Claymation',
  Anime = 'Anime',
  Classic2D = 'Classic 2D',
  Caricature = 'Caricature',
  Cyberpunk = 'Cyberpunk',
  PixelArt = 'Pixel Art',
  OilPainting = 'Oil Painting',
  ComicBook = 'Comic Book',
  LowPoly = 'Low Poly',
  VoxelArt = 'Voxel Art',
  StudioGhibli = 'Studio Ghibli',
  RetroGif = 'Retro GIF',
  DisneyClassic = 'Disney Classic',
  StickerArt = 'Sticker Art',
  FunkoPop = 'Funko Pop',
  Watercolor = 'Watercolor',
  PencilSketch = 'Pencil Sketch',
  PaperCutout = 'Paper Cutout'
}

export interface GenerationResult {
  originalImage: string;
  generatedImage: string | null;
  style: CartoonStyle;
}

export interface StyleOption {
  id: CartoonStyle;
  label: string;
  description: string;
  color: string;
  icon: string;
}