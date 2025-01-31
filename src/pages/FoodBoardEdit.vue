<script setup>
import CreateHeader from '@/components/CreateHeader.vue';
import PhotoUpload from '@/components/foodboard/foodBoardCreate/PhotoUpload.vue';
import MapSelectAndView from '@/components/foodboard/foodBoardCreate/MapSelectAndView.vue';
import TagsSelect from '@/components/foodboard/foodBoardCreate/TagsSelect.vue';
import { QuillEditor } from '@vueup/vue-quill';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getRestaurantPostDetailsById, updateRestaurantLocation, updateRestaurantPostTags, updateRestaurantPost } from '@/api/supabase-api/restaurantPost';
import { updateRestaurantPostImage } from '@/api/supabase-api/restaurantImage';
import { teamID } from '@/constants/index';
import { useMapStore } from '@/stores/mapStore';
import { useImageStore } from '@/stores/useImageStore';

const imageStore = useImageStore();
const mapStore = useMapStore();
const router = useRouter();
const route = useRoute();
const postId = route.params.id;
const teamName = ref(route.params.team);
const clubId = ref(teamID[teamName.value]);

const postDetails = ref({})
const title = ref("");
const content = ref("");
const selectedTags = ref([]);
const location = ref({})
const finalSelectedLocation = mapStore.finalSelectedLocation;

const tagErrorClass = ref("");
const tagErrorMessage = ref("태그를 1개 이상 선택해주세요");


const loadPostDetail = async () => {
  try {
    const data = await getRestaurantPostDetailsById(postId);
    postDetails.value = {
    ...data,
    images: data.images?.map((img) => img.url),
    };
    title.value = postDetails.value.title;
    content.value = postDetails.value.content;
    selectedTags.value = postDetails.value.tags;
    location.value = postDetails.value.location
    mapStore.setFinalSelectedLocation({place_name:location.value.name,address_name:location.value.address,category_name: location.value.category, x: location.value.longitude, y: location.value.latitude, phone: location.value.contact, place_url: location.value.url})
    mapStore.setIsSelectedLocationVisable(true);
    imageStore.setImageUrls(postDetails.value.images);
  } catch (error) {
    console.error("게시물 불러오기 실패", error);
  }
};

onMounted(async() => {
   await loadPostDetail();
});

const handleTagUpdate = (tags) => {
  selectedTags.value = tags;
  if (selectedTags.value.length > 0) {
    tagErrorClass.value = "";
  }
};

const handlePostUpdate = async () => {
  if (!title.value.trim()) {
    document.querySelector('input[type="text"]').focus();
    return;
  }
  if (!content.value.trim()) {
    const contentElement = document.querySelector(".ql-editor");
    contentElement.focus();
    contentElement.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (selectedTags.value.length === 0) {
    tagErrorClass.value = "error";
    document.getElementById("tags-select").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      tagErrorClass.value = "";
    }, 3000);
    return;
  }
  try {
    await updateRestaurantPost(postId, title.value, content.value, clubId.value);
    await updateRestaurantLocation(data[0].id,
      finalSelectedLocation.value.place_name,
      finalSelectedLocation.value.address_name,
      finalSelectedLocation.value.category_name,
      finalSelectedLocation.value.y,
      finalSelectedLocation.value.x,
      finalSelectedLocation.value.phone,
      finalSelectedLocation.value.place_url);
    await updateRestaurantPostTags(postId, selectedTags.value);
    await updateRestaurantPostImage(postId, imageStore.filterNullImage());
    router.push(`/${teamName.value}/foodboard`);
  } catch (error) {
    console.error("게시물 수정 실패", error);
  }
};

const cancelRestaurantPost = () => {
  router.go(-1);
  mapStore.resetLocationData();
};
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="w-[1090px] flex flex-col">
      <CreateHeader :handleRegister="handlePostUpdate" :handleCancel="cancelRestaurantPost" />
      <div>
        <input
          v-model="title"
          type="text"
          placeholder="제목"
          class="border-b w-full outline-none text-center py-[15px] text-3xl bg-white01"
        />
      </div>
      <section id="post_content--input" class="flex flex-col gap-[30px] mb-[142px] w-full">
        <MapSelectAndView />
        <div class="w-full border border-white02">
          <QuillEditor
            v-model:content="content"
            contentType="html"
            :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
            theme="snow"
          />
        </div>
        <PhotoUpload />
        <div id="tags-select" class="flex flex-col gap-[20px]">
          <div class="flex gap-[10px] items-center">
            <p :class="tagErrorClass" class="text-[14px] text-gray03">{{ tagErrorMessage }}</p>
          </div>
          <TagsSelect :initial-tags="selectedTags" @update:selectedTag="handleTagUpdate" />
        </div>
      </section>
    </div>
  </section>
</template>
