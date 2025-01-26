import { supabase } from "@/supabase";

// 게시물 댓글 조회
export const getComments = async (table, postId) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching free post comments:", error);
    return null;
  }
  return data;
};

// 게시물에 댓글 추가
export const createComment = async (table, memberId, postId, content) => {
  const { data, error } = await supabase
    .from(table)
    .insert([{ member_id: memberId, post_id: postId, content }]);

  if (error) {
    console.error("Error creating free post comment:", error);
    return null;
  }
  return data;
};
