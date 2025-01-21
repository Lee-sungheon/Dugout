<script setup>
import likeIcon from "@/assets/icons/like.svg";
import commentIcon from "@/assets/icons/comment.svg";
</script>
<template>
  <RouterLink
    to="/team/foodboard/:id"
    class="w-full h-auto border border-red-500 cursor-pointer"
  >
    <div class="flex w-full border-b border-white02">
      <!-- 왼쪽 이미지 -->
      <div class="w-[350px] h-[200px]">
        <img
          src="https://user-images.githubusercontent.com/62782245/147930224-2fa3b723-b832-4d57-8fc9-7eaf4094caee.png"
          alt="게시물 이미지"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- 오른쪽 게시물 정보 -->
      <div class="flex px-[30px] py-[20px] flex-col justify-between">
        <!-- 제목 / 내용 -->
        <div class="flex flex-col gap-[15px]">
          <div class="gap[10px]">
            <span class="text-gray02 text-[14px]"># 야구장 주변 맛집</span>
            <span class="text-gray02 text-[14px]"
              ># 야구장 볼 수 있는 식당</span
            >
          </div>
          <span class="text-black01 text-[24px] font-bold"
            >야구장 주변 맛집... 등등 제목 영역</span
          >
          <span class="text-gray03 text-[16px] line-clamp-1"
            >글을 처음부터 주어진 영역을 채울 때까지의 텍스트를 가져와 화면에
            출력합니다. 글을 처음부터 주어진 영역을 채울 때까지의 텍스트를
            가져와 화면에 출력합니다.</span
          >
        </div>
        <!-- 닉네임 / 작성일 -->
        <div class="flex items-center w-[280px] bottom-0 justify-between">
          <div class="flex text-[12px] gap-[10px] items-center">
            <div class="w-[25px] h-[25px] rounded-full overflow-hidden">
              <img
                src="https://news.nateimg.co.kr/orgImg/aj/2024/01/21/20240121132054894779.jpg"
                class="w-full h-full object-cover"
              />
            </div>
            <span class="text-gray03">닉네임</span>
            <span class="text-gray02">4시간 전</span>
          </div>
          <!-- 좋아요 / 댓글 -->
          <div class="flex gap-[20px]">
            <div class="flex gap-[10px]">
              <img :src="likeIcon" alt="하트 이미지" />
              <span class="text-gray02">20</span>
            </div>
            <div class="flex gap-[10px]">
              <img :src="commentIcon" alt="말풍선 이미지" />
              <span class="text-gray02">20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
<style scoped></style>
