

declare module 'troika-three-text' {
    import { Object3D, Material, Color } from 'three';
  
    export class Text extends Object3D {
      text: string;
      fontSize?: number;
      font?: string;
      color?: Color | string | number;
      anchorX?: string | number;
      anchorY?: string | number;
      textAlign?: 'left' | 'right' | 'center' | 'justify';
      lineHeight?: number | 'normal';
      letterSpacing?: number;
      maxWidth?: number;
      material?: Material | Material[];
      depthOffset?: number;
      clipRect?: [number, number, number, number];
      orientation?: string;
      glyphGeometryDetail?: number;
      sdfGlyphSize?: number;
      strokeColor?: Color | string | number;
      strokeWidth?: number | string;
      strokeOpacity?: number;
      fillOpacity?: number;
  
      constructor();
  
      dispose(): void;
  

      sync(callback?: () => void): void;
    }
  }