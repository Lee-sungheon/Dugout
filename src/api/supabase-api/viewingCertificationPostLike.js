import { supabase } from "@/supabase";
import { getCurrentUser } from "./userInfo";

// 특정 직관 인증 게시물에 좋아요 누르기
export const createCertificationPostLike = async (postId) => {
  try {
    const user = await getCurrentUser();
    if (!user) console.log("로그인을 하지 않았습니다");

    const { data, error } = await supabase
      .from("viewing_certification_post_like")
      .insert([{ post_id: postId, member_id: user.id }])
      .select();

    if (error) throw new Error(error.message);

    console.log("좋아요 성공");
    return true;
  } catch (error) {
    console.error("좋아요 실패: ", error);
    return null;
  }
};

// 특정 직관 인증 게시물에 좋아요 취소하기
export const deleteCertificationPostLike = async (postId) => {
  try {
    const user = await getCurrentUser();
    if (!user) console.log("로그인을 하지 않았습니다");

    const { error } = await supabase
      .from("viewing_certification_post_like")
      .delete()
      .eq("post_id", postId)
      .eq("member_id", user.id);

    if (error) throw new Error(error.message);

    console.log("좋아요 취소 성공");
    return true;
  } catch (error) {
    console.error("좋아요 실패: ", error);
    return null;
  }
};
