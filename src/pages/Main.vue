<script setup>
import Monitor from "@/assets/images/gamemonitor_crop.svg";
import Coin from "@/assets/images/coin.svg";
import { ref, onMounted, watch } from "vue";
import { gsap } from "gsap";
import { useRouter } from "vue-router";
import { getUserInfoEnCapsulation } from "@/api/supabase-api/userInfo";
import { getBaseballGame } from "@/api/supabase-api/baseballGame";
import { useAuthStore } from "@/stores/auth";
import { teamID } from "@/constants";
import axios from "axios";

const marquee = ref(null);
const marquee2 = ref(null);
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

// 팀 ID를 팀명으로 변환하는 함수
const getTeamName = (baseballClubId) => {
  const teamEntry = Object.entries(teamID).find(
    ([_, id]) => id === baseballClubId
  );
  if (teamEntry) return teamEntry[0];
  return null;
};

// 게시판 라우팅 처리 함수
const handleBoardRouting = (boardType) => {
  const teamName = getTeamName(auth.user.baseball_club_id);
  if (teamName) {
    router.push(`/${teamName}/${boardType}`);
  } else {
    console.error("일치하는 팀을 찾을 수 없습니다.");
  }
};

// 로그인/마이페이지 라우팅
const handleAuthRouting = () => {
  if (auth.user) {
    router.push("/myPage");
  } else {
    router.push("/signin");
  }
};

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
        display: 5, // 출력 개수
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

const selectedTeam = ref([]);

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
  await getNewsData(queryKeyword.value);

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
        <template v-if="auth.user && auth.user.baseball_club_id">
          <p>{{ auth.user.name }}님, 반갑습니다!</p>
          <p>응원하는 구단의 게시판의 새로운 소식을 확인해보세요!</p>
        </template>
        <template v-else-if="auth.user">
          <p>{{ auth.user.name }}님, 반갑습니다!</p>
          <p>아직 응원하는 구단을 설정하지 않으셨군요</p>
        </template>
        <template v-else>
          <p>DUGOUT에 오신 것을 환영합니다!</p>
          <p>로그인하고 응원하는 구단의 게시판을 구경해보세요</p>
        </template>
      </div>
      <div class="flex flex-col items-center gap-[20px] mt-[30px]">
        <template v-if="auth.user && auth.user.baseball_club_id">
          <div
            @click="handleBoardRouting('freeboard')"
            class="w-[500px] py-2 bg-white02 rounded-[10px] cursor-pointer hover:bg-gray01">
            자유게시판
          </div>
          <div
            @click="handleBoardRouting('crewboard')"
            class="w-[500px] py-2 bg-white02 rounded-[10px] cursor-pointer hover:bg-gray01">
            직관 크루 모집
          </div>
          <div
            @click="handleBoardRouting('photoboard')"
            class="w-[500px] py-2 bg-white02 rounded-[10px] cursor-pointer hover:bg-gray01">
            직관 인증 포토
          </div>
          <div
            @click="handleBoardRouting('foodboard')"
            class="w-[500px] py-2 bg-white02 rounded-[10px] cursor-pointer hover:bg-gray01">
            직관 맛집 찾기
          </div>
        </template>
        <template v-else-if="auth.user">
          <div @click="handleAuthRouting" class="cursor-pointer">
            마이페이지에서 구단 선택하기
          </div>
        </template>
        <template v-else>
          <div @click="handleAuthRouting" class="cursor-pointer">
            로그인하러 가기
          </div>
        </template>
      </div>
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
  <section class="h-[calc(100vh-100px)]">
    <div class="flex flex-col gap-[30px] w-screen px-[150px]">
      <div class="flex justify-between border border-red gap-[30px]">
        <div class="flex-1">
          <p class="font-bold text-[24px]">야구팬들을 위한 완벽한 허브</p>
          <p class="font-medium text-black02 text-[20px]">
            최신 야구 뉴스와 이슈를 한곳에서 확인하세요
          </p>
          <p class="text-[14px] mt-[30px]">
            경기 결과, 선수 소식, 트레이드 루머까지!<br />
            당신이 놓치고 싶지 않은 모든 야구 이야기를 제공합니다
          </p>
          <RouterLink
            to="/news"
            class="px-4 py-2 text-primary hover:text-primary-dark transition-colors">
            더 많은 뉴스 보기 →
          </RouterLink>
        </div>
        <div class="flex flex-col">
          <div
            v-for="news of newsData"
            :key="news.link"
            title="뉴스 바로가기"
            class="cursor-pointer"
            @click="goToOriginNew(news.originallink)">
            <h2 class="text-[16px] text-black01 font-bold py-2">
              {{ stripHtml(news.title) }}
            </h2>
          </div>
        </div>
      </div>
      <div class="flex justify-between border border-red">
        <div>응원하는 구단의 하이라이트를 감상해보세요!</div>
        <div>그림</div>
      </div>
    </div>
  </section>
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
