import { supabase } from "./../../../src/supabase.js";

/**
 * 특정 멤버 ID로 게시물을 가져오는 함수
 * @param {string} memberId
 * @returns {Promise<Array>}
 */
async function getPostsByMemberId(memberId) {
  try {
    const { data, error } = await supabase.rpc("get_posts_by_member_id", {
      p_member_id: memberId,
    });

    if (error) {
      console.error("RPC 오류 발생:", error);
      return [];
    }

    if (!data) {
      console.warn("데이터가 없거나 null이 반환되었습니다.");
      return [];
    }

    if (Array.isArray(data)) {
      return data;
    } else {
      try {
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        return [];
      }
    }
  } catch (err) {
    console.error("예기치 못한 오류 발생:", err);
    return [];
  }
}

(async () => {
  const memberId = "d9ac20dc-af86-42e8-9d63-5f1e35b20547";
  const posts = await getPostsByMemberId(memberId);
  console.log("원본 데이터", posts);
  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      console.log(`Post ID: ${post.post_id}`);
      console.log(`Post Type: ${post.post_type}`);
      console.log(`Title: ${post.post_title || "No Title"}`);
      console.log(`Thumbnail: ${post.thumbnail_url || "No Thumbnail"}`);
      console.log("---");
    });
  } else {
    console.log("No posts found or error occurred.");
  }
})();

/**
 * 특정 멤버 ID로 좋아요한 게시물을 가져오는 함수
 * @param {string} memberId - 멤버 ID
 * @returns {Promise<Array>} - 좋아요한 게시물 배열
 */
async function getLikedPostsByMemberId(memberId) {
  try {
    const { data, error } = await supabase.rpc("get_liked_posts_by_member_id", {
      p_member_id: memberId,
    });

    if (error) {
      console.error("RPC 오류 발생:", error);
      return [];
    }

    if (!data) {
      console.warn("데이터가 없거나 null이 반환되었습니다.");
      return [];
    }

    if (Array.isArray(data)) {
      return data;
    } else {
      try {
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        return [];
      }
    }
  } catch (err) {
    console.error("예기치 못한 오류 발생:", err);
    return [];
  }
}

(async () => {
  const memberId = "d9ac20dc-af86-42e8-9d63-5f1e35b20547"; // 테스트용 멤버 ID
  const likedPosts = await getLikedPostsByMemberId(memberId);

  console.log("좋아요한 게시물 데이터:", likedPosts);

  if (likedPosts && likedPosts.length > 0) {
    likedPosts.forEach((post) => {
      console.log(`Post ID: ${post.post_id}`);
      console.log(`Post Type: ${post.post_type}`);
      console.log(`Title: ${post.post_title || "No Title"}`);
      console.log(`Thumbnail: ${post.thumbnail_url || "No Thumbnail"}`);
      console.log("---");
    });
  } else {
    console.log("No liked posts found or an error occurred.");
  }
})();

/**
 * 특정 멤버 ID로 댓글 단 게시물을 가져오는 함수
 * @param {string} memberId - 멤버 ID
 * @returns {Promise<Array>} - 댓글 단 게시물 배열
 */
async function getCommentedPostsByMemberId(memberId) {
  try {
    const { data, error } = await supabase.rpc(
      "get_commented_posts_by_member_id",
      {
        p_member_id: memberId,
      }
    );

    if (error) {
      console.error("RPC 오류 발생:", error);
      return [];
    }

    if (!data) {
      console.warn("데이터가 없거나 null이 반환되었습니다.");
      return [];
    }

    if (Array.isArray(data)) {
      return data;
    } else {
      try {
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch (e) {
        console.error("JSON 파싱 오류:", e);
        return [];
      }
    }
  } catch (err) {
    console.error("예기치 못한 오류 발생:", err);
    return [];
  }
}

(async () => {
  const memberId = "d9ac20dc-af86-42e8-9d63-5f1e35b20547"; // 테스트용 멤버 ID
  const commentedPosts = await getCommentedPostsByMemberId(memberId);

  console.log("댓글 단 게시물 데이터:", commentedPosts);

  if (commentedPosts && commentedPosts.length > 0) {
    commentedPosts.forEach((post) => {
      console.log(`Post ID: ${post.post_id}`);
      console.log(`Post Type: ${post.post_type}`);
      console.log(`Title: ${post.post_title || "No Title"}`);
      console.log(`Thumbnail: ${post.thumbnail_url || "No Thumbnail"}`);
      console.log("---");
    });
  } else {
    console.log("No commented posts found or an error occurred.");
  }
})();
