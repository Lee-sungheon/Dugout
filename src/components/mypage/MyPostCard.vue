<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const props = defineProps ({
  displayedData: {
    type: Array
  },
})
</script>
<template>
 <div v-for="post of props.displayedData" :key="`${post.post_type}${post.id}`" className="w-full aspect-square flex flex-col justify-center items-center border border-1 rounded-[10px] border-whiteDark text-[14px] text-gray">
    <RouterLink  :to="`/${post.club_eng_name}/${post.post_type}/${post.post_id}` " class="w-full h-full object-cover rounded-[10px]">
      <img v-if="post.thumbnail_url" :src="post.thumbnail_url" class="w-full h-full object-cover rounded-[10px]"/>
      <KakaoMap v-else-if="post.lat && post.lng" class="w-full h-full object-cover"
        :style="{ width: '100%', height: '100%' }"
        :lat="post.lat"
        :lng="post.lng"
        :draggable="false"
        :scrollwheel="false"
        @onLoadKakaoMap="onLoadKakaoMap">
        <KakaoMapMarker
          :lat="post.lat"
          :lng="post.lng"/>
      </KakaoMap>
    </RouterLink>
    </div>
</template>
