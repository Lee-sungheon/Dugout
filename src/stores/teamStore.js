import { defineStore } from "pinia";

export const useTeamStore = defineStore("teamStore", {
  state: () => ({
    selectedTeam: localStorage.getItem("selectedTeam") || "히어로즈",
    selectedCommunity: "",
    isEmblemEffectOn: false,
    isEnterAnimationOn: false,
  }),
  actions: {
    selectTeam(team) {
      this.selectedTeam = team;
      localStorage.setItem("selectedTeam", team);
      this.triggerEmblemEffect();
    },
    endEmblemAnimation() {
      this.isEmblemEffectOn = false; 
    },
    endEnterAnimation() {
      this.isEnterAnimationOn = false; 
    },
    triggerEmblemEffect() {
      console.log("애니메이션 시작");
      this.isEmblemEffectOn = true;
      setTimeout(() => {
        this.endEmblemAnimation();
        console.log("애니메이션 끝");
      }, 2500);
    },
    triggerEnteringAnimation(team) {
      this.selectedCommunity = team.name;
      this.isEnterAnimationOn = true;
      setTimeout(() => {
        this.endEnterAnimation();
      }, 1500); 
    },
  },
});
