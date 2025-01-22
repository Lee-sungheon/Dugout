<script setup>
import { ref } from "vue";
import { Delta } from "@vueup/vue-quill";
import CreateHeader from "@/components/CreateHeader.vue";
import { QuillEditor } from "@vueup/vue-quill";
import SearchIcon from "@/assets/icons/search.svg";
import Camera from "@/assets/icons/camera.svg";
import Baseball from "@/assets/icons/baseball.svg";

const content = ref(new Delta()); // Delta 형식 기본값

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
  <div class="flex flex-col px-[50px] gap-[50px]">
    <CreateHeader />
    <!-- 제목부분 -->
    <div>
      <input
        type="text"
        placeholder="제목"
        class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center"
      />
    </div>
    <div class="flex flex-col gap-[30px] mb-[142px]">
      <div class="relative w-full">
        <input
          type="text"
          placeholder="맛집을 검색하세요"
          class="w-full h-[62px] bg-white border border-white02 rounded-[10px] px-5 py-5 text-[18px] text-black01 placeholder-[18px] placeholder-gray02 focus:outline-none"
        />
        <button class="absolute right-5 top-1/2 transform -translate-y-1/2">
          <img :src="SearchIcon" class="w-6 h-6" alt="검색" />
        </button>
      </div>

      <!-- 에디터 부분 -->
      <div>
        <QuillEditor
          v-model:content="content"
          contentType="delta"
          :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
          theme="snow"
          toolbar="full"
          @ready="onEditorReady"
          class="w-full text-center placeholder:text-center"
        />
      </div>
      <div class="flex gap-[30px]">
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
      </div>
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
                :src="deleteBtn"
                class="cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.ql-editor::before) {
  text-align: center;
  width: 100%;
  display: block;
  color: #b1b1b1;
  font-size: 18px;
  white-space: pre-wrap !important;
}
::v-deep(.ql-editor) {
  text-align: center;
  color: #0a0a0a;
  font-size: 18px;
  white-space: normal;
}
</style>
