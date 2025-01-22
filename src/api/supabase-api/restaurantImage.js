import { supabase } from "@/supabase";

// 이미지 추가 ✅
const createRestaurantPostImage = async (postId, imageUrl, imageIndex) => {
  const { data, error } = await supabase
    .from("restaurant_post_image")
    .insert([{ post_id: postId, url: imageUrl, order_index: imageIndex }]);

  if (error) {
    console.error("Error creating restaurant post image:", error);
    return null;
  }

  return data;
};

// 특정 게시물의 이미지 조회 ✅
const getRestaurantPostImages = async (postId) => {
  const { data, error } = await supabase
    .from("restaurant_post_image")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching restaurant post images:", error);
    return null;
  }
  return data;
};

// 특정 게시물의 특정 번호 이미지 수정 ✅
const updateRestaurantPostImage = async (postId, orderIndex, imageUrl) => {
  const { data, error } = await supabase
    .from("restaurant_post_image")
    .update({ url: imageUrl })
    .eq("post_id", postId)
    .eq("order_index", orderIndex);

  if (error) {
    console.error("Error updating restaurant post image:", error);
    return null;
  }
  return data;
};

// 게시물 이미지 삭제 ✅
const deleteRestaurantPostImage = async (postId, orderIndex) => {
  const { data, error } = await supabase
    .from("restaurant_post_image")
    .delete()
    .eq("post_id", postId)
    .eq("order_index", orderIndex); // order_index로 필터링

  if (error) {
    console.error("Error deleting restaurant post image:", error);
    return null;
  }
  return data;
};

export default {
  createRestaurantPostImage,
  getRestaurantPostImages,
  updateRestaurantPostImage,
  deleteRestaurantPostImage,
};
