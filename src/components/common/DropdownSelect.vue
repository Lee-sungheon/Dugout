<script setup>
import ToggleDropdown from "@/assets/icons/theme_toggle.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";
import { computed, ref } from "vue";
import { twMerge } from "tailwind-merge";
import { DatePicker } from "v-calendar";
import "v-calendar/style.css";

const props = defineProps({
  part: String,
  selectedOption: String,
  options: Array,
  widthType: {
    type: String,
    default: "md",
  },
});

const emit = defineEmits(["update:selectedOption"]);

const isOpen = ref(false);
const isCalendar = ref(false);
const date = ref(new Date());
const selectedColor = ref("blue");

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  isCalendar.value = props.part === "경기일";
};

const formatDateToKoreanStyle = (date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  })
    .format(date)
    .replace(/\./g, ".");
};

const selectDate = (newDate) => {
  date.value = newDate;
  const formattedDate = formatDateToKoreanStyle(newDate);
  emit("update:selectedOption", formattedDate);
  isOpen.value = false;
};

const selectOption = (option) => {
  emit("update:selectedOption", option);
  isOpen.value = false;
};

const toggleIconSrc = computed(() => {
  return props.part === "경기일" ? CalendarIcon : ToggleDropdown;
});
</script>
<template>
  <div class="relative w-full">
    <button
      @click="toggleDropdown"
      :class="
        twMerge(
          'flex items-center justify-between w-full h-[40px] px-[15px] bg-white02 text-black01 text-[18px] rounded-[8px]',

          isOpen && !isCalendar && 'rounded-b-[0px]'
        )
      "
    >
      {{ isCalendar ? formatDateToKoreanStyle(date) : props.selectedOption }}
      <img :src="toggleIconSrc" class="w-[18px] h-[10.28px]" />
    </button>
    <div
      v-if="isOpen && !isCalendar && props.options"
      :class="
        twMerge(
          'absolute left-0 top-full w-full bg-white02 text-black01 text-[18px] rounded-[8px] z-10',
          isOpen && 'rounded-t-[0px]'
        )
      "
    >
      <ul>
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="flex items-center w-full h-[40px] px-[15px] cursor-pointer"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <div
      v-if="isOpen && isCalendar"
      class="absolute left-0 top-full w-full z-10"
    >
      <DatePicker
        v-model="date"
        :color="selectedColor"
        class="date-picker"
        expanded
        @update:modelValue="selectDate"
      />
    </div>
  </div>
</template>
<style>
.date-picker .vc-weekday-1,
.date-picker .vc-weekday-7 {
  color: #6366f1;
}
</style>
