<script setup>
import { onMounted, ref, watch } from "vue";
import deleteBtn from "../assets/icons/delete-btn.svg";
import axios from "axios";

// Day.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { teamsTags } from "@/constants";
dayjs.extend(utc);
dayjs.extend(timezone);

const newsData = ref([]);
let queryKeyword = ref("야구");

// HTML 태그 삭제 함수
const stripHtml = (html) => {
  const noTags = html.replace(/<[^>]*>?/gm, "");
  const noEntities = noTags.replace(/&[^;]+;/gm, "");
  return noEntities;
};

// 뉴스 페이지로 이동하는 함수
const goToOriginNew = (link) => {
  window.open(link, "_blank"); // 새탭으로 이동
};
// 네이버 뉴스 api 가져오기
const getNewsData = async (keyword) => {
  try {
    // 데이터 불러오기
    const { data, status } = await axios.get("/v1/search/news.json", {
      params: {
        query: keyword, // 검색어
        display: 50, // 출력 개수
        // start: 1, // 시작 위치
        // sort: "sim", // 정렬 기준 (sim: 유사도, date: 날짜)
      },
      headers: {
        "Content-Type": "application.json",
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
      },
    });
    console.log(data, status);
    if (status === 200) {
      newsData.value = data.items;
    }
  } catch (error) {}
};

onMounted(() => {
  getNewsData(queryKeyword.value);
});

const selectedTeam = ref([]);
const selectTeam = (team) => {
  if (!selectedTeam.value.includes(team)) {
    console.log(team.replace("#", "").split(" ").join(""));
    selectedTeam.value.push(team);
    console.log("선택팀", selectedTeam.value);
  }
};
const removeTeam = (team) => {
  selectedTeam.value = selectedTeam.value.filter((t) => t !== team);
};
// watch 사용 시 깊은 감시자로 설정
watch(
  selectedTeam,
  () => {
    // 만약 필터가 없으면 default 야구 키워드로 검색
    if (selectedTeam.value.length === 0) {
      getNewsData(queryKeyword.value);
    } else {
      getNewsData(
        selectedTeam.value
          .map((item) => item.replace("#", "").split(" ").join(""))
          .join(" ")
      );
    }
  },
  {
    deep: true, // 깊은 감시자 설정
  }
);
</script>
<template>
  <div class="w-full bg-white01 pb-[30px]">
    <!-- 태그부분 -->
    <div
      class="fixed mt-[100px] w-full bg-white01 px-[30px] pt-[50px] pb-[30px]"
    >
      <div class="min-h-[39px] overflow-x-auto scrollbar-hide flex">
        <div class="flex items-center gap-[10px] flex-nowrap">
          <button
            v-for="(team, index) of teamsTags"
            :key="index"
            @click="selectTeam(team)"
            class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
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
    </div>
    <!-- 뉴스 렌더링 부분 -->
    <div class="flex flex-col gap-y-[30px] px-[30px] pt-[219px]">
      <div
        v-for="news of newsData"
        :key="news.link"
        title="뉴스 바로가기"
        class="cursor-pointer"
        @click="goToOriginNew(news.originallink)"
      >
        <h2 class="text-[20px] text-black01 font-bold mb-[10px]">
          {{ stripHtml(news.title) }}
        </h2>
        <p class="text-4 text-black02 line-clamp-2 mb-[24px]">
          {{ stripHtml(news.description) }}
        </p>
        <p class="bottom-0 left-0 text-3 text-gray02">
          {{
            dayjs(news.pubDate).tz("Asia/Seoul").format("YYYY. MM.DD. A hh:mm")
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
