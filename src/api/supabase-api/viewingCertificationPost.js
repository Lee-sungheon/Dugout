import { supabase } from "@/supabase";
import { getCurrentUser } from "./userInfo";

// 특정 클럽의 모든 직관 인증 게시물을 가져오기
export const getViewingCertificationPostsByClub = async (clubId) => {
  try {
    const { data, error } = await supabase.rpc(
      "get_viewing_certification_posts_by_club",
      {
        input_club_id: clubId,
      }
    );

    if (error) {
      console.error("Error fetching data:", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};

// 직관 인증 게시물의 상세 정보를 불러오기
export const getCertificationPostDetailsById = async (postId) => {
  try {
    const { data, error } = await supabase.rpc(
      "get_viewing_certification_post_details",
      {
        input_post_id: postId,
      }
    );

    if (error) throw new Error(error.message);

    if (!data || data.length === 0) {
      console.log("게시물을 찾을 수 없습니다.");
      return null;
    }

    return data;
  } catch (error) {
    console.error("게시물 상세 정보 불러오기 실패: ", error);
    return null;
  }
};

// 직관 인증 게시물 작성하기(생성하기)
export const createCertificationPost = async (
  content,
  image,
  game_date,
  club_id,
  title
) => {
  try {
    const user = await getCurrentUser();
    if (!user) console.log("로그인을 하지 않았습니다");

    const { data, error } = await supabase
      .from("viewing_certification_post")
      .insert([
        { member_id: user.id, content, image, game_date, club_id, title },
      ])
      .select();

    if (error) throw new Error(error.message);

    console.log("게시물 생성 성공");
    return data;
  } catch (error) {
    console.error("게시물 생성 실패: ", error);
    return null;
  }
};

// supabase storage에 이미지 업로드하기
export const uploadImageToSupabase = async (file) => {
  if (!file) return null;

  try {
    const fileName = `${Date.now()}_${file.name}`; // 파일 이름을 고유하게 설정
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) throw new Error(error.message);

    // 업로드된 이미지의 URL 생성
    const imageUrl = supabase.storage
      .from("certification_images")
      .getPublicUrl(fileName).publicUrl;

    return imageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패: ", error);
    return null;
  }
};

// 직관 인증 게시물 수정하기
export const updateCertificationPost = async (
  postId, // 수정하려는 게시물의 ID
  content,
  image,
  game_date,
  club_id,
  title
) => {
  try {
    const user = await getUser();
    if (!user) console.log("로그인을 하지 않았습니다");

    // 게시물의 작성자(member_id)가 현재 사용자와 일치하는지 확인
    const { data: postData, error: fetchError } = await supabase
      .from("viewing_certification_post")
      .select("member_id")
      .eq("id", postId)
      .single();

    if (fetchError) throw new Error("게시물 정보를 가져오는 데 실패했습니다.");
    if (postData.member_id !== user.id)
      throw new Error("본인이 작성한 게시물만 수정할 수 있습니다.");

    // 게시물 수정
    const { data, error } = await supabase
      .from("viewing_certification_post")
      .update({ content, image, game_date, club_id, title })
      .eq("id", postId)
      .select();

    if (error) throw new Error(error.message);

    console.log("게시물 수정 성공: ", data);
    return data;
  } catch (error) {
    console.error("게시물 수정 실패: ", error);
    return null;
  }
};

// 직관 인증 게시물 삭제하기
export const deleteCertificationPost = async (postId) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("로그인을 하지 않았습니다.");

    const { data: post, error: fetchError } = await supabase
      .from("viewing_certification_post")
      .select("member_id")
      .eq("id", postId)
      .single(); // 게시물 ID로 하나의 게시물만 가져오기

    if (fetchError) throw new Error("게시물 정보를 가져오는 데 실패했습니다.");
    if (post.member_id !== user.id)
      throw new Error("본인이 작성한 게시물만 삭제할 수 있습니다.");

    const { data, error } = await supabase
      .from("viewing_certification_post")
      .delete()
      .eq("id", postId)
      .eq("member_id", user.id);

    if (error) throw new Error(error.message);

    console.log("게시물 삭제 성공");
    return data;
  } catch (error) {
    console.error("게시물 삭제 실패: ", error);
    return null;
  }
};
