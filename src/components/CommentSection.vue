<script setup>
import Commentbox from "./Commentbox.vue";
import likeIcon from "@/assets/icons/like.svg";
import likeIconFilled from "@/assets/icons/like_fill.svg"; 
import commentIcon from "@/assets/icons/comment.svg";
import commentBtnIcon from "@/assets/icons/comment_btn.svg";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { createComment, getComments } from "@/api/supabase-api/common";
import { addLike, getLike, getLikeByMember, removeLike } from "@/api/supabase-api/commonLikeWithoutDuplication";
import { boardToCommentTableMapping } from "@/constants";

defineProps({
  postId: {
    type: String,
    required: true,
  },
  tableName: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const post_id = ref(route.params.id);
const boardName = route.path.split("/")[2]; // 게시판 이름

const text = ref("");
const comments = ref([]);
const likes = ref([]);
const liked = ref(false); // 좋아요 상태 관리

// 좋아요 정보 가져오는 함수
const fetchLike = async () => {
  try {
    const data = await getLike(props.tableName, props.postId);
    likes.value = data;
  } catch (error) {
    console.error("좋아요 정보를 가져오는 중에 오류가 발생했습니다.");
  }
};

// 좋아요 여부를 가져오는 함수
const fetchLikeByMember = async () => {
  try {
    const data = await getLikeByMember(
      props.tableName,
      props.postId,
      "b04114da-ccb1-4b49-9fc3-57f56e64f964" // member ID
    );
    liked.value = data.length > 0; // 이미 좋아요를 눌렀다면 true
  } catch (error) {
    console.error("좋아요 정보를 가져오는 중에 오류가 발생했습니다.");
  }
};

// 좋아요를 추가하는 함수
const fetchAddLike = async () => {
  try {
    const data = await addLike(
      props.tableName,
      props.postId,
      "b04114da-ccb1-4b49-9fc3-57f56e64f964" // member ID
    );
    if (data) {
      likes.value = [...likes.value, data];
      liked.value = true;
    }
  } catch (error) {
    console.error("좋아요 추가 중에 오류가 발생했습니다.");
  }
};

// 좋아요를 삭제하는 함수
const fetchRemoveLike = async () => {
  try {
    const data = await removeLike(
      props.tableName,
      props.postId,
      "b04114da-ccb1-4b49-9fc3-57f56e64f964" // member ID
    );
    if (data) {
      likes.value = likes.value.filter((like) => like.id !== data.id);
      liked.value = false;
    }
  } catch (error) {
    console.error("좋아요 삭제 중에 오류가 발생했습니다.");
  }
};

// 댓글 생성하는 함수
const fectCreateComment = async (comment) => {
  try {
    const data = await createComment(
      boardToCommentTableMapping[boardName],
      "b04114da-ccb1-4b49-9fc3-57f56e64f964", // member ID
      post_id.value,
      comment
    );
    // 낙관적 업데이트
    if (data) {
      comments.value = [...comments.value, ...data]; // 게시물 목록 추가
    }
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
    comments.value = data;
  } catch (error) {
    console.error("댓글 정보를 가져오는 중에 오류가 발생했습니다.");
  }
};

// 코멘트 목록 업데이트하는 함수
const updateComments = (newComments) => {
  comments.value = newComments;
};

onMounted(() => {
  fetchGetComments();
  fetchLike();
  fetchLikeByMember();
});
</script>

<template>
  <div class="px-[30px] flex flex-col gap-[30px]">
    <!-- 좋아요 / 댓글수 -->
    <div class="flex gap-[20px]">
      <div class="flex gap-[10px]">
        <button @click="liked ? fetchRemoveLike() : fetchAddLike()">
          <img
            :src="liked ? likeIconFilled : likeIcon"
            alt="좋아요 아이콘"
            class="w-[21px] h-18px"
          />
        </button>
        <span class="text-gray02">{{ likes.length }}</span>
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
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @update-comments="updateComments"
      />
    </div>
  </div>
</template>

