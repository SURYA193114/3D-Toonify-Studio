import { GoogleGenAI } from "@google/genai";
import { CartoonStyle } from '../types';

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const getStylePrompt = (style: CartoonStyle): string => {
  switch (style) {
    case CartoonStyle.Pixar3D:
      return "Transform this image into a high-quality 3D animated movie character style, reminiscent of Pixar or Dreamworks. Cute, big eyes, smooth rendering, vibrant lighting, soft shadows.";
    case CartoonStyle.UnrealEngine5:
      return "Transform this image into a hyper-realistic Unreal Engine 5 3D character render. Metahuman quality, subsurface scattering, detailed pores, cinematic lighting, raytracing, 8k resolution, depth of field.";
    case CartoonStyle.PlasticToy:
      return "Transform this image into a glossy plastic toy style. Shiny surfaces, simple shapes, vibrant colors, reflections, toy photography aesthetic, macro depth of field, looks like a high-quality collectable figure.";
    case CartoonStyle.Claymation:
      return "Transform this image into a cute claymation style. Looks like plasticine or play-doh, stop-motion aesthetic, textured, soft rounded edges.";
    case CartoonStyle.Anime:
      return "Transform this image into a high-quality Japanese anime style. Vivid colors, expressive eyes, cel-shaded look, detailed background.";
    case CartoonStyle.Classic2D:
      return "Transform this image into a classic Saturday morning cartoon style. Flat colors, bold black outlines, simple shading, expressive.";
    case CartoonStyle.Caricature:
      return "Transform this image into a funny 3D caricature. Exaggerated features, humorous, highly detailed textures, vibrant.";
    case CartoonStyle.Cyberpunk:
      return "Transform this image into a futuristic cyberpunk style. Neon lights, high contrast, sci-fi aesthetic, detailed tech elements, vibrant pinks and cyans.";
    case CartoonStyle.PixelArt:
      return "Transform this image into a high-quality pixel art style. 16-bit aesthetic, limited color palette, blocky pixels, retro video game look.";
    case CartoonStyle.OilPainting:
      return "Transform this image into a classic oil painting style. Visible brush strokes, rich texture, artistic lighting, impressionist aesthetic.";
    case CartoonStyle.ComicBook:
      return "Transform this image into a vintage western comic book style. Bold black outlines, halftone dot patterns, vibrant flat colors, dramatic shading.";
    case CartoonStyle.LowPoly:
      return "Transform this image into a low poly 3D art style. Geometric shapes, sharp edges, flat shading, minimalist, abstract aesthetic.";
    case CartoonStyle.VoxelArt:
      return "Transform this image into a voxel art style 3D render. Made of small cubes like Minecraft or MagicaVoxel, isometric view, charming blocky aesthetic, ambient occlusion, bright colors.";
    case CartoonStyle.StudioGhibli:
      return "Transform this image into a Studio Ghibli anime style. Lush hand-painted watercolor backgrounds, deep greens and blues, whimsical atmosphere, detailed clouds, Hayao Miyazaki character design aesthetic.";
    case CartoonStyle.RetroGif:
      return "Transform this image into a retro 90s internet GIF aesthetic. Apply heavy dithering, limited 256 color palette, visible pixels, scanlines, and a slight chromatic aberration glitch effect.";
    case CartoonStyle.DisneyClassic:
      return "Transform this image into a 1990s Disney renaissance animation style. Hand-drawn 2D cel animation, fluid expressive lines, vibrant technicolor, charming character design.";
    case CartoonStyle.StickerArt:
      return "Transform this image into a die-cut sticker design. Vector art style, bold colors, thick white border outline around the subject, slight drop shadow, isolated look.";
    case CartoonStyle.FunkoPop:
      return "Transform this person into a Funko Pop vinyl figure. Large square-ish head, black button eyes, small body, smooth plastic texture, boxy aesthetic, toy photography look.";
    case CartoonStyle.Watercolor:
      return "Transform this image into a soft watercolor painting. Wet-on-wet technique, visible paper texture, pastel color palette, artistic drips and bleeds, dreamy atmosphere.";
    case CartoonStyle.PencilSketch:
      return "Transform this image into a graphite pencil sketch. Detailed cross-hatching shading, rough sketch lines, monochrome or sepia tone, sketchbook paper texture.";
    case CartoonStyle.PaperCutout:
      return "Transform this image into a layered paper cutout style. Construction paper textures, distinct cast shadows between layers to show depth, flat colors, craft aesthetic.";
      
    default:
      return "Transform this image into a 3D cartoon.";
  }
};

export const generateCartoonImage = async (
  imageBase64: string,
  style: CartoonStyle
): Promise<string> => {
  try {
    const ai = getAIClient();

    // Extract mime type and base64 data correctly
    const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    let mimeType = 'image/jpeg';
    let base64Data = imageBase64;

    if (match) {
      mimeType = match[1];
      base64Data = match[2];
    } else {
      // Fallback if data URI scheme is missing or different format
      const split = imageBase64.split(',');
      if (split.length > 1) {
        base64Data = split[1];
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: `${getStylePrompt(style)} Return ONLY the generated image. Do not output any text, markdown, or code blocks. Ensure the output is high resolution 8k.`,
          },
        ],
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini.");
    }

    const parts = response.candidates[0].content?.parts;
    if (!parts) {
      throw new Error("No content parts returned.");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    const textPart = parts.find(p => p.text);
    if (textPart) {
      console.warn("Model returned text instead of image:", textPart.text);
      throw new Error("The model returned text instead of an image. Please try again or choose a different style.");
    }

    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error generating cartoon:", error);
    throw error;
  }
};