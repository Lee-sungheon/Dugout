<script setup>
import { ref } from "vue";
import CreateHeader from "@/components/CreateHeader.vue";
import { useRouter } from "vue-router";
import { teamID } from "@/constants";
import { createFreePost } from "@/api/supabase-api/freePost";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  team: String, // url 팀이름 불러오기
});

const authStore = useAuthStore(); // 유저 정보가 가져오기

const title = ref("");
const content = ref("");
const thumbnailUrl = ref("");

const clubId = ref(teamID[props.team]); // 팀 id 가져오기

const router = useRouter();

// 첫 번째 이미지 링크 추출
const findThumbnailImage = () => {
  // 문자열을 DOM으로 파싱
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = content.value;

  // 첫 번째 <img> 태그 선택
  const firstImg = tempDiv.querySelector("img");

  // src 속성 가져오기
  thumbnailUrl.value = firstImg ? firstImg.src : "";
};

// 등록함수
const handleRegister = async () => {
  findThumbnailImage(); // 썸네일 지정하기
  try {
    await createFreePost(
      authStore.user.id, // member ID
      content.value,
      title.value,
      thumbnailUrl.value, //thumbnailUrl
      clubId.value //clubId
    );
    router.push(`/${props.team}/freeboard`);
  } catch (error) {
    console.error("게시물을 등록하는 도중 오류가 생겼습니다.");
  }
};

// 취소 눌렀을 때 실행될 함수
const handleCancel = () => {
  router.push(`/${props.team}/freeboard`);
};
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="w-[1090px] flex flex-col">
      <CreateHeader :handleRegister :handleCancel />
      <!-- 제목부분 -->
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="제목"
          class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center bg-white01"
        />
      </div>
      <!-- 에디터 부분 -->
      <div>
        <QuillEditor
          v-model:content="content"
          placeholder="자유롭게 게시글을 작성해보세요."
          contentType="html"
          theme="snow"
          toolbar="full"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
