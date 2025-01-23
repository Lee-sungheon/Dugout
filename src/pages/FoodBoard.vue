<script setup>
import { ref } from "vue";
import deleteBtn from "../assets/icons/delete-btn.svg";
import FoodBoardCard from "@/components/foodboard/FoodBoardCard.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";

const foodBoardTag = [
  "# 야구장 내부 맛집",
  "# 야구장 주변 맛집",
  "# 야구 볼 수 있는 식당",
];



const selectedTag = ref([]);
const selectTag = (tag) => {
  if (!selectedTag.value.includes(tag)) {
    selectedTag.value.push(tag);
  }
};
const removeTag = (tag) => {
  selectedTag.value = selectedTag.value.filter((t) => t !== tag);
};
</script>
<template>
  <div
    class="flex border border-red-500 gap-[30px] flex-col px-[50px] py-[30px]"
  >
    <!-- 글쓰기 버튼 -->
    <div class="cursor-pointer">
      <RouterLink
        :to="`/${$route.params.team}/foodboard/create`"
        class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
      >
        직관 맛집 공유하기
        <img :src="PostArrow" class="w-[14px] h-[8px]" />
      </RouterLink>
    </div>
    <div class="min-h-[39px] overflow-x-auto scrollbar-hide">
      <div class="flex items-center gap-x-[10px] w-max flex-nowrap">
        <button
          v-for="(tag, index) of foodBoardTag"
          :key="index"
          @click="selectTag(tag)"
          class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
          :class="{
            'bg-gray02 text-white01 gap-[10px]': selectedTag.includes(tag),
            'bg-white02 text-black01': !selectedTag.includes(tag),
          }"
        >
          <p>{{ tag }}</p>
          <img
            v-if="selectedTag.includes(tag)"
            @click.stop="removeTag(tag)"
            :src="deleteBtn"
            class="cursor-pointer"
          />
        </button>
      </div>
    </div>
    <section>
      <FoodBoardCard />
    </section>
  </div>
</template>
<style scoped></style>
