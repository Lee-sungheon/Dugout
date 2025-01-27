<script setup>
import EmblemAnimation from "@/components/ui/EmblemAnimation.vue";
import Footer from "@/components/ui/Footer.vue";
import Header from "@/components/ui/Header.vue";
import { ref } from "vue";

const selectedTeam = ref(localStorage.getItem("selectedTeam") || "히어로즈"); // 로컬 저장소에서 선택된 팀 복원
const isEmblemEffectOn = ref(false);

const triggerEmblemEffect = () => {
  isEmblemEffectOn.value = true;
  setTimeout(() => {
    isEmblemEffectOn.value = false; // 일정 시간 후 이펙트 비활성화
  }, 2000);
};

const selectTeam = (team) => {
  selectedTeam.value = team;
  localStorage.setItem("selectedTeam", team); // 선택된 팀 로컬 저장소에 저장
  triggerEmblemEffect();
};
</script>

<template>
  <div class="flex flex-col items-center justify-start w-full min-h-screen">
    <Header :selectedTeam="selectedTeam" :selectTeam="selectTeam" />
    <RouterView />
    <Footer />
    <EmblemAnimation v-if="isEmblemEffectOn" :selectedTeam="selectedTeam" />
  </div>
</template>

<style scoped></style>
