<script setup>
import { ref } from "vue";
import { Delta } from "@vueup/vue-quill";
import CreateHeader from "@/components/CreateHeader.vue";

const title = ref("");
const content = ref(new Delta()); // Delta 형식 기본값
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="w-[1090px] flex flex-col">
      <CreateHeader />
      <!-- 제목부분 -->
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="제목"
          class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center bg-white01"
        />
      </div>
      <!-- 에디터 부분 -->
      <div>
        <QuillEditor
          v-model:content="content"
          contentType="delta"
          placeholder="자유롭게 게시글을 작성해보세요."
          theme="snow"
          toolbar="full"
          @ready="onEditorReady"
        />
        <pre>{{ content }}</pre>
        <pre>{{ title }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
