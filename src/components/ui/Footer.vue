<script setup>
import teamToggleIcon from "@/assets/icons/team_toggle.svg";
import { teamList } from "@/constants";
import { useTeamStore } from "@/stores/teamStore";
import { twMerge } from "tailwind-merge";
import { ref } from "vue";
import { useRouter } from "vue-router";
import EnteringComunityAnimation from "./EnteringComunityAnimation.vue";

const router = useRouter();
const isOpen = ref(false);
const teamStore = useTeamStore();

const toggleTeam = () => {
  isOpen.value = !isOpen.value;
};

const navigationAndAnimation = async (team) => {
  await teamStore.triggerEnteringAnimation(team);
  setTimeout(() => {
    router.push(team.path);
  }, 1500);
};
</script>

<template>
  <EnteringComunityAnimation v-if="teamStore.isEnterAnimationOn" />
  <div
    v-if="isOpen"
    class="w-[770px] h-[60px] fixed bottom-[40px] left-1/2 -translate-x-1/2 flex items-center justify-center px-[25px] gap-[35px] bg-white drop-shadow-md rounded-[20px]"
  >
    <button
      v-for="(team, index) in teamList"
      :key="index"
      class="flex-shrink-0"
      @click="navigationAndAnimation(team)"
    >
      <img :src="team.logo" class="w-[40px] h-auto" />
    </button>
  </div>
  <button @click="toggleTeam" class="fixed bottom-0 -translate-x-1/2 left-1/2">
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
