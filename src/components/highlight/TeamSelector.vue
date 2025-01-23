<script setup>
import { computed, defineProps, defineEmits } from "vue";
import deleteBtn from "@/assets/icons/delete-btn.svg";

const props = defineProps({
  teams: Array,
  selectedTeam: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:selectedTeam"]);

const isSelected = (team) =>
  computed(() => (props.selectedTeam ?? []).some((t) => t.tag === team.tag));

const selectTeam = (team) => {
  const selectedArray = Array.isArray(props.selectedTeam)
    ? props.selectedTeam
    : props.selectedTeam.value ?? [];

  if (!selectedArray.includes(team)) {
    emit("update:selectedTeam", [...selectedArray, team]);
    console.log("✅ 팀 추가됨:", team);
  }
};
const removeTeam = (team) => {
  if (!Array.isArray(props.selectedTeam)) return;

  const updatedList = props.selectedTeam.filter((t) => t.tag !== team.tag);
  emit("update:selectedTeam", updatedList);
  console.log("팀 제거됨:", team);
  console.log("📌 현재 선택된 팀 목록:", props.selectedTeam.value);
};
</script>
<template>
  <div class="w-full mx-[29px] pb-[30px] fixed bg-white01">
    <div class="mt-[150px] min-h-[39px] overflow-x-auto scrollbar-hide">
      <div
        class="flex items-center gap-x-[10px] w-max flex-nowrap ml-[30px] mr-[30px]"
      >
        <button
          v-for="team in props.teams"
          :key="team.tag"
          @click="selectTeam(team)"
          class="inline-flex items-center h-[39px] px-[15px] rounded-[10px] whitespace-nowrap"
          :class="{
            'bg-gray02 text-white01 gap-[10px]': isSelected(team).value,
            'bg-white02 text-black01': !isSelected(team).value,
          }"
        >
          <p>{{ team.tag }}</p>
          <img
            v-if="isSelected(team).value"
            @click.stop="removeTeam(team)"
            :src="deleteBtn"
            class="cursor-pointer"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
