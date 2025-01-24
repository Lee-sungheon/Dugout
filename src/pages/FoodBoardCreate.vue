<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Delta } from "@vueup/vue-quill";
import { QuillEditor } from "@vueup/vue-quill";
import CreateHeader from "@/components/CreateHeader.vue";
import MapSelectAndView from "@/components/foodboard/foodBoardCreate/MapSelectAndView.vue";
import PhotoUpload from "@/components/foodboard/foodBoardCreate/PhotoUpload.vue";
import TagsSelect from "@/components/foodboard/foodBoardCreate/TagsSelect.vue";
import Modal from "@/components/common/Modal.vue";

const router = useRouter();

const modalmessage = ref("");
const inputTitle = ref("");
const inputContent = ref(new Delta());
// const deltaString = JSON.stringify(content.value);

const messageList = ["삭제 후에는 복구할 수 없습니다\n삭제하시겠습니까?"];
modalmessage.value = messageList[0];

// const submitRestaurantPost = () => {};
// const cancelRestaurantPost = () => {};

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["link"],
  [{ align: [] }],
  // ['image'], // 이미지 버튼을 아예 제거
];

const test = () => {
  console.log(content);
};
</script>

<template>
  <!-- <Modal :message="messageList[0]" /> -->
  <section class="flex flex-col px-[50px] gap-[30px]">
    <CreateHeader />
    <!-- <CreateHeader
      :handleRegister="submitRestaurantPost"
      :handleCancel="cancelRestaurantPost"
    /> -->
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
          v-model="inputContent"
          contentType="delta"
          :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
          theme="snow"
          :toolbar="toolbarOptions"
          @ready="onEditorReady"
          class="w-full text-center placeholder:text-center"
        />
      </div>
      <PhotoUpload />
      <TagsSelect />
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
