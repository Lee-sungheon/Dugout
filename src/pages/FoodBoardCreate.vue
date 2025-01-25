<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import { useImageStore } from "@/stores/useImageStore";
import { useMapStore } from "@/stores/mapStore";
import {
  createRestaurantPost,
  createRestaurantLocation,
} from "@/api/supabase-api/restaurantPost";
import { getCurrentUser } from "@/api/supabase-api/userInfo";
import CreateHeader from "@/components/CreateHeader.vue";
import MapSelectAndView from "@/components/foodboard/foodBoardCreate/MapSelectAndView.vue";
import PhotoUpload from "@/components/foodboard/foodBoardCreate/PhotoUpload.vue";
import TagsSelect from "@/components/foodboard/foodBoardCreate/TagsSelect.vue";
import Modal from "@/components/common/Modal.vue";
import { teamID } from "@/constants/index";
import { createRestaurantPostImage } from "@/api/supabase-api/restaurantImage";

const imageStore = useImageStore();
const mapStore = useMapStore();
const router = useRouter();
const route = useRoute();
const teamName = ref(route.params.team); // URL에서 팀 이름 가져오기
const clubId = ref(teamID[teamName.value]);

const modalmessage = ref("");
const isModalVisible = ref(false);
const title = ref("");
const content = ref("");
const selectedTags = ref([]);
const messageList = [
  "작성했던 모든 내용은 저장되지 않습니다\n취소하시겠습니까?",
  "수정을 완료하시겠습니까?",
];

const finalSelectedLocation = computed(() => mapStore.finalSelectedLocation);

const handleTagUpdate = (tags) => {
  selectedTags.value = tags;
};

const submitRestaurantPost = async () => {
  const filteredImg = imageStore.filterNullImage();
  console.log("필터링 된 이미지 데이터를 확인합니다", filteredImg);
  const userData = await getCurrentUser();
  try {
    // 게시물 등록
    const data = await createRestaurantPost(
      userData.id,
      content.value,
      title.value,
      filteredImg[0], // 첫 번째 이미지를 메인 이미지로 저장
      selectedTags.value,
      clubId.value
    );
    console.log("포스팅된 전체 데이터를 확인합니다", data);

    // 위치 데이터 등록
    const locationData = await createRestaurantLocation(
      data[0].id,
      finalSelectedLocation.value.place_name,
      finalSelectedLocation.value.address_name,
      finalSelectedLocation.value.category_name,
      finalSelectedLocation.value.y,
      finalSelectedLocation.value.x,
      finalSelectedLocation.value.phone,
      finalSelectedLocation.value.place_url
    );

    // 나머지 이미지 등록 (첫 번째 이미지는 이미 등록됨)
    const imagesData = [];
    for (const [i, image] of filteredImg.entries()) {
      try {
        console.log(`이미지 업로드 요청 데이터 (index: ${i})`, {
          postId: data[0].id,
          imageUrl: image,
          index: i,
        });

        const imageData = await createRestaurantPostImage(data[0].id, image, i);
        console.log("이미지 업로드 성공", imageData);
        imagesData.push(imageData);
      } catch (err) {
        console.error(`이미지 업로드 실패 (index: ${i})`, err);
      }
    }

    // 결과 출력
    console.log("맛집 게시물 등록 성공", data, locationData, imagesData);
    router.push(`/${teamName.value}/foodboard`);
  } catch (error) {
    console.log("맛집 게시물 등록 실패", error);
  }
};

const cancelRestaurantPost = () => {
  modalmessage.value = messageList[0];
  isModalVisible.value = true;
};

const cancelModalWindow = () => {
  isModalVisible.value = false;
};

const backToFoodboard = () => {
  router.go(-1);
};

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  ["link"],
  [{ align: [] }],
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
        v-model="title"
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
          v-model:content="content"
          contentType="html"
          :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
          theme="snow"
          :toolbar="toolbarOptions"
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
