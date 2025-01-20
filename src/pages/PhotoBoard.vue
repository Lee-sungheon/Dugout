<script setup>
import PostArrow from "@/assets/icons/post_arrow.svg";
import Like from "@/assets/icons/like.svg";
import Comment from "@/assets/icons/comment.svg";

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
        <div
          v-for="post in posts"
          :key="post.id"
          class="flex flex-col justify-between bg-white02 rounded-[10px] pt-[10px] px-[10px] pb-[15px] h-[335px]"
        >
          <div
            class="w-full flex-grow overflow-hidden mb-[15px] rounded-[10px]"
          >
            <img :src="post.photo" class="w-full h-full object-cover" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[10px]">
              <img
                :src="post.profile"
                class="w-[25px] h-[25px] object-cover rounded-full flex-nowrap"
              />
              <p>{{ post.name }}</p>
            </div>
            <div class="flex items-center gap-[20px]">
              <div class="flex items-center gap-[10px]">
                <img :src="Like" class="w-16.39px h-14px" />
                <p class="text-gray02 text-3">{{ post.likes }}</p>
              </div>
              <div class="flex items-center gap-[10px]">
                <img :src="Comment" class="w-16.39px h-14px" />
                <p class="text-gray02 text-3">{{ post.comments }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
