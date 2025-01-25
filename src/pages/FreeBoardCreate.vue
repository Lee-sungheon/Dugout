<script setup>
import { computed, ref } from "vue";
import CreateHeader from "@/components/CreateHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { teamID } from "@/constants";
import { createFreePost } from "@/api/supabase-api/freePost";

const title = ref("");
const content = ref("");
const thumbnailUrl = ref("");

const route = useRoute();
const teamName = ref(route.params.team); // url 팀 이름 불러오기
const clubId = ref(teamID[teamName.value]); // 팀 id 가져오기

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
    const data = await createFreePost(
      "d9ac20dc-af86-42e8-9d63-5f1e35b20547", // member ID
      content.value,
      title.value,
      thumbnailUrl.value, //thumbnailUrl
      1 //clubId
    );
    router.push(`/${teamName.value}/freeboard`);
  } catch (error) {
    console.error("게시물을 등록하는 도중 오류가 생겼습니다.");
  }
};
const handleCancel = () => {
  console.log("취소");
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
