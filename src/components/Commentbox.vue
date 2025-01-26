<script setup>
// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { deleteComment } from "@/api/supabase-api/common";
import { useRoute } from "vue-router";
import { boardToCommentTableMapping } from "@/constants";
import { ref } from "vue";
defineProps({
  comment: {
    type: Object,
  },
});
// day.js
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

const route = useRoute();
const post_id = ref(route.params.id);
const boardName = route.path.split("/")[2]; // 게시판 이름

const fetchDeleteComment = async (id) => {
  try {
    const data = await deleteComment(boardToCommentTableMapping[boardName], id);
    console.log("확인", data);
  } catch (error) {
    console.error("댓글을 삭제하는도중 오류가 발생했습니다.");
  }
};
</script>
<template>
  <div class="pb-5 border-b border-white02">
    <div class="flex items-center justify-between">
      <div class="flex gap-[10px] items-center">
        <img
          :src="comment.user_info.image"
          alt="유저 프로필"
          class="w-[35px] h-[35px] rounded-full"
        />
        <span class="text-sm font-bold text-gray03">{{
          comment.user_info.name
        }}</span>
        <span class="text-xs text-gray02">{{
          dayjs(comment.created_at).fromNow()
        }}</span>
      </div>
      <div class="flex text-xs text-gray02 gap-[4px]">
        <button class="hover:text-gray03">수정</button>
        <span>|</span>
        <button
          class="hover:text-gray03"
          @click="fetchDeleteComment(comment.id)"
        >
          삭제
        </button>
      </div>
    </div>
    <div class="pl-[45px]">
      <span class="text-[#515151]">{{ comment.content }}</span>
    </div>
  </div>
</template>

<style ßscoped></style>
