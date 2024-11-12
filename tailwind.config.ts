import type { Config } from "tailwindcss";
// import tailwindcssAnimate from "tailwindcss-animate";
  
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,txt}",
    "./tina/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    'md:text-xs', 'md:text-sm', 'md:text-base', 'md:text-lg', 'md:text-xl', 'md:text-2xl', 'md:text-3xl',
    'lg:text-xs', 'lg:text-sm', 'lg:text-base', 'lg:text-lg', 'lg:text-xl', 'lg:text-2xl', 'lg:text-3xl',
  ],
  theme: {
    extend: {
      fontSize: {
        "font-md": "1.125rem",
        "font-lg": "1.5rem",
        "font-xl": "2rem",
        "font-2xl": "2.5rem",
        "font-3xl": "3rem",
        "font-4xl": "3.5rem",
        "font-5xl": "4rem",
        "font-6xl": "4.5rem",
      },
      fontFamily: {
        "mainTitle": ['var(--mainTitle)'],
        "auxTitle": ['var(--auxTitle)'],
        "main": ['var(--main)']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "blue-light": "#8FB3EC",
        "blue-lighter": "#D6E4F0",
        "blue-dark": "#171738",
        "green-lighter": "#B5C998",
        "green-light": "#95BB6A",
        "green-dark": "#284F49",
        "green-darker": "#1F3F3A",
      },
      backgroundImage: {
        "home": "url(../public/covers/home.bmp)",
        "about-us": "url(../public/covers/about-us.jpg)",
        "team": "url(../public/covers/team.jpg)",
        "our-process": "url(../public/covers/our-process.jpg)",
        "strategies": "url(../public/covers/strategies.bmp)",
        "contact-us": "url(../public/covers/contact-us.jpg)",
      },
      screens: {
        '2xl': '1640px',
        'tab': '1100px',
        'lg-tab': { 'raw': '(min-width: 900px) and (max-width: 1100px)' }
      },
    },
  },
  // plugins: [
  //   tailwindcssAnimate,
  // ],
};
export default config;
