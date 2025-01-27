import { defineStore } from "pinia";
import { ref } from "vue";
import {
  signInWithGoogle,
  signInWithKakao,
  signInWithEmail,
} from "@/api/supabase-api/signIn";
import { getCurrentUser, signOutUser } from "@/api/supabase-api/userInfo";
import { supabase } from "@/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoading = ref(false);

  // 구글 로그인
  const loginWithGoogle = async () => {
    try {
      isLoading.value = true;
      const { success, user: userData, error } = await signInWithGoogle();
      if (!success) throw new Error(error);
      user.value = userData;
    } catch (error) {
      console.error("구글 로그인 실패:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 카카오 로그인
  const loginWithKakao = async () => {
    try {
      isLoading.value = true;
      const { success, user: userData, error } = await signInWithKakao();
      if (!success) throw new Error(error);
      user.value = userData;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 이메일 로그인
  const loginWithEmail = async (email, password) => {
    try {
      isLoading.value = true;
      const {
        success,
        user: userData,
        error,
      } = await signInWithEmail(email, password);
      if (!success) throw new Error(error);
      user.value = userData;
    } catch (error) {
      console.error("이메일 로그인 실패:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      isLoading.value = true;
      const { success, error } = await signOutUser();
      if (!success) throw new Error(error);
      user.value = null;
    } catch (error) {
      console.error("로그아웃 실패:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 현재 사용자 정보 가져오기
  const fetchCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      user.value = userData;
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      user.value = null;
    }
  };

  // 인증 상태 변경 감지
  supabase.auth.onAuthStateChange(async (_, session) => {
    if (session) {
      await fetchCurrentUser();
    } else {
      user.value = null;
    }
  });

  return {
    user,
    isLoading,
    loginWithGoogle,
    loginWithKakao,
    loginWithEmail,
    logout,
    fetchCurrentUser,
    isAuthenticated: () => !!user.value,
  };
});
