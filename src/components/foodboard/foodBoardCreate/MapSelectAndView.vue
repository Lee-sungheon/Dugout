<script setup>
import { computed } from "vue";
import { useMapStore } from "@/stores/mapStore";
import MapSelect from "./MapSelect.vue";
import MapView from "./MapView.vue";
const mapStore = useMapStore();

const isSelectedLocationVisable = computed(
  () => mapStore.isSelectedLocationVisable
);
</script>
<template>
  <MapSelect v-if="!isSelectedLocationVisable" />
  <MapView v-else />
</template>
