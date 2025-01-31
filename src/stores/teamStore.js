// import { defineStore } from "pinia";

// export const useTeamStore = defineStore("teamStore", {
//   state: () => ({
//     selectedTeam: localStorage.getItem("selectedTeam") || "기본",
//     selectedCommunity: "",
//     isEmblemEffectOn: false,
//     isEnterAnimationOn: false,
//   }),
//   actions: {
//     selectTeam(team) {
//       this.selectedTeam = team;
//       localStorage.setItem("selectedTeam", team);
//       console.log("team", team);
//       this.triggerEmblemEffect();
//     },
//     endEmblemAnimation() {
//       this.isEmblemEffectOn = false;
//     },
//     endEnterAnimation() {
//       this.isEnterAnimationOn = false;
//     },
//     triggerEmblemEffect() {
//       console.log("애니메이션 시작");
//       this.isEmblemEffectOn = true;
//       setTimeout(() => {
//         this.endEmblemAnimation();
//         console.log("애니메이션 끝");
//       }, 2500);
//     },
//     triggerEnteringAnimation(team) {
//       this.selectedCommunity = team.name;
//       this.isEnterAnimationOn = true;
//       setTimeout(() => {
//         this.endEnterAnimation();
//       }, 1500);
//     },
//   },
// });

// 위 코드를 Setup Store 방식으로 변경하였습니다.

import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTeamStore = defineStore("teamStore", () => {
  // ✅ 상태 (state)
  const selectedTeam = ref(localStorage.getItem("selectedTeam") || "기본");
  const selectedCommunity = ref("");
  const isEmblemEffectOn = ref(false);
  const isEnterAnimationOn = ref(false);

  // ✅ Actions (methods 대신 함수로 정의)
  const selectTeam = (team) => {
    selectedTeam.value = team;
    localStorage.setItem("selectedTeam", team);
    // 기본테마가 아닐때만 엠블럼 함수 실행
    if (team !== "기본") triggerEmblemEffect();
  };

  const endEmblemAnimation = () => {
    isEmblemEffectOn.value = false;
  };

  const endEnterAnimation = () => {
    isEnterAnimationOn.value = false;
  };

  const triggerEmblemEffect = () => {
    isEmblemEffectOn.value = true;
    setTimeout(() => {
      endEmblemAnimation();
    }, 2500);
  };

  const triggerEnteringAnimation = (team) => {
    selectedCommunity.value = team.name;
    isEnterAnimationOn.value = true;
    setTimeout(() => {
      endEnterAnimation();
    }, 1500);
  };

  // ✅ Getter (Computed 사용 가능)
  const isTeamSelected = computed(() => selectedTeam.value !== "기본");

  // 💡 Setup Store 방식은 객체가 아니라 함수에서 값을 반환해야 함
  return {
    selectedTeam,
    selectedCommunity,
    isEmblemEffectOn,
    isEnterAnimationOn,
    selectTeam,
    endEmblemAnimation,
    endEnterAnimation,
    triggerEmblemEffect,
    triggerEnteringAnimation,
    isTeamSelected,
  };
});
