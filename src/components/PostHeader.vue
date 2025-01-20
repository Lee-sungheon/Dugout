<script setup></script>
<template>
  <!-- 상세 페이지 정보 -->
  <div class="flex flex-col gap-[10px] pb-5 border-b border-white02">
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
      <div class="flex text-xs text-gray02 gap-[4px] border border-blue-500">
        <button class="hover:text-gray03">수정</button>
        <span>|</span>
        <button class="hover:text-gray03">삭제</button>
      </div>
    </div>
  </div>
</template>

<style coped></style>
