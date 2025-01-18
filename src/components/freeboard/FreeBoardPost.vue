<script setup>
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
</script>
<template>
  <div class="flex w-full gap-[30px] py-[20px] border-b border-white02">
    <!-- 왼쪽 이미지 -->
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
        alt="게시물 이미지"
        class="min-w-[150px] min-h-[150px] rounded-[10px]"
      />
    </div>
    <!-- 오른쪽 게시물 정보 -->
    <div class="flex py-[10px] flex-col justify-between">
      <!-- 제목 / 내용 -->
      <div class="flex flex-col gap-[10px] text-black01">
        <span class="text-xl font-bold"
          >작년 첫 직관! 난 개막만을 기다려...🥺</span
        >
        <span class="text-gray03"
          >글을 처음부터 주어진 영역을 채울 때까지의 텍스트를 가져와 화면에
          출력합니다. 글을 처음부터 주어진 영역을 채울 때까지의 테스트를 가져와
          화면에 출력합니다. 글을 처음부터 주어진 영역을 채울 때까지의 텍스트를
          가져와</span
        >
      </div>
      <!-- 닉네임 / 작성일 -->
      <div class="flex text-xs gap-[10px]">
        <span class="font-bold text-gray03">닉네임</span>
        <span class="text-gray02">2025.01.16</span>
        <span class="text-gray02">13분전</span>
      </div>
      <!-- 좋아요 / 댓글 -->
      <div class="flex gap-[20px]">
        <div class="flex gap-[10px]">
          <img :src="likeIcon" alt="하트 이미지" />
          <span>20</span>
        </div>
        <div class="flex gap-[10px]">
          <img :src="commentIcon" alt="말풍선 이미지" />
          <span>20</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
