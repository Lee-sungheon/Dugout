<script setup>
import gameMonitor from "@/assets/images/gamemonitor.svg";
import baseBallMiniGame from "@/assets/images/baseballminigame.svg";
import ballWhite from "@/assets/images/ballwhite.svg";
import ballColor from "@/assets/images/ballColor.svg";
</script>
<template>
  <div>
    <div class="mt-[100px] border-2 border-red-500 relative">
      <img :src="gameMonitor" alt="모니터 사진" class="h-[670px]" />
      <!-- 모니터 레이아웃 -->
      <div
        class="border-2 border-blue-500 absolute w-[586px] h-[387px] left-[71px] top-[43px] flex justify-center items-center"
      >
        <div
          class="flex flex-col items-center justify-center border-2 border-red-500 gap-[25px]"
        >
          <!-- 제목 -->
          <img
            :src="baseBallMiniGame"
            alt="야구 미니 게임"
            class="w-[237px] h-[47px]"
          />
          <!-- 설명 -->
          <div class="flex flex-col items-center font-bold text-white01">
            <span class="font-Galmuri11"
              >나와 상대방에게 무작위의 4자리 숫자가 주어집니다.</span
            >
            <span class="font-Galmuri11">랜덤으로 첫 질문자를 정합니다.</span>
            <span class="font-Galmuri11"
              >질문자는 상대방의 숫자를 예측해 질문합니다.</span
            >
            <span class="font-Galmuri11"
              >답변자는 질문자가 맞춘 숫자에 따라 답변합니다.</span
            >
          </div>
          <!-- 볼 / 스트라이크 설명 -->
          <div class="flex w-full border-2 border-blue-500 text-white01">
            <div
              class="flex flex-col items-center justify-between w-1/2 border-2 border-green-500"
            >
              <div class="flex flex-col items-center font-bold">
                <span class="font-Galmuri11"
                  ><span class="font-Galmuri11 text-gameGreen">숫자</span>만
                  맞추면</span
                >
                <span class="font-Galmuri11 text-gameGreen">볼</span>
              </div>

              <img :src="ballWhite" alt="흰색 공" class="w-[55px] h-[55px]" />
            </div>
            <div class="flex flex-col items-center w-1/2 gap-3">
              <div class="flex flex-col items-center font-bold">
                <span class="font-Galmuri11"
                  >숫자와
                  <span class="font-Galmuri11 text-gameGreen">자리까지</span>
                  맞추면</span
                >
                <span class="font-Galmuri11 text-gameGreen">스트라이크</span>
              </div>
              <img :src="ballColor" alt="컬러 공" class="w-[55px] h-[55px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
