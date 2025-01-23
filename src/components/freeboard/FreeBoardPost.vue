<script setup>
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";

// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

const props = defineProps({
  post: {
    type: Object,
  },
});
</script>
<template>
  <div
    class="flex w-full gap-[30px] py-[20px] border-b border-white02 border-2 border-red-500"
  >
    <!-- 왼쪽 이미지 -->
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
        alt="게시물 이미지"
        class="w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-[10px]"
      />
    </div>
    <!-- 오른쪽 게시물 정보 -->
    <div class="flex py-[10px] flex-col justify-between">
      <!-- 제목 / 내용 -->
      <div class="flex flex-col gap-[10px] text-black01">
        <span class="text-xl font-bold leading-[24px]">{{
          props.post.title
        }}</span>
        <span class="text-gray03 leading-[19px]">{{ props.post.content }}</span>
      </div>
      <!-- 닉네임 / 작성일 -->
      <div class="flex text-xs gap-[10px] leading-[14px]">
        <span class="font-bold text-gray03">{{ props.post.author_name }}</span>
        <span class="text-gray02">
          {{ dayjs(props.post.created_at).format("YYYY.MM.DD") }}</span
        >
        <span class="text-gray02">{{
          dayjs(props.post.created_at).fromNow()
        }}</span>
      </div>
      <!-- 좋아요 / 댓글 -->
      <div
        class="flex gap-[20px] text-xs text-gray02 items-center leading-[14px]"
      >
        <div class="flex gap-[10px]">
          <img :src="likeIcon" alt="하트 이미지" class="w-[16px] h-[14px]" />
          <span>{{ props.post.like_count }}</span>
        </div>
        <div class="flex gap-[10px]">
          <img
            :src="commentIcon"
            alt="말풍선 이미지"
            class="w-[16px] h-[14px]"
            ß
          />
          <span>{{ props.post.comment_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
