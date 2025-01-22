<script setup>
import Monitor from "@/assets/images/gamemonitor.svg";
import BadPlayer from "@/assets/images/bad_player_card.svg";
import BadPlayerGreen from "@/assets/images/bad_player_card_green.svg";
import GoodPlayer from "@/assets/images/good_player_card.svg";
import GoodPlayerGreen from "@/assets/images/good_player_card_green.svg";
import HandsomePlayer from "@/assets/images/handsome_card.svg";
import HandsomePlayerGreen from "@/assets/images/handsome_card_green.svg";
import PlayBtn from "@/assets/images/play_btn.svg";

//개발할 때 선택하면 green 컬러로 카드, 텍스트 바뀌는 로직 구현
</script>
<template>
  <div class="relative w-max mx-auto">
    <img :src="Monitor" class="h-[670px]" />
    <div
      class="absolute top-[109px] left-1/2 translate-x-[-49%] w-full px-[89px] flex justify-between"
    >
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="BadPlayer" class="h-[217px] flex-1 object-contain" />
        <span class="font-Galmuri11 text-gameGreen font-bold"
          >야구 상식 퀴즈</span
        >
      </button>
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="GoodPlayer" class="h-[217px] flex-1 object-contain" />
        <span class="font-Galmuri11 text-gameGreen font-bold">선수 맞추기</span>
      </button>
      <button
        class="flex flex-col justify-center items-center gap-[16px] cursor-pointer"
      >
        <img :src="HandsomePlayer" class="h-[217px] flex-1 object-contain" />
        <span class="font-Galmuri11 text-gameGreen font-bold"
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
