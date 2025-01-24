<script setup>
// props로 등록 눌렀을 때 실행될 함수와 취소 버튼 눌렀을 때 실행할 함수 전달하면 됩니다.
defineProps({
  handleRegister: {
    type: Function,
  },
  handleCancel: {
    type: Function,
  },
});
</script>
<template>
  <div class="border-b-[1px] border-b-white02">
    <div class="w-full py-[15.5px] flex flex-row-reverse gap-5">
      <button
        @click="handleRegister"
        class="w-[68px] h-[39px] rounded-[8px] bg-gray01 text-black01 text-bold text-4 cursor-pointer"
      >
        등록
      </button>
      <button
        @click="handleCancel"
        class="w-[68px] h-[39px] rounded-[8px] bg-white02 text-black01 text-bold text-4 cursor-pointer"
      >
        취소
      </button>
    </div>
  </div>
</template>
<style scoped></style>
