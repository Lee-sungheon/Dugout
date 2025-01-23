<script setup>
import { computed, onMounted, ref, watch } from "vue";
import deleteBtn from "../assets/icons/delete-btn.svg";

const teams = [
  { tag: "# LG 트윈스", searchTitle: ["LG", "트윈스", "앨지", "twins"] },
  { tag: "# KT 위즈", searchTitle: ["KT", "위즈", "케이티", "wiz"] },
  {
    tag: "# 삼성 라이온즈",
    searchTitle: ["삼성", "라이온즈", "samsung", "lions"],
  },
  { tag: "# KIA 타이거즈", searchTitle: ["KIA", "기아", "타이거즈", "tigers"] },
  {
    tag: "# 키움 히어로즈",
    searchTitle: ["키움", "히어로즈", "kiwoom", "heroes"],
  },
  { tag: "# 한화 이글스", searchTitle: ["한화", "이글스", "hanwha", "eagles"] },
  { tag: "# NC 다이노스", searchTitle: ["NC", "다이노스", "엔씨", "dinos"] },
  {
    tag: "# 롯데 자이언츠",
    searchTitle: ["롯데", "자이언츠", "lotte", "giants"],
  },
  { tag: "# SSG 랜더스", searchTitle: ["SSG", "랜더스", "landers"] },
  { tag: "# 두산 베어스", searchTitle: ["두산", "베어스", "doosan", "bears"] },
];

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_TVINGSPORTS_CHANNEL_ID;

const selectedTeam = ref([]);
const videos = ref([]);

const isSelected = (team) =>
  computed(() => selectedTeam.value.some((t) => t.tag === team.tag));

const selectTeam = (team) => {
  if (!selectedTeam.value.includes(team)) {
    selectedTeam.value.push(team);
    console.log("팀 추가됨:", team);
    console.log("📌 현재 선택된 팀 목록:", selectedTeam.value);
  }
};
const removeTeam = (team) => {
  selectedTeam.value = selectedTeam.value.filter((t) => t.tag !== team.tag);
  console.log("팀 제거됨:", team);
  console.log("📌 현재 선택된 팀 목록:", selectedTeam.value);
};

const getChannelProfile = async () => {
  const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`;
  try {
    const response = await fetch(channelUrl);

    if (!response.ok) {
      console.error(`📌 CHANNEL API 요청 실패: HTTP ${response.status}`);
      return "";
    }

    const data = await response.json();
    return data.items[0]?.snippet?.thumbnails?.default?.url || "";
  } catch (error) {
    console.error("📌 프로필 이미지 가져오기 실패", error);
    return "";
  }
};

const getVideoStatistics = async (videoId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`📌 비디오 조회수 요청 실패: HTTP ${response.status}`);
      return "0";
    }

    const data = await response.json();
    return data.items[0]?.statistics?.viewCount || "0";
  } catch (error) {
    console.error("📌 비디오 조회수 가져오기 실패:", error);
    return "0";
  }
};

const searchVideos = async (searchQuery) => {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    searchQuery
  )}&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=10&key=${API_KEY}`;
  //개발할 때만 할당량 때문에 maxResults 10으로 둠 (최대 50까지 가능)

  try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      console.error(`📌 API 요청 실패: HTTP ${response.status}`);
      return [];
    }

    const data = await response.json();
    console.log("검색 결과:", data);

    const videosData = await Promise.all(
      data.items.map(async (item) => {
        const videoId = item.id.videoId;
        const channelId = item.snippet.channelId;

        const [profileImage, viewCount] = await Promise.all([
          getChannelProfile(channelId), // 채널 프로필 이미지 가져오기
          getVideoStatistics(videoId), // 비디오 조회수 가져오기
        ]);

        return {
          id: videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.high.url ||
            item.snippet.thumbnails.medium.url ||
            item.snippet.thumbnails.default.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: item.snippet.publishedAt,
          profileImg: profileImage,
          viewCount: viewCount,
        };
      })
    );

    return videosData;
  } catch (error) {
    console.error("📌 검색 API 실패:", error);
    return [];
  }
};

const fetchFilteredVideos = async () => {
  const requiredKeywords = ["kbo", "하이라이트"];
  const excludeKeywords = ["프로농구", "kbl", "shorts"];
  const excludeQuery = excludeKeywords.map((word) => `-${word}`).join(" ");

  if (selectedTeam.value.length === 0) {
    const searchQuery = `"${requiredKeywords.join('" "')} " ${excludeQuery}`;
    let result = await searchVideos(searchQuery);

    videos.value = result.filter(
      (video) =>
        requiredKeywords.some((keyword) => video.title.includes(keyword)) &&
        !excludeKeywords.some((exclude) => video.title.includes(exclude))
    );
    return;
  }

  const filterKeywords = selectedTeam.value.flatMap((team) => team.searchTitle);
  const searchQuery = `"${filterKeywords.join(" | ")} ${requiredKeywords.join(
    " "
  )}" ${excludeQuery}`;

  let result = await searchVideos(searchQuery);
  videos.value = result.filter(
    (video) =>
      filterKeywords.some((keyword) => video.title.includes(keyword)) &&
      !excludeKeywords.some((exclude) => video.title.includes(exclude))
  );
};

watch(
  selectedTeam,
  (newVal, oldVal) => {
    console.log("📌 selectedTeam 변경됨");
    console.log("이전 값:", oldVal);
    console.log("현재 값:", newVal);
    fetchFilteredVideos();
  },
  { deep: true }
);

onMounted(() => {
  console.log("🚀 초기 selectedTeam 값:", selectedTeam.value);
  fetchFilteredVideos();
});
</script>
<template>
  <div class="w-full mx-[29px] pb-[30px] fixed bg-white01">
    <div class="mt-[150px] min-h-[39px] overflow-x-auto scrollbar-hide">
      <div
        class="flex items-center gap-x-[10px] w-max flex-nowrap ml-[30px] mr-[30px]"
      >
        <button
          v-for="team in teams"
          :key="team.tag"
          @click="selectTeam(team)"
          class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
          :class="{
            'bg-gray02 text-white01 gap-[10px]': isSelected(team).value,
            'bg-white02 text-black01': !isSelected(team).value,
          }"
        >
          <p>{{ team.tag }}</p>
          <img
            v-if="isSelected(team).value"
            @click.stop="removeTeam(team)"
            :src="deleteBtn"
            class="cursor-pointer"
          />
        </button>
      </div>
    </div>
  </div>
  <div class="flex-1 mx-[29px] mt-[219px] mb-[99.97px]">
    <div class="grid grid-cols-3 gap-x-[21px] gap-y-[50px] w-full">
      <div v-for="video in videos" :key="video.id" class="bg-white">
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
            <h3 class="font-bold text-4 text-black01 line-clamp-2">
              {{ video.title }}
            </h3>
            <h4 class="font-bold text-3 text-gray03">
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
