<script setup>
import Monitor from "@/assets/images/gamemonitor.svg";
import InfoQuiz from "@/assets/images/info_quiz_card.svg";
import InfoQuizGreen from "@/assets/images/info_quiz_card_green.svg";
import PlayerQuiz from "@/assets/images/player_quiz_card.svg";
import PlayerQuizGreen from "@/assets/images/player_quiz_card_green.svg";
import recordQuiz from "@/assets/images/record_quiz_card.svg";
import recordQuizGreen from "@/assets/images/record_quiz_card_green.svg";
</script>
<template>
  <div class="relative w-max mx-auto">
    <img :src="Monitor" class="h-[670px]" />
    <div
      class="absolute top-[109px] left-1/2 translate-x-[-49%] w-full px-[89px] flex justify-between"
    >
      <img :src="InfoQuiz" class="h-[217px] flex-1 object-contain" />
      <img :src="PlayerQuiz" class="h-[217px] flex-1 object-contain" />
      <img :src="recordQuiz" class="h-[217px] flex-1 object-contain" />
    </div>
  </div>
</template>
<style scoped></style>
