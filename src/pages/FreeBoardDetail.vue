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
      <PostHeader
        title="작년 첫 직관! 난 개막만을 기다려..."
        nickname="닉네임"
        time="4시간 전"
      />
      <!-- 게시물 내용 -->
      <div
        class="border-x border-blue-500 py-[50px] flex border-b border-b-gray01 flex-col items-center"
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
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
