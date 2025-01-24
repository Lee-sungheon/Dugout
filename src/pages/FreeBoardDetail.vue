<script setup>
import { getFreePostDetailsById } from "@/api/supabase-api/freePost";
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
      <div
        class="flex flex-col items-center border-b border-gray01 pb-[50px] border-2 border-red-500"
      >
        <span>
          프로젝트를 진행하면서 야구 얘기를 너무 많이 했더니 야구가 너무
          보고싶다... vue-quill을 사용할 예정입니다 vue-quill을 사용하면 아래와
          같은 기능들을 사용 가능합니다 bold, italic, underline, linethrough
          인용, 코드블럭 heading 지정 리스트 윗첨자, 아랫첨자 글씨 크기 폰트
          색상 및 배경 색상 지정 글씨체 좌/우/중앙 정렬 및 양쪽 맞춤이 가능
          링크/영상/사진 삽입 가능</span
        >

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
          alt=""
          class="w-fit h-fit"
        />
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection
        :likeLength="post.like_count"
        :commentLength="post.comment_count"
      />
    </div>
  </div>
</template>

<style scoped></style>
