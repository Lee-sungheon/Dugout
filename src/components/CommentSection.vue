<script setup>
import Commentbox from "./Commentbox.vue";
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
import commentBtnIcon from "@/assets/icons/comment_btn.svg";

const props = defineProps({
  likeLength: {
    type: Boolean,
    required: false,
    default: false, // 기본값은 false로 설정
  },
  commentLength: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="px-[30px] flex flex-col gap-[30px]">
    <!-- 좋아요 / 댓글수 -->
    <div class="flex gap-[20px]">
      <div class="flex gap-[10px]">
        <img :src="likeIcon" alt="좋아요 아이콘" class="w-[21px] h-18px" />
        <span class="text-gray02">{{ props.likeLength }}</span>
      </div>
      <div class="flex gap-[10px]">
        <img :src="commentIcon" alt="댓글 아이콘" class="w-[21px] h-18px" />
        <span class="text-gray02">{{ props.commentLength }}</span>
      </div>
    </div>

    <!-- 댓글작성 -->
    <div
      class="border border-gray01 rounded-[10px] px-5 py-[18px] flex justify-between gap-[20px]"
    >
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        class="w-full outline-none bg-white01"
      />
      <img :src="commentBtnIcon" alt="댓글 전송 버튼" />
    </div>

    <!-- 댓글리스트 -->
    <div class="flex flex-col gap-5">
      <Commentbox />
      <Commentbox />
      <Commentbox />
      <Commentbox />
    </div>
  </div>
</template>

<style scoped></style>
