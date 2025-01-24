<script setup>
import { ref } from "vue";
import Baseball from "@/assets/icons/baseball.svg";
import DeleteBtn from "@/assets/icons/delete-btn.svg";

const selectedTag = ref([]);

const foodBoardTag = [
  "# 야구장 내부 맛집",
  "# 야구장 주변 맛집",
  "# 야구 볼 수 있는 식당",
];

// 태그 선택 및 제거
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
  <div class="flex flex-col gap-[20px]">
    <div class="flex gap-[10px] items-center">
      <img :src="Baseball" class="w-[18px] h-[18px]" />
      <p class="text-[14px] text-gray03">태그를 1개 이상 선택해주세요</p>
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
            :src="DeleteBtn"
            class="cursor-pointer"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
