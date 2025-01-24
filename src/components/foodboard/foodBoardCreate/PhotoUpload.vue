<script setup>
import { ref } from "vue";
import Camera from "@/assets/icons/camera.svg";
// const input = ref(new Delta());
</script>
<template>
  <div class="flex gap-[30px]">
    <button
      v-for="photoupload in 3"
      class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
    >
      <img :src="Camera" />
    </button>
  </div>
</template>
<style scoped></style>
