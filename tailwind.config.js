/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white01: "#FAFAFA",
        white02: "#EEEEEE",
        black01: "#0A0A0A",
        balck02: "#1E1E1E",
        gray01: "#B1B1B1",
        gray03: "#515151",
        gray02: "#919191",
      },
      fontFamily: {
        sigmar: ["Sigmar", "cursive"], // Sigmar 폰트 추가 -> tailwind에서 font-sigmar로 사용
      },
    },
  },
  plugins: [],
};
