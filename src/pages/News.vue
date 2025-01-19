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

// 샘플 영상 데이터 (퍼블리싱용 - 추후 API 가져와 구현)
const articles = [
  {
    id: 1,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
  {
    id: 2,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
  {
    id: 3,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
  {
    id: 4,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
  {
    id: 5,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
  {
    id: 6,
    title: "프로야구 LG 트윈스, 2025년 신년 인사회",
    preview:
      "부산시 기장군 일광읍에 KBO 야구센터를 조성 중인 한국야구위원회(KBO)는 야구박물관은 내년 연말까지 완공할 예정이라고 밝혔습니다. 또 야구 체험관은 올해 8월까지, 실내 훈련장과 유스호스텔도 2027년까지 순차적으로 지을 계획이라고 덧붙였습니다. KBO는 야구계 저변을 확대하고 훈련 장소를...",
    createAt: "2025. 01. 17. 오후 05:00",
  },
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
    class="relative overflow-x-auto scrollbar-hide w-full px-[30px] mt-[150px]"
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
  <div
    class="mt-[30px] mb-[30px] max-w-[calc(100%-60px)] flex flex-col gap-y-[30px]"
  >
    <div v-for="article of articles" :key="article.id">
      <h2 class="text-[20px] text-black01 font-bold mb-[10px]">
        {{ article.title }}
      </h2>
      <p class="text-4 text-black02 line-clamp-2 mb-[24px]">
        {{ article.preview }}
      </p>
      <p class="text-3 text-gray02 bottom-0 left-0">{{ article.createAt }}</p>
    </div>
  </div>
</template>
<style scoped></style>
