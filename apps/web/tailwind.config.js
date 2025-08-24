const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const {
  animations,
} = require('../../libs/web-fsd/src/lib/shared/theme/tokens/animation');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        success: 'rgba(51, 255, 204, 0.1)',
        error: 'rgba(204, 0, 0, 0.1)',
      },
      keyframes: {
        'move-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100px)' },
        },
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: '200px 0' },
        },
      },
      animation: {
        'move-right': `move-right  ${animations.nextTestCart.durationMs / 1000}s ease-in-out`,
        'move-left': `move-left ${animations.nextTestCart.durationMs / 1000}s ease-in-out forwards`,
        shake: 'shake 0.5s ease-in-out',
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },

  plugins: [],
};
