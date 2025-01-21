<script setup>
import CrewCard from "@/components/crewboard/CrewCard.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";
</script>
<template>
  <div
    class="flex border border-red-500 gap-[30px] flex-col px-[50px] py-[30px]"
  >
    <!-- 글쓰기 버튼 -->
    <div class="cursor-pointer">
      <RouterLink
        to="/team/crewboard/create"
        class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
      >
        직관 크루 모집에 글 쓰러 가기
        <img :src="PostArrow" class="w-[14px] h-[8px]" />
      </RouterLink>
    </div>

    <!-- 크루 모집 게시물 리스트 -->
    <div class="flex gap-[30px] border border-red-500 flex-wrap justify-center">
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
      <CrewCard />
    </div>
  </div>
</template>

<style scoped></style>
