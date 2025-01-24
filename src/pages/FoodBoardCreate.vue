<script setup>
import { ref } from "vue";
import { Delta } from "@vueup/vue-quill";
import { QuillEditor } from "@vueup/vue-quill";
import Camera from "@/assets/icons/camera.svg";
import Baseball from "@/assets/icons/baseball.svg";
import DeleteBtn from "@/assets/icons/delete-btn.svg";
import CreateHeader from "@/components/CreateHeader.vue";
import MapSelectAndView from "@/components/foodboard/foodBoardCreate/MapSelectAndView.vue";
// 최종 저장
const title = ref("");
const content = ref(new Delta());
const selectedTag = ref([]);
// 미리 정의된 태그
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

// 에디터 준비 이벤트
const onEditorReady = () => {
  console.log("Quill Editor 준비 완료");
};
</script>

<template>
  <div class="flex flex-col px-[50px] gap-[50px]">
    <CreateHeader />
    <!-- 제목부분 -->
    <div>
      <input
        v-model="title"
        type="text"
        placeholder="제목"
        class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center"
      />
    </div>
    <section
      id="post_content--input"
      class="flex flex-col gap-[30px] mb-[142px] w-full"
    >
      <MapSelectAndView />
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
          v-for="작명 in 3"
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
                :src="DeleteBtn"
                class="cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
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
