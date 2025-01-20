<script setup>
import Setting from "@/assets/icons/setting.svg";

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
</script>
<template>
  <div class="gap-[148px]">
    <div className="px-[147px] flex flex-col items-center">
      <div class="flex items-center gap-[20px] mt-[52px]">
        <div
          className="w-[240px] h-[240px] rounded-full sticky flex flex-shrink-0"
        >
          <img
            src="https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg"
            class="w-[240px] h-[240px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-[50px]">
          <button
            class="w-[113px] h-[39px] rounded rounded-[10px] bg-Twins text-4 text-white01"
          >
            LG 트윈스 팬
          </button>
          <div>
            <div class="flex items-center gap-[10px]">
              <h2 className="text-[24px] text-black01 font-bold">닉네임</h2>
              <img :src="Setting" class="w-[16.97px] h-[18px]" />
            </div>
            <p className="text-[18px] text-gray03 ">
              엘지를 너무나 사랑하는 야린이!
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
              팔로워
            </span>
          </div>
          <div className="flex flex-col items-center gap-[24px]">
            <span className="text-black01 text-[26px] font-bold"> 3 </span>
            <span className="text-black02 text-[18px] whitespace-nowrap">
              팔로잉
            </span>
          </div>
        </div>
      </div>
      <div class="w-full max-w-[826px] mt-[40px]">
        <div
          className="py-[10px] border-t border-whiteDark dark:border-gray grid grid-cols-3 gap-2"
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
