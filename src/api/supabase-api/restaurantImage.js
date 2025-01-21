import { supabase } from "./../../../src/supabase.js";

const restaurantPostImageService = {
  // 이미지 추가
  createRestaurantPostImage: async (postId, imageUrl, imageIndex) => {
    const { data, error } = await supabase
      .from("restaurant_post_image")
      .insert([{ post_id: postId, url: imageUrl, order_index: imageIndex }]);

    if (error) {
      console.error("Error creating restaurant post image:", error);
      return null;
    }

    return data;
  },

  // 특정 게시물의 이미지 조회
  getRestaurantPostImages: async (postId) => {
    const { data, error } = await supabase
      .from("restaurant_post_image")
      .select("*")
      .eq("post_id", postId);

    if (error) {
      console.error("Error fetching restaurant post images:", error);
      return null;
    }
    return data;
  },

  // 특정 게시물의 특정 번호 이미지 수정
  updateRestaurantPostImage: async (postId, orderIndex, imageUrl) => {
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
  },

  // 게시물 이미지 삭제
  deleteRestaurantPostImage: async (postId, orderIndex) => {
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
  },

  // 게시물 이미지 추가 테스트
  testCreateRestaurantPostImage: async () => {
    const postId = 33; // 테스트할 게시물 ID
    const imageUrl = "http://example.com/image.jpg";
    const orderIndex = 2;
    try {
      const image = await restaurantPostImageService.createRestaurantPostImage(
        postId,
        imageUrl,
        orderIndex
      );
      console.log("게시물 이미지 추가 성공:", image);
    } catch (error) {
      console.error("Error testing createRestaurantPostImage:", error);
    }
  },

  // 맛집 게시물 이미지 조회 테스트
  testGetRestaurantPostImages: async () => {
    const postId = 33; // 테스트할 게시물 ID

    try {
      const images = await restaurantPostImageService.getRestaurantPostImages(
        postId
      );
      console.log("게시물 이미지 조회 성공:", images);
    } catch (error) {
      console.error("Error testing getRestaurantPostImages:", error);
    }
  },

  // 맛집 게시물 이미지 수정 테스트
  testUpdateRestaurantPostImage: async () => {
    const postId = 1; // 수정할 게시물 ID
    const orderIndex = 1;
    const newImageUrl = "http://newimage11.jpg";

    try {
      const updatedImage =
        await restaurantPostImageService.updateRestaurantPostImage(
          postId,
          orderIndex,
          newImageUrl
        );
      console.log("게시물 이미지 수정 성공:", updatedImage);
    } catch (error) {
      console.error("Error testing updateRestaurantPostImage:", error);
    }
  },

  // 맛집 게시물 이미지 삭제 테스트
  testDeleteRestaurantPostImage: async () => {
    const postId = 33; // 삭제할 게시물 ID
    const orderIndex = 2;

    try {
      const deletedImage =
        await restaurantPostImageService.deleteRestaurantPostImage(
          postId,
          orderIndex
        );
      console.log("게시물 이미지 삭제 성공:", deletedImage);
    } catch (error) {
      console.error("Error testing deleteRestaurantPostImage:", error);
    }
  },

  // 테스트 실행 함수
  runAllTests: async () => {
    console.log("테스트 시작...");

    await restaurantPostImageService.testCreateRestaurantPostImage(); // 게시물 이미지 추가 테스트
    await restaurantPostImageService.testGetRestaurantPostImages(); // 게시물 이미지 조회 테스트
    await restaurantPostImageService.testUpdateRestaurantPostImage(); // 게시물 이미지 수정 테스트
    await restaurantPostImageService.testDeleteRestaurantPostImage(); // 게시물 이미지 삭제 테스트

    console.log("모든 테스트가 완료되었습니다.");
  },
};

export default restaurantPostImageService;
