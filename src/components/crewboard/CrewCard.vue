<script setup>
import mascotImg from "@/assets/images/mascot_lg.svg";
</script>
<template>
  <div
    class="border border-white02 rounded-[10px] w-[310px] h-[250px] bg-[#F4F4F4] relative p-[10px] flex justify-between items-end"
  >
    <img
      :src="mascotImg"
      alt=""
      class="opacity-30 w-[150px] h-[166px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
    <div
      class="absolute flex flex-col items-center w-full text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <span>20250322</span>
      <span>LG 트윈스 | 잠실 야구장</span>
      <span>여자 | 20대 | 1명 이상</span>
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-[10px]">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
          alt="유저 프로필"
          class="w-[25px] h-[25px] rounded-full"
        />
        <span class="text-xs text-gray03">닉네임</span>
        <span class="text-xs text-gray02">4시간 전</span>
      </div>

      <div class="flex items-center gap-[5px]">
        <div class="w-[6px] h-[6px] bg-progressing rounded-full"></div>
        <span class="text-xs">모집중</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
