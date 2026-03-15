import type { Config } from 'tailwindcss';
import { colors, typography, spacing, borderRadius, shadows } from './lib/constants/theme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        dark: colors.dark,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      spacing: spacing,
      borderRadius: borderRadius,
      boxShadow: shadows,
      fontFamily: {
        sans: typography.sans,
        mono: typography.mono,
      },
      backgroundColor: {
        base: colors.background,
        surface: colors.surface,
      },
      textColor: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        tertiary: colors.text.tertiary,
      },
      borderColor: {
        base: colors.border,
      },
    },
  },
  plugins: [],
};

export default config;
