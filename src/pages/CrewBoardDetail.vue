<script setup>
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
import { getCrewRecruitmentPostDetails } from "@/api/supabase-api/crewRecruitmentPost";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { getCurrentUser } from "@/api/supabase-api/userInfo";

// day.js
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

const currentUser = ref(null);
const route = useRoute();
const router = useRouter();
const post = ref(null);
const currentTeam = router.currentRoute.value.params.team;
const isVisible = ref(true);

const fetchPostDetails = async () => {
  const postId = route.params.id;
  const data = await getCrewRecruitmentPostDetails(postId);
  if (data) {
    post.value = data;
  } else {
    alert("게시물 정보를 가져오는 데 실패했습니다.");
  }
};

// 현재 로그인 사용자 정보 불러오기
const getUserInfo = async () => {
  const userData = await getCurrentUser();
  if (userData) {
    currentUser.value = userData; // 로그인된 사용자 정보 저장
  } else {
    currentUser.value = null; // 비로그인 상태
  }
};

const handleBack = () => {
  router.push(`/${currentTeam}/crewboard/`);
};

const checkVisibility = () => {
  if (currentUser.value && post.value) {
    // 로그인된 사용자 ID와 게시물 작성자 ID 비교
    isVisible.value = currentUser.value.id === post.value.member_id;
  } else {
    isVisible.value = true;
  }
};

onMounted(async () => {
  await fetchPostDetails();
  await getUserInfo();
  checkVisibility();
});
console.log(currentUser.value);
</script>
<template>
  <div v-if="post" class="px-[50px] py-[30px]">
    <!-- 뒤로가기 -->
    <div class="mb-[50px] flex">
      <button @click="handleBack">
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="flex flex-col gap-[50px]">
      <!-- 상세 페이지 정보 -->
      <PostHeader
        crewBoard
        :title="post.title"
        :nickname="post.author_name"
        :time="dayjs(post.created_at).fromNow()"
        :status="post.status"
        :isVisible="isVisible"
      />
      <!-- 게시물 내용 -->
      <div class="pb-[50px] border-b border-gray01 flex flex-col gap-[50px]">
        <span>
          {{ post.content }}
        </span>
        <div class="flex flex-col text-lg text-black01 gap-[30px]">
          <div>
            <span class="inline-block w-[100px]">경기일</span>
            <span class="font-bold">| {{ post.game_date }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">응원팀</span>
            <span class="font-bold">|{{ post.club_name }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">경기 장소</span>
            <span class="font-bold">| {{ post.game_stadium }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">작성자 성별</span>
            <span class="font-bold">| {{ post.author_sex }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">작성자 연령</span>
            <span class="font-bold">| {{ post.author_age }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">크루 성별</span>
            <span class="font-bold">| {{ post.crew_sex }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">크루 연령</span>
            <span class="font-bold">| {{ post.crew_sex }}</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">인원</span>
            <span class="font-bold">| {{ post.members }}</span>
          </div>
        </div>
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
