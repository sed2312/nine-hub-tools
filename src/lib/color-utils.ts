/**
 * Color utility functions for Nine Hub Tools
 */

/**
 * Converts a hex color string to RGB values
 * @param hex - Hex color string (e.g., "#ff0000" or "ff0000")
 * @returns RGB values as [r, g, b] array
 */
export function hexToRgb(hex: string): [number, number, number] {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Handle shorthand hex (e.g., "f00" -> "ff0000")
  const fullHex = cleanHex.length === 3
    ? cleanHex.split('').map(char => char + char).join('')
    : cleanHex;

  if (fullHex.length !== 6) {
    throw new Error('Invalid hex color format');
  }

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return [r, g, b];
}

/**
 * Converts RGB values to hex string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Converts HSL values to hex string
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color string
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculates the relative luminance of a color
 * @param hex - Hex color string
 * @returns Luminance value (0-1)
 */
export function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);

  // Convert to linear RGB
  const toLinear = (c: number) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  // Calculate luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Get WCAG level based on contrast ratio
export function getWCAGLevel(ratio: number, textSize: 'normal' | 'large'): { level: 'aaa' | 'aa' | 'fail'; passes: boolean } {
  const threshold = textSize === 'large' ? 3 : 4.5;
  const aaaThreshold = textSize === 'large' ? 4.5 : 7;

  if (ratio >= aaaThreshold) return { level: 'aaa', passes: true };
  if (ratio >= threshold) return { level: 'aa', passes: true };
  return { level: 'fail', passes: false };
}

// Generate shades of a color (11 shades from light to dark)
export function generateShades(hex: string): string[] {
  const [h, s, l] = hexToHsl(hex);
  const shades: string[] = [];

  // Generate 11 shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  const lightnesses = [95, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5];

  for (const lightness of lightnesses) {
    shades.push(hslToHex(h, s, lightness));
  }

  return shades;
}

// Color naming (simplified - basic color names)
const colorNames: Record<string, [number, number]> = {
  'Red': [0, 20],
  'Orange': [20, 40],
  'Yellow': [40, 60],
  'Green': [60, 160],
  'Cyan': [160, 200],
  'Blue': [200, 260],
  'Purple': [260, 290],
  'Pink': [290, 330],
  'Rose': [330, 360],
};

export function getColorName(hex: string): string {
  const [h, s, l] = hexToHsl(hex);

  // Handle grays
  if (s < 10) {
    if (l > 90) return 'White';
    if (l > 70) return 'Light Gray';
    if (l > 40) return 'Gray';
    if (l > 20) return 'Dark Gray';
    return 'Black';
  }

  // Find color name by hue
  for (const [name, [min, max]] of Object.entries(colorNames)) {
    if (h >= min && h < max) {
      if (l > 75) return `Light ${name}`;
      if (l < 35) return `Dark ${name}`;
      return name;
    }
  }

  return 'Color';
}

// Generate gradient CSS
export function generateGradient(colors: string[], direction: 'to right' | 'to bottom' | 'to bottom right' = 'to right'): string {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
}

// Simulate color blindness
export type ColorBlindType = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function simulateColorBlindness(hex: string, type: ColorBlindType): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  let newR = r, newG = g, newB = b;

  switch (type) {
    case 'protanopia': // Red-blind
      newR = 0.567 * r + 0.433 * g;
      newG = 0.558 * r + 0.442 * g;
      newB = 0.242 * g + 0.758 * b;
      break;
    case 'deuteranopia': // Green-blind
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = 0.3 * g + 0.7 * b;
      break;
    case 'tritanopia': // Blue-blind
      newR = 0.95 * r + 0.05 * g;
      newG = 0.433 * g + 0.567 * b;
      newB = 0.475 * g + 0.525 * b;
      break;
    case 'achromatopsia': { // Total color blindness
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      newR = newG = newB = gray;
      break;
    }
  }

  const toHex = (x: number) => {
    const hex = Math.round(Math.max(0, Math.min(1, x)) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// Export formats
export const exportFormats = {
  oklch: (colors: string[], names: string[]) => {
    return `:root {
${colors.map((c, i) => {
      const [r, g, b] = hexToRgb(c).map(v => v / 255);
      // Simple OKLCH approximation (better logic would be more complex, but this is a good start for a CSS tool)
      return `  --color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: oklch(from ${c} l c h);`;
    }).join('\n')}
}`;
  },

  hsl: (colors: string[], names: string[]) => {
    return `:root {
${colors.map((c, i) => {
      const [h, s, l] = hexToHsl(c);
      return `  --color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: hsl(${h} ${s}% ${l}%);`;
    }).join('\n')}
}`;
  },

  css: (colors: string[], names: string[]) => {
    return `:root {
${colors.map((c, i) => `  --color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: ${c};`).join('\n')}
}`;
  },

  scss: (colors: string[], names: string[]) => {
    return colors.map((c, i) => `$color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: ${c};`).join('\n');
  },

  less: (colors: string[], names: string[]) => {
    return colors.map((c, i) => `@color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: ${c};`).join('\n');
  },

  tailwind: (colors: string[], names: string[]) => {
    const config = colors.reduce((acc, c, i) => {
      const name = names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`;
      acc[name] = c;
      return acc;
    }, {} as Record<string, string>);

    return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(config, null, 8).replace(/"/g, "'")}
    }
  }
}`;
  },

  json: (colors: string[], names: string[]) => {
    const palette = colors.reduce((acc, c, i) => {
      const name = names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`;
      acc[name] = c;
      return acc;
    }, {} as Record<string, string>);

    return JSON.stringify(palette, null, 2);
  },

  figma: (colors: string[], names: string[]) => {
    return colors.map((c, i) => {
      const [h, s, l] = hexToHsl(c);
      return `${names[i] || `Color ${i + 1}`}: H${h}° S${s}% L${l}%`;
    }).join('\n');
  },

  sketch: (colors: string[], names: string[]) => {
    return colors.map((c, i) => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return `${names[i] || `Color ${i + 1}`}: RGB(${r}, ${g}, ${b})`;
    }).join('\n');
  },

  elementor: (colors: string[], names: string[]) => {
    return `/* Elementor Global Colors */
/* Navigate to: Site Settings > Global Colors */

${colors.map((c, i) => {
      const name = names[i] || `Color ${i + 1}`;
      return `Color ${i + 1} - "${name}":
  Value: ${c}
  Type: Global Color`;
    }).join('\n\n')}

/* Copy these colors to Elementor: */
/* 1. Go to Elementor > Site Settings > Global Colors */
/* 2. Click "Add Item" for each color */
/* 3. Set the name and hex value */
/* 4. Use in widgets via the color picker */

/* Alternative: Custom CSS Variables */
/* Add to Elementor > Custom CSS: */
:root {
${colors.map((c, i) => `  --e-global-color-${names[i]?.toLowerCase().replace(/\s+/g, '-') || `palette-${i + 1}`}: ${c};`).join('\n')}
}`;
  },
};