import { supabase } from "@/supabase";

// 게시물 작성 ✅
const createRestaurantPost = async (
  memberId,
  content,
  title,
  thumbnailUrl,
  tags,
  clubId
) => {
  const { data: postData, error: postError } = await supabase
    .from("restaurant_post")
    .insert([
      {
        member_id: memberId,
        content,
        title,
        thumbnail_url: thumbnailUrl,
        tags,
        club_id: clubId,
      },
    ])
    .select();

  if (postError) {
    console.error("Error creating restaurant post:", postError);
    return null;
  }

  return postData;
};

// 특정 태그의 맛집 게시물 조회 (SQL로 처리) ✅
export const getRestaurantPostsByTagAndClub = async (clubId, tagName) => {
  try {
    const { data, error } = await supabase.rpc("get_posts_by_tag_and_club", {
      input_club_id: clubId,
      input_tag_name: tagName,
    });

    if (error) {
      throw error;
    }

    return data; // 반환된 데이터
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

// 특정 맛집 게시물 조회 ✅
const getRestaurantPostById = async (postId) => {
  const { data, error } = await supabase
    .from("restaurant_post")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching restaurant post:", error);
    return null;
  }
  return data;
};

// 맛집 게시물 수정 ✅
const updateRestaurantPost = async (
  postId,
  content,
  title,
  thumbnailUrl,
  tags
) => {
  const { data: postData, error: postError } = await supabase
    .from("restaurant_post")
    .update({ content, title, thumbnail_url: thumbnailUrl, tags: tags })
    .eq("id", postId)
    .select();

  if (postError) {
    console.error("Error updating restaurant post:", postError);
    return null;
  }

  return postData;
};

// 특정 게시물의 tags 수정 ✅
// newTags 매개변수가 없으면 알아서 null로 처리되며 클럽으로만 필터링
const updateRestaurantPostTags = async (postId, newTags) => {
  const { data, error } = await supabase
    .from("restaurant_post")
    .update({ tags: newTags })
    .eq("id", postId)
    .select();

  if (error) {
    console.error("Error updating restaurant post tags:", error);
    return null;
  }
  return data;
};

// 맛집 게시물 삭제 ✅
const deleteRestaurantPost = async (postId) => {
  const { error: tagRecordError } = await supabase
    .from("viewing_restaurant_tag_record")
    .delete()
    .eq("viewing_restaurant_id", postId);

  if (tagRecordError) {
    console.error("Error deleting tag records:", tagRecordError);
    return null;
  }

  const { data, error } = await supabase
    .from("restaurant_post")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Error deleting restaurant post:", error);
    return null;
  }

  return data;
};

export default {
  createRestaurantPost,
  getRestaurantPostsByTagAndClub,
  getRestaurantPostById,
  updateRestaurantPost,
  deleteRestaurantPost,
  updateRestaurantPostTags,
};
