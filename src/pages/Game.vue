<script setup>
import Header from "@/components/ui/Header.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 각 버튼 클릭 시 경로 이동 함수
const goToBaseBallGame = () => {
  router.push("/game/baseballgame");
};
const goToBaseBallQuiz = () => {
  router.push("/game/quizselect");
};
const goToBaseBallTMT = () => {
  router.push("/game/tournamentselect");
};
</script>

<template>
  <Header />
  <!-- 전체 배경 -->
  <div class="relative w-screen h-screen">
    <!-- 100% 검정색 배경 -->
    <div
      class="absolute top-0 left-0 w-full h-full z-0"
      style="background-color: #070707"></div>

    <!-- 모니터 레이어 -->
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[688px] h-[670px] z-10">
      <img
        src="/src/assets/icons/game-monitor.svg"
        alt="Monitor Background"
        class="w-full h-full object-contain" />
    </div>

    <!-- 20% 투명 배경 -->
    <div
      class="absolute top-0 left-0 w-full h-full z-20"
      style="background-color: rgba(211, 211, 211, 0.2)"></div>

    <!-- 버튼 레이어 -->
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center gap-[200px] z-30">
      <!-- 야구 게임 버튼 -->
      <div class="flex flex-col items-center" @click="goToBaseBallGame">
        <div
          class="w-[80px] h-[80px] flex justify-center items-center cursor-pointer">
          <img
            src="/src/assets/icons/bt_baseBallGame.svg"
            alt="야구 게임"
            class="w-20 h-20" />
        </div>
        <span class="mt-2 text-white text-lg">야구 게임</span>
      </div>

      <!-- 야구 퀴즈 버튼 -->
      <div class="flex flex-col items-center" @click="goToBaseBallQuiz">
        <div
          class="w-[80px] h-[80px] flex justify-center items-center cursor-pointer">
          <img
            src="/src/assets/icons/bt_baseBallQuiz.svg"
            alt="야구 퀴즈"
            class="w-20 h-20" />
        </div>
        <span class="mt-2 text-[#0bf89f] text-lg">야구 퀴즈</span>
      </div>

      <!-- 토너먼트 버튼 -->
      <div class="flex flex-col items-center" @click="goToBaseBallTMT">
        <div
          class="w-[80px] h-[80px] flex justify-center items-center cursor-pointer">
          <img
            src="/src/assets/icons/bt_baseBallTMT.svg"
            alt="토너먼트"
            class="w-20 h-20" />
        </div>
        <span class="mt-2 text-white text-lg">토너먼트</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 글로벌 초기화 */
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
