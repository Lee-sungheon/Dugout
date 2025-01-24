<script setup>
import CrewCard from "@/components/crewboard/CrewCard.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";
import { getCrewRecruitmentPostsByClub } from "@/api/supabase-api/crewRecruitmentPost";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const teamName = ref(route.params.team);
const posts = ref([]);

// 특정 게시물 데이터 가져오기
const fetchPosts = async () => {
  const clubId = "1";
  const data = await getCrewRecruitmentPostsByClub(clubId);

  if (data) {
    posts.value = data || {};
  } else {
    alert("특정 게시물 데이터 가져오기 실패!");
  }
  console.log(posts.value);
};

onMounted(() => {
  fetchPosts();
});
</script>
<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="flex flex-col gap-[50px] w-[990px]">
      <!-- 글쓰기 버튼 -->
      <div class="cursor-pointer">
        <RouterLink
          :to="`/${teamName}/crewboard/create`"
          class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
        >
          직관 크루 모집에 글 쓰러 가기
          <img :src="PostArrow" class="w-[14px] h-[8px]" />
        </RouterLink>
      </div>

      <!-- 크루 모집 게시물 리스트 -->
      <div class="grid grid-cols-3 gap-[30px]">
        <CrewCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
