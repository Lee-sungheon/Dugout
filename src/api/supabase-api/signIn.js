import { supabase } from "@/supabase";

// 구글 로그인
export const signInWithGoogle = async () => {
  try {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) throw error;

    console.log("User Signed In With Google: ", user);
    return { success: true, user, session };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

// 카카오 로그인
export const signInWithKakao = async () => {
  try {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });

    if (error) throw error;

    console.log("User Signed In With Kakao:", user);
    return { success: true, user, session };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
};

// 이메일 로그인
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("이메일 로그인 실패: ", error.message);
      return { success: false, error: error.message };
    } else {
      console.log("로그인 성공: ", data.user);
    }
    return { success: true, user };
  } catch (error) {
    console.error("이메일 로그인 중 알 수 없는 오류 발생:", error);
    return { success: false, error: "Unexpected Error" };
  }
};
