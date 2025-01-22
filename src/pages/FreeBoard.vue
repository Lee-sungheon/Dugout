<script setup>
import FreeBoardPost from "@/components/freeboard/FreeBoardPost.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";
</script>
<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[30px] flex flex-col">
      <!-- 글쓰기 버튼 -->
      <div>
        <button
          class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
        >
          자유 게시판에 글 쓰러 가기
          <img :src="PostArrow" class="w-[14px] h-[8px]" />
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
  </div>
</template>
<style scoped></style>
