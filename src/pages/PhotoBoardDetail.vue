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
        title="[240719] 위팍 워페 직관 인증!"
        nickname="닉네임"
        time="4시간 전"
      />
      <!-- 게시물 내용 -->
      <div class="pt-[50px] pb-[50px] gap-[30px] flex border-b border-b-gray01">
        <div class="aspect-square rounded-[10px] overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>
        <div class="flex-1">
          <p class="w-full h-full py-5 text-[18px] text-black01">
            오늘 위즈 파크 워터 페스티벌을 다녀왔다!
            <br />
            처음엔 물을 많이 안 뿌려줘서 좀 실망할 뻔 했는데 3회인가 4회인가부터
            <br />갑자기 선수들이 미친듯이 방망이질을 해서 영원히 물을
            뿌려줬다... <br />다음에 또 가고싶드아아악!!! <br />내년엔
            연간회원권 사서 더 자주 가야지 ⚾️
          </p>
        </div>
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
