<script setup>
import { computed, ref } from "vue";
import CreateHeader from "@/components/CreateHeader.vue";
import { useRoute, useRouter } from "vue-router";
import { teamID } from "@/constants";
import { createFreePost } from "@/api/supabase-api/freePost";

const title = ref("");
const content = ref(""); //

const route = useRoute();
const teamName = ref(route.params.team); // url 팀 이름 불러오기
const clubId = ref(teamID[teamName.value]); // 팀 id 가져오기

const router = useRouter();
// 첫 번째 이미지 링크 추출
const firstImageLink = computed(() => {
  const imageOp = content.value.ops.find((op) => op.insert && op.insert.image);
  return imageOp ? imageOp.insert.image : null;
});

// 등록함수
const handleRegister = async () => {
  // try {
  //   const data = await createFreePost(
  //     "d9ac20dc-af86-42e8-9d63-5f1e35b20547", // member ID
  //     content.value,
  //     title.value,
  //     firstImageLink.value, //thumbnailUrl
  //     1 //clubId
  //   );
  //   // router.push(`/${teamName.value}/freeboard`);
  //   console.log("첫번째 이미지 링크", firstImageLink.value);
  // } catch (error) {
  //   console.error("게시물을 등록하는 도중 오류가 생겼습니다.");
  // }
  handleOnClick();
};
const handleCancel = () => {
  console.log("취소");
};

let quillInstance = null; // Quill 인스턴스를 저장할 변수
const htmlContent = ref(""); // 변환된 HTML을 화면에 출력할 변수

// Delta 형식 -> HTML 변환 함수
const convertDeltaToHTML = (delta) => {
  if (quillInstance) {
    // Delta를 HTML로 변환
    return quillInstance.root.innerHTML;
  }
  return "";
};

// Quill 에디터가 준비된 후 호출되는 메서드
const handleOnClick = () => {
  const html = convertDeltaToHTML(content.value); // Delta -> HTML 변환
  htmlContent.value = html; // 변환된 HTML을 화면에 저장
};

// QuillEditor의 onReady 이벤트에서 quillInstance를 설정
const onEditorReady = (editor) => {
  quillInstance = editor;
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
          contentType="html"
          placeholder="자유롭게 게시글을 작성해보세요."
          theme="snow"
          toolbar="full"
        />
        <pre>{{ content }}</pre>
        <pre>{{ title }}</pre>
        <div v-html="content" class="border-2 border-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
