<script setup>
import DropdownSelect from "@/components/common/DropdownSelect.vue";
import CreateHeader from "@/components/CreateHeader.vue";
import Camera from "@/assets/icons/camera.svg";
import { ref } from "vue";

const title = ref("");
const content = ref("");

//개발할 때 달력 라이브러리로
const gameDateStatus = ref("2025.03.22. 토요일");
const gameDateOptions = ["2025.03.22. 토요일", "2025.03.23. 일요일"];
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
              class="w-full text-[30px] placeholder-gray01 placeholder-[30px] text-center outline-none"
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
                :options="gameDateOptions"
                part="경기일"
              />
            </div>
          </div>
          <div class="flex px-[20px] gap-[30px]">
            <button
              class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
            >
              <img :src="Camera" />
            </button>
            <textarea
              type="text"
              v-model="content"
              class="w-full p-0 outline-none resize-none text-4 placeholder-gray01 placeholder-4"
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
