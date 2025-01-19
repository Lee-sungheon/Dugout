<script setup>
import Button from "@/components/common/Button.vue";
import Input from "@/components/common/Input.vue";
import Logo from "@/assets/images/logo.svg";
import { ref } from "vue";

const email = ref("");
const name = ref("");
const password = ref("");
</script>
<template>
  <header
    className="w-full h-[100px] border-b border-white02  bg-white01 flex items-center justify-center"
  >
    <RouterLink to="/">
      <img :src="Logo" alt="main logo" />
    </RouterLink>
  </header>
  <article
    className="w-full min-h-screen flex pt-[20px] justify-center bg-white01 text-black "
  >
    <section
      className="w-[494px] h-auto flex flex-col items-center gap-[60px] "
    >
      <h1 className="font-bold text-[32px] text-[#1A1A1A]">회원가입</h1>
      <form
        class="w-full max-w-[494px] flex flex-col gap-[30px] mb-[52px] bg-white01"
      >
        <div class="flex-1 relative">
          <Input v-model="email" placeholder="이메일을 입력해주세요" />
          <p className="text-[#FF3333] text-xs mt-[10px]">
            올바른 이메일 형식이 아닙니다
          </p>
        </div>
        <div class="flex-1 relative">
          <Input v-model="name" placeholder="이름을 입력해주세요" />
        </div>
        <div class="flex-1 relative">
          <Input
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div class="flex-1 relative">
          <Input
            v-model="password"
            type="password"
            placeholder="비밀번호를 확인해주세요"
          />
          <p className="text-[#FF3333] text-xs mt-[10px]">
            비밀번호가 일치하지 않습니다
          </p>
        </div>
        <Button text="회원가입" type="submit" />
      </form>
    </section>
  </article>
</template>
<style scoped></style>
