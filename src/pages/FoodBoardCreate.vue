<script setup>
import { ref, onMounted } from "vue";
import { Delta } from "@vueup/vue-quill";
import CreateHeader from "@/components/CreateHeader.vue";
import { QuillEditor } from "@vueup/vue-quill";
import SearchIcon from "@/assets/icons/search.svg";
import Camera from "@/assets/icons/camera.svg";
import Baseball from "@/assets/icons/baseball.svg";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
const content = ref(new Delta()); // Delta 형식 기본값
const title = ref(""); // 제목 저장
const map = ref();
const markerList = ref([]);
const searchResults = ref([]); // 검색 결과 목록
const selectedMarker = ref(null); // 선택된 마커 정보
const keyword = ref("");

const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};

const foodBoardTag = [
  "# 야구장 내부 맛집",
  "# 야구장 주변 맛집",
  "# 야구 볼 수 있는 식당",
];

const onLoadKakaoMap = (mapRef, keyword) => {
  map.value = mapRef;
  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places();
  // 키워드로 장소를 검색합니다
  ps.keywordSearch(keyword, placesSearchCB);
};

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
const placesSearchCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();
    searchResults.value = data; // 검색 결과 저장
    for (let marker of data) {
      const markerItem = {
        lat: marker.y,
        lng: marker.x,
        infoWindow: {
          content: marker.place_name,
          visible: false,
        },
      };
      markerList.value.push(markerItem);
      bounds.extend(new kakao.maps.LatLng(Number(marker.y), Number(marker.x)));
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.value?.setBounds(bounds);
  }
};

// 마커 클릭 시 인포윈도우의 visible 값을 반전시킵니다
const onClickMapMarker = (markerItem) => {
  if (
    markerItem.infoWindow?.visible !== null &&
    markerItem.infoWindow?.visible !== undefined
  ) {
    markerItem.infoWindow.visible = !markerItem.infoWindow.visible;
  } else {
    markerItem.infoWindow.visible = true;
  }
};

// 검색 아이콘 클릭 또는 Enter 키를 누르면 검색 실행
const searchPlaces = () => {
  onLoadKakaoMap(map.value, keyword.value);
};

// 검색 결과 클릭 시 해당 위치로 지도 이동 및 마커 표시
const selectPlace = (place) => {
  const selectedPlace = {
    lat: place.y,
    lng: place.x,
    placeName: place.place_name,
  };
  selectedMarker.value = selectedPlace;

  // 지도 이동
  map.value?.setCenter(
    new kakao.maps.LatLng(selectedPlace.lat, selectedPlace.lng)
  );

  // 기존 마커 지우기
  markerList.value = [];

  // 새 마커 추가
  const markerItem = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng,
    infoWindow: {
      content: selectedPlace.placeName,
      visible: true,
    },
  };
  markerList.value.push(markerItem);
};

const selectedTag = ref([]);
const selectTag = (tag) => {
  if (!selectedTag.value.includes(tag)) {
    selectedTag.value.push(tag);
  }
};
const removeTag = (tag) => {
  selectedTag.value = selectedTag.value.filter((t) => t !== tag);
};
</script>

<template>
  <div class="flex flex-col px-[50px] gap-[50px]">
    <CreateHeader />
    <!-- 제목부분 -->
    <div>
      <input
        v-model="title"
        type="text"
        placeholder="제목"
        class="py-[15px] border-b border-white02 w-full outline-none text-3xl text-center"
      />
    </div>
    <div class="flex flex-col gap-[30px] mb-[142px]">
      <!-- 지도 검색 -->
      <div id="kakao-search">
        <!-- 지도 부분 -->
        <div class="w-full">
          <KakaoMap
            :width="988"
            :height="300"
            :lat="coordinate.lat"
            :lng="coordinate.lng"
            :draggable="true"
            @onLoadKakaoMap="onLoadKakaoMap"
          >
            <!-- 검색바 -->
            <div
              id="location-search-bar"
              class="relative w-full h-[40px] z-10 mt-2 pr-2 pl-2"
            >
              <input
                v-model="keyword"
                type="text"
                placeholder="맛집을 검색하세요"
                class="w-full h-[40px] bg-white border border-white02 rounded-[10px] px-5 py-5 text-[18px] text-black01 placeholder-[18px] placeholder-gray02 focus:outline-none"
                @keyup.enter="searchPlaces"
              />

              <button
                @click="searchPlaces"
                class="absolute right-5 top-1/2 transform -translate-y-1/2"
              >
                <img :src="SearchIcon" class="w-6 h-6" alt="검색" />
              </button>
            </div>
            <KakaoMapMarker
              v-for="(marker, index) in markerList"
              :key="marker.key === undefined ? index : marker.key"
              :lat="marker.lat"
              :lng="marker.lng"
              :infoWindow="marker.infoWindow"
              :clickable="true"
              @onClickKakaoMapMarker="onClickMapMarker(marker)"
            />
          </KakaoMap>
        </div>
        <!-- 검색 결과 리스트 -->
        <div class="flex justify-center w-full">
          <ul>
            <li
              v-for="(place, index) in searchResults"
              :key="index"
              class="cursor-pointer flex justify-between text-black01 hover:text-gray02"
              @click="selectPlace(place)"
            >
              <div>
                <p class="text-[18px] font-semibold">{{ place.place_name }}</p>
                <p class="text-[14px]">{{ place.address_name }}</p>
              </div>
              <div class="text-right">
                <p class="text-[14px]">{{ place.category_name }}</p>
                <p class="text-[14px]">{{ place.phone }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 에디터 부분 -->
      <div>
        <QuillEditor
          v-model:content="content"
          contentType="delta"
          :placeholder="'맛집을 마구 공유해주세요!\n맛집 사진은 최대 3개까지 업로드할 수 있습니다.'"
          theme="snow"
          toolbar="full"
          @ready="onEditorReady"
          class="w-full text-center placeholder:text-center"
        />
      </div>
      <div class="flex gap-[30px]">
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
        <button
          class="aspect-square w-full rounded-[10px] bg-white02 flex justify-center items-center"
        >
          <img :src="Camera" />
        </button>
      </div>
      <div class="flex flex-col gap-[20px]">
        <div class="flex gap-[10px] items-center">
          <img :src="Baseball" class="w-[18px] h-[18px]" />
          <p class="text-[14px] text-gray03">태그를 1개 이상 선택해주세요</p>
        </div>
        <div class="min-h-[39px] overflow-x-auto scrollbar-hide">
          <div class="flex items-center gap-x-[10px] w-max flex-nowrap">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
::v-deep(.ql-editor::before) {
  text-align: center;
  width: 100%;
  display: block;
  color: #b1b1b1;
  font-size: 18px;
  white-space: pre-wrap !important;
}
::v-deep(.ql-editor) {
  text-align: center;
  color: #0a0a0a;
  font-size: 18px;
  white-space: normal;
}
</style>
