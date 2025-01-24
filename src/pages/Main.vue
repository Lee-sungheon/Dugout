<script setup>
import Monitor from "@/assets/images/gamemonitor_crop.svg";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const marquee = ref(null);
const marquee2 = ref(null);

onMounted(() => {
  // 첫 번째 마퀴 (왼쪽으로 이동)
  gsap.to(marquee.value, {
    xPercent: -33.33,
    duration: 10,
    repeat: -1,
    ease: "none",
    repeatDelay: 0,
  });

  // 두 번째 마퀴 (오른쪽으로 이동)
  // 초기 위치를 왼쪽으로 설정
  gsap.set(marquee2.value, {
    xPercent: -33.33,
  });

  // 오른쪽으로 이동하는 애니메이션
  gsap.to(marquee2.value, {
    xPercent: 0,
    duration: 10,
    repeat: -1,
    ease: "none",
    repeatDelay: 0,
  });
});
</script>
<template>
  <section class="h-[calc(100vh-100px)] mt-[100px] w-screen overflow-hidden">
    <div class="marquee">
      <div class="marquee-inner" ref="marquee">
        <span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS
          |</span
        >
        <span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS </span
        ><span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS
        </span>
      </div>
    </div>
    <div class="text-black02 text-center my-[50px]">
      <div class="text-[24px] font-bold">
        응원하는 구단의 게시판을 구경해보세요!
      </div>
      <div>자유게시판</div>
      <div>직관 크루 모집</div>
      <div>직관 인증 포토</div>
      <div>직관 맛집 찾기</div>
    </div>
    <div class="marquee">
      <div class="marquee-inner" ref="marquee2">
        <span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS
        </span>
        <span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS </span
        ><span
          >DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS | LANDERS | EAGLES |
          GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS | TWINS | WIZ | BEARS
          | LANDERS | EAGLES | GIANTS | DINOS | HEROS | DUGOUT | TIGERS | LIONS
          | TWINS | WIZ | BEARS | LANDERS | EAGLES | GIANTS | DINOS | HEROS
        </span>
      </div>
    </div>
  </section>
  <section class="h-[calc(100vh-100px)]">2번째 Section</section>
  <section class="h-[calc(100vh-100px)] w-screen bg-black01 relative">
    <div
      class="absolute left-1/2 bottom-0 -translate-x-1/2 w-[80%] max-w-[1200px]">
      <img :src="Monitor" class="w-full h-[600px]" />
    </div>
    <div
      class="absolute left-1/2 top-[100px] -translate-x-1/2 text-white01 flex flex-col items-center gap-[50px]">
      <div class="font-Galmuri11 text-[24px]">
        야구와 관련된 다양한 게임도 플레이할 수 있어요!
      </div>
      <div class="flex gap-[50px] font-bold">
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[24px] text-gameGreen">STAND</div>
          <div class="font-Galmuri11 text-[20px]">1st</div>
          <div class="font-Galmuri11 text-[20px]">2nd</div>
          <div class="font-Galmuri11 text-[20px]">3rd</div>
        </div>
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[24px] text-gameGreen">SCORE</div>
          <div class="font-Galmuri11 text-[20px]">50000000000</div>
          <div class="font-Galmuri11 text-[20px]">205734920</div>
          <div class="font-Galmuri11 text-[20px]"></div>
        </div>
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[24px] text-gameGreen">NAME</div>
          <div class="font-Galmuri11 text-[20px]"></div>
          <div class="font-Galmuri11 text-[20px]"></div>
          <div class="font-Galmuri11 text-[20px]"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.marquee {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background: #000;
  color: #fff;
}

.marquee-inner {
  display: flex;
  align-items: center;
}

.marquee-inner span {
  display: inline-block;
  padding: 0 2px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}
</style>
