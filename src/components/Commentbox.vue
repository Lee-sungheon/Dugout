<script setup>
// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { deleteComment } from "@/api/supabase-api/common";
import { useRoute } from "vue-router";
import { boardToCommentTableMapping } from "@/constants";

// day.js
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

const props = defineProps({
  comment: {
    type: Object,
  },
  comments: {
    type: Array,
  },
});
const emit = defineEmits(["update:comments"]);

const route = useRoute();
const boardName = route.path.split("/")[2]; // 게시판 이름

// 댓글 삭제하는 함수
const fetchDeleteComment = async () => {
  try {
    await deleteComment(
      boardToCommentTableMapping[boardName],
      props.comment.id
    );
    const newcomments = props.comments.filter(
      (comment) => comment.id !== props.comment.id
    );
    emit("update:comments", newcomments); // 부모에 요청
  } catch (error) {
    console.error("댓글을 삭제하는도중 오류가 발생했습니다.");
  }
  console.log("댓글", props.comments);
};
</script>
<template>
  <div class="pb-5 border-b border-white02">
    <div class="flex items-center justify-between">
      <div class="flex gap-[10px] items-center">
        <img
          :src="props.comment.user_info.image"
          alt="유저 프로필"
          class="w-[35px] h-[35px] rounded-full"
        />
        <span class="text-sm font-bold text-gray03">{{
          props.comment.user_info.name
        }}</span>
        <span class="text-xs text-gray02">{{
          dayjs(props.comment.created_at).fromNow()
        }}</span>
      </div>
      <div class="flex text-xs text-gray02 gap-[4px]">
        <button class="hover:text-gray03">수정</button>
        <span>|</span>
        <button class="hover:text-gray03" @click="fetchDeleteComment()">
          삭제
        </button>
      </div>
    </div>
    <div class="pl-[45px]">
      <span class="text-[#515151]">{{ props.comment.content }}</span>
    </div>
  </div>
</template>

<style ßscoped></style>
