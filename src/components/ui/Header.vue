<script setup>
import headsetIcon from "@/assets/icons/audio_headset.svg";
import searchIcon from "@/assets/icons/search.svg";
import themeToggleIcon from "@/assets/icons/theme_toggle.svg";
import logoImg from "@/assets/images/logo.svg";
import { useTeamStore } from "@/stores/teamStore";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import EmblemAnimation from "./EmblemAnimation.vue";

const teamStore = useTeamStore();

const teams = [
  "히어로즈",
  "타이거즈",
  "베어스",
  "트윈스",
  "자이언츠",
  "이글스",
  "라이온즈",
  "다이노스",
  "위즈",
  "랜더스",
];

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  localStorage.setItem("dropdownState", isDropdownOpen.value.toString());
};
</script>

<template>
  <EmblemAnimation v-if="teamStore.isEmblemEffectOn" />
  <header
    class="w-full h-[100px] flex items-center justify-center fixed z-40 border-b border-white02 bg-white01"
  >
    <div class="flex px-[30px] py-[22px] w-full justify-between items-center">
      <!-- 왼쪽 영역(로고 / 네비게이션) -->
      <div class="flex items-center gap-[50px]">
        <!-- 로고 -->
        <RouterLink to="/" class="cursor-pointer">
          <img :src="logoImg" alt="로고 이미지" />
        </RouterLink>
        <!-- 네비게이션 -->
        <nav class="text-2xl font-bold text-gray01 gap-[30px] flex">
          <RouterLink
            to="/news"
            class="cursor-pointer hover:underline hover:text-black01"
            :class="{ 'underline text-black01': $route.path === '/news' }"
            >NEWS</RouterLink
          >
          <RouterLink
            to="/highlight"
            class="cursor-pointer hover:underline hover:text-black01"
            :class="{ 'underline text-black01': $route.path === '/highlight' }"
            >HIGHLIGHT</RouterLink
          >
          <RouterLink
            to="/game"
            class="cursor-pointer hover:underline hover:text-black01"
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
          <img
            :src="headsetIcon"
            alt="헤드셋 아이콘"
            class="w-[20px] h-[20px]"
          />
        </div>
      </div>

      <!-- 오른쪽 영역(검색 / 유저정보 / 테마) -->
      <div class="flex items-center gap-[30px]">
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
          class="relative flex items-center border border-gray01 rounded-[10px] px-[10px] py-2 h-[35px] w-[135px] cursor-pointer"
          @click="toggleDropdown"
        >
          <span class="text-gray02 truncate w-full"
            >{{ teamStore.selectedTeam }} 테마</span
          >
          <img
            :src="themeToggleIcon"
            alt="테마 토글 아이콘"
            class="w-[18px] h-[10px] absolute right-2"
          />
          <!-- 드롭다운 -->
          <ul
            v-if="isDropdownOpen"
            @click.stop="toggleDropdown"
            class="absolute top-[40px] left-0 w-full bg-white rounded-[10px] border border-gray01 shadow-lg z-50"
          >
            <li
              v-for="team in teams"
              :key="team"
              class="px-4 py-2 text-sm text-gray03 hover:bg-gray01 hover:text-white cursor-pointer"
              @click.stop="
                teamStore.selectTeam(team);
                toggleDropdown();
              "
            >
              {{ team }} 테마
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

span {
  white-space: nowrap; /* 텍스트가 넘치지 않도록 */
  overflow: hidden; /* 넘치는 부분 숨기기 */
  text-overflow: ellipsis; /* 넘치는 부분 "..."으로 표시 */
}

.right-2 {
  right: 10px;
}
</style>
