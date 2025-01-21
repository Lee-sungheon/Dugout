<script setup>
import backIcon from "@/assets/icons/back.svg";
import CommentSection from "@/components/CommentSection.vue";
import PostHeader from "@/components/PostHeader.vue";
</script>
<template>
  <div class="px-[50px] py-[30px]">
    <!-- 뒤로가기 -->
    <div class="border-2 border-green-500 mb-[50px] flex">
      <button>
        <img :src="backIcon" alt="뒤로가기 아이콘" />
      </button>
    </div>
    <!-- 상세페이지 -->
    <div class="flex flex-col gap-[50px]">
      <!-- 상세 페이지 정보 -->
      <PostHeader
        crewBoard
        title="20250322 | LG 트윈스 | 잠실 야구장 | 여자 | 20대 | 1명 이상"
        nickname="닉네임"
        time="4시간 전"
      />
      <!-- 게시물 내용 -->
      <div class="pb-[50px] border-b border-gray01 flex flex-col gap-[50px]">
        <span>
          안녕하세요!<br />
          지방 사는 20대 엘팬입니다.<br />
          오랜만에 서울에 올라와서 야구를 보고싶은데 같이 볼 사람이 없네요 🥺<br />
          그래서 용기를 내어 글을 써봅니다!<br />
          같이 재밌게 야구 보고 와요!
        </span>
        <div
          class="flex flex-col text-lg border-2 border-red-500 text-black01 gap-[30px]"
        >
          <div>
            <span class="inline-block w-[100px]">경기일</span>
            <span class="font-bold">| 2025.03.22.토요일</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">응원팀</span>
            <span class="font-bold">| LG 트윈스</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">경기 장소</span>
            <span class="font-bold">| 잠실 야구장</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">작성자 성별</span>
            <span class="font-bold">| 여자</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">작성자 연령</span>
            <span class="font-bold">| 20대</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">크루 성별</span>
            <span class="font-bold">| 여자</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">크루 연령</span>
            <span class="font-bold">| 20대</span>
          </div>
          <div>
            <span class="inline-block w-[100px]">인원</span>
            <span class="font-bold">| 1명 이상</span>
          </div>
        </div>
      </div>

      <!-- 코멘트 부분 -->
      <CommentSection />
    </div>
  </div>
</template>

<style scoped></style>
