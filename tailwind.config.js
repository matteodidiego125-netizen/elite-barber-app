/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Palette Barberia ── */
        'b-blue':  '#00509D',   /* Blu profondo — decorativo, eyebrow, accenti */
        'b-red':   '#D62828',   /* Rosso deciso — CTA primari, prezzi, stelle */
        'b-white': '#FFFFFF',   /* Bianco puro — titoli */

        /* ── Sfondi ── */
        ink:      '#0a0a0a',
        'ink-2':  '#0d0d0e',

        /* Manteniamo gold come alias per retrocompatibilità temporanea */
        gold: '#00509D',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'hero-reveal': 'heroReveal 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'hero-fade':   'heroFade   1.1s ease both',
      },
      keyframes: {
        heroReveal: {
          '0%':   { transform: 'translateY(110%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        heroFade: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
