<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { getCurrentUser, signOutUser } from "../api/supabase-api/userInfo";

const user = ref(null); // 사용자 정보를 저장할 변수
const errorMessage = ref(""); // 에러 메시지를 저장할 변수
const router = useRouter();

const fetchCurrenthUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      user.value = currentUser;
    } else {
      errorMessage.value = "로그인된 사용자가 없습니다.";
    }
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    errorMessage.value = "사용자 정보를 가져오지 못했습니다.";
  }
};

const handleSignOut = async () => {
  const { success, error } = await signOutUser();
  if (success) {
    console.log("로그아웃 성공");
    router.push("/signin");
  } else {
    console.error("로그아웃 실패:", error);
  }
};

// 컴포넌트 로드 시 실행
onMounted(() => {
  fetchCurrenthUser();
});

//
const allQuestions = ref([]);

const fetchQuestions = async () => {
  try {
    const response = await fetch("/api/games/playerQuiz.json"); // JSON 파일 경로
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allQuestions.value = data.questions;
  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
  }
};

onMounted(() => {
  fetchQuestions();
});
//
</script>
<template>
  <div class="mt-[150px]">
    <p v-if="user" class="text-lg">환영합니다, {{ user.email }}님!</p>
    <p v-else class="text-lg text-gray-500">로그인을 해주세요.</p>
    <RouterLink to="/signin">로그인</RouterLink>
    <button @click="handleSignOut">로그아웃</button>
    <hr />
    <ul>
      <li v-for="question in allQuestions" :key="question.id">
        <img :src="question.question" width="100px" />
        <p>정답 : {{ question.answer }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped></style>
