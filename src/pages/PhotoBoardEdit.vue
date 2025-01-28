<script setup>
import CreateHeader from "@/components/CreateHeader.vue";
import Camera from "@/assets/icons/camera.svg";
import { onMounted, ref, watch } from "vue";
import {
  uploadImageToSupabase,
  getCertificationPostDetailsById,
  updateCertificationPost,
} from "@/api/supabase-api/viewingCertificationPost";
import { teamID } from "@/constants";
import { useRoute, useRouter } from "vue-router";
import { DatePicker } from "v-calendar";
import CalendarIcon from "@/assets/icons/calendar.svg";
import Modal from "@/components/common/Modal.vue";
import { useModalStore } from "@/stores/useModalStore";

const router = useRouter();
const modalStore = useModalStore();

const title = ref("");
const content = ref("");
const selectedImage = ref(null);
const uploadedImageUrl = ref("");
const isDatePickerOpen = ref(false);
const gameDate = ref(null);

const route = useRoute();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]);

const postId = route.params.id;

const fetchPostData = async () => {
  if (!postId) {
    console.error("postId가 없습니다. 올바른 경로에서 접근해주세요.");
    return;
  }
  try {
    const data = await getCertificationPostDetailsById(postId);
    if (data) {
      console.log("기존 게시물 데이터", data);
      title.value = data.title;
      content.value = data.content;
      uploadedImageUrl.value = data.image;

      if (data.game_date) {
        gameDate.value = new Date(data.game_date);
        formattedGameDate.value = formatDate(gameDate.value);
      }
    }
  } catch (error) {
    console.error("게시물 데이터를 불러오지 못했습니다:", error);
  }
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = e.target.result;
  };
  reader.readAsDataURL(file);

  try {
    console.log("이미지 업로드 시작");
    const imageUrl = await uploadImageToSupabase(file);
    if (imageUrl) {
      uploadedImageUrl.value = imageUrl;
      console.log("이미지 업로드 성공:", uploadedImageUrl.value);
    } else {
      console.error("이미지 URL을 가져오지 못함");
    }
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
  }
};

const triggerFileInput = () => {
  document.getElementById("imageUpload").click();
};

const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekName = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekName[date.getDay()];
  return `${year}.${month}.${day}.${weekday}요일`;
};

const formatDateForDB = (date) => {
  if (!date || !(date instanceof Date)) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formattedGameDate = ref("날짜를 선택하세요");

watch(gameDate, (newDate) => {
  formattedGameDate.value = formatDate(newDate);
  isDatePickerOpen.value = false;
});

const confirmBlank = () => {
  console.log("📌 모달 열기 시도");
  modalStore.openModal({
    message: "작성하지 않은 항목이 있습니다 \n 확인 후 입력해주세요",
    type: "oneBtn",
    onConfirm: modalStore.closeModal(),
  });
};

const confirmGameDate = () => {
  console.log("📌 모달 열기 시도");
  modalStore.openModal({
    message: "이미 지나간 경기일입니다",
    type: "oneBtn",
    onConfirm: modalStore.closeModal(),
  });
};

const selectDate = (newDate) => {
  if (!newDate || isNaN(new Date(newDate).getTime())) {
    console.error("날짜가 선택되지 않았습니다.");
    return;
  }

  const selectedDate = new Date(newDate);
  const thisDate = new Date();
  thisDate.setHours(0, 0, 0, 0);

  if (selectedDate < thisDate) {
    confirmGameDate();
    return;
  }
  gameDate.value = newDate;
  isDatePickerOpen.value = false;
};

const handleSave = async () => {
  return {
    content: content.value,
    imageUrl: uploadedImageUrl.value,
    gameDate: formatDateForDB(gameDate.value),
    clubId: clubId.value,
    title: title.value,
  };
};

// 작성글 등록 함수
const handleRegister = async () => {
  console.log("등록 버튼 클릭됨");
  console.log("업로드된 이미지 URL:", uploadedImageUrl.value);
  if (
    !title.value ||
    !content.value ||
    !gameDate.value ||
    !uploadedImageUrl.value
  ) {
    confirmBlank();
    return;
  }

  try {
    const postData = await handleSave();
    const updatedPost = await updateCertificationPost(
      postData.content,
      postData.imageUrl,
      postData.gameDate,
      postData.clubId,
      postData.title
    );

    if (updatedPost) {
      alert("게시물이 수정되었습니다.");
      router.replace(`/${route.params.team}/photoboard`);
    }
  } catch (error) {
    console.error("게시물 생성 실패:", error);
    alert("게시물 생성에 실패했습니다.");
  }
};

const handleCancel = () => {
  console.log("등록 취소");
  alert("등록이 취소되었습니다");
  router.push(`/${route.params.team}/photoboard/${postId}`);
};

watch(uploadedImageUrl, (newUrl) => {
  console.log("업로드된 이미지 변경됨:", newUrl);
});

const confirmMaxLength = () => {
  modalStore.openModal({
    message: "인증 글은 최대 500자까지만 작성 가능합니다!",
    type: "oneBtn",
    onConfirm: modalStore.closeModal(),
  });
};

const maxLength = 500;

const handleInput = (event) => {
  if (content.value.length > maxLength) {
    confirmMaxLength();
    content.value = content.value.slice(0, maxLength);
  }
};

onMounted(fetchPostData);
</script>
<template>
  <div><h1>수정페이지</h1></div>
  <div class="flex flex-col items-center">
    <div class="w-[1090px] flex flex-col">
      <CreateHeader
        :handleRegister="handleRegister"
        :handleCancel="handleCancel"
      />
      <Modal />
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="제목"
          class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center bg-white01"
        />
      </div>
      <div class="gap-[50px]">
        <div class="mt-[40px] mb-[85px]">
          <div class="flex flex-col gap-[30px]">
            <div class="flex justify-between">
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2 px-[20px] mb-[30px]"
              >
                <div class="“w-[100px]“">
                  <span
                    class="text-black01 text-bold text-[18px] whitespace-nowrap"
                    >경기일</span
                  >
                </div>
                <div class="relative flex w-full">
                  <button
                    @click="isDatePickerOpen = !isDatePickerOpen"
                    class="flex items-center justify-between w-full h-[40px] px-[15px] bg-white02 text-black01 text-[18px] rounded-[8px] border"
                  >
                    <span>{{ formattedGameDate || "날짜를 선택하세요" }}</span>
                    <img :src="CalendarIcon" class="w-[18px] h-[18px]" />
                  </button>
                  <div
                    v-if="isDatePickerOpen"
                    class="absolute left-0 z-10 w-full top-full"
                  >
                    <DatePicker
                      v-model="gameDate"
                      mode="single"
                      expanded
                      @update:modelValue="selectDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex px-[20px] gap-[30px]">
            <div class="relative w-full rounded-[10px]">
              <input
                type="file"
                id="imageUpload"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
              />
              <div
                class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center cursor-pointer"
                @click="triggerFileInput"
              >
                <img
                  v-if="selectedImage || uploadedImageUrl"
                  :src="selectedImage || uploadedImageUrl"
                  class="w-full h-full object-cover rounded-[10px]"
                />
                <img v-else :src="Camera" />
              </div>
            </div>
            <textarea
              type="text"
              v-model="content"
              class="w-full p-0 outline-none resize-none text-4 bg-white01 placeholder-gray01 placeholder-4"
              placeholder="인증 사진은 단 하나만 업로드할 수 있으며,&#10;인증 글은 최대 500자까지만 작성 가능합니다!"
              @input="handleInput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.vc-day) {
  width: 40px !important; /* 날짜 셀의 너비 고정 */
  height: 40px !important; /* 날짜 셀의 높이 고정 */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  aspect-ratio: 1 / 1 !important; /* 정사각형 비율 유지 */
}

::v-deep(.vc-day.is-today) {
  background-color: transparent !important; /* 배경 투명 */
  border: 2px solid #265aeb !important; /* 파란색 테두리 */
  border-radius: 50%; /* 완전한 원 모양 */
  transform: scale(0.8) !important;
}
</style>
