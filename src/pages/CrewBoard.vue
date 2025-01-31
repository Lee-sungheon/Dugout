<script setup>
import CrewCard from "@/components/crewboard/CrewCard.vue";
import { getCrewRecruitmentPostsByClub } from "@/api/supabase-api/crewRecruitmentPost";
import { ref, onMounted, watchEffect, computed, watch, onUnmounted } from "vue";
import GoToCreate from "@/components/common/GoToCreate.vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import { teamID } from "@/constants";
import { useSearchStore } from "@/stores/searchStore";

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]); 
const posts = ref([]);
const currentUser = ref(null);

const saveScrollPosition = () => {
  sessionStorage.setItem("crewboard-scroll", window.scrollY.toString());
};

const restoreScrollPosition = () => {
  const savedScroll = sessionStorage.getItem("crewboard-scroll");
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll, 10) || 0);
  }
};

// 특정 게시물 데이터 가져오기
const fetchPosts = async () => {
  const data = await getCrewRecruitmentPostsByClub(clubId.value);
  if (data) {
    posts.value = data || [];

    setTimeout(() => {
      restoreScrollPosition();
    }, 0);
  } else {
    console.log("특정 게시물 데이터 가져오기 실패!");
  }
};

// 현재 로그인 사용자 정보 불러오기
// const getUserInfo = async () => {
//   const userData = await getCurrentUser();
//   if (userData) {
//     currentUser.value = userData; // 로그인된 사용자 정보 저장
//   } else {
//     currentUser.value = null; // 비로그인 상태
//   }
// };

// const handleButtonClick = () => {
//   if (currentUser.value) {
//     router.push(`/${teamName.value}/crewboard/create`);
//   } else {
//     // 비로그인 상태: 알림 및 로그인 페이지로 이동
//     alert("로그인 후 이용 가능합니다.");
//     router.push("/signin"); // 로그인 페이지 경로
//   }
// };

onMounted(async () => {
  await fetchPosts();
  // await getUserInfo();
  window.addEventListener("scroll", saveScrollPosition);
});

onBeforeRouteLeave((to, _, next) => {
  if (to.path.includes("/crewboard")) {
    saveScrollPosition();
  }
  next();
});

onUnmounted(() => {
  if (!route.path.includes("/crewboard")) {
    saveScrollPosition();
  }
  window.removeEventListener("scroll", saveScrollPosition);
});

watch(
  () => route.params.team,
  async (newTeamName, _) => {
    clubId.value = teamID[newTeamName];
    await fetchPosts();
  }
);
</script>

<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="flex flex-col gap-[50px] w-[990px]">
      <div class="cursor-pointer">
        <GoToCreate :text="'직관 크루 모집에 글 쓰러 가기'" />
      </div>
      <div class="grid grid-cols-3 gap-[30px]">
        <template v-if="searchResults.length">
          <CrewCard
            v-for="post in searchResults"
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
