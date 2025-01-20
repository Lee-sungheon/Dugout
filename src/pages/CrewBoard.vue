<script setup>
import CrewCard from "@/components/crewboard/CrewCard.vue";
</script>
<template>
  <div class="flex border border-red-500 gap-[30px] flex-col">
    <!-- 글쓰기 버튼 -->
    <div class="border border-blue-500">
      <button class="w-full font-medium bg-white02 py-[10px] rounded-[10px]">
        직관 크루 모집에 글 쓰러 가기 >
      </button>
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
