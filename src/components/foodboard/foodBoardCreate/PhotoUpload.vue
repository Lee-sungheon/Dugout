<script setup>
import { ref } from "vue";
import { supabase } from "@/supabase.js";
import DeletePhoto from "@/assets/icons/delete_photo.svg";
import Camera from "@/assets/icons/camera.svg";

// 이미지 URL을 저장할 배열
const imageUrls = ref([null, null, null]); // 각 박스에 맞게 이미지 URL을 저장
const errorMessage = ref(null); // 에러 메시지

// 이미지 업로드 함수
const handleImageUpload = async (index) => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = async (e) => {
    const target = e.target;
    const file = target.files?.[0];

    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        errorMessage.value =
          "파일 크기가 너무 큽니다. 3MB 이하의 파일을 선택해주세요.";
        return;
      } else {
        errorMessage.value = null;
      }

      // 파일명을 URL-safe 방식으로 인코딩
      const encodedFileName = encodeURIComponent(file.name);

      // Supabase에 파일 업로드
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`public/${encodedFileName}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("업로드 오류:", error);
      } else {
        // 업로드된 이미지 URL 가져오기
        const { publicURL, error: urlError } = supabase.storage
          .from("images")
          .getPublicUrl(`${data.path}`);

        if (urlError) {
          console.error("URL 가져오기 오류:", urlError);
        } else {
          console.log("이미지 URL:", publicURL);
          // 해당 인덱스에 이미지 URL 저장
          imageUrls.value[index] = publicURL;
        }
      }
    }
  };

  fileInput.click();
};
</script>

<template>
  <section>
    <div class="flex gap-[30px]">
      <div
        v-for="imageUrl in imageUrls"
        :key="i"
        class="cursor-pointer w-full h-full aspect-square rounded-[10px] bg-white02"
      >
        <!-- 이미지를 업로드한 경우 -->
        <label v-if="imageUrl" class="relative w-full h-full">
          <img
            :src="imageUrl"
            alt="이미 업로드된 이미지"
            class="w-full h-full object-cover rounded-[10px]"
          />
          <img
            :src="DeletePhoto"
            alt="이미 업로드된 이미지를 삭제"
            class="absolute top-[10px] right-[10px] cursor-pointer"
          />
        </label>

        <!-- 이미지를 업로드하지 않은 경우 -->
        <div v-else>
          <div
            class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
            @click="handleImageUpload(i)"
          >
            <img :src="Camera" />
          </div>
        </div>
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="text-red-500 mt-2">
      {{ errorMessage }}
    </div>
  </section>
</template>

<style scoped>
/* input을 보이지 않게 하되 공간을 유지 */
input.hidden {
  display: none;
}
</style>
