<script setup>
import DropdownSelect from "@/components/common/DropdownSelect.vue";
import CreateHeader from "@/components/CreateHeader.vue";
import Camera from "@/assets/icons/camera.svg";
import { ref } from "vue";

const title = ref("");
const content = ref("");
const selectedImage = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  document.getElementById("imageUpload").click();
};

//경기일 오늘 날짜를 기본으로 지정
const formatDateToKoreanStyle = (date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  })
    .format(date)
    .replace(/\./g, ".");
};

const gameDateStatus = ref(formatDateToKoreanStyle(new Date()));
</script>
<template>
  <div class="px-[50px]">
    <CreateHeader />
    <div class="gap-[50px]">
      <div class="mt-[40px] mb-[85px]">
        <div class="flex flex-col gap-[30px]">
          <div class="w-full pb-[30px] border-b-gray01 border-b-[1px]">
            <input
              type="text"
              v-model="title"
              class="w-full text-[30px] placeholder-gray01 bg-white01 placeholder-[30px] text-center outline-none"
              placeholder="제목"
            />
          </div>
          <div class="flex justify-between">
            <div
              class="flex justify-between items-center h-[40px] w-[425px] gap-2 px-[20px]"
            >
              <div class="w-[100px]">
                <span
                  class="text-black01 text-bold text-[18px] whitespace-nowrap"
                  >경기일</span
                >
              </div>
              <DropdownSelect
                v-model:selectedOption="gameDateStatus"
                part="경기일"
              />
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
                  v-if="selectedImage"
                  :src="selectedImage"
                  alt="Uploaded"
                  class="w-full h-full object-cover"
                />
                <img v-else :src="Camera" />
              </div>
            </div>
            <textarea
              type="text"
              v-model="content"
              class="w-full p-0 outline-none resize-none text-4 bg-white01 placeholder-gray01 placeholder-4"
              placeholder="인증 사진은 단 하나만 업로드할 수 있으며,
인증 글은 최대 500자까지만 작성 가능합니다!"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
