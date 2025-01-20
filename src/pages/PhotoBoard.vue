<script setup>
import PostArrow from "@/assets/icons/post_arrow.svg";
import Like from "@/assets/icons/like.svg";
import Comment from "@/assets/icons/comment.svg";
import PhotoboardCard from "@/components/photoboard/PhotoboardCard.vue";

const posts = [
  {
    id: "1",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
  {
    id: "2",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
  {
    id: "3",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
  {
    id: "4",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
  {
    id: "5",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
  {
    id: "6",
    photo:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
    profile:
      "https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg",
    name: "닉네임",
    likes: "20",
    comments: "4",
  },
];

const props = defineProps({
  posts: Array,
});
</script>
<template>
  <div class="flex border border-red-500 gap-[30px] flex-col">
    <!-- 글쓰기 버튼 -->
    <div>
      <button
        class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
      >
        직관 인증 포토 올리러 가기
        <img :src="PostArrow" class="w-[14px] h-[8px]" />
      </button>
    </div>
    <!-- 목록 -->
    <div class="w-full h-auto border border-red-500 mb-[100px]">
      <div class="grid grid-cols-3 gap-[30px] w-full">
        <PhotoboardCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
