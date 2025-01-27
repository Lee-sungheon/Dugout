<script setup>
import Monitor from "@/assets/images/gamemonitor_crop.svg";
import Coin from "@/assets/images/coin.svg";
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";
import { getCurrentUser } from "../api/supabase-api/userInfo";
import { getUserInfoEnCapsulation } from "@/api/supabase-api/userInfo";
import { getBaseballGame } from "@/api/supabase-api/baseballGame";
import { useAuthStore } from "@/stores/auth";

const marquee = ref(null);
const marquee2 = ref(null);
const user = ref(null);
const errorMessage = ref("");
const combinedRecords = ref([]);
const router = useRouter();
const auth = useAuthStore();

// 사용자 정보 가져오기
const fetchCurrenthUser = async () => {
  try {
    await auth.fetchCurrentUser();
    if (!auth.user) {
      errorMessage.value = "로그인된 사용자가 없습니다.";
    }
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    errorMessage.value = "사용자 정보를 가져오지 못했습니다.";
  }
};

const fetchGameRanking = async () => {
  try {
    const gameRecords = await getBaseballGame();
    if (!gameRecords) {
      console.error("게임 기록을 가져오는데 실패했습니다.");
      return;
    }

    const userInfos = await getUserInfoEnCapsulation("user_info");
    if (!userInfos) {
      console.error("사용자 정보를 가져오는데 실패했습니다.");
      return;
    }

    const combined = gameRecords.map((record) => {
      const userInfo = userInfos.find((user) => user.id === record.member_id);
      return {
        id: record.id,
        wins: record.wins,
        name: userInfo ? userInfo.name : "알 수 없음",
      };
    });

    combinedRecords.value = combined
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 3);

    console.log("순위 데이터:", combinedRecords.value);
  } catch (error) {
    console.error("순위 데이터를 가져오는 중 오류 발생:", error);
  }
};

const handleRouting = async () => {
  if (auth.isAuthenticated()) router.push("./game");
  else router.push("./signin");
};

onMounted(async () => {
  await fetchCurrenthUser();
  await fetchGameRanking();

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
        <template v-if="auth.user">
          <p>{{ auth.user.name }}님, 반갑습니다!</p>
          <p>응원하는 구단의 게시판의 새로운 소식을 확인해보세요!</p>
        </template>
        <template v-else
          >로그인하고 응원하는 구단의 게시판을 구경해보세요!</template
        >
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
      class="absolute left-1/2 -translate-x-1/2 bottom-[130px] w-full flex flex-col items-center gap-[50px] text-white01">
      <div class="font-Galmuri11 text-[24px]">
        야구와 관련된 다양한 게임도 플레이할 수 있어요!
      </div>
      <div class="flex gap-[50px] font-bold">
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[20px] text-gameGreen">STAND</div>
          <div class="font-Galmuri11 text-[16px]">1st</div>
          <div class="font-Galmuri11 text-[16px]">2nd</div>
          <div class="font-Galmuri11 text-[16px]">3rd</div>
        </div>
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[20px] text-gameGreen">SCORE</div>
          <div
            v-for="record in combinedRecords"
            :key="record.id"
            class="font-Galmuri11 text-[16px]">
            {{ record.wins || "-" }}
          </div>
        </div>
        <div class="flex flex-col gap-[30px] items-center">
          <div class="font-Galmuri11 text-[20px] text-gameGreen">NAME</div>
          <div
            v-for="record in combinedRecords"
            :key="record.id"
            class="font-Galmuri11 text-[16px]">
            {{ record.name || "-" }}
          </div>
        </div>
      </div>
      <div class="flex justify-between gap-[30px]">
        <div class="font-Galmuri11 text-[24px]">
          로그인하고 게임하러 가기 >>
        </div>
        <div
          @click="handleRouting"
          class="flex gap-[10px] cursor-pointer hover:opacity-80 transition-opacity">
          <p class="font-Galmuri11 font-bold text-[#FEE382] text-[24px]">
            INSERT COIN
          </p>
          <img :src="Coin" />
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
