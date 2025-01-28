<script setup>
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import RecruitmentStatus from "./RecruitmentStatus.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  crewBoard: {
    type: Boolean,
    required: false,
    default: false,
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
  status: {
    type: String,
  },
  memberId: {
    type: String,
    required: true, // 게시물 작성자의 ID
  },
  postId: {
    type: String,
    required: true, // 게시물 ID (수정할 때 필요)
  },
  confirmDelete: {
    type: Function,
    required: true,
  },
});

const currentUserId = ref(null);

const route = useRoute();
const router = useRouter();
const reactiveTitle = ref(props.title);

watchEffect(() => {
  console.log("📌 PostHeader에서 받은 title:", props.title);
  reactiveTitle.value = props.title;
});

// 현재 로그인한 유저의 ID 가져오기
onMounted(async () => {
  const user = await getCurrentUser();
  if (user) {
    currentUserId.value = user.id;
    console.log("현재 로그인한 유저 ID:", currentUserId.value);
  }
});

// 본인 게시물인지 여부 확인
const isOwner = computed(() => currentUserId.value === props.memberId);

//현재 게시판 종류 가져오기
const boardType = computed(() => {
  const boardPath = route.path.split("/");
  return boardPath[2] || "";
});

// 수정 페이지 경로 동적으로 생성
const editPageUrl = computed(() => {
  return `/${route.params.team}/${boardType.value}/${props.postId}/edit`;
});

const goToEditPage = () => {
  router.push(editPageUrl.value);
};
</script>
<template>
  <!-- 상세 페이지 정보 -->
  <div class="flex flex-col gap-[10px] pb-5 border-b border-white02">
    <!-- 제목 -->
    <div class="flex items-center gap-[15px]">
      <span class="text-2xl font-bold">{{ reactiveTitle }}</span>
      <!-- crew모집 페이지에서만 다음 컴포넌트 출력 -->
      <RecruitmentStatus v-if="props.crewBoard" :status="props.status" />
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
        <button @click="goToEditPage" class="hover:text-gray03">수정</button>
        <span>|</span>
        <button @click="confirmDelete" class="hover:text-gray03">삭제</button>
      </div>
    </div>
  </div>
</template>

<style coped></style>
