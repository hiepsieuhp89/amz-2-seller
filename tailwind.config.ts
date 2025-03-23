import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');
const { fontFamily } = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '568px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      xxl: '1560px',
      xxxl: '1920px',
    },
    extend: {
      fontFamily: {
        sans: ['Amazon Ember', ...fontFamily.sans],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      boxShadow: {
        'light-grey': '0 4px 6px rgba(211, 211, 211, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#232F3E',
        // Các màu tối chính
        'main-dark-blue': '#131921',
        'main-charcoal-blue': '#232F3E',
        // Màu xám, dành cho background và disabled icon
        'main-gunmetal-blue': '#252C35',
        // Màu cam logo Amazon
        'main-golden-orange': '#FCAF17',
        
        'gray-light': '#7579E70D',
        'gray-dark': '#636364',
        'border-primary': '#DCDCDC',
        'border-second': '#D9D9D9',
        'white-primary': '#ffffff',
        'black-dark': '#000000',
        'light-black': '#716F7E',
        'medium-grey': '#AAAAAA',
        'green-medium': '#0D961B',
        'red-medium': '#E73D30',
        'main-purple': '#691577',
        'red-error': '#FF4D4F',
        'blue-dark': '#6366F1',
        'orange-medium': '#FAAD14',
        'blue-medium': '#005884',
        'blue-darker': '#1677FF',
      },
      fontSize: {
        34: '2.125em',
        16: '1rem',
      },
      width: {
        100: '6.25em',
        200: '12.5em',
        300: '18.75em',
        400: '25em',
        500: '31.25em',
      },
      maxWidth: {
        100: '6.25em',
        200: '12.5em',
        300: '18.75em',
        400: '25em',
        500: '31.25em',
      },
      minWidth: {
        100: '6.25em',
        200: '12.5em',
        300: '18.75em',
        400: '25em',
        500: '31.25em',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: any) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: '1px',
          scrollbarColor: '#c1c1c1',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '2px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgb(31 41 55)',
            borderRadius: '20px',
            border: '1px solid white',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
export default config;
