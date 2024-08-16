import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        link: "#0071e3",
      },
      fontFamily: {
        arial: ["Arial", "Helvetica", "sans-serif"],
      },
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
      spacing: {
        30: "7.5rem",
      },
      boxShadow: {
        modal: "0 22px 70px 4px rgba(0, 0, 0, 0.56)",
      },
      keyframes: {
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
        "fade-up-full": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "text-fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(1.5rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-right-full": {
          "0%": {
            transform: "translateX(-100%);",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        opacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "blink-caret": "blink-caret 0.75s step-end infinite",
        "nav-fade-up":
          "opacity 0.5s, fade-up-full 0.5s cubic-bezier(0, 0, 0.5, 1)",
        "nav-fade-right":
          "opacity 0.5s, fade-right-full 0.5s cubic-bezier(0, 0, 0.5, 1)",
        "fade-in-up": "text-fade-up 0.5s cubic-bezier(0, 0, 0.5, 1) forwards",
        "resume-visible": "opacity 0.8s cubic-bezier(0.4, 0, 0.6, 1) forwards",
      },
      transitionDuration: {
        600: "600ms",
      },
    },
  },
  plugins: [],
};
export default config;
