<script setup>
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
</script>
<template>
  <div>
    <!-- 뒤로가기 -->
    <div class="border-2 border-green-500 mb-[50px] flex">
      <button>
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="flex flex-col gap-[50px]">
      <!-- 상세 페이지 정보 -->
      <PostHeader crewBoard />
      <!-- 게시물 내용 -->
      <div
        class="border-x border-blue-500 py-[50px] flex border-b border-b-gray01 flex-col items-center"
      >
        <span>
          안녕하세요!<br />
          지방 사는 20대 엘팬입니다.<br />
          오랜만에 서울에 올라와서 야구를 보고싶은데 같이 볼 사람이 없네요 🥺<br />
          그래서 용기를 내어 글을 써봅니다!<br />
          같이 재밌게 야구 보고 와요!
        </span>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
          alt=""
          class="w-fit h-fit"
        />
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
