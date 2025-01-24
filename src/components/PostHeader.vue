<script setup>
import RecruitmentStatus from "./RecruitmentStatus.vue";
const props = defineProps({
  crewBoard: {
    type: Boolean,
    required: false,
    default: false, // 기본값은 false로 설정
  },
  title: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <!-- 상세 페이지 정보 -->
  <div class="flex flex-col gap-[10px] pb-5 border-b border-white02">
    <!-- 제목 -->
    <div class="flex items-center gap-[15px]">
      <span class="text-2xl font-bold">{{ props.title }}</span>
      <!-- crew모집 페이지에서만 다음 컴포넌트 출력 -->
      <RecruitmentStatus v-if="props.crewBoard" status="done" />
    </div>
    <!-- 유저 정보 / 수정 삭제 -->
    <div class="flex items-center justify-between">
      <!-- 유저정보 -->
      <div class="flex items-center gap-[10px]">
        <img
          :src="profileImage"
          alt="유저 프로필"
          class="w-[25px] h-[25px] rounded-full"
        />
        <span class="text-xs text-gray03">{{ props.nickname }}</span>
        <span class="text-xs text-gray02">{{ props.time }}</span>
      </div>
      <!-- 수정 삭제 버튼 -->
      <div class="flex text-xs text-gray02 gap-[4px]">
        <button class="hover:text-gray03">수정</button>
        <span>|</span>
        <button class="hover:text-gray03">삭제</button>
      </div>
    </div>
  </div>
</template>

<style coped></style>
