<script setup>
import DropdownSelect from "@/components/common/DropdownSelect.vue";
import CreateHeader from "@/components/CreateHeader.vue";
import { ref, watch } from "vue";
import Baseball from "@/assets/icons/baseball.svg";
import Calendar from "@/assets/icons/calendar.svg";
import { createCrewRecruitmentPost } from "@/api/supabase-api/crewRecruitmentPost";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("");
const content = ref("");
const recruitStatus = ref("");
const recruitOptions = ["모집 중", "모집 완료"];
const gameDateStatus = ref(null);
const formattedGameDate = ref(null);
const isDatePickerOpen = ref(false);
const peopleNum = ref("");
const peopleNumOptions = ["1", "2", "3", "4"];
const peopleNum2 = ref("");
const peopleNum2Options = ["이상", "이하", "명"];
const myTeam = ref("");
const myTeamOptions = [
  "LG 트윈스",
  "두산 베어스",
  "SSG 랜더스",
  "NC 다이노스",
  "한화 이글스",
  "기아 타이거즈",
  "삼성 라이온즈",
  "KT 위즈",
  "키움 히어로즈",
  "롯데 자이언츠",
];
const stadium = ref("");
const stadiumOptions = [
  "부산 사직 야구장",
  "광주 KIA 챔피언스필드",
  "대구 삼성 라이온즈파크",
  "서울종합운동장 야구장",
  "고척스카이돔",
  "인천 SSG 랜더스 필드",
  "수원 KT위즈파크",
  "대전 한화생명이글스파크",
  "창원 NC파크",
  "포항 야구장",
  "마산 야구장",
];

// 레인지 명 / 데이터 널
const myGender = ref("");
const myGenderOptions = ["여자", "남자", "비공개"];
const myAge = ref("");
const myAgeOptions = ["20대", "30대", "50대", "60대"];
const crewGender = ref("");
const crewGenderOptions = ["여자", "남자", "무관", "비공개"];
const crewAge = ref("");
const crewAgeOptions = ["20대", "30대", "50대", "60대"];

// 날짜를 포맷팅하는 함수
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

watch(gameDateStatus, (newDate) => {
  formattedGameDate.value = formatDate(newDate);
  isDatePickerOpen.value = false;
});

// 크루 모집 게시글 등록 함수
const submitClick = () => {
  createCrewRecruitmentPost({
    member_id: "20a1a866-596b-4c54-b99a-792efcda8aef",
    status: recruitStatus.value,
    game_date: formattedGameDate.value,
    author_sex: myGender.value,
    author_age: myAge.value,
    crew_sex: crewGender.value,
    crew_age: crewAge.value,
    content: content.value,
    club_id: "1",
    member_number: peopleNum.value,
    member_range: peopleNum2.value,
    game_stadium: stadium.value,
  });
  alert("게시글이 성공적으로 등록되었습니다.");
  router.push("/team/crewboard");
};

// 게시글 작성 취소 함수
const cancelClick = () => {
  const isConfirmed = confirm("정말로 취소 하시겠습니까?");
  if (isConfirmed) {
    router.push("/team/crewboard");
  } else {
    return;
  }
};
</script>
<template>
  <div class="px-[50px]">
    <CreateHeader @submitClick="submitClick" @cancelClick="cancelClick" />
    <div class="gap-[50px]">
      <div class="mt-[40px] mb-[85px] gap-[30px]">
        <div>
          <div class="w-full pb-[30px] border-b-gray01 border-b-[1px]">
            <input
              type="text"
              v-model="title"
              class="w-full text-[30px] placeholder-gray01 placeholder-[30px] text-center outline-none"
              placeholder="직관 크루 조건을 설정해주세요"
            />
          </div>
          <div class="pt-[30px]">
            <textarea
              type="text"
              v-model="content"
              class="w-full p-0 outline-none resize-none text-4 placeholder-gray01 placeholder-4"
              placeholder="직관 크루 모집글을 작성해보세요"
            />
          </div>
        </div>
        <div class="flex flex-col gap-[30px]">
          <div class="flex justify-between items-center h-[40px] gap-2">
            <div class="w-[100px]">
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
                >모집 상태</span
              >
            </div>
            <DropdownSelect
              v-model:selectedOption="recruitStatus"
              :options="recruitOptions"
              part="모집 상태"
            />
          </div>
          <div class="flex justify-between">
            <div
              class="flex justify-between items-center h-[40px] w-[425px] gap-2"
            >
              <div class="w-[100px]">
                <span
                  class="text-black01 text-bold text-[18px] whitespace-nowrap"
                  >경기일</span
                >
              </div>
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2 mt-[20px]"
              >
                <div class="relative w-full">
                  <button
                    @click="isDatePickerOpen = !isDatePickerOpen"
                    class="flex items-center justify-between w-full h-[40px] px-[15px] bg-white02 text-black01 text-[18px] rounded-[8px] border"
                  >
                    <span>{{ formattedGameDate || "날짜를 선택하세요" }}</span>
                    <img :src="Calendar" class="w-[18px] h-[18px]" />
                  </button>
                  <div
                    v-if="isDatePickerOpen"
                    class="absolute z-10 mt-2 left-[350px] top-[-10px]"
                  >
                    <VDatePicker v-model="gameDateStatus" mode="single" />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex justify-between items-center h-[40px] gap-2 w-[425px]"
            >
              <div class="w-[100px]">
                <span
                  class="text-black01 text-bold text-[18px] whitespace-nowrap"
                  >인원</span
                >
              </div>
              <div class="flex gap-[10px] w-full">
                <DropdownSelect
                  v-model:selectedOption="peopleNum"
                  :options="peopleNumOptions"
                  part="인원"
                />
                <DropdownSelect
                  v-model:selectedOption="peopleNum2"
                  :options="peopleNum2Options"
                  part="인원"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[15.5px]">
            <div class="flex gap-[10px] items-center">
              <img :src="Baseball" class="w-[18px] h-[18px]" />
              <p class="text-[14px] text-gray03">
                응원팀과 경기 장소는 홈 | 원정 여부에 따라 다르니 꼼꼼히
                확인해주세요!
              </p>
            </div>
            <div class="flex justify-between">
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2"
              >
                <div class="w-[100px]">
                  <span
                    class="text-black01 text-bold text-[18px] whitespace-nowrap"
                    >응원팀</span
                  >
                </div>
                <DropdownSelect
                  v-model:selectedOption="myTeam"
                  :options="myTeamOptions"
                  part="응원팀"
                />
              </div>
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2"
              >
                <div class="w-[100px]">
                  <span
                    class="text-black01 text-bold text-[18px] whitespace-nowrap"
                    >경기 장소</span
                  >
                </div>
                <DropdownSelect
                  v-model:selectedOption="stadium"
                  :options="stadiumOptions"
                  part="경기 장소"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[15.5px]">
            <div class="flex gap-[10px] items-center">
              <img :src="Baseball" class="w-[18px] h-[18px]" />
              <p class="text-[14px] text-gray03">
                응원팀과 경기 장소는 홈 | 원정 여부에 따라 다르니 꼼꼼히
                확인해주세요!
              </p>
            </div>
            <div class="flex justify-between">
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2"
              >
                <div class="w-[100px]">
                  <span
                    class="text-black01 text-bold text-[18px] whitespace-nowrap"
                    >작성자 성별</span
                  >
                </div>
                <DropdownSelect
                  v-model:selectedOption="myGender"
                  :options="myGenderOptions"
                  part="작성자 성별"
                />
              </div>
              <div
                class="flex justify-between items-center h-[40px] w-[425px] gap-2"
              >
                <div class="w-[100px]">
                  <span
                    class="text-black01 text-bold text-[18px] whitespace-nowrap"
                    >작성자 연령</span
                  >
                </div>
                <DropdownSelect
                  v-model:selectedOption="myAge"
                  :options="myAgeOptions"
                  part="작성자 연령"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div
              class="flex justify-between items-center h-[40px] w-[425px] gap-2"
            >
              <div class="w-[100px]">
                <span
                  class="text-black01 text-bold text-[18px] whitespace-nowrap"
                  >크루 성별</span
                >
              </div>
              <DropdownSelect
                v-model:selectedOption="crewGender"
                :options="crewGenderOptions"
                part="크루 성별"
              />
            </div>
            <div
              class="flex justify-between items-center h-[40px] w-[425px] gap-2"
            >
              <div class="w-[100px]">
                <span
                  class="text-black01 text-bold text-[18px] whitespace-nowrap"
                  >크루 연령</span
                >
              </div>
              <DropdownSelect
                v-model:selectedOption="crewAge"
                :options="crewAgeOptions"
                part="크루 연령"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
