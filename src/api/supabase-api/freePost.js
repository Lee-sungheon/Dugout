import { supabase } from "./../../../src/supabase.js";

// Create
// 자유 게시물 작성 (free_post)
async function createFreePost(memberId, content, title, thumbnailUrl, clubId) {
  const { data, error } = await supabase
    .from("free_post")
    .insert([
      {
        member_id: memberId,
        content,
        title,
        thumbnail_url: thumbnailUrl,
        club_id: clubId,
      },
    ])
    .select(); // 삽입된 데이터 반환

  if (error) {
    console.error("Error creating free post:", error);
    return null;
  }

  return data; // 생성된 자유 게시물 반환
}

// 자유 게시물에 좋아요 추가 (free_post_like)
async function createFreePostLike(memberId, postId) {
  const { data, error } = await supabase
    .from("free_post_like")
    .insert([{ member_id: memberId, post_id: postId }]);

  if (error) {
    console.error("Error creating free post like:", error);
    return null;
  }
  return data;
}

// 자유 게시물에 댓글 추가 (free_post_comment)
async function createFreePostComment(memberId, postId, content) {
  const { data, error } = await supabase
    .from("free_post_comment")
    .insert([{ member_id: memberId, post_id: postId, content }]);

  if (error) {
    console.error("Error creating free post comment:", error);
    return null;
  }
  return data; // 생성된 댓글 데이터를 반환
}

// Read

// 특정 구단의 전체 게시물 조회 (free_post)
async function getAllFreePostsByClub(clubId) {
  const { data, error } = await supabase
    .from("free_post")
    .select("*")
    .eq("club_id", clubId); // club_id로 필터링

  if (error) {
    console.error("Error fetching free posts for the club:", error);
    return null;
  }
  return data;
}

// 특정 자유 게시물 조회 (free_post)
async function getFreePostById(postId) {
  const { data, error } = await supabase
    .from("free_post")
    .select("*")
    .eq("id", postId) // 'id'가 postId와 일치하는 게시물을 조회
    .single(); // 하나의 게시물만 반환

  if (error) {
    console.error("Error fetching free post:", error);
    return null;
  }
  return data;
}

// 자유 게시물 좋아요 조회 (free_post_like)
async function getFreePostLikes(postId) {
  const { data, error } = await supabase
    .from("free_post_like")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching free post likes:", error);
    return null;
  }
  return data;
}

// 자유 게시물 댓글 조회 (free_post_comment)
async function getFreePostComments(postId) {
  const { data, error } = await supabase
    .from("free_post_comment")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching free post comments:", error);
    return null;
  }
  return data;
}

// Update

// 자유 게시물 수정 (free_post)
async function updateFreePost(postId, content, title, thumbnailUrl) {
  const { data, error } = await supabase
    .from("free_post")
    .update({ content, title, thumbnail_url: thumbnailUrl })
    .eq("id", postId);

  if (error) {
    console.error("Error updating free post:", error);
    return null;
  }
  return data;
}

// 자유 게시물 좋아요 취소 (free_post_like)
async function updateFreePostLike(postId, memberId) {
  const { data, error } = await supabase
    .from("free_post_like")
    .delete()
    .eq("post_id", postId)
    .eq("member_id", memberId);

  if (error) {
    console.error("Error updating free post like:", error);
    return null;
  }
  return data;
}

// 자유 게시물 댓글 수정 (free_post_comment)
async function updateFreePostComment(commentId, content) {
  const { data, error } = await supabase
    .from("free_post_comment")
    .update({ content })
    .eq("id", commentId);

  if (error) {
    console.error("Error updating free post comment:", error);
    return null;
  }
  return data;
}

// Delete

// 자유 게시물 삭제 (free_post)
async function deleteFreePost(postId) {
  const { data, error } = await supabase
    .from("free_post")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Error deleting free post:", error);
    return null;
  }
  return data;
}

// 자유 게시물 댓글 삭제 (free_post_comment)
async function deleteFreePostComment(commentId) {
  const { data, error } = await supabase
    .from("free_post_comment")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting free post comment:", error);
    return null;
  }
  return data;
}

export {
  createFreePost,
  createFreePostLike,
  createFreePostComment,
  getAllFreePostsByClub,
  getFreePostById,
  getFreePostLikes,
  getFreePostComments,
  updateFreePost,
  updateFreePostLike,
  updateFreePostComment,
  deleteFreePost,
  deleteFreePostComment,
};
