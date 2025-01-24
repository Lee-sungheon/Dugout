<script setup>
const emits = defineEmits(["submitClick", "cancelClick"]);

const submitClick = () => {
  emits("submitClick");
};

const cancelClick = () => {
  emits("cancelClick");
};
</script>
<template>
  <div class="border-b-[1px] border-b-white02">
    <div class="w-full py-[15.5px] flex flex-row-reverse gap-5">
      <button
        @click="submitClick"
        class="submit w-[68px] h-[39px] rounded-[8px] bg-gray01 text-black01 text-bold text-4 cursor-pointer"
      >
        등록
      </button>
      <button
        @click="cancelClick"
        class="cancel w-[68px] h-[39px] rounded-[8px] bg-white02 text-black01 text-bold text-4 cursor-pointer"
      >
        취소
      </button>
    </div>
  </div>
</template>
<style scoped></style>
