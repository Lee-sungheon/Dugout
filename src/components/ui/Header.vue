<script setup>
import { RouterLink } from "vue-router";
import logoImg from "@/assets/images/logo.svg";
import searchIcon from "@/assets/icons/search.svg";
import themeToggleIcon from "@/assets/icons/theme_toggle.svg";
import headsetIcon from "@/assets/icons/audio_headset.svg";
</script>
<template>
  <header
    class="w-full h-[100px] px-[30px] py-[22px] flex items-center justify-between fixed z-10 bg-white01 border-b border-white02"
  >
    <!-- 왼쪽 영역(로고 / 네비게이션) -->
    <div class="flex items-center border border-green-500 gap-[50px]">
      <!-- 로고 -->
      <RouterLink to="/" class="cursor-pointer">
        <img :src="logoImg" alt="로고 이미지" />
      </RouterLink>
      <!-- 네비게이션 -->
      <nav class="text-2xl font-bold text-gray01 gap-[30px] flex">
        <RouterLink
          to="/news"
          class="hover:underline hover:text-black01 cursor-pointer"
          :class="{ 'underline text-black01': $route.path === '/news' }"
          >NEWS</RouterLink
        >
        <RouterLink
          to="/highlight"
          class="hover:underline hover:text-black01 cursor-pointer"
          :class="{ 'underline text-black01': $route.path === '/highlight' }"
          >HIGHLIGHT</RouterLink
        >
        <RouterLink
          to="/game"
          class="hover:underline hover:text-black01 cursor-pointer"
          :class="{ 'underline text-black01': $route.path === '/game' }"
          >GAME</RouterLink
        >
      </nav>
    </div>
    <!-- 가운데 영역(음악) -->
    <div>
      <div
        class="w-[44px] h-[35px] bg-white02 rounded-[10px] flex justify-center items-center"
      >
        <img :src="headsetIcon" alt="헤드셋 아이콘" class="w-[20px] h-[20px]" />
      </div>
    </div>

    <!-- 오른쪽 영역(검색 / 유저정보 / 테마) -->
    <div class="flex items-center border border-red-500 gap-[30px]">
      <!-- 검색 -->
      <div><img :src="searchIcon" alt="검색 아이콘" /></div>
      <!-- 유저정보 -->
      <RouterLink
        to="/myPage"
        class="flex items-center gap-[15px] cursor-pointer"
      >
        <img
          src="https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg"
          alt="유저 프로필"
          class="w-10 h-10 rounded-full"
        />
        <span class="font-bold text-gray03">닉네임</span>
      </RouterLink>
      <!-- 테마 -->
      <div
        class="border border-gray01 rounded-[10px] flex px-[10px] py-2 h-[35px] w-[135px] items-center justify-between"
      >
        <span class="text-gray02">히어로즈 테마</span>
        <img
          :src="themeToggleIcon"
          alt="테마 토클 아이콘"
          class="w-[18px] h-[10px]"
        />
      </div>
    </div>
  </header>
</template>
<style scoped></style>
