<script setup>
// day.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 가져오기
import { deleteComment, updateComment } from "@/api/supabase-api/common";
import { useRoute } from "vue-router";
import { boardToCommentTableMapping } from "@/constants";
import { nextTick, ref, watch } from "vue";

// day.js
dayjs.extend(relativeTime); // relativeTime 플러그인 활성화
dayjs.locale("ko"); // 한국어 로케일 설정

const props = defineProps({
  comment: {
    type: Object,
  },
  comments: {
    type: Array,
  },
});
const emit = defineEmits(["update-comments"]);

const route = useRoute();
const boardName = route.path.split("/")[2]; // 게시판 이름
const isEditing = ref(false);
const inputRef = ref(null); // input 엘리먼트 참조
const text = ref(props.comment.content); // 댓글 수정할 때 사용

// 댓글 삭제하는 함수
const fetchDeleteComment = async () => {
  try {
    await deleteComment(
      boardToCommentTableMapping[boardName],
      props.comment.id
    );
    const newcomments = props.comments.filter(
      (comment) => comment.id !== props.comment.id
    );
    emit("update-comments", newcomments); // 부모에 요청
  } catch (error) {
    console.error("댓글을 삭제하는도중 오류가 발생했습니다.");
  }
  console.log("댓글", props.comments);
};

// 댓글 편집로 모드 전환 함수
const handleEdit = () => {
  isEditing.value = true;
  // DOM 업데이트 후에 focus() 실행
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

// 댓글 편집 모드 전환 취소 함수
const handleCancel = () => {
  isEditing.value = false;
};

// 댓글 수정하는 함수
const fetchUpdateComment = async () => {
  try {
    const data = await updateComment(
      boardToCommentTableMapping[boardName],
      props.comment.id,
      text.value
    );
    console.log("수정확인", data);
    // isEditing 상태 변경
    isEditing.value = false;

    // 업데이트된 comments 생성
    const newComments = props.comments.map((comment) => {
      if (comment.id === props.comment.id) {
        return { ...comment, ...data[0] }; // Supabase 응답 구조에 맞게 data[0] 사용
      }
      return comment;
    });
    emit("update-comments", newComments); // 부모에 요청
  } catch (error) {
    console.error("댓글을 삭제하는도중 오류가 발생했습니다.");
  }
  console.log("댓글", props.comments);
};
</script>
<template>
  <div class="pb-5 border-b border-white02">
    <div class="flex items-center justify-between">
      <div class="flex gap-[10px] items-center">
        <img
          :src="props.comment.user_info.image"
          alt="유저 프로필"
          class="w-[35px] h-[35px] rounded-full"
        />
        <span class="text-sm font-bold text-gray03">{{
          props.comment.user_info.name
        }}</span>
        <span class="text-xs text-gray02">{{
          dayjs(props.comment.created_at).fromNow()
        }}</span>
      </div>
      <!-- 기본모드 -->
      <div class="flex text-xs text-gray02 gap-[4px]" v-if="!isEditing">
        <button class="hover:text-gray03" @click="handleEdit">수정</button>
        <span>|</span>
        <button class="hover:text-gray03" @click="fetchDeleteComment">
          삭제
        </button>
      </div>
      <!-- 편집모드 -->
      <div class="flex text-xs text-gray02 gap-[4px]" v-else>
        <button class="hover:text-gray03" @click="handleCancel">취소</button>
        <span>|</span>
        <button class="hover:text-gray03" @click="fetchUpdateComment">
          저장
        </button>
      </div>
    </div>
    <div class="px-[45px]">
      <span v-if="!isEditing" class="text-[#515151]">{{
        props.comment.content
      }}</span>
      <!-- 수정 버튼 눌렀을 때만 띄우기 -->
      <input
        v-else
        v-model="text"
        type="text"
        class="p-2 px-4 bg-white01 rounded-[8px] border border-gray01 outline-none w-full"
        placeholder="댓글을 입력해주세요"
        ref="inputRef"
      />
    </div>
  </div>
</template>

<style ßscoped></style>
