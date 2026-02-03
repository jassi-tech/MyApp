import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Palette = {
  white: '#FFFFFF',
  deepPurple: '#350d4f',
  black: '#050505',
  darkGray: '#1A1A1A',
  gray: '#8E8E93',
  green: '#34C759',
  red: '#FF3B30',
  lightGray: '#2c2c2e', 
  background: '#050505',
  primary: '#0a7ea4',
  
  // New Semantic Base Colors
  neutral100: '#FFFFFF',
  neutral200: '#F5F5F5',
  neutral300: '#E5E5E5',
  neutral400: '#D4D4D4',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '#0A0A0A',
};

export interface ThemeColorsType {
  text: string;
  textSecondary: string;
  background: string;
  backgroundSecondary: string;
  card: string;
  border: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  primary: string;
  primaryContrast: string;
  success: string;
}

// Semantic Colors
export const ThemeColors: { light: ThemeColorsType; dark: ThemeColorsType } = {
  light: {
    text: Palette.neutral950,
    textSecondary: Palette.neutral600,
    background: Palette.neutral100,
    backgroundSecondary: Palette.neutral200,
    card: Palette.neutral100,
    border: Palette.neutral300,
    tint: tintColorLight,
    icon: Palette.neutral600,
    tabIconDefault: Palette.neutral500,
    tabIconSelected: tintColorLight,
    primary: Palette.primary,
    primaryContrast: Palette.white,
    success: Palette.green,
  },
  dark: {
    text: Palette.neutral100,
    textSecondary: Palette.neutral400,
    background: Palette.neutral950,
    backgroundSecondary: Palette.neutral800,
    card: Palette.neutral900,
    border: Palette.neutral800,
    tint: tintColorDark,
    icon: Palette.neutral400,
    tabIconDefault: Palette.neutral500,
    tabIconSelected: tintColorDark,
    primary: Palette.primary,
    primaryContrast: Palette.white,
    success: Palette.green,
  },
};

export const FontSizes = {
  small: 0.85,
  medium: 1,
  large: 1.15,
  extraLarge: 1.3,
};

export const Colors = {
  light: ThemeColors.light,
  dark: ThemeColors.dark,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
