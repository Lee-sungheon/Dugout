<script setup>
import {
  createFreePostComment,
  getFreePostDetailsById,
} from "@/api/supabase-api/freePost";
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
import { onMounted, ref } from "vue";

const post = ref({}); // 게시물 상세 정보를 담을 변수

const route = useRoute();
const post_id = ref(route.params.id);

// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { useRoute } from "vue-router";
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

// 게시물 상세 정보를 가져오는 함수
const fetchFreeboardDetail = async (id) => {
  try {
    const data = await getFreePostDetailsById(id);
    console.log(data);
    post.value = data;
  } catch (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
  }
};

// 댓글 생성하는 사용자 정의 함수
const createComment = async (comment) => {
  try {
    const data = createFreePostComment(
      "d9ac20dc-af86-42e8-9d63-5f1e35b20547", // member ID,
      post_id.value,
      comment
    );
  } catch (error) {
    console.error("댓글 작성중 오류가 생겼습니다.");
  }
};

onMounted(() => {
  fetchFreeboardDetail(post_id.value);
});
</script>
<template>
  <div class="px-[50px] py-[30px] flex flex-col items-center">
    <!-- 뒤로가기 -->
    <div class="mb-[50px] flex w-full">
      <button>
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="flex flex-col gap-[50px] w-[990px]">
      <!-- 상세 페이지 정보 -->
      <PostHeader
        :title="post.title"
        :nickname="post.author_name"
        :time="dayjs(post.created_at).fromNow()"
        :profileImage="post.author_image"
      />
      <!-- 게시물 내용 -->
      <div class="border-b border-gray01 pb-[50px]">
        <div v-html="post.content" class="prose ql-editor max-w-none"></div>
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection
        :likeLength="post.like_count"
        :commentLength="post.comment_count"
        @create-comment="createComment"
      />
    </div>
  </div>
</template>

<style scoped></style>
