<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import { useImageStore } from "@/stores/useImageStore";
import { createRestaurantPost } from "@/api/supabase-api/restaurantPost";
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import CreateHeader from "@/components/CreateHeader.vue";
import MapSelectAndView from "@/components/foodboard/foodBoardCreate/MapSelectAndView.vue";
import PhotoUpload from "@/components/foodboard/foodBoardCreate/PhotoUpload.vue";
import TagsSelect from "@/components/foodboard/foodBoardCreate/TagsSelect.vue";
import Modal from "@/components/common/Modal.vue";
import { teamID } from "@/constants/index";

const imageStore = useImageStore();
const router = useRouter();
const route = useRoute();
const team = route.params.team;

const modalmessage = ref("");
const isModalVisible = ref(false);
const inputTitle = ref("");
const inputContent = ref("");
const selectedTags = ref([]);
const messageList = [
  "작성했던 모든 내용은 저장되지 않습니다\n취소하시겠습니까?",
  "수정을 완료하시겠습니까?",
];

const handleTagUpdate = (tags) => {
  selectedTags.value = tags;
  console.log("Selected Tags:", selectedTags.value);
};

const submitRestaurantPost = async () => {
  console.log("제출");
  const filteredImg = imageStore.filterNullImage();
  const userData = await getCurrentUser();
  console.log(userData);
  console.log("selectedTags 값입니다", selectedTags);
  console.log(
    "selectedTags 값입니다",
    inputContent,
    "타이틀",
    inputTitle,
    "이미지",
    filteredImg,
    "태그",
    selectedTags,
    "내용",
    inputContent
  );
  try {
    // 서버에 HTML 콘텐츠를 전달하여 게시물 생성
    await createRestaurantPost(
      userData.id,
      inputContent.value,
      inputTitle.value,
      filteredImg[0],
      selectedTags.value,
      teamID[team]
    );
    router.push(`/${team}/foodboard`);
    console.log("포스팅 성공");
  } catch (error) {
    console.log("맛집 게시물 등록 실패", error);
  }
};

const cancelRestaurantPost = () => {
  modalmessage.value = messageList[0];
  isModalVisible.value = true;
  console.log(route.params);
};

const cancelModalWindow = () => {
  isModalVisible.value = false;
};

const backToFoodboard = () => {
  router.push(`/${team}/foodboard`);
};

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["link"],
  [{ align: [] }],
  // ['image'], // 이미지 버튼을 제거
];
</script>
<template>
  <Modal
    v-if="isModalVisible"
    :message="modalmessage"
    :onCancel="cancelModalWindow"
    :onConfirm="backToFoodboard"
  />
  <section class="flex flex-col px-[50px] gap-[30px]">
    <CreateHeader
      :handleRegister="submitRestaurantPost"
      :handleCancel="cancelRestaurantPost"
    />
    <div>
      <input
        v-model="inputTitle"
        type="text"
        placeholder="제목"
        class="h-[70px] border-b w-full outline-none text-center placeholder:text-[20px]"
      />
    </div>
    <section
      id="post_content--input"
      class="flex flex-col gap-[30px] mb-[142px] w-full"
    >
      <MapSelectAndView />
      <div>
        <QuillEditor
          v-model:value="inputContent"
          contentType="html"
          :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
          theme="snow"
          :toolbar="toolbarOptions"
          @ready="onEditorReady"
          class="w-full text-center"
        />
      </div>
      <PhotoUpload />
      <TagsSelect @update:selectedTag="handleTagUpdate" />
    </section>
  </section>
</template>

<style scoped>
/* placeholder 가운데 정렬 */
::v-deep(.ql-editor::before) {
  text-align: center;
  width: 100%;
  height: 100px;
  display: block;
  color: #b1b1b1;
  font-size: 18px;
  white-space: pre-wrap !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

::v-deep(.ql-editor) {
  width: 100%;
  height: 100px;
  text-align: center;
  color: #0a0a0a;
  font-size: 18px;
  white-space: normal;
  position: relative;
}
</style>
