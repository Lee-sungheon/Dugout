<script setup>
import backgroundImg from "@/assets/images/404background.svg";
import Text from "@/assets/images/404text.svg";
</script>
<template>
  <div
    class="h-screen bg-center bg-no-repeat bg-cover border-2 border-red-500"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <!-- 중앙에서 왼쪽 정렬 -->
    <div
      class="flex items-center justify-end w-1/2 h-full border-2 border-blue-500"
    >
      <!-- 404 에러 문구 -->
      <div class="flex flex-col border-2 border-blue-500 gap-[50px]">
        <div class="flex flex-col items-end border-2 border-red-500">
          <img :src="Text" alt="404text" class="w-[358px] h-[180px]" />
          <span class="text-white01 text-[65px] font-sigmar">NOT FOUND</span>
        </div>

        <div class="flex flex-col border-2 border-red-500 gap-[25px] items-end">
          <div
            class="flex flex-col items-end text-2xl text-white border-2 border-green-500"
          >
            <span>여기는 파울존입니다.</span>
            <span>페이지를 찾을 수 없습니다.</span>
          </div>
          <button class="p-5 bg-white01 rounded-[10px] font-sigmar text-[26px]">
            Go To HOME
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
