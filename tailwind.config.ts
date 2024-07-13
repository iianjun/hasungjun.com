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
      boxShadow: {
        modal: "0 22px 70px 4px rgba(0, 0, 0, 0.56)",
      },
      keyframes: {
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
      },
      animation: {
        "blink-caret": "blink-caret 0.75s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
