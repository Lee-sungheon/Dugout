<script setup>
import { onMounted, ref, watch } from "vue";
import deleteBtn from "../assets/icons/delete-btn.svg";
import FoodBoardCard from "@/components/foodboard/FoodBoardCard.vue";
import PostArrow from "@/assets/icons/post_arrow.svg";
import { foodBoardTag, teamID } from "@/constants";
import { getRestaurantPostsByTagAndClub } from "@/api/supabase-api/restaurantPost";
import { useRoute } from "vue-router";

const route = useRoute();
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]);
const restaurantPosts = ref([]);
const selectedTag = ref([]);

const selectTag = (tag) => {
  if (!selectedTag.value.includes(tag)) {
    selectedTag.value.push(tag);
  }
};
const removeTag = (tag) => {
  selectedTag.value = selectedTag.value.filter((t) => t !== tag); // 태그가 있으면 제거
};

const fetchFoodBoardList = async () => {
  try {
    const restaurantPostsData = await getRestaurantPostsByTagAndClub(
      clubId.value,
      selectedTag.length > 0 ? selectedTag.value : null
    );
    return { data: restaurantPostsData, error: null };
  } catch (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
    return { data: null, error };
  }
};

watch(selectedTag, async () => {
  console.log("selectedTag changed:", selectedTag.value); // 로그 추가
  const { data, error } = await fetchFoodBoardList();
  if (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
  } else {
    restaurantPosts.value = data;
  }
});

// 페이지가 로드될 때 데이터를 한 번 불러옴
onMounted(async () => {
  const { data, error } = await fetchFoodBoardList();
  console.log("Fetched onMounted:", data); // 로그 추가
  if (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
  } else {
    restaurantPosts.value = data;
  }
});
</script>

<template>
  <div class="flex gap-[30px] flex-col px-[50px] py-[30px]">
    <div class="cursor-pointer">
      <RouterLink
        :to="`/${teamName}/foodboard/create`"
        class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px]"
      >
        직관 맛집 공유하기
        <img :src="PostArrow" class="w-[14px] h-[8px]" />
      </RouterLink>
    </div>
    <div class="min-h-[39px] overflow-x-auto scrollbar-hide">
      <div class="flex items-center gap-x-[10px] w-max flex-nowrap">
        <!-- 태그 버튼 -->
        <button
          v-for="(tag, index) of foodBoardTag"
          :key="index"
          @click="selectTag(tag)"
          class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
          :class="{
            'bg-gray02 text-white01 gap-[10px]': selectedTag.includes(tag),
            'bg-white02 text-black01': !selectedTag.includes(tag),
          }"
        >
          <p>{{ tag }}</p>
          <img
            v-if="selectedTag.includes(tag)"
            @click.stop="removeTag(tag)"
            :src="deleteBtn"
            class="cursor-pointer"
          />
        </button>
      </div>
    </div>
    <section class="flex flex-col gap-[30px]">
      <!-- 게시물 필터링 후 출력 -->
      <div
        v-if="
          restaurantPosts.length === 0 ||
          restaurantPosts.filter(
            (post) =>
              selectedTag.length === 0 ||
              selectedTag.some((tag) => post.tags.includes(tag))
          ).length === 0
        "
      >
        <section
          class="flex items-center justify-center w-full h-screen bg-white02 border border-white02 rounded-[10px]"
        >
          <h1>게시물이 없습니다</h1>
        </section>
      </div>
      <FoodBoardCard
        v-for="(restaurantPost, index) in restaurantPosts.filter(
          (post) =>
            selectedTag.length === 0 ||
            selectedTag.some((tag) => post.tags.includes(tag))
        )"
        :key="index"
        :restaurantPostData="restaurantPost"
        :teamName
      />
    </section>
  </div>
</template>
