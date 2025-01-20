<script setup>
import Setting from "@/assets/icons/setting.svg";
import myTeamToggle from "@/assets/icons/my_team_toggle.svg";
import { ref } from "vue";
import { twMerge } from "tailwind-merge";

const isChangeProfile = ref(false);
const isDropdownOpen = ref(false);

//퍼블리싱용 샘플 데이터 (추후 API 불러와 처리하기)
const posts = [
  {
    id: "1",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
  {
    id: "2",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
  {
    id: "3",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
  {
    id: "4",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
  {
    id: "5",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
  {
    id: "6",
    image:
      "https://cdn.pixabay.com/photo/2023/05/11/03/34/baseball-7985433_1280.jpg",
  },
];

const kboTeams = [
  "LG 트윈스",
  "두산 베어스",
  "SSG 랜더스",
  "NC 다이노스",
  "한화 이글스",
  "기아 타이거즈",
  "삼성 라이온즈",
  "KT 위즈",
  "키움 히어로즈",
  "롯데 자이언츠",
];

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeProfile = () => {
  isChangeProfile.value = !isChangeProfile.value;
};
</script>
<template>
  <div class="gap-[148px] mt-[152px]">
    <div className="px-[147px] flex flex-col items-center">
      <div class="flex items-center gap-[20px] mt-[52px]">
        <div
          class="w-[240px] h-[240px] rounded-full sticky flex flex-shrink-0"
          :class="{ 'outline outline-[5px] outline-Twins ': isChangeProfile }"
        >
          <img
            src="https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg"
            class="w-[240px] h-[240px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[50px]">
          <div class="relative inline-block w-auto">
            <button
              @click="isChangeProfile ? toggleDropdown() : null"
              :class="
                twMerge(
                  'inline-flex flex-nowrap whitespace-nowrap items-center w-[173px] h-[39px] px-[15px] gap-[10px] rounded-[10px] bg-white02 text-4 text-black01 transition-all',
                  isDropdownOpen &&
                    'rounded-b-[0px] bg-white01 text-gray02 border border-gray02 border-[1px] border-b-transparent'
                )
              "
            >
              팀을 선택해주세요
              <img
                v-if="isChangeProfile"
                :src="myTeamToggle"
                class="cursor-pointer w-[18px] h-[10.28px]"
              />
            </button>
            <div
              v-if="isDropdownOpen"
              class="absolute left-0 top-full w-[173px] bg-white01 border border-gray02 border-t-transparent rounded-b-[10px] overflow-hidden transition-all z-10 transform translate-y-[-1px]"
            >
              <ul>
                <li
                  v-for="(team, index) in kboTeams"
                  :key="index"
                  class="flex-nowrap whitespace-nowrap px-4 py-2 text-gray02 text-4 cursor-pointer"
                >
                  {{ team }} 팬
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-[10px]">
              <h2 className="text-[24px] text-black01 font-bold">닉네임</h2>
              <button @click="changeProfile">
                <img :src="Setting" class="w-[16.97px] h-[18px]" />
              </button>
            </div>
            <p className="text-[18px] text-gray03 ">
              엘지를 너무나 사랑하는 야린이!!
            </p>
          </div>
        </div>
        <div className="flex ml-[148px] gap-[30px] mr-[98px] mt-[50px]">
          <div className="flex flex-col items-center gap-[24px]">
            <span className="text-black01 text-[26px] font-bold"> 6 </span>
            <span className="text-black02 text-[18px] whitespace-nowrap">
              게시물
            </span>
          </div>
          <div className="flex flex-col items-center gap-[24px] ">
            <span className="text-black01 text-[26px] font-bold"> 10 </span>
            <span className="text-black02 text-[18px] whitespace-nowrap">
              댓글
            </span>
          </div>
          <div className="flex flex-col items-center gap-[24px]">
            <span className="text-black01 text-[26px] font-bold"> 3 </span>
            <span className="text-black02 text-[18px] whitespace-nowrap">
              좋아요
            </span>
          </div>
        </div>
      </div>
      <div class="w-full max-w-[990px] mt-[40px]">
        <div
          className="py-[10px] mb-[100.33px] border-t border-gray01  grid grid-cols-3 gap-[10px]"
        >
          <div
            v-for="post of posts"
            :key="post.id"
            className="w-full aspect-square flex flex-col justify-center items-center border border-1 rounded-[10px] border-whiteDark text-[14px] text-gray "
          >
            <img
              :src="post.image"
              class="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
