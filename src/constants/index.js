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
  { name: "kia", path: "/kia/freeboard", logo: kiaLogo },
  { name: "samsung", path: "/samsung/freeboard", logo: samsungLogo },
  { name: "lg", path: "/lg/freeboard", logo: lgLogo },
  { name: "doosan", path: "/doosan/freeboard", logo: doosanLogo },
  { name: "kt", path: "/kt/freeboard", logo: ktLogo },
  { name: "ssg", path: "/ssg/freeboard", logo: ssgLogo },
  { name: "lotte", path: "/lotte/freeboard", logo: lotteLogo },
  { name: "hanhwa", path: "/hanhwa/freeboard", logo: hanhwaLogo },
  { name: "nc", path: "/nc/freeboard", logo: ncLogo },
  { name: "kiwoom", path: "/kiwoom/freeboard", logo: kiwoomLogo },
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
