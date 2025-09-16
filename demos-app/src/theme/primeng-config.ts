/*eslint sort-keys: ["error", "asc", { allowLineSeparatedGroups: true, natural: true }]*/

import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { ThemeType } from 'primeng/config';

import { components } from './primeng-components';

type TailwindColor =
  | 'amber'
  | 'black'
  | 'blue'
  | 'cyan'
  | 'emerald'
  | 'fuchsia'
  | 'gray'
  | 'green'
  | 'indigo'
  | 'lime'
  | 'neutral'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'rose'
  | 'sky'
  | 'slate'
  | 'stone'
  | 'teal'
  | 'violet'
  | 'white'
  | 'yellow';

type SemanticRole =
  | 'critical'
  | 'help'
  | 'info'
  | 'ok'
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'tertiary'
  | 'warning'
  | 'contrast'
  // NOTE: only for primeng, `critical` and `ok` should replace them
  | 'success'
  | 'error'
  | 'danger';

export type CustomColor = 'nttbrand';

export type PrimitiveColor = TailwindColor | CustomColor;

export type SemanticPalette = Record<SemanticRole, PrimitiveColor>;

const buildColorShades = (color: TailwindColor | string): Record<number | string, string> => {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const paletteColor: Record<string, string> = {
    0: `color-mix(in oklch, {${color}.50}, #ffffff)`,
    base: `{${color}.500}`,
  };
  shades.forEach((shade) => {
    paletteColor[shade] = `{${color}.${shade}}`;
  });
  return paletteColor;
};

const buildCustomColorShades = (baseColor: string): Record<number | string, string> => {
  const palette: Record<number | string, string> = {
    0: `color-mix(in oklch, ${baseColor} 5%, white)`,
    base: baseColor,
  };

  // Define mix percentages: [shade, percentage, mix-color]
  const shadeConfigs: [number, number, string][] = [
    [50, 10, 'white'],
    [100, 20, 'white'],
    [200, 30, 'white'],
    [300, 45, 'white'],
    [400, 65, 'white'],
    [500, 100, 'transparent'],
    [600, 85, 'black'],
    [700, 70, 'black'],
    [800, 55, 'black'],
    [900, 35, 'black'],
    [950, 20, 'black'],
  ];

  shadeConfigs.forEach(([shade, percent, mixColor]) => {
    palette[shade] = `color-mix(in oklch, ${baseColor} ${percent}%, ${mixColor})`;
  });

  return palette;
};

export const themePalette: SemanticPalette = {
  contrast: 'violet',
  critical: 'red',
  danger: 'red',
  error: 'red',
  help: 'blue',
  info: 'cyan',
  ok: 'green',
  primary: 'nttbrand',
  secondary: 'neutral',
  success: 'green',
  surface: 'neutral',
  tertiary: 'violet',
  warning: 'orange',
};

export const buildSemanticPalette = (
  palette: SemanticPalette,
): Record<SemanticRole, Record<number, string>> => {
  const semanticPalette: Partial<Record<SemanticRole, Record<number, string>>> = {};
  Object.entries(palette).forEach(([colorKey, colorValue]) => {
    semanticPalette[colorKey as SemanticRole] = buildColorShades(colorValue);
  });
  return semanticPalette as Record<SemanticRole, Record<number, string>>;
};

const preset = definePreset(Aura, {
  // Components overrides
  components,
  extend: {
    ['nttbrand']: buildCustomColorShades('#0072bc'),
  },
  // Context-agnostic styles (similar to semantic but no palette)
  primitive: {
    ['slate']: {
      ...Aura.primitive?.['slate'],
      100: '#F2EEED', // Replace Aura's hovering state with our own
    },
  },
  // Palette
  semantic: {
    ...buildSemanticPalette(themePalette),
  },
});

export const theme: ThemeType = {
  options: {
    cssLayer: {
      name: 'primeng',
    },
    darkModeSelector: '.dark',
    prefix: 'p',
  },
  preset,
};
