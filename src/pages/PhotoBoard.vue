<script setup>
import { getViewingCertificationPostsByClub } from "@/api/supabase-api/viewingCertificationPost";
import PhotoboardCard from "@/components/photoboard/PhotoboardCard.vue";
import { teamID } from "@/constants";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import GoToCreate from "@/components/common/GoToCreate.vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const route = useRoute();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]);

const photoboardList = ref([]);

const saveScrollPosition = () => {
  sessionStorage.setItem("photoboard-scroll", window.scrollY.toString());
};

const restoreScrollPosition = () => {
  const savedScroll = sessionStorage.getItem("photoboard-scroll");
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll, 10) || 0);
  }
};

const fetchPhotoboardList = async () => {
  try {
    const data = await getViewingCertificationPostsByClub(clubId.value);
    photoboardList.value = data || [];

    setTimeout(() => {
      restoreScrollPosition();
    }, 0);
  } catch (error) {
    console.error("직관인증포토 포스트를 불러오지 못했습니다");
  }
};

onMounted(() => {
  fetchPhotoboardList();
  window.addEventListener("scroll", saveScrollPosition);
});

onUnmounted(() => {
  saveScrollPosition();
  window.removeEventListener("scroll", saveScrollPosition);
});

watch(
  () => route.params.team,
  async (newTeamName) => {
    teamName.value = newTeamName;
    clubId.value = teamID[newTeamName];

    await nextTick();
    fetchPhotoboardList();
  },
  { immediate: true }
);

watchEffect(() => {
  searchStore.setPosts(photoboardList.value);
});

const searchResults = computed(() => searchStore.filteredPosts);
</script>
<template>
  <div class="flex gap-[30px] flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[50px] flex flex-col">
      <!-- 글쓰기 버튼 -->
      <GoToCreate :text="'직관 인증 포토 올리러 가기'" />
      <!-- 목록 -->
      <div class="w-full h-auto mb-[100px]">
        <div v-if="photoboardList" class="grid grid-cols-3 gap-[30px] w-full">
          <PhotoboardCard
            v-for="post in searchResults"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
