import kiaLogo from "@/assets/images/logo_kia.svg";
import samsungLogo from "@/assets/images/logo_samsung.svg";
import lgLogo from "@/assets/images/logo_lg.svg";
import doosanLogo from "@/assets/images/logo_doosan.svg";
import ktLogo from "@/assets/images/logo_kt.svg";
import ssgLogo from "@/assets/images/logo_ssg.svg";
import lotteLogo from "@/assets/images/logo_lotte.svg";
import hanhwaLogo from "@/assets/images/logo_hanhwa.svg";
import ncLogo from "@/assets/images/logo_nc.svg";
import kiwoomLogo from "@/assets/images/logo_kiwoom.svg";
import gameIcon from "@/assets/images/baseballgame_logo.svg";
import quizIcon from "@/assets/images/quiz_logo.svg";
import tournamentIcon from "@/assets/images/tournament-logo.svg";
import gameIconBlack from "@/assets/images/baseballgame_logo_black.svg";
import quizIconBlack from "@/assets/images/quiz_logo_black.svg";
import tournamentIconBlack from "@/assets/images/tournament_logo_black.svg";

export const teamList = [
  { name: "kia", path: "/kia/freeboard", logo: kiaLogo, nickname: "Tigers" },
  {
    name: "samsung",
    path: "/samsung/freeboard",
    logo: samsungLogo,
    nickname: "Lions",
  },
  { name: "lg", path: "/lg/freeboard", logo: lgLogo, nickname: "Twins" },
  {
    name: "doosan",
    path: "/doosan/freeboard",
    logo: doosanLogo,
    nickname: "Bears",
  },
  { name: "kt", path: "/kt/freeboard", logo: ktLogo, nickname: "Wiz" },
  { name: "ssg", path: "/ssg/freeboard", logo: ssgLogo, nickname: "Landers" },
  {
    name: "lotte",
    path: "/lotte/freeboard",
    logo: lotteLogo,
    nickname: "Giants",
  },
  {
    name: "hanhwa",
    path: "/hanhwa/freeboard",
    logo: hanhwaLogo,
    nickname: "Eagles",
  },
  { name: "nc", path: "/nc/freeboard", logo: ncLogo, nickname: "Dinos" },
  {
    name: "kiwoom",
    path: "/kiwoom/freeboard",
    logo: kiwoomLogo,
    nickname: "Heros",
  },
];

export const gameList = [
  {
    name: "야구 게임",
    path: "baseballgame",
    icon: gameIcon,
    iconBlack: gameIconBlack,
  },
  {
    name: "야구 퀴즈",
    path: "quizselect",
    icon: quizIcon,
    iconBlack: quizIconBlack,
  },
  {
    name: "야구 토너먼트",
    path: "tournamentselect",
    icon: tournamentIcon,
    iconBlack: tournamentIconBlack,
  },
];

export const teamsTags = [
  "# LG 트윈스",
  "# KT 위즈",
  "# 삼성 라이온즈",
  "# KIA 타이거즈",
  "# 키움 히어로즈",
  "# 한화 이글스",
  "# NC 다이노스",
  "# 롯데 자이언츠",
  "# SSG 랜더스",
  "# 두산 베어스",
];

export const teamID = {
  lg: 1,
  doosan: 2,
  kiwoom: 3,
  ssg: 4,
  nc: 5,
  kia: 6,
  hanhwa: 7,
  lotte: 8,
  samsung: 9,
  kt: 10,
};
