<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PostArrow from "@/assets/icons/post_arrow.svg";
import { teamList } from "@/constants";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const teamName = ref(route.params.team);
const boardType = ref("");

onMounted(() => {
  const pathSegments = route.path.split("/");
  boardType.value = pathSegments[pathSegments.length - 1];
});

const teamPage = computed(() =>
  teamList.find((team) => team.name === teamName.value)
);

// route.params.team이 변경될 때마다 반응
watch(
  () => route.params.team,
  (newTeamName, _) => {
    teamName.value = newTeamName; // teamName을 업데이트
  }
);
</script>
<template>
  <RouterLink
    :to="`/${teamName}/${boardType}/create`"
    :class="[
      'flex',
      'items-center',
      'justify-center',
      'w-full',
      'font-medium',
      'py-[10px]',
      'rounded-[10px]',
      'gap-[10px]',
      'cursor-pointer',
      `bg-${teamPage.nickname}_opa30`,
    ]"
  >
    {{ props.text }}
    <img :src="PostArrow" class="w-[14px] h-[8px]" />
  </RouterLink>
</template>
<style scoped></style>
