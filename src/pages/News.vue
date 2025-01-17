<script setup>
import { ref } from "vue";
import deleteBtn from "../assets/icons/delete-btn.svg";

const teams = [
  "# LG 트윈스",
  "# KT 위즈",
  "# 삼성 라이온즈",
  "# KIA 타이거즈",
  "# 키움 히어로즈",
  "# 한화 이글스",
  "# NC 다이노스",
  "# 롯데 자이언츠",
  "# SSG 랜더스",
  "# 두산 베어스",
];

const selectedTeam = ref([]);
const selectTeam = (team) => {
  if (!selectedTeam.value.includes(team)) {
    selectedTeam.value.push(team);
  }
};
const removeTeam = (team) => {
  selectedTeam.value = selectedTeam.value.filter((t) => t !== team);
};
</script>
<template>
  <div
    class="relative overflow-x-auto scrollbar-hide w-full px-[30px] mt-[50px]"
  >
    <div class="flex items-center gap-[10px] w-max">
      <button
        v-for="(team, index) of teams"
        :key="index"
        @click="selectTeam(team)"
        class="inline-flex items-center h-[39px] px-[15px] bg-white02 rounded-[10px] whitespace-nowrap"
        :class="{
          'bg-gray02 text-white01 gap-[10px]': selectedTeam.includes(team),
          'bg-white02 text-black01': !selectedTeam.includes(team),
        }"
      >
        <p>{{ team }}</p>
        <img
          v-if="selectedTeam.includes(team)"
          @click.stop="removeTeam(team)"
          :src="deleteBtn"
          class="cursor-pointer"
        />
      </button>
    </div>
  </div>
  <div class="mt-[30px] ml-[30px] w-[calc(100%-60px)] max-w-[1220px] mx-auto">
    <h2 class="text-[20px] text-black01 font-bold mb-[10px]">기사 제목</h2>
    <p class="text-4 text-black02 line-clamp-2">
      부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는
      "야구박물관은 내년 연말까지 완공할 예정"이라고 밝혔습니다. 또 야구
      체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로
      지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...
    </p>
    <p class="text-3 text-gray02 bottom-0 left-0">2025. 01. 17. 오후 05:00</p>
  </div>
</template>
<style scoped></style>
