<script setup>
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
import defaultImg from "@/assets/images/defaultImg_sm.svg";
import BaseballLogo from "@/assets/icons/baseball.svg";

const route = useRoute();

// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { useRoute } from "vue-router";
import { computed } from "vue";
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

defineProps({
  post: {
    type: Object,
  },
});
</script>
<template>
  <div class="flex w-full pb-[20px] border-b border-white02">
    <!-- 라우터 처리 -->
    <RouterLink
      :to="`/${route.params.team}/freeboard/${post.post_id}`"
      class="flex gap-[30px] w-full cursor-pointer"
    >
      <!-- 왼쪽 이미지 -->
      <img
        :src="post.thumbnail_url || defaultImg"
        alt="게시물 이미지"
        class="w-[150px] h-[150px] min-w-[150px] min-h-[150px] rounded-[10px] border border-white01"
      />

      <!-- 오른쪽 게시물 정보 -->
      <div class="flex py-[10px] flex-col justify-between w-[810px]">
        <!-- 제목 / 내용 -->
        <div class="flex flex-col gap-[10px] text-black01">
          <span class="text-xl font-bold leading-[24px]">{{ post.title }}</span>
          <span
            class="text-gray03 leading-[19px]"
            style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            "
            >{{
              post.content.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "")
            }}</span
          >
        </div>
        <!-- 닉네임 / 작성일 -->
        <div class="flex text-xs gap-[10px] leading-[14px]">
          <span class="font-bold text-gray03">{{ post.author_name }}</span>
          <span class="text-gray02">
            {{ dayjs(post.created_at).format("YYYY.MM.DD") }}</span
          >
          <span class="text-gray02">{{
            dayjs(post.created_at).fromNow()
          }}</span>
        </div>
        <!-- 좋아요 / 댓글 -->
        <div
          class="flex gap-[20px] text-xs text-gray02 items-center leading-[14px]"
        >
          <div class="flex gap-[10px]">
            <img :src="likeIcon" alt="하트 이미지" class="w-[16px] h-[14px]" />
            <span>{{ post.like_count }}</span>
          </div>
          <div class="flex gap-[10px]">
            <img
              :src="commentIcon"
              alt="말풍선 이미지"
              class="w-[16px] h-[14px]"
              ß
            />
            <span>{{ post.comment_count }}</span>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<style scoped></style>
