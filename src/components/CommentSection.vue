<script setup>
import { createComment, getComments } from "@/api/supabase-api/commonComment";
import {
  addLike,
  getLikes,
  removeLike,
} from "@/api/supabase-api/commonLikeWithoutDuplication";
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import commentIcon from "@/assets/icons/comment.svg";
import commentBtnIcon from "@/assets/icons/comment_btn.svg";
import likeIcon from "@/assets/icons/like.svg";
import likeIconFilled from "@/assets/icons/like_fill.svg";
import { boardToTableMapping } from "@/constants";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Commentbox from "./Commentbox.vue";

const route = useRoute();
const postId = ref(route.params.id);
const boardName = route.path.split("/")[2];
const commentText = ref(""); // 댓글 텍스트
const comments = ref([]);
const likes = ref([]);
const currentUserId = ref(null);
const currentUserName = ref(null);
const currentUserImage = ref(null);
const liked = computed(() =>
  likes.value.some((like) => like.member_id === currentUserId.value)
);

const fetchLikes = async () => {
  try {
    const data = await getLikes(boardToTableMapping[boardName], postId.value);
    likes.value = data;
  } catch (error) {
    console.error("좋아요 정보를 가져오는 중 오류 발생:", error.message);
  }
};

const toggleLike = async () => {
  try {
    if (liked.value) {
      likes.value = likes.value.filter(
        (like) => like.member_id !== currentUserId.value
      );
      await removeLike(
        boardToTableMapping[boardName],
        postId.value,
        currentUserId.value
      );
    } else {
      const optimisticLike = { member_id: currentUserId.value };
      likes.value.push(optimisticLike);
      const newLike = await addLike(
        boardToTableMapping[boardName],
        postId.value,
        currentUserId.value
      );
      if (!newLike) {
        likes.value = likes.value.filter(
          (like) => like.member_id !== currentUserId.value
        );
      }
    }
  } catch (error) {
    console.error("좋아요 상태 변경 중 오류 발생:", error.message);
    if (liked.value) {
      const rollbackLike = { member_id: currentUserId.value };
      likes.value.push(rollbackLike);
    } else {
      likes.value = likes.value.filter(
        (like) => like.member_id !== currentUserId.value
      );
    }
  }
};

const fetchComments = async () => {
  try {
    const data = await getComments(
      boardToTableMapping[boardName],
      postId.value
    );
    comments.value = data;
  } catch (error) {
    console.error("댓글 정보를 가져오는 중 오류 발생:", error.message);
  }
};

const refreshComments = async (updatedComments) => {
  comments.value = updatedComments;
};

const submitComment = async () => {
  const commentContent = commentText.value; // 댓글 내용
  // 낙관적 업데이트
  const optimisticComment = {
    id: null, // 임시 ID
    post_id: postId.value,
    content: commentContent,
    created_at: new Date().toISOString(), // 임시
    user_info: {
      name: currentUserName.value,
      image: currentUserImage.value,
    },
  };

  comments.value.push(optimisticComment);

  try {
    const newComment = await createComment(
      boardToTableMapping[boardName],
      currentUserId.value,
      postId.value,
      commentContent
    );

    commentText.value = "";
    optimisticComment.id = newComment.id;

    comments.value = comments.value.map((comment) =>
      comment.id === null ? optimisticComment : comment
    );
  } catch (error) {
    console.error("댓글을 생성하는 중 오류 발생:", error.message);
    // 오류 발생 시 롤백
    comments.value = comments.value.filter((comment) => comment.id !== null);
  }
};

const fetchCurrentUser = async () => {
  try {
    const user = await getCurrentUser();
    currentUserId.value = user?.id || null;
    currentUserName.value = user?.name || null;
    currentUserImage.value = user?.image || null;
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", error.message);
  }
};

onMounted(async () => {
  try {
    await fetchCurrentUser();
    await fetchComments();
    await fetchLikes();
  } catch (error) {
    console.error("초기 데이터 로드 중 오류 발생:", error.message);
  }
});

const handleKeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitComment();
  }
};
</script>

<template>
  <div class="px-[30px] flex flex-col gap-[30px]">
    <!-- 좋아요 / 댓글수 -->
    <div class="flex gap-[20px]">
      <div class="flex gap-[10px]">
        <button @click="toggleLike">
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
        v-model="commentText"
        @keydown="handleKeydown"
      />
      <button @click="submitComment">
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
        v-for="comment in comments.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )"
        :key="comment.id"
        :comments="comments"
        :comment="comment"
        :currentUserId="currentUserId"
        @refresh-comments="refreshComments"
      />
    </div>
  </div>
</template>
