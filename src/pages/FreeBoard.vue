<script setup>
import FreeBoardPost from "@/components/freeboard/FreeBoardPost.vue";
</script>
<template>
  <div
    class="flex h-full border border-red-500 px-[50px] py-[30px] gap-[30px] flex-col"
  >
    <!-- 글쓰기 버튼 -->
    <div class="w-full h-fit">
      <button class="w-full font-medium bg-white02 py-[10px] rounded-[10px]">
        자유 게시판에 글 쓰러 가기 >
      </button>
    </div>

    <!-- 목록 -->
    <div class="w-full h-full">
      <FreeBoardPost />
      <FreeBoardPost />
      <FreeBoardPost />
      <FreeBoardPost />
      <FreeBoardPost />
    </div>
  </div>
</template>
<style scoped></style>
