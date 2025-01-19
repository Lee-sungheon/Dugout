<script setup>
import { twMerge } from "tailwind-merge";
import teamToggleIcon from "../../assets/icons/team_toggle.svg";
import kiaLogo from "../../assets/images/logo_kia.svg";
import samsungLogo from "../../assets/images/logo_samsung.svg";
import lgLogo from "../../assets/images/logo_lg.svg";
import doosanLogo from "../../assets/images/logo_doosan.svg";
import ktLogo from "../../assets/images/logo_kt.svg";
import ssgLogo from "../../assets/images/logo_ssg.svg";
import lotteLogo from "../../assets/images/logo_lotte.svg";
import hanhwaLogo from "../../assets/images/logo_hanhwa.svg";
import ncLogo from "../../assets/images/logo_nc.svg";
import kiwoomLogo from "../../assets/images/logo_kiwoom.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isOpen = ref(false);
const toggleTeam = () => {
  isOpen.value = !isOpen.value;
};
const teams = [
  { name: "kia", path: "/kia", logo: kiaLogo },
  { name: "samsung", path: "/samsung", logo: samsungLogo },
  { name: "lg", path: "/lg", logo: lgLogo },
  { name: "doosan", path: "/doosan", logo: doosanLogo },
  { name: "kt", path: "/kt", logo: ktLogo },
  { name: "ssg", path: "/ssg", logo: ssgLogo },
  { name: "lotte", path: "/lotte", logo: lotteLogo },
  { name: "hanhwa", path: "/hanhwa", logo: hanhwaLogo },
  { name: "nc", path: "/nc", logo: ncLogo },
  { name: "kiwoom", path: "/kiwoom", logo: kiwoomLogo },
];

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="w-[770px] h-[60px] fixed bottom-[50px] left-1/2 -translate-x-1/2 flex items-center justify-center px-[25px] gap-[35px] bg-white drop-shadow-md rounded-[20px]"
  >
    <button
      v-for="(team, index) in teams"
      :key="index"
      class="flex-shrink-0"
      @click="navigateTo(team.path)"
    >
      <img :src="team.logo" class="w-[40px] h-auto" />
    </button>
  </div>
  <button
    @click="toggleTeam"
    class="fixed bottom-[10px] left-1/2 -translate-x-1/2"
  >
    <img
      :src="teamToggleIcon"
      :class="
        twMerge(
          'transition-transform duration-100',
          isOpen ? 'rotate-180' : 'rotate-0'
        )
      "
      alt="Team Toggle"
    />
  </button>
</template>
