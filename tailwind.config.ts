import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ── Brand Palette ── */
      colors: {
        neu: {
          green:         '#02644A',
          'green-hover': '#00916A',
          emerald:       '#10B981',
          'emerald-light': '#D1FAE5',
          indigo:        '#6366F1',
          red:           '#DC2626',
          yellow:        '#CA8A04',
          purple:        '#9333EA',
          /* neutral surfaces */
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },

      /* ── Typography ── */
      fontFamily: {
        sans: [
          'Nunito Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },

      /* ── Box Shadows ── */
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.05)',
        nav:  '0 4px 24px rgba(0,0,0,.25)',
        brand: '0 10px 40px rgba(2,100,74,.15)',
      },

      /* ── Background gradients (nav + hero) ── */
      backgroundImage: {
        'neu-nav':    'linear-gradient(to right, #0F172A, #1E293B, #0F172A)',
        'neu-brand':  'linear-gradient(to right, #02644A, #10B981)',
        'neu-footer': 'linear-gradient(135deg, #1A2332 0%, #1E293B 50%, #1A2332 100%)',
        'neu-hero':   'linear-gradient(to bottom, transparent, rgba(0,0,0,.6))',
      },

      /* ── Border radius ── */
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },

      /* ── Animation ── */
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeSlideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        marquee:      'marquee 32s linear infinite',
        fadeSlideUp:  'fadeSlideUp .6s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config