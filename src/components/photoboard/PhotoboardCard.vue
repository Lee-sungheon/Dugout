<script setup>
import Like from "@/assets/icons/like.svg";
import Comment from "@/assets/icons/comment.svg";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  post: Object,
});
</script>
<template>
  <RouterLink
    :to="`/${route.params.team}/photoboard/${props.post.id}`"
    class="flex flex-col justify-between bg-white02 rounded-[10px] pt-[10px] px-[10px] pb-[15px] h-[335px] cursor-pointer"
  >
    <div class="w-full flex-grow overflow-hidden mb-[15px] rounded-[10px]">
      <img :src="props.post.image" class="w-full h-full object-cover" />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-[10px]">
        <img
          :src="props.post.author_image"
          class="w-[25px] h-[25px] object-cover rounded-full flex-nowrap"
        />
        <p>{{ props.post.name || "작성자이름 없음" }}</p>
      </div>
      <div class="flex items-center gap-[20px]">
        <div class="flex items-center gap-[10px]">
          <img :src="Like" class="w-16.39px h-14px" />
          <p class="text-gray02 text-3">{{ props.post.likes }}</p>
        </div>
        <div class="flex items-center gap-[10px]">
          <img :src="Comment" class="w-16.39px h-14px" />
          <p class="text-gray02 text-3">{{ props.post.comments }}</p>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
<style scoped></style>
