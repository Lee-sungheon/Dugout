import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map", () => {
  const finalSelectedLocation = ref(null);
  const tempSelectedLocation = ref(null);
  const isSelectedLocationVisable = ref(false);

  function setFinalSelectedLocation(location) {
    finalSelectedLocation.value = location;
  }

  function setTempSelectedLocation(location) {
    tempSelectedLocation.value = location;
  }

  function setIsSelectedLocationVisable(isVisible) {
    isSelectedLocationVisable.value = isVisible;
  }

  function resetLocationData() {
    finalSelectedLocation.value = null;
    tempSelectedLocation.value = null;
    isSelectedLocationVisable.value = false;
  }

  return {
    finalSelectedLocation,
    tempSelectedLocation,
    isSelectedLocationVisable,
    setFinalSelectedLocation,
    setTempSelectedLocation,
    setIsSelectedLocationVisable,
    resetLocationData,
  };
});
