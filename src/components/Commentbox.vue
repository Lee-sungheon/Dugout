<script setup>
defineProps({
  comment: {
    type: Object,
  },
});

// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { useRoute } from "vue-router";
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정
</script>
<template>
  <div class="pb-5 border-b border-white02">
    <div class="flex items-center justify-between">
      <div class="flex gap-[10px] items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
          alt="유저 프로필"
          class="w-[35px] h-[35px] rounded-full"
        />
        <span class="text-sm font-bold text-gray03">닉네임</span>
        <span class="text-xs text-gray02">{{
          dayjs(comment.created_at).fromNow()
        }}</span>
      </div>
      <div class="flex text-xs text-gray02 gap-[4px] border border-blue-500">
        <button class="hover:text-gray03">수정</button>
        <span>|</span>
        <button class="hover:text-gray03">삭제</button>
      </div>
    </div>
    <div class="pl-[45px]">
      <span class="text-[#515151]">{{ comment.content }}</span>
    </div>
  </div>
</template>

<style ßscoped></style>
