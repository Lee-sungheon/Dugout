<script setup>
import freeBoardIcon from "@/assets/icons/free_board.svg";
import crewBoardIcon from "@/assets/icons/crew_board.svg";
import photoBoardIcon from "@/assets/icons/photo_board.svg";
import foodBoardIcon from "@/assets/icons/food_board.svg";
</script>
<template>
  <div
    class="fixed left-0 top-[100px] flex h-full w-[190px] bg-white02 flex-col items-center pt-[30px] px-[10px] gap-[50px]"
  >
    <!-- 구단 이름 -->
    <span class="text-3xl font-sigmar">TWINS</span>
    <!-- 네비게이트 -->
    <nav
      class="flex flex-col items-center w-full border border-red-500 gap-[22px]"
    >
      <RouterLink
        class="flex px-[10px] py-2 items-center text-lg font-semibold gap-[10px] hover:bg-[#d9d9d9] w-full rounded-[10px]"
      >
        <img :src="freeBoardIcon" alt="자유게시판 아이콘" />
        <span>자유 게시판</span>
      </RouterLink>
      <RouterLink
        class="flex px-[10px] py-2 items-center text-lg font-semibold gap-[10px] hover:bg-[#d9d9d9] w-full rounded-[10px]"
      >
        <img :src="crewBoardIcon" alt="직관 크루 모집 아이콘" />
        <span>직권 크루 모집</span>
      </RouterLink>
      <RouterLink
        class="flex px-[10px] py-2 items-center text-lg font-semibold gap-[10px] hover:bg-[#d9d9d9] w-full rounded-[10px]"
      >
        <img :src="photoBoardIcon" alt="직관 인증 포토 아이콘" />
        <span>직관 인증 포토</span>
      </RouterLink>
      <RouterLink
        class="flex px-[10px] py-2 items-center text-lg font-semibold gap-[10px] hover:bg-[#d9d9d9] w-full rounded-[10px]"
      >
        <img :src="foodBoardIcon" alt="직관 맛집 찾기 아이콘" />
        <span>직관 맛집 찾기</span>
      </RouterLink>
    </nav>
  </div>
</template>
<style scoped></style>
