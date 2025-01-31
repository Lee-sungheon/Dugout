<script setup>
import { useModalStore } from "@/stores/useModalStore";
import { useRoute } from "vue-router";
import Modal from "./common/Modal.vue";
import { computed } from "vue";
import { teamList } from "@/constants";

// props로 등록 눌렀을 때 실행될 함수와 취소 버튼 눌렀을 때 실행할 함수 전달하면 됩니다.
const props = defineProps({
  handleRegister: {
    type: Function,
  },
  handleCancel: {
    type: Function,
  },
});

const route = useRoute();
const lastSegment = route.path.split("/").pop();
const teamPage = computed(() =>
  teamList.find((team) => team.name === route.params.team)
);
const modalStore = useModalStore();

const confirmCancel = () => {
  modalStore.openModal({
    message: "작성했던 모든 내용은 저장되지 않습니다.\n취소하시겠습니까?",
    type: "twoBtn",
    onConfirm: () => {
      props.handleCancel();
      modalStore.closeModal();
    },
    onCancel: modalStore.closeModal,
  });
};
</script>
<template>
  <Modal />
  <div class="border-b-[1px] border-b-white02">
    <div class="w-full py-[15.5px] flex flex-row-reverse gap-5">
      <button
        v-if="lastSegment === `edit`"
        @click="handleRegister"
        :class="[
          'w-[68px]',
          'h-[39px]',
          'rounded-[8px]',
          'text-black01',
          'text-bold',
          'text-4',
          'cursor-pointer',
          teamPage ? `bg-${teamPage.nickname}_opa30` : 'bg-gray01',
        ]"
      >
        수정
      </button>
      <button
        v-else
        @click="handleRegister"
        :class="[
          'w-[68px]',
          'h-[39px]',
          'rounded-[8px]',
          'text-black01',
          'text-bold',
          'text-4',
          'cursor-pointer',
          teamPage ? `bg-${teamPage.nickname}_opa30` : 'bg-gray01',
        ]"
      >
        등록
      </button>
      <button
        @click="confirmCancel"
        :class="[
          'w-[68px]',
          'h-[39px]',
          'rounded-[8px]',
          'text-black01',
          'text-bold',
          'text-4',
          'cursor-pointer',
          teamPage ? `bg-${teamPage.nickname}_opa10` : 'bg-gray01',
        ]"
      >
        취소
      </button>
    </div>
  </div>
</template>
<style scoped></style>
