/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          'bg-dark': 'var(--color-bg-dark)',
          'bg-glass': 'var(--color-bg-glass)',
          text: 'var(--color-text)'
        },
        borderRadius: {
          DEFAULT: 'var(--border-radius)'
        },
        transitionDuration: {
          DEFAULT: 'var(--transition)'
        }
      }
    },
    plugins: [],
  };