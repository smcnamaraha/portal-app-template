import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent:    'var(--color-accent)',
        bg:        'var(--color-bg)',
        surface:   'var(--color-surface)',
        border:    'var(--color-border)',
        success:   'var(--color-success, #22c55e)',
        warning:   'var(--color-warning, #f59e0b)',
        error:     'var(--color-error, #ef4444)',
        info:      'var(--color-info, #3b82f6)',
      },
      fontFamily: {
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono, monospace)'],
      },
      textColor: {
        primary:   'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
      },
    },
  },
  plugins: [],
};

export default config;
