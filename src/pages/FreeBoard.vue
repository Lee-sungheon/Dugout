<script setup>
import FreeBoardPost from "@/components/freeboard/FreeBoardPost.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getFreePostsByClub } from "@/api/supabase-api/freePost";

const route = useRoute();
const teamName = ref(route.params.team);

const freeboardList = ref([]);

// 자유 게시판 목록 가져오는 함수
const fetchFreeboard = async () => {
  try {
    const data = await getFreePostsByClub(1);
    console.log(data);
    freeboardList.value = data;
  } catch (error) {
    console.error("데이터를 불러오는 동안 에러가 발생하였습니다.");
  }
};

onMounted(() => {
  fetchFreeboard();
});
</script>
<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[50px] flex flex-col">
      <!-- 글쓰기 버튼 -->
      <div>
        <RouterLink
          class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
          :to="`/${teamName}/freeboard/create`"
        >
          자유 게시판에 글 쓰러 가기
          <img :src="PostArrow" class="w-[14px] h-[8px]" />
        </RouterLink>
      </div>

      <!-- 목록 -->
      <div class="flex flex-col w-full h-full gap-[20px]">
        <FreeBoardPost
          v-for="(post, index) in freeboardList"
          :key="index"
          :post="post"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
