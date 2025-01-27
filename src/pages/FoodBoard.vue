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
const selectedTag = ref(null); // 하나의 태그만 선택되도록 변경

const selectTag = (tag) => {
  if (selectedTag.value === tag) {
    selectedTag.value = null; // 이미 선택된 태그가 클릭되면 선택 해제
  } else {
    selectedTag.value = tag; // 새로운 태그를 선택
  }
};

const fetchFoodBoardList = async () => {
  try {
    const restaurantPostsData = await getRestaurantPostsByTagAndClub(
      clubId.value,
      selectedTag.value ? [selectedTag.value] : null // 선택된 태그가 있으면 그 태그만 필터링
    );

    // 최신순
    const sortedPosts = restaurantPostsData.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return { data: sortedPosts, error: null };
  } catch (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
    return { data: null, error };
  }
};

watch(selectedTag, async () => {
  console.log("selectedTag 변경:", selectedTag.value);
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
  console.log("데이터를 마운팅 했습니다.", data);
  if (error) {
    console.error("데이터를 불러오는 도중에 오류가 발생했습니다.");
  } else {
    restaurantPosts.value = data;
  }
});

// 중복된 postId를 가진 게시물 제거 함수
const removeDuplicatePosts = (posts) => {
  const uniquePosts = [];
  const postIds = new Set();

  posts.forEach((post) => {
    if (!postIds.has(post.id)) {
      uniquePosts.push(post);
      postIds.add(post.id);
    }
  });

  return uniquePosts;
};
</script>

<template>
  <div class="flex flex-col px-[50px] py-[30px] items-center">
    <div class="w-[990px] gap-[50px] flex flex-col">
      <RouterLink
        :to="`/${teamName}/foodboard/create`"
        class="flex items-center justify-center w-full font-medium bg-white02 py-[10px] rounded-[10px] gap-[10px] cursor-pointer"
      >
        직관 맛집 공유하기
        <img :src="PostArrow" class="w-[14px] h-[8px]" />
      </RouterLink>

      <div class="min-h-[39px] overflow-x-auto scrollbar-hide">
        <div class="flex items-center gap-x-[10px] w-max flex-nowrap">
          <!-- 태그 버튼 -->
          <button
            v-for="(tag, index) of foodBoardTag"
            :key="index"
            @click="selectTag(tag)"
            class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
            :class="{
              'bg-gray02 text-white01 gap-[10px]': selectedTag === tag,
              'bg-white02 text-black01': selectedTag !== tag,
            }"
          >
            <p>{{ tag }}</p>
            <img
              v-if="selectedTag === tag"
              @click.stop="selectTag(tag)"
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
                selectedTag === null ||
                post.tags.some((tag) => tag === selectedTag) // 태그명으로 필터링
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
          v-for="(restaurantPost, index) in removeDuplicatePosts(
            restaurantPosts.filter(
              (post) =>
                selectedTag === null ||
                post.tags.some((tag) => tag === selectedTag) // 태그명으로 필터링
            )
          )"
          :key="index"
          :restaurantPostData="restaurantPost"
          :teamName
        />
      </section>
    </div>
  </div>
</template>
