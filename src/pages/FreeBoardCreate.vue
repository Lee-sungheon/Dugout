<script setup>
import { ref, watch } from "vue";
import { Delta } from "@vueup/vue-quill";

const content = ref(new Delta()); // Delta 형식 기본값
</script>
<template>
  <!-- 제목부분 -->
  <div>
    <input
      type="text"
      placeholder="제목"
      class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center"
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
  </div>
</template>

<style coped></style>
