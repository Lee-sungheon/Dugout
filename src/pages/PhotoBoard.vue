<script setup>
import { supabase } from "@/supabase";
import { getViewingCertificationPostsByClub } from "@/api/supabase-api/viewingCertificationPost";
import PhotoboardCard from "@/components/photoboard/PhotoboardCard.vue";
import { teamID } from "@/constants";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import GoToCreate from "@/components/common/GoToCreate.vue";

const route = useRoute();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]);

const photoboardList = ref([]);

const fetchPhotoboardList = async () => {
  try {
    const data = await getViewingCertificationPostsByClub(clubId.value);
    console.log(" photoboardList 데이터 확인:", data);

    photoboardList.value = data || [];
  } catch (error) {
    console.error("직관인증포토 포스트를 불러오지 못했습니다");
  }
};

onMounted(() => {
  fetchPhotoboardList();
});

watch(
  () => route.params.team,
  (newTeamName, _) => {
    teamName.value = newTeamName;

    clubId.value = teamID[teamName.value];
    fetchPhotoboardList();
  }
);
</script>
<template>
  <div class="flex gap-[30px] flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[50px] flex flex-col">
      <!-- 글쓰기 버튼 -->
      <GoToCreate :text="'직관 인증 포토 올리러 가기'" />
      <!-- 목록 -->
      <div class="w-full h-auto mb-[100px]">
        <div class="grid grid-cols-3 gap-[30px] w-full">
          <PhotoboardCard
            v-for="post in photoboardList"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
