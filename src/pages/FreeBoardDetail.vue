<script setup>
import backIcon from "@/assets/icons/back.svg";
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
import commentBtnIcon from "@/assets/icons/comment_btn.svg";
import Commentbox from "@/components/Commentbox.vue";
</script>
<template>
  <div class="px-[50px] py-[35px]">
    <!-- 뒤로가기 -->
    <div class="border-2 border-green-500 mb-[50px]">
      <button>
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="pb-5 border-b border-white02">
      <!-- 상세 페이지 정보 -->
      <div class="flex flex-col gap-[10px]">
        <!-- 제목 -->
        <div class="w-full border border-red-500">
          <span class="text-2xl font-bold"
            >작년 첫 직관! 난 개막만을 기다려...</span
          >
        </div>
        <!-- 유저 정보 / 수정 삭제 -->
        <div class="flex items-center justify-between border border-red-500">
          <!-- 유저정보 -->
          <div class="flex items-center gap-[10px] border border-blue-500">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
              alt="유저 프로필"
              class="w-[25px] h-[25px] rounded-full"
            />
            <span class="text-xs text-gray03">닉네임</span>
            <span class="text-xs text-gray02">4시간 전</span>
          </div>
          <!-- 수정 삭제 버튼 -->
          <div
            class="flex text-xs text-gray02 gap-[4px] border border-blue-500"
          >
            <button class="hover:text-gray03">수정</button>
            <span>|</span>
            <button class="hover:text-gray03">삭제</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시물 내용 -->
    <div
      class="border border-blue-500 py-[50px] flex border-b border-b-gray01 flex-col items-center"
    >
      <span>
        프로젝트를 진행하면서 야구 얘기를 너무 많이 했더니 야구가 너무
        보고싶다... vue-quill을 사용할 예정입니다 vue-quill을 사용하면 아래와
        같은 기능들을 사용 가능합니다 bold, italic, underline, linethrough 인용,
        코드블럭 heading 지정 리스트 윗첨자, 아랫첨자 글씨 크기 폰트 색상 및
        배경 색상 지정 글씨체 좌/우/중앙 정렬 및 양쪽 맞춤이 가능 링크/영상/사진
        삽입 가능</span
      >

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
        alt=""
        class="w-fit h-fit"
      />
    </div>

    <!-- 코멘트 부분 -->
    <div
      class="pt-[50px] px-[30px] border border-red-500 flex flex-col gap-[30px]"
    >
      <!-- 좋아요 / 댓글수 -->
      <div class="flex gap-[20px]">
        <div class="flex gap-[10px]">
          <img :src="likeIcon" alt="좋아요 아이콘" class="w-[21px] h-18px" />
          <span class="text-gray02">20</span>
        </div>
        <div class="flex gap-[10px]">
          <img :src="commentIcon" alt="댓글 아이콘" class="w-[21px] h-18px" />
          <span class="text-gray02">20</span>
        </div>
      </div>

      <!-- 댓글작성 -->
      <div
        class="border border-gray01 rounded-[10px] px-5 py-[18px] flex justify-between gap-[20px]"
      >
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          class="w-full outline-none"
        />
        <img :src="commentBtnIcon" alt="댓글 전송 버튼" />
      </div>

      <!-- 댓글리스트 -->
      <div class="flex flex-col gap-5">
        <Commentbox />
        <Commentbox />
        <Commentbox />
        <Commentbox />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
