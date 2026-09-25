import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'color-mix(in srgb, var(--ink) calc(<alpha-value> * 100%), transparent)',
        surface:
          'color-mix(in srgb, var(--surface) calc(<alpha-value> * 100%), transparent)',
        fg: 'color-mix(in srgb, var(--fg) calc(<alpha-value> * 100%), transparent)',
        muted:
          'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
        line: 'color-mix(in srgb, var(--line) calc(<alpha-value> * 100%), transparent)',
        accent:
          'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        display: [
          'clamp(3.25rem, 12vw, 10rem)',
          { lineHeight: '0.9', letterSpacing: '-0.04em' },
        ],
        role: [
          'clamp(1.85rem, 5vw, 5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.035em' },
        ],
        headline: [
          'clamp(1.25rem, 3vw, 2.5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.025em' },
        ],
        title: [
          'clamp(1.25rem, 3vw, 2.5rem)',
          { lineHeight: '1.1', letterSpacing: '-0.015em' },
        ],
        subtitle: [
          'clamp(0.625rem, 1vw, 0.875rem)',
          { lineHeight: '1.1', letterSpacing: '-0.015em' },
        ],
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        mask: 'var(--ease-mask)',
      },
      transitionDuration: {
        fast: '300ms',
        base: '600ms',
        slow: '900ms',
        cinema: '1200ms',
      },
      maxWidth: {
        shell: '96rem',
      },
    },
  },
  plugins: [],
};
export default config;
