<script setup>
import Button from "@/components/common/Button.vue";
import Input from "@/components/common/Input.vue";
import Logo from "@/assets/images/logo.svg";
import { ref } from "vue";
import { supabase } from "@/supabase";

const email = ref("");
const name = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const signUp = async () => {
  errorMessage.value = "";

  // 이메일 형식 검사
  if (!isValidEmail(email.value)) {
    errorMessage.value = "올바른 이메일 형식이 아닙니다.";
    console.log("올바르지 않은 이메일 형식");
    return;
  }

  // 비밀번호 검사
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    console.log("비밀번호 불일치");
    return;
  }

  // 회원가입
  try {
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = "비밀번호는 6글자 이상이어야 합니다.";
      console.log(errorMessage.value);
    } else {
      // 회원가입 성공 후, name 추가하기
      const { error: updateError } = await supabase
        .from("user_info")
        .update({ name: name.value })
        .eq("id", user.id);

      if (updateError) {
        console.error("이름 저장 실패:", updateError.message);
      } else {
        console.log("회원가입 성공:", user);
      }
    }
  } catch (error) {
    errorMessage.value = "알 수 없는 오류가 발생했습니다.";
    console.log(error.message);
  }
};
</script>
<template>
  <header
    className="w-full h-[100px] border-b border-white02  bg-white01 flex items-center justify-center">
    <RouterLink to="/">
      <img :src="Logo" alt="main logo" />
    </RouterLink>
  </header>
  <article
    className="w-full min-h-screen flex pt-[20px] justify-center bg-white01 text-black ">
    <section
      className="w-[494px] h-auto flex flex-col items-center gap-[60px] ">
      <h1 className="font-bold text-[32px] text-[#1A1A1A]">회원가입</h1>
      <form
        class="w-full max-w-[494px] flex flex-col gap-[30px] mb-[52px] bg-white01"
        @submit.prevent="signUp">
        <div class="flex-1 relative">
          <Input v-model="email" placeholder="이메일을 입력해주세요" />
          <p
            v-if="errorMessage && !isValidEmail(email)"
            className="text-[#FF3333] text-xs mt-[10px]">
            {{ errorMessage }}
          </p>
        </div>
        <div class="flex-1 relative">
          <Input v-model="name" placeholder="이름을 입력해주세요" />
        </div>
        <div class="flex-1 relative">
          <Input
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력해주세요" />
          <p className="text-[#FF3333] text-xs mt-[10px]">
            {{
              errorMessage && password.length < 6
                ? "비밀번호는 6글자 이상이어야 합니다."
                : ""
            }}
          </p>
        </div>
        <div class="flex-1 relative">
          <Input
            v-model="confirmPassword"
            type="password"
            placeholder="비밀번호를 확인해주세요" />
          <p
            v-if="errorMessage && password !== confirmPassword"
            className="text-[#FF3333] text-xs mt-[10px]">
            {{ errorMessage }}
          </p>
        </div>
        <Button text="회원가입" type="submit" />
      </form>
    </section>
  </article>
</template>
<style scoped></style>
