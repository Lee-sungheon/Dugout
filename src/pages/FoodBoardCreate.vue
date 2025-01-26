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
import { createRestaurantPostImage } from "@/api/supabase-api/restaurantImage";
import CreateHeader from "@/components/CreateHeader.vue";
import MapSelectAndView from "@/components/foodboard/foodBoardCreate/MapSelectAndView.vue";
import PhotoUpload from "@/components/foodboard/foodBoardCreate/PhotoUpload.vue";
import TagsSelect from "@/components/foodboard/foodBoardCreate/TagsSelect.vue";
import Modal from "@/components/common/Modal.vue";
import { teamID } from "@/constants/index";
import Baseball from "@/assets/icons/baseball.svg";

const imageStore = useImageStore();
const mapStore = useMapStore(); // Pinia store instance
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

const tagErrorClass = ref(""); // 에러 클래스 초기화
const tagErrorMessage = ref("태그를 1개 이상 선택해주세요"); // 기존 메시지 그대로 유지

const handleTagUpdate = (tags) => {
  selectedTags.value = tags;
  // 태그 선택이 완료되면 에러 상태 초기화
  if (selectedTags.value.length > 0) {
    tagErrorClass.value = ""; // 에러 스타일 제거
  }
};

const submitRestaurantPost = async () => {
  const filteredImg = imageStore.filterNullImage();
  const userData = await getCurrentUser();

  if (!title.value.trim()) {
    // 포커스 이동
    const titleElement = document.querySelector('input[type="text"]');
    titleElement.focus();
    return;
  }

  if (!content.value.trim()) {
    // 포커스 이동
    const contentElement = document.querySelector(".ql-editor");
    contentElement.focus();
    contentElement.scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (selectedTags.value.length === 0) {
    tagErrorClass.value = "error";
    const tagSelectElement = document.getElementById("tags-select");
    tagSelectElement.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      tagErrorClass.value = ""; // 애러 후 스타일 초기화
    }, 3000);

    return;
  }
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

    // 성공 후 Pinia store 초기화
    mapStore.resetLocationData();
    imageStore.resetImageData();
  } catch (error) {
    console.log("맛집 게시물 등록 실패", error);
  }
};

const cancelRestaurantPost = () => {
  modalmessage.value = messageList[0];
  isModalVisible.value = true;

  // 취소 시 Pinia store 초기화
  mapStore.resetLocationData(); // 데이터 초기화
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
  <!-- 모달 -->
  <Modal
    v-if="isModalVisible"
    :message="modalmessage"
    :onCancel="cancelModalWindow"
    :onConfirm="backToFoodboard"
  />
  <section class="flex flex-col items-center">
    <div class="w-[1090px] flex flex-col">
      <CreateHeader
        :handleRegister="submitRestaurantPost"
        :handleCancel="cancelRestaurantPost"
      />
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="제목"
          class="border-b w-full outline-none text-center py-[15px] text-3xl bg-white01"
        />
      </div>
      <section
        id="post_content--input"
        class="flex flex-col gap-[30px] mb-[142px] w-full"
      >
        <MapSelectAndView />
        <div class="w-full border border-white02">
          <QuillEditor
            v-model:content="content"
            contentType="html"
            :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
            theme="snow"
            :toolbar="toolbarOptions"
          />
        </div>
        <PhotoUpload />
        <div id="tags-select" class="flex flex-col gap-[20px]">
          <div class="flex gap-[10px] items-center">
            <img :src="Baseball" class="w-[18px] h-[18px]" />
            <p :class="tagErrorClass" class="text-[14px] text-gray03">
              {{ tagErrorMessage }}
            </p>
          </div>
          <TagsSelect @update:selectedTag="handleTagUpdate" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
/* 반짝임 효과 */
.error {
  color: red;
  animation: blink 1s linear 0s 3; /* 3번 반복 */
}

@keyframes blink {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.8;
  }
}
::v-deep(.ql-editor) {
  width: 100%;
  height: auto; /* 콘텐츠에 맞게 높이가 자동으로 늘어남 */
  text-align: center;
  color: #0a0a0a;
  font-size: 18px;
  white-space: normal;
  position: relative;
  overflow-y: hidden; /* 스크롤바 숨김 */
}
</style>
