<script setup>
import { defineProps } from "vue";
// 메시지와 닫기/취소 함수를 props로 전달하면 됩니다.
// 메시지는 자동 줄바꿈 됨. 형식 예시: "삭제 후에는 복구할 수 없습니다\n삭제하시겠습니까?"
defineProps({
  message: {
    type: String,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

// onCancel. + ESC 키로도 모달을 닫을 수 있습니다.
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      onCancel();
    }
  });
});

// message에 따라 다른 
</script>

<template>
  <!-- 모달 -->
  <div
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="w-96 h-60 py-12 bg-neutral-50 rounded-lg border border-zinc-100 flex-col justify-center items-center gap-2.5 inline-flex"
    >
      <div class="h-36 flex-col justify-center items-center gap-7 flex">
        <div
          class="self-stretch text-center text-black text-xl font-semibold font-['Pretendard'] leading-loose message"
        >
          {{ message }}
        </div>
        <div class="justify-start items-center gap-2.5 inline-flex">
          <!-- 취소 버튼 -->
          <div
            @click="onCancel"
            class="w-24 h-12 px-8 py-3.5 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div class="text-black text-lg font-normal font-['Pretendard']">
              취소
            </div>
          </div>
          <!-- 확인 버튼 -->
          <div
            @click="onConfirm"
            class="w-24 h-12 px-3.5 py-3.5 bg-zinc-400 rounded-lg justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div class="text-black text-lg font-normal font-['Pretendard']">
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message {
  white-space: pre-line;
}
</style>
