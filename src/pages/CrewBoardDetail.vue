<script setup>
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
import { getCrewRecruitmentPostDetails } from "@/api/supabase-api/crewRecruitmentPost";
import { onMounted, ref } from "vue";

const post = ref(null);

const fetchPostDetails = async () => {
  const postId = "77"; //route.params.id;
  const data = await getCrewRecruitmentPostDetails(postId);
  if (data) {
    post.value = data;
    console.log(post.value.club_id);
  } else {
    alert("게시물 정보를 가져오는 데 실패했습니다.");
  }
};

onMounted(() => {
  fetchPostDetails();
});
</script>
<template>
  <div v-if="post" class="px-[50px] py-[30px]">
    <!-- 뒤로가기 -->
    <div class="mb-[50px] flex">
      <button>
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
        :time="post.created_at"
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
