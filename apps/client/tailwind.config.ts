import type { Config } from "tailwindcss";
import tailwindcssrtl from "tailwindcss-rtl";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssrtl()],
} satisfies Config;
