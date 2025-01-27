<script setup>
import doosanEmblem from "@/assets/images/logo_doosan.svg";
import hanhwaEmblem from "@/assets/images/logo_hanhwa.svg";
import kiaEmblem from "@/assets/images/logo_kia.svg";
import kiwoomEmblem from "@/assets/images/logo_kiwoom.svg";
import ktEmblem from "@/assets/images/logo_kt.svg";
import lgEmblem from "@/assets/images/logo_lg.svg";
import lotteEmblem from "@/assets/images/logo_lotte.svg";
import ncEmblem from "@/assets/images/logo_nc.svg";
import samsungEmblem from "@/assets/images/logo_samsung.svg";
import ssgEmblem from "@/assets/images/logo_ssg.svg";
import { gsap } from "gsap";
import { onMounted } from "vue";

const props = defineProps({
  selectedTeam: {
    type: String,
    required: true,
  },
});

const emblem = {
  히어로즈: kiwoomEmblem,
  타이거즈: kiaEmblem,
  위즈: ktEmblem,
  트윈스: lgEmblem,
  자이언츠: lotteEmblem,
  다이노스: ncEmblem,
  라이온즈: samsungEmblem,
  랜더스: ssgEmblem,
  이글스: hanhwaEmblem,
  베어스: doosanEmblem,
};

onMounted(() => {
  const timeline = gsap.timeline();

  // 빛의 링과 앰블럼이 동시에 커지는 효과
  timeline
    .fromTo(
      ".emblem-ring",
      {
        opacity: 0,
        scale: 0.8,
        boxShadow: "0 0 0px 0px rgba(255, 255, 255, 0.5)",
      },
      {
        opacity: 1,
        scale: 2.5,
        boxShadow: "0 0 100px 30px rgba(255, 255, 255, 0.8)",
        duration: 0.5,
        yoyo: true,
        ease: "sine.inOut",
      }
    )
    .fromTo(
      ".emblem-container",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        duration: 0.5, // 한번에 커지도록 설정
        ease: "power3.out",
      }
    );
});
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
  >
    <!-- Emblem Container -->
    <div
      class="emblem-container relative flex items-center justify-center opacity-0"
    >
      <!-- 빛의 링 1 -->
      <div
        class="emblem-ring absolute w-[300px] h-[300px] rounded-full border-[5px] border-white opacity-50"
      ></div>

      <!-- 빛의 링 2 (시간차로 퍼짐) -->
      <div
        class="emblem-ring2 absolute w-[300px] h-[300px] rounded-full border-[5px] border-white opacity-50"
      ></div>

      <!-- Emblem 이미지 -->
      <img
        :src="emblem[selectedTeam]"
        class="relative w-[350px] h-[200px] emblem-img"
        alt="엠블럼"
      />
    </div>
  </div>
</template>

<style scoped>
.emblem-container {
  transform-origin: center;
  transition: transform 0.2s ease-out;
  position: relative;
  width: 350px;
  height: 200px;
}

/* 빛나는 링 효과 */
.emblem-ring {
  animation: pulse-ring 0.6s infinite alternate ease-in-out;
  filter: blur(5px);
}

.emblem-ring2 {
  animation: pulse-ring 0.6s infinite alternate ease-in-out;
  animation-delay: 0.2s; /* 두 번째 링이 0.2초 뒤에 시작되도록 설정 */
  filter: blur(5px);
}

/* 빛나는 링 애니메이션 */
@keyframes pulse-ring {
  from {
    transform: scale(0.8);
    opacity: 0.1;
    box-shadow: 0 0 0px 0px rgba(255, 255, 255, 0.4);
  }
  to {
    transform: scale(2.5);
    opacity: 0.1;
    box-shadow: 0 0 60px 30px rgba(255, 255, 255, 0.8);
  }
}

/* 글래스 반짝임 효과 */
@keyframes glass-shine {
  0% {
    filter: brightness(0.7);
  }
  50% {
    filter: brightness(1.5);
  }
  100% {
    filter: brightness(0.7);
  }
}

/* 이미지에 반짝임 효과 적용 */
.emblem-img {
  animation: glass-shine 2s infinite ease-in-out;
}
</style>
