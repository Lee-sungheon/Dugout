<script setup>
import headsetIcon from "@/assets/icons/audio_headset.svg";
import OffAutoPlayIcon from "@/assets/icons/audio_autoplay_off.svg";
import OnAutoPlayIcon from "@/assets/icons/audio_autoplay_on.svg";
import AudioPlayIcon from "@/assets/icons/audio_play.svg";
import AudioBackIcon from "@/assets/icons/audio_back.svg";
import AudioForwardIcon from "@/assets/icons/audio_forward.svg";
import AudioPauseIcon from "@/assets/icons/audio_pause.svg";
import { onMounted, ref } from "vue";
const player = ref(null);
const isPlaying = ref(true);
const isAutoPlaying = ref(true);
const currentIndex = ref(0);

const teamChants = [
  { team: "LG 트윈스 응원가", videoId: "k6N2w6P7JXE" },
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

// 📌 YouTube API를 동적으로 로드하는 함수
const loadYouTubeAPI = () => {
  console.log("🔹 loadYouTubeAPI() 실행됨");

  if (!window.YT) {
    console.log("⏳ YouTube API를 동적으로 추가 중...");
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onload = () => {
      console.log("✅ YouTube API 스크립트 로드 완료");
    };
    document.head.appendChild(script);
  } else {
    console.log("✅ YouTube API가 이미 로드됨");
  }

  // API가 로드된 후 실행될 함수 등록
  window.onYouTubeIframeAPIReady = () => {
    console.log("🎉 YouTube API 준비 완료!");
    createYouTubePlayer();
  };
};

const createYouTubePlayer = () => {
  console.log("🔹 createYouTubePlayer() 실행됨");
  if (!window.YT || !window.YT.Player) {
    console.error("❌ YouTube API가 아직 로드되지 않음.");
    return;
  }

  if (player.value && typeof player.value.playVideo === "function") {
    console.log("✅ 기존 YouTube Player가 존재함", player.value);
    return;
  }

  console.log("🛠 YouTube Player 새로 생성 중...");
  player.value = new YT.Player("youtube-player", {
    videoId: teamChants[currentIndex.value].videoId, // 초기 응원가
    playerVars: {
      autoplay: 0, // 자동 재생 x
      loop: 0, // 반복 X
      controls: 0, // 컨트롤 바 숨김
      modestbranding: 1,
      mute: 0, // 음소거 x
    },
    events: {
      onReady: (event) => {
        player.value = event.target;
        console.log("YouTube Player is ready.");
        console.log("🎬 YouTube Player가 준비됨", player.value);

        if (typeof player.value.playVideo === "function") {
          console.log(
            "✅ `player.value`가 정상적으로 YT.Player 인스턴스로 설정됨"
          );
        } else {
          console.error("❌ `player.value` 내부에 playVideo() 메서드가 없음.");
        }
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          playForward(); // 노래가 끝나면 자동으로 다음 곡 재생
        }
      },
    },
  });
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

const loadNewVideo = () => {
  if (player.value && typeof player.value.loadVideoById === "function") {
    player.value.loadVideoById(teamChants[currentIndex.value].videoId);
  } else {
    console.error("YouTube Player is not initialized yet.");
  }
};

const togglePlay = () => {
  console.log("🔹 togglePlay() 실행됨, player.value:", player.value);

  if (player.value && typeof player.value.pauseVideo === "function") {
    if (isPlaying.value) {
      console.log("⏸ 일시정지 실행");
      player.value.pauseVideo();
    } else {
      console.log("▶ 재생 실행");
      player.value.playVideo();
    }
    isPlaying.value = !isPlaying.value;
  } else {
    console.error("❌ YouTube Player가 아직 초기화되지 않음");
  }
};

onMounted(() => {
  console.log("🔹 onMounted 실행됨");
  loadYouTubeAPI();
});
</script>
<template>
  <div
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
        <button v-if="isPlaying" @click="togglePlay">
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
      <span class="text-[14px] text-gray03 text-semibold">LG TWINS 응원가</span>
    </div>
    <button v-if="isAutoPlaying" class="mr-[14.26px]">
      <img
        :src="OffAutoPlayIcon"
        alt="자동재생 아이콘"
        class="w-[20px] h-[20px]"
      />
    </button>
    <button v-else class="mr-[14.26px]">
      <img
        :src="OnAutoPlayIcon"
        alt="자동재생 아이콘"
        class="w-[20px] h-[20px]"
      />
    </button>
  </div>
</template>
<style scoped></style>
