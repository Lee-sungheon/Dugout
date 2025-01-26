<script setup>
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

import { useRouter, useRoute } from "vue-router";
import { getRestaurantPostDetailsById } from "@/api/supabase-api/restaurantPost";
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
import LocationViewer from "@/components/foodboard/LocationViewer.vue";

const router = useRouter();
const route = useRoute();

// 게시물 데이터 및 상태
const postDetails = ref(null);
const postImages = ref([]);
const post_id = ref(route.params.id);

// 게시물 데이터 가져오기
const fetchFoodPostDetail = async () => {
  try {
    const data = await getRestaurantPostDetailsById(post_id.value);
    postDetails.value = {
      ...data,
      // 이미지 배열에서 URL만 추출
      images: data.images.map((img) => img.url),
    };
    postImages.value = postDetails.value.images;
  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
  }
};

// 게시물 내용 파싱
const parsedContent = computed(() => {
  if (!postDetails.value?.content) return "";
  const doc = new DOMParser().parseFromString(
    postDetails.value.content,
    "text/html"
  );
  return doc.body.textContent || doc.body.innerText;
});

// 생성 시점 계산
const calculatedCreatedAt = computed(() => {
  if (!postDetails.value?.created_at) return "";
  return dayjs(postDetails.value.created_at).fromNow();
});

onMounted(() => {
  fetchFoodPostDetail();
});
</script>
<template>
  <div
    class="px-[50px] py-[30px] border-2 border-red-500 items-center flex flex-col"
  >
    <!-- 뒤로가기 버튼 -->
    <div class="mb-[50px] flex w-full">
      <button @click="router.go(-1)">
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>

    <!-- 게시물 상세 페이지 -->
    <div class="flex flex-col gap-[50px] w-[990px] border-2 border-blue-500">
      <!-- 헤더 정보 -->
      <PostHeader
        v-if="postDetails"
        :title="postDetails.title"
        :nickname="postDetails.name"
        :time="calculatedCreatedAt"
        :profileImage="postDetails.author_image"
      />

      <!-- 게시물 내용 -->
      <div
        v-if="postDetails"
        class="mt-[50px] gap-[50px] pb-[50px] flex flex-col border-b border-b-gray01"
      >
        <div class="flex flex-col gap-[30px]">
          <LocationViewer :postLocation="postDetails.location" />
          <div>
            <!-- <div
              class="w-full h-full py-5 text-[18px] text-black01 text-center"
            >
              {{ parsedContent }}
            </div> -->
            <div
              v-html="postDetails.content"
              class="prose ql-editor max-w-none"
            ></div>
          </div>

          <!-- 이미지 목록 -->
          <div class="flex w-full h-[310px] gap-[30px]">
            <div
              v-for="(imageUrl, index) in postImages"
              :key="index"
              class="flex-1 aspect-square rounded-[10px] overflow-hidden"
            >
              <img :src="imageUrl" class="object-cover w-full h-full" />
            </div>
          </div>
        </div>

        <!-- 태그 목록 -->
        <div class="flex gap-[10px]">
          <span
            v-for="(tag, index) in postDetails.tags"
            :key="index"
            class="text-[18px] text-gray03"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 댓글 섹션 -->
      <CommentSection
        v-if="postDetails"
        :like-length="postDetails.likes"
        :comment-length="postDetails.comments"
      />
    </div>
  </div>
</template>
