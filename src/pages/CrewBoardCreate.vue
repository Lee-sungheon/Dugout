<script setup>
import DropdownSelect from "@/components/common/DropdownSelect.vue";
import CreateHeader from "@/components/CreateHeader.vue";
import { ref } from "vue";

const title = ref("");
const content = ref("");

const recruitStatus = ref("모집 중");
const recruitOptions = ["모집 중", "모집 완료"];

const peopleNum = ref("1");
const peopleNumOptions = ["1", "2", "3", "4"];
const peopleNum2 = ref("이상");
const peopleNum2Options = ["이상", "이하"];

const myTeam = ref("LG 트윈스");
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

//야구장명은 구현 맡은 사람이 더블체크
const stadium = ref("서울종합운동장 야구장");
const stadiumOptions = [
  "부산 사직 야구장",
  "광주 기아 챔피언스필드",
  "대구 삼성 라이온즈파크",
  "서울종합운동장 야구장",
  "고척스카이돔",
  "인천 SSG 랜더스 필드",
  "수원 KT위즈파크",
  "대전 베이스볼드림파크",
  "창원 NC파크",
];

const myGender = ref("여자");
const myGenderOptions = ["여자", "남자"];

const myAge = ref("20대");
const myAgeOptions = ["20대", "30대", "50대", "60대"];

const crewGender = ref("여자");
const crewGenderOptions = ["여자", "남자"];
</script>
<template>
  <CreateHeader />
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
            class="w-full p-0 text-4 placeholder-gray01 placeholder-4 outline-none resize-none"
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
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
                >경기일</span
              >
            </div>
            <DropdownSelect
              v-model:selectedOption="recruitStatus"
              :options="recruitOptions"
              part="경기일"
            />
          </div>
          <div
            class="flex justify-between items-center h-[40px] gap-2 w-[425px]"
          >
            <div class="w-[100px]">
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
        <div class="flex justify-between">
          <div
            class="flex justify-between items-center h-[40px] w-[425px] gap-2"
          >
            <div class="w-[100px]">
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
        <div class="flex justify-between">
          <div
            class="flex justify-between items-center h-[40px] w-[425px] gap-2"
          >
            <div class="w-[100px]">
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
        <div class="flex justify-between">
          <div
            class="flex justify-between items-center h-[40px] w-[425px] gap-2"
          >
            <div class="w-[100px]">
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
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
              <span class="text-black01 text-bold text-[18px] whitespace-nowrap"
                >크루 연령</span
              >
            </div>
            <DropdownSelect
              v-model:selectedOption="recruitStatus"
              :options="recruitOptions"
              part="크루 연령"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
