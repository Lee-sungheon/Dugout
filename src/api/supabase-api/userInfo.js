import { supabase } from "@/supabase";

// 현재 로그인 사용자 정보 불러오기
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      return null;
    }
    return data.user;
  } catch (err) {
    console.error("알 수 없는 오류 발생:", err);
    return null;
  }
};

// 현재 로그인 사용자 로그아웃
export const signOutUser = async () => {
  try {
    // 로그아웃 처리
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 중 오류 발생:", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error("알 수 없는 오류 발생:", err);
    return { success: false, error: "Unexpected Error During Logout" };
  }
};

// 사용자 정보 불러오기
export const getUserInfoEnCapsulation = async (table) => {
  let { data, error } = await supabase.from(table).select("*");
  if (error) throw new Error(error.message);
  return data;
};

// 사용자 정보 수정
export const updateUserInfoEnCapsulation = async (userId, updateData) => {
  const allowedFields = ["name", "description", "image", "baseball_club_id"];

  // 유효한(변경 가능한) 필터만 필터링
  const filteredData = Object.keys(updateData)
    .filter((key) => allowedFields.includes(key))
    .reduce((obj, key) => {
      obj[key] = updateData[key];
      return obj;
    }, {});

  // 필터링된 데이터가 없으면 에러 반환
  if (Object.keys(filteredData).length === 0) {
    return { success: false, error: "No Valid Fields To Update" };
  }

  try {
    // supabase를 통해 데이터 업데이트
    const { data, error } = await supabase
      .from("user_info")
      .update(filteredData)
      .eq("id", userId)
      .select();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: "Unexpected Error In UpdataeUserInfo",
      datils: error,
    };
  }
};
