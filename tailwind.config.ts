import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "screen-sm": "640px",
        "screen-md": "768px",
        "screen-lg": "1024px",
        "screen-xl": "1280px",
        "screen-2xl": "1536px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      boxShadow: {
        modal: "0 22px 70px 4px rgba(0, 0, 0, 0.56)",
      },
      keyframes: {
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        "bottom-to-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(2.5rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "left-to-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100%);",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "blink-caret": "blink-caret 0.75s step-end infinite",
        "bottom-to-top": "bottom-to-top 0.5s cubic-bezier(0, 0, 0.5, 1)",
        "left-to-right": "left-to-right 0.5s cubic-bezier(0, 0, 0.5, 1)",
        "fade-in-up": "fade-in-up 0.5s forwards",
      },
    },
  },
  plugins: [],
};
export default config;
