<script setup>
import EmblemAnimation from "@/components/ui/EmblemAnimation.vue";
import EnteringComunityAnimation from "@/components/ui/EnteringComunityAnimation.vue";
import Footer from "@/components/ui/Footer.vue";
import Header from "@/components/ui/Header.vue";
import { useTeamStore } from "@/stores/teamStore"; // Pinia 스토어 가져오기

const teamStore = useTeamStore();
</script>

<template>
  <div class="flex flex-col items-center justify-start w-full min-h-screen">
    <Header />
    <RouterView />
    <Footer />
    <!-- 엠블럼 애니메이션 -->
    <EmblemAnimation v-if="teamStore.isEmblemEffectOn" />
    <!-- 커뮤니티 애니메이션 -->
    <EnteringComunityAnimation v-if="teamStore.isEnterAnimationOn" />
  </div>
</template>
