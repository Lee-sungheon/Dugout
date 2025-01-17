<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div
    class="flex flex-col items-center justify-start w-full h-screen min-h-screen"
  >
    <Header />
    <Sidebar />
    <!-- 남은 부분 들어갈 컨텐츠 -->
    <div class="mt-[100px] ml-[190px] flex-grow w-[calc(100%-190px)]">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<style scoped></style>
