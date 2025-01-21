<script setup>
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="px-[50px] py-[30px]">
    <!-- 뒤로가기 -->
    <div class="border-2 border-green-500 mb-[50px] flex">
      <button @click="router.go(-1)">
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="flex flex-col gap-[50px]">
      <!-- 상세 페이지 정보 -->
      <PostHeader
        title="잠실야구장 주변 잭슨피자"
        nickname="닉네임"
        time="4시간 전"
      />
      <!-- 게시물 내용 -->
      <div
        class="mt-[50px] gap-[50px] pb-[50px] flex flex-col border-b border-b-gray01"
      >
        <div class="flex flex-col gap-[30px]">
          <div class="w-full h-[376px] overflow-hidden bg-gray01">
            카카오맵 추가
          </div>
          <div>
            <p class="w-full h-full py-5 text-[18px] text-black01 text-center">
              잭슨피자 진짜 맛있다<br />
              근데 맨날 하와이안 피자를 먹는다고 저항을 받는다<br />
              어쩌라고 하와이안 피자의 맛도 모르는 불쌍한 사람들아!!!(급발진
            </p>
          </div>
          <div class="flex w-full h-[310px] gap-[30px]">
            <div class="flex-1 aspect-square rounded-[10px] overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="flex-1 aspect-square rounded-[10px] overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="flex-1 aspect-square rounded-[10px] overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg"
                class="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <span class="text-[18px] text-gray03"># 야구장 주변 맛집</span>
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
