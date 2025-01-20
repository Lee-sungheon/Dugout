<script setup>
import Footer from "@/components/ui/Footer.vue";
import Header from "@/components/ui/Header.vue";
import { RouterView } from "vue-router";
</script>
<template>
  <div class="flex flex-col items-center justify-start w-full min-h-screen">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>
<style scoped></style>
