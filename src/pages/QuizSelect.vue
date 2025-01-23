<script setup>
import Monitor from "@/assets/images/gamemonitor.svg";
import InfoQuiz from "@/assets/images/info_quiz_card.svg";
import InfoQuizGreen from "@/assets/images/info_quiz_card_green.svg";
import PlayerQuiz from "@/assets/images/player_quiz_card.svg";
import PlayerQuizGreen from "@/assets/images/player_quiz_card_green.svg";
import RecordQuiz from "@/assets/images/record_quiz_card.svg";
import RecordQuizGreen from "@/assets/images/record_quiz_card_green.svg";
import PlayBtn from "@/assets/images/play_btn.svg";

//개발할 때 선택하면 green 컬러로 카드, 텍스트 바뀌는 로직 구현
</script>
<template>
  <div class="relative mx-auto w-max">
    <img :src="Monitor" class="h-[670px]" />
    <div
      class="absolute top-[109px] left-1/2 translate-x-[-49%] w-full px-[89px] flex justify-between"
    >
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="InfoQuiz" class="h-[217px] flex-1 object-contain" />
        <span class="font-bold font-Galmuri11 text-gameGreen"
          >야구 상식 퀴즈</span
        >
      </button>
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="PlayerQuiz" class="h-[217px] flex-1 object-contain" />
        <span class="font-bold font-Galmuri11 text-gameGreen">선수 맞추기</span>
      </button>
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="RecordQuiz" class="h-[217px] flex-1 object-contain" />
        <span class="font-bold font-Galmuri11 text-gameGreen"
          >야구 기록 퀴즈</span
        >
      </button>
    </div>
    <button
      class="absolute bottom-[140px] left-1/2 translate-x-[-45%] cursor-pointer"
    >
      <img :src="PlayBtn" />
    </button>
  </div>
</template>
<style scoped></style>
