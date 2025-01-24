<script setup>
import mascotImg from "@/assets/images/mascot_lg.svg";
import { useRouter } from "vue-router";
// props로 post 데이터를 받아옵니다.
defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// 카드 클릭 시 상세 페이지로 이동
const goToDetail = () => {
  router.push({ name: "crewboardDetail", params: { id: post.post_id } });
};
</script>

<template>
  <div
    @click="goToDetail"
    class="border border-white02 rounded-[10px] w-[310px] h-[250px] bg-[#F4F4F4] relative p-[10px] flex justify-between items-end"
  >
    <!-- 배경 이미지 -->
    <img
      :src="mascotImg"
      alt="게시물 이미지"
      class="opacity-30 w-[150px] h-[166px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />

    <!-- 카드 중앙 데이터 -->
    <div
      class="absolute flex flex-col items-center w-full text-xl font-bold transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <span>{{ post.title || "제목 없음" }}</span>
      <span>{{ post.status || "상태 없음" }}</span>
    </div>

    <!-- 하단 유저 정보 및 모집 상태 -->
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-[10px]">
        <img
          :src="post.author_image || mascotImg"
          alt="유저 프로필"
          class="w-[25px] h-[25px] rounded-full"
        />
        <span class="text-xs text-gray03"
          >작성자: {{ post.author_name || "정보 없음" }}</span
        >
        <span class="text-xs text-gray02">{{
          post.created_at.split("T")[0] || "날짜 없음"
        }}</span>
      </div>

      <div class="flex items-center gap-[5px]">
        <div
          class="w-[6px] h-[6px] rounded-full"
          :class="{
            'bg-green-500': post.status === '모집 중',
            'bg-red-500': post.status === '모집 완료',
          }"
        ></div>
        <span class="text-xs">{{ post.status || "상태 정보 없음" }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
