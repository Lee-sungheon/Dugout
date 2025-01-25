<script setup>
import { useImageStore } from "@/stores/useImageStore";
import DeletePhoto from "@/assets/icons/delete_photo.svg";
import Camera from "@/assets/icons/camera.svg";

const imageStore = useImageStore();

const handleFileChange = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    imageStore.uploadImage(file, index);
  }
};
</script>
<template>
  <section>
    <div class="flex gap-[30px]">
      <div
        v-for="(imageUrl, i) in imageStore.imageUrls"
        :key="i"
        class="cursor-pointer w-full h-full rounded-[10px] bg-white02 aspect-square"
      >
        <!-- 이미지를 업로드한 경우 -->
        <div v-if="imageUrl" class="relative w-full h-full">
          <img
            :src="imageUrl"
            alt="이미 업로드된 이미지"
            class="w-full h-full object-cover rounded-[10px]"
          />
          <img
            :src="DeletePhoto"
            alt="이미 업로드된 이미지를 삭제"
            class="absolute top-[10px] right-[10px] cursor-pointer"
            @click="imageStore.removeImage(i)"
          />
        </div>

        <!-- 이미지를 업로드하지 않은 경우 -->
        <label
          v-else
          class="relative flex justify-center items-center w-full h-full"
        >
          <img
            :src="Camera"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <input
            type="file"
            class="absolute inset-0 opacity-0 cursor-pointer"
            @change="(event) => handleFileChange(event, i)"
          />
        </label>
      </div>
    </div>
    <!-- 에러 메시지 -->
    <div v-if="imageStore.errorMessage" class="text-red-500 mt-2">
      {{ imageStore.errorMessage }}
    </div>
  </section>
</template>
