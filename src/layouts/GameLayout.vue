<script setup>
import Header from "@/components/ui/Header.vue";
import { ref } from "vue";
import { RouterView } from "vue-router";
import gameIcon from "@/assets/images/baseballgame_logo.svg";
import quizIcon from "@/assets/images/quiz_logo.svg";
import tournamentIcon from "@/assets/images/tournament-logo.svg";
import gameIconBlack from "@/assets/images/baseballgame_logo_black.svg";
import quizIconBlack from "@/assets/images/quiz_logo_black.svg";
import tournamentIconBlack from "@/assets/images/tournament_logo_black.svg";

const games = ["야구 게임", "야구 퀴즈", "야구 토너먼트"];

const selectedGame = ref("");
const selectGame = (game) => {
  if (selectedGame.value !== game) {
    selectedGame.value = game;
  }
};
</script>
<template>
  <div class="flex flex-col items-center justify-start w-full min-h-screen">
    <Header />
    <div class="bg-[#070707] w-full flex-grow">
      <div
        class="flex items-center gap-x-[10px] w-max flex-nowrap ml-[30px] mr-[30px] mt-[117.5px]"
      >
        <button
          v-for="(game, index) of games"
          :key="index"
          @click="selectGame(game)"
          class="inline-flex items-center h-[34px] px-[10px] rounded-[10px] whitespace-nowrap gap-[10px] text-[18px] font-semibold"
          :class="{
            'bg-white01 text-black01': selectedGame.includes(game),
            'bg-transparent text-white01': !selectedGame.includes(game),
          }"
        >
          <img
            v-if="game === '야구 게임' && !selectedGame.includes(game)"
            :src="gameIcon"
            class="w-[20.84px] h-[18px]"
          />
          <img
            v-if="game === '야구 게임' && selectedGame.includes(game)"
            :src="gameIconBlack"
            class="w-[20.84px] h-[18px]"
          />
          <img
            v-if="game === '야구 퀴즈' && !selectedGame.includes(game)"
            :src="quizIcon"
            class="w-[18.26px] h-[18px]"
          />
          <img
            v-if="game === '야구 퀴즈' && selectedGame.includes(game)"
            :src="quizIconBlack"
            class="w-[18.26px] h-[18px]"
          />
          <img
            v-if="game === '야구 토너먼트' && !selectedGame.includes(game)"
            :src="tournamentIcon"
            class="w-[18px] h-[18px]"
          />
          <img
            v-if="game === '야구 토너먼트' && selectedGame.includes(game)"
            :src="tournamentIconBlack"
            class="w-[18px] h-[18px]"
          />
          <p>{{ game }}</p>
        </button>
      </div>
      <RouterView />
    </div>
  </div>
</template>
<style scoped></style>
