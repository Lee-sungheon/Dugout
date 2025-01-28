<script setup>
import CrewCard from "@/components/crewboard/CrewCard.vue";
import { getCrewRecruitmentPostsByClub } from "@/api/supabase-api/crewRecruitmentPost";
import { ref, onMounted, watch } from "vue";
import GoToCreate from "@/components/common/GoToCreate.vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import { teamID } from "@/constants";

const route = useRoute();
const router = useRouter();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]); // 팀 id 가져오기
const posts = ref([]);
const currentUser = ref(null);

// 특정 게시물 데이터 가져오기
const fetchPosts = async () => {
  const data = await getCrewRecruitmentPostsByClub(clubId.value);
  if (data) {
    posts.value = data || [];
  } else {
    console.log("특정 게시물 데이터 가져오기 실패!");
  }
};
console.log(teamName.value);
console.log(clubId.value);
// 현재 로그인 사용자 정보 불러오기
const getUserInfo = async () => {
  const userData = await getCurrentUser();
  if (userData) {
    currentUser.value = userData; // 로그인된 사용자 정보 저장
  } else {
    currentUser.value = null; // 비로그인 상태
  }
};

const handleButtonClick = () => {
  if (currentUser.value) {
    router.push(`/${teamName.value}/crewboard/create`);
  } else {
    // 비로그인 상태: 알림 및 로그인 페이지로 이동
    alert("로그인 후 이용 가능합니다.");
    router.push("/signin"); // 로그인 페이지 경로
  }
};

onMounted(async () => {
  await fetchPosts();
  await getUserInfo();
});

// route.params.team이 변경될 때마다 반응
watch(
  () => route.params.team,
  (newTeamName, _) => {
    // 업데이트
    clubId.value = teamID[newTeamName];
    fetchPosts();
  }
);
</script>

<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="flex flex-col gap-[50px] w-[990px]">
      <!-- 글쓰기 버튼 -->
      <div class="cursor-pointer">
        <GoToCreate :text="'직관 크루 모집에 글 쓰러 가기'" />
      </div>
      <!-- 크루 모집 게시물 리스트 -->
      <div class="grid grid-cols-3 gap-[30px]">
        <template v-if="posts.length">
          <CrewCard
            v-for="post in posts"
            :key="post.post_id"
            :post="post"
            class="cursor-pointer"
          />
        </template>
        <template v-else>
          <h1>데이터가 없습니다.</h1>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
