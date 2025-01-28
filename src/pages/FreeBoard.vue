<script setup>
import { getFreePostsByClub } from "@/api/supabase-api/freePost";
import GoToCreate from "@/components/common/GoToCreate.vue";
import FreeBoardPost from "@/components/freeboard/FreeBoardPost.vue";
import { teamID } from "@/constants";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const teamName = ref(route.params.team); // url 팀 이름 불러오기
const clubId = ref(teamID[teamName.value]); // 팀 id 가져오기

const freeboardList = ref([]);

// 자유 게시판 목록 가져오는 함수
const fetchFreeboard = async () => {
  try {
    const data = await getFreePostsByClub(clubId.value);
    freeboardList.value = data || [];
  } catch (error) {
    console.error("데이터를 불러오는 동안 에러가 발생하였습니다.");
  }
};

onMounted(() => {
  fetchFreeboard();
});

// route.params.team이 변경될 때마다 반응
watch(
  () => route.params.team,
  (newTeamName, _) => {
    // 업데이트
    teamName.value = newTeamName;
    clubId.value = teamID[teamName.value];
    fetchFreeboard();
  }
);
</script>
<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[50px] flex flex-col">
      <!-- 글쓰기 버튼 -->
      <GoToCreate :text="'자유 게시판에 글 쓰러 가기'" />

      <!-- 목록 -->
      <div class="flex flex-col w-full h-full gap-[20px] items-center">
        <template v-if="freeboardList.length > 0">
          <FreeBoardPost
            v-for="(post, index) in freeboardList"
            :key="index"
            :post="post"
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
