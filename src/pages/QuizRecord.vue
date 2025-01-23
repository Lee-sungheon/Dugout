<script setup>
import Monitor from "@/assets/images/gamemonitor.svg";
import { useGameStart } from "@/utils/useGameStart";

const { isGameStarting } = useGameStart();
</script>
<template>
  <div class="relative mx-auto w-max">
    <img :src="Monitor" class="h-[670px]" />
    <div
      class="absolute top-[109px] left-1/2 translate-x-[-49%] w-full px-[89px] flex justify-between">
      <!-- Game Start (3s) -->
      <div
        v-if="isGameStarting"
        class="text-[30px] text-white01 font-bold flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-[90px]">
        <p class="font-Galmuri11">QUIZ</p>
        <p class="font-Galmuri11">START</p>
      </div>
      <!-- 게임 화면 -->
      <div
        v-else
        class="absolute top-[109px] left-1/2 translate-x-[-49%] w-full px-[89px] flex justify-between">
        <div class="text-white01">앙</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
