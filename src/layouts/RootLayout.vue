<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div
    class="flex flex-col items-center justify-start w-full min-h-screen border-2 border-blue-500"
  >
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>
<style scoped></style>
