<script setup>
import HeadsetIcon from "@/assets/icons/audio_headset.svg";
import OffAutoPlayIcon from "@/assets/icons/audio_autoplay_off.svg";
import OnAutoPlayIcon from "@/assets/icons/audio_autoplay_on.svg";
import AudioPlayIcon from "@/assets/icons/audio_play.svg";
import AudioBackIcon from "@/assets/icons/audio_back.svg";
import AudioForwardIcon from "@/assets/icons/audio_forward.svg";
import AudioPauseIcon from "@/assets/icons/audio_pause.svg";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  selectedTeam: String,
  isSearchHovered: Boolean,
});

const player = ref(null);
const isPlaying = ref(false);
const isAutoPlaying = ref(true);
const teamChants = [
  { team: "LG 트윈스 응원가", videoId: "Qtu23VpTeOA" },
  { team: "두산 베어스 응원가", videoId: "lMhDirLYvVo" },
  { team: "키움 히어로즈 응원가", videoId: "OjoYnwcZMOI" },
  { team: "SSG 랜더스 응원가", videoId: "VBCa5NIHDWU" },
  { team: "NC 다이노스 응원가", videoId: "tHdoFtp6Ouc" },
  { team: "기아 타이거즈 응원가", videoId: "ZEPS5Bm3iqc" },
  { team: "한화 이글스 응원가", videoId: "wWXbTj5L2yc" },
  { team: "롯데 자이언츠 응원가", videoId: "HfqKC-G3dDA" },
  { team: "삼성 라이온즈 응원가", videoId: "sG3JxXb5EV0" },
  { team: "KT 위즈 응원가", videoId: "WDZzXQlfTK8" },
];

const currentIndex = ref(0);

//YouTube API를 동적으로 로드하는 함수
const loadYouTubeAPI = () => {
  if (!window.YT) {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  } else {
    createYouTubePlayer();
  }
};

// Youtube 플레이어 생성 함수
const createYouTubePlayer = () => {
  if (!window.YT || !window.YT.Player) return;

  player.value = new YT.Player("youtube-player", {
    videoId: teamChants[currentIndex.value]?.videoId, // 초기 응원가
    playerVars: {
      autoplay: 0, // 자동 재생 x
      controls: 0, // 컨트롤 바 숨김
      modestbranding: 1, //유투브 로고 숨김
      mute: 0, // 음소거 x
    },
    events: {
      onReady: (event) => {
        player.value = event.target;
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          isPlaying.value = true; // 유튜브가 실제로 재생될 때 isPlaying을 true로 설정
        }

        if (event.data === YT.PlayerState.PAUSED) {
          isPlaying.value = false; // 사용자가 명확하게 Pause 했을 때만 false로 변경
        }

        if (event.data === YT.PlayerState.ENDED && isAutoPlaying.value) {
          playForward(); // 자동재생이 활성화된 경우에만 자동으로 다음 곡으로 이동
        }
      },
    },
  });
};

//새 비디오 로드
const loadNewVideo = () => {
  if (player.value) {
    const wasPlaying = isPlaying.value; // 현재 재생 상태 저장
    player.value.stopVideo(); //기존 곡 재생 중지
    player.value.loadVideoById(teamChants[currentIndex.value]?.videoId);

    if (wasPlaying) {
      setTimeout(() => {
        player.value.playVideo();
      }, 100);
    } else {
      setTimeout(() => {
        player.value.pauseVideo(); // 자동 재생 방지
      }, 100);
    }
  }
};

// 다음 곡 재생
const playForward = () => {
  if (currentIndex.value < teamChants.length - 1) {
    currentIndex.value++; // 다음 곡 인덱스 증가
  } else {
    currentIndex.value = 0; // 마지막 곡이면 첫 번째 곡으로 돌아가기
  }
  loadNewVideo();
};

// 이전 곡 재생
const playBack = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--; // 이전 곡 인덱스 감소
  } else {
    currentIndex.value = teamChants.length - 1; // 첫 번째 곡이면 마지막 곡으로 가기
  }
  loadNewVideo();
};

//플레이 이벤트 함수
const togglePlay = () => {
  if (player.value) {
    if (isPlaying.value) {
      player.value.pauseVideo();
    } else {
      setTimeout(() => {
        player.value.playVideo();
      }, 500);
    }
  }
};

//자동재생 이벤트 함수
const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value;
};

onMounted(() => {
  if (window.YT && window.YT.Player) {
    createYouTubePlayer();
  } else {
    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = createYouTubePlayer;
  }
});

watch(
  () => props.selectedTeam,
  (newTeam) => {
    const index = teamChants.findIndex((value) => value.team.includes(newTeam));
    currentIndex.value = Math.max(0, index);

    loadNewVideo();
  },
  { immediate: true }
);
</script>
<template>
  <div
    v-if="isSearchHovered"
    class="w-auto h-[35px] bg-white02 rounded-[10px] flex justify-center items-center py-[7.5px] px-[12px]"
  >
    <img :src="HeadsetIcon" alt="헤드셋" class="w-[20px] h-[20px]" />
  </div>
  <div
    v-else
    class="w-[314.5px] h-[35px] bg-white02 rounded-[10px] flex justify-between items-center"
  >
    <div class="flex gap-[19.52px] ml-[13.77px]">
      <div class="flex gap-[12.63px]">
        <button @click="playBack">
          <img
            :src="AudioBackIcon"
            alt="이전 곡 재생 아이콘"
            class="w-[20px] h-[20px]"
          />
        </button>
        <button v-if="!isPlaying" @click="togglePlay">
          <img
            :src="AudioPlayIcon"
            alt="플레이 아이콘"
            class="w-[20px] h-[20px]"
          />
        </button>
        <button v-else @click="togglePlay">
          <img
            :src="AudioPauseIcon"
            alt="재생 멈춤 아이콘"
            class="w-[20px] h-[20px]"
          />
        </button>
        <button @click="playForward">
          <img
            :src="AudioForwardIcon"
            alt="다음곡 재생 아이콘"
            class="w-[20px] h-[20px]"
          />
        </button>
      </div>
      <span class="text-[14px] text-gray03 text-semibold">{{
        teamChants[currentIndex].team
      }}</span>
    </div>
    <button @click="toggleAutoPlay" class="mr-[14.26px]">
      <img
        :src="isAutoPlaying ? OffAutoPlayIcon : OnAutoPlayIcon"
        alt="자동재생 아이콘"
        class="w-[20px] h-[20px]"
      />
    </button>
    <!--  YouTube iframe (숨김 처리) -->
    <div id="youtube-player" class="hidden"></div>
  </div>
</template>
<style scoped></style>
