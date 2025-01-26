<script setup>
import { useModalStore } from "@/stores/useModalStore";

const modalStore = useModalStore();
</script>

<template>
  <!-- 모달 -->
  <div
    v-if="modalStore.isVisible"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="w-96 h-60 py-12 bg-neutral-50 rounded-lg border border-zinc-100 flex-col justify-center items-center gap-2.5 inline-flex"
    >
      <div class="h-36 flex-col justify-center items-center gap-7 flex">
        <div
          class="self-stretch text-center text-black text-xl font-semibold font-['Pretendard'] leading-loose message"
        >
          {{ modalStore.modalProps.message }}
        </div>
        <!-- 버튼 1개짜리일 때  -->
        <div
          v-if="modalStore.modalProps.type === 'oneBtn'"
          class="justify-start items-center gap-2.5 inline-flex"
        >
          <div
            @click="
              modalStore.modalProps.onConfirm
                ? modalStore.modalProps.onConfirm()
                : modalStore.closeModal()
            "
            class="w-24 h-12 px-8 py-3.5 bg-zinc-400 rounded-lg justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div class="text-black text-lg font-normal font-['Pretendard']">
              확인
            </div>
          </div>
        </div>
        <!-- 버튼 2개짜리일 때  -->
        <div v-else class="justify-start items-center gap-2.5 inline-flex">
          <!-- 취소 버튼 -->
          <div
            @click="
              modalStore.modalProps.onCancel
                ? modalStore.modalProps.onCancel()
                : modalStore.closeModal()
            "
            class="w-24 h-12 px-8 py-3.5 bg-zinc-100 rounded-lg justify-center items-center gap-2.5 flex cursor-pointer"
          >
            <div class="text-black text-lg font-normal font-['Pretendard']">
              취소
            </div>
          </div>
          <!-- 확인 버튼 -->
          <div
            @click="
              modalStore.modalProps.onConfirm
                ? modalStore.modalProps.onConfirm()
                : modalStore.closeModal()
            "
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
