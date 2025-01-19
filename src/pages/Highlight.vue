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

// 샘플 영상 데이터 (퍼블리싱용 - 추후 youtube API 가져와 구현)
const sampleVideos = ref([
  {
    id: "abc123",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
  {
    id: "abc1234",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
  {
    id: "abc12345",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
  {
    id: "abc123456",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
  {
    id: "abc1234567",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
  {
    id: "abc12345678",
    title:
      "[삼성 vs KIA] 10/28 한국시리즈 5차전 I 2024 신한 SOL뱅크 KBO 포스트시즌 I 하이라이트 I TVING",
    thumbnail:
      "https://cdn.pixabay.com/photo/2017/05/22/07/24/baseball-2333353_1280.jpg",
    publishedAt: "2025-01-17",
    channelTitle: "TVING SPORTS",
    profileImg:
      "https://yt3.googleusercontent.com/o-lu5v2BlCbPxbHLpbnO_PGedFB3RjU63t02B7eHlU6AgRqoZssrnVhKIbnCQEsSkrC1yCIg2kc=s900-c-k-c0x00ffffff-no-rj",
    viewCount: 123,
  },
]);
</script>
<template>
  <div
    class="mx-[30px] mt-[50px] min-h-[39px] w-full overflow-x-auto scrollbar-hide"
  >
    <div
      class="flex items-center gap-x-[10px] w-max flex-nowrap ml-[30px] mr-[30px]"
    >
      <button
        v-for="(team, index) of teams"
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
  <div class="mx-[29px] mt-[30px] mb-[99.97px] overflow-y-auto scrollbar-hide">
    <div class="grid grid-cols-3 gap-x-[21px] gap-y-[50px] w-full">
      <div v-for="video in sampleVideos" :key="video.id" class="bg-white">
        <a
          :href="'https://www.youtube.com/watch?v=' + video.id"
          target="_blank"
        >
          <img
            :src="video.thumbnail"
            class="w-full h-[218.52px] object-cover rounded-[8px]"
          />
        </a>
        <div class="flex items-start mt-[10px] gap-[10px]">
          <img :src="video.profileImg" class="w-[35px] h-[35px] object-cover" />
          <div class="gap-y-[5px]">
            <h3 class="text-4 font-bold text-black01 line-clamp-2">
              {{ video.title }}
            </h3>
            <h4 class="text-3 font-bold text-gray03">
              {{ video.channelTitle }}
            </h4>
            <p class="text-3 text-gray03">
              조회수: {{ Number(video.viewCount).toLocaleString() }}회 |
              {{ new Date(video.publishedAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
