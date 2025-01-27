<script setup>
import Commentbox from "./Commentbox.vue";
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
import commentBtnIcon from "@/assets/icons/comment_btn.svg";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { createComment, getComments } from "@/api/supabase-api/common";
import { boardToCommentTableMapping } from "@/constants";

defineProps({
  likeLength: {
    type: Number,
    default() {
      return 0;
    },
  },
});

const route = useRoute();
const post_id = ref(route.params.id);
const boardName = route.path.split("/")[2]; // 게시판 이름

const text = ref("");
const comments = ref([]);

// // 댓글 생성하는 함수
const fectCreateComment = async (comment) => {
  try {
    const data = await createComment(
      boardToCommentTableMapping[boardName],
      "d9ac20dc-af86-42e8-9d63-5f1e35b20547", // member ID,
      post_id.value,
      comment
    );
    // 낙관적 업데이트
    if (data) {
      comments.value = [...comments.value, ...data]; // 게시물 목록 추가
      localCommentLength.value += 1;
      console.log("추가후 데이터", comments.value);
    }
    console.log("생성데이터", data);
  } catch (error) {
    console.error("댓글 작성중 오류가 생겼습니다.");
  }
};

// 댓글 정보 가져오는 함수
const fetchGetComments = async () => {
  try {
    const data = await getComments(
      boardToCommentTableMapping[boardName],
      post_id.value
    );
    console.log(data);
    comments.value = data;
  } catch (error) {
    console.error("댓글 정보를 가져오는 중에 오류가 발생했습니다.");
  }
};

onMounted(() => {
  fetchGetComments();
});
</script>
<template>
  <div class="px-[30px] flex flex-col gap-[30px]">
    <!-- 좋아요 / 댓글수 -->
    <div class="flex gap-[20px]">
      <div class="flex gap-[10px]">
        <img :src="likeIcon" alt="좋아요 아이콘" class="w-[21px] h-18px" />
        <span class="text-gray02">{{ likeLength }}</span>
      </div>
      <div class="flex gap-[10px]">
        <img :src="commentIcon" alt="댓글 아이콘" class="w-[21px] h-18px" />
        <span class="text-gray02">{{ comments.length }}</span>
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
        v-model="text"
      />

      <button @click="fectCreateComment(text)">
        <img
          :src="commentBtnIcon"
          alt="댓글 전송 버튼"
          class="w-[24px] h-[24px]"
        />
      </button>
    </div>
    <!-- 댓글리스트 -->
    <div class="flex flex-col gap-5">
      <Commentbox
        v-for="comment of comments"
        :comment
        :key="comment.id"
        :comments
        @update:comments="(newComments) => (comments = newComments)"
      />
    </div>
  </div>
</template>

<style scoped></style>
