import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "@/supabase.js";

export const useImageStore = defineStore("image", () => {
  const imageUrls = ref([null, null, null]);
  const errorMessage = ref(null);

  const setImageUrls = (images) => {
    imageUrls.value = [...images, ...Array(3 - images.length).fill(null)].slice(0, 3);
  };

  const uploadImage = async (file, index) => {
    if (file.size > 3 * 1024 * 1024) {
      errorMessage.value = "파일 크기가 너무 큽니다. 3MB 이하의 파일을 선택해주세요.";
      return;
    } else {
      errorMessage.value = null;
    }

    const uniqueFileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`viewing_certification/${uniqueFileName}`, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      console.error("업로드 오류:", error);
      errorMessage.value = "이미지 업로드 중 오류가 발생했습니다.";
    } else {
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(`viewing_certification/${uniqueFileName}`);

      if (publicUrlData) {
        console.log("이미지 URL:", publicUrlData.publicUrl);
        imageUrls.value[index] = publicUrlData.publicUrl;
      } else {
        console.error("공개 URL을 가져오는 데 실패했습니다.");
        errorMessage.value = "이미지 URL을 가져오는 데 실패했습니다.";
      }
    }
  };

  const removeImage = (index) => {
    imageUrls.value[index] = null;
  };

  const filterNullImage = () => {
    return imageUrls.value.filter((url) => url !== null);
  };

  const resetImageData = () => {
    imageUrls.value = [null, null, null];
    errorMessage.value = null;
  };

  return {
    imageUrls,
    errorMessage,
    setImageUrls,
    uploadImage,
    removeImage,
    filterNullImage,
    resetImageData, 
  };
});
