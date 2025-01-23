/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    // 기본 팀 색상 (폰트 및 배경)
    "text-Landers",
    "bg-Landers",
    "text-Twins",
    "bg-Twins",
    "text-Heros",
    "bg-Heros",
    "text-Dinos",
    "bg-Dinos",
    "text-Tigers",
    "bg-Tigers",
    "text-Bears",
    "bg-Bears",
    "text-Giants",
    "bg-Giants",
    "text-Lions",
    "bg-Lions",
    "text-Eagles",
    "bg-Eagles",
    "text-Wiz",
    "bg-Wiz",

    // 10% 투명도 색상
    "text-Landers_opa10",
    "bg-Landers_opa10",
    "text-Twins_opa10",
    "bg-Twins_opa10",
    "text-Heros_opa10",
    "bg-Heros_opa10",
    "text-Dinos_opa10",
    "bg-Dinos_opa10",
    "text-Tigers_opa10",
    "bg-Tigers_opa10",
    "text-Bears_opa10",
    "bg-Bears_opa10",
    "text-Giants_opa10",
    "bg-Giants_opa10",
    "text-Lions_opa10",
    "bg-Lions_opa10",
    "text-Eagles_opa10",
    "bg-Eagles_opa10",
    "text-Wiz_opa10",
    "bg-Wiz_opa10",

    // 30% 투명도 색상
    "text-Landers_opa30",
    "bg-Landers_opa30",
    "text-Twins_opa30",
    "bg-Twins_opa30",
    "text-Heros_opa30",
    "bg-Heros_opa30",
    "text-Dinos_opa30",
    "bg-Dinos_opa30",
    "text-Tigers_opa30",
    "bg-Tigers_opa30",
    "text-Bears_opa30",
    "bg-Bears_opa30",
    "text-Giants_opa30",
    "bg-Giants_opa30",
    "text-Lions_opa30",
    "bg-Lions_opa30",
    "text-Eagles_opa30",
    "bg-Eagles_opa30",
    "text-Wiz_opa30",
    "bg-Wiz_opa30",

    // 호버 배경색
    "hover:bg-Landers_opa10",
    "hover:bg-Twins_opa10",
    "hover:bg-Heros_opa10",
    "hover:bg-Dinos_opa10",
    "hover:bg-Tigers_opa10",
    "hover:bg-Bears_opa10",
    "hover:bg-Giants_opa10",
    "hover:bg-Lions_opa10",
    "hover:bg-Eagles_opa10",
    "hover:bg-Wiz_opa10",
  ],
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
        Landers: "#E61E2A",
        Twins: "#C30452",
        Heros: "#6F263D",
        Dinos: "#315288",
        Tigers: "#C30452",
        Bears: "#0D2340",
        Giants: "#002955",
        Lions: "#007AC1",
        Eagles: "#FF6600",
        Wiz: "#C30452",
        Landers_opa10: "#FCE8EA",
        Twins_opa10: "#F9E6EE",
        Heros_opa10: "#F1E9EC",
        Dinos_opa10: "#EAEEF3",
        Tigers_opa10: "#F9E6EE",
        Bears_opa10: "#E7E9EC",
        Giants_opa10: "#E5EAEE",
        Lions_opa10: "#E5F2F9",
        Eagles_opa10: "#FFF0E5",
        Wiz_opa10: "#F9E6EE",
        Lander_opa30: "#F7BBBF",
        Twins_opa30: "#EDB4CB",
        Heros_opa30: "#D4BEC5",
        Dinos_opa30: "#C1CBDB",
        Tigers_opa30: "#EDB4CB",
        Bears_opa30: "#B6BDC6",
        Giants_opa30: "#B3BFCC",
        Lions_opa30: "#B3D7EC",
        Eagles_opa30: "#FFD1B3",
        Wiz_opa30: "#EDB4CB",
        progressing: "#34C300",
        Done: "#F50000",
        gameGreen: "#0BF89F",
      },
      fontFamily: {
        sigmar: ["Sigmar", "cursive"], // Sigmar 폰트 추가 -> tailwind에서 font-sigmar로 사용
        Galmuri11: ["Galmuri11", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
