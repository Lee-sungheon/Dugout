import { supabase } from "@/supabase";

// GET
// Baseball 구단 리스트를 가져오는 함수
export const getBaseballClub = async () => {
  try {
    // Baseball 구단 데이터를 가져오기
    const { data: baseball_club, error } = await supabase
      .from("baseball_club")
      .select()
      .order("id", { ascending: true }); // id값 기준 오름차순

    if (error) {
      console.error("구단 리스트를 불러오지 못했습니다.", error.message);
      return null;
    }

    console.log("Baseball 구단 리스트를 성공적으로 불러왔습니다.");
    return baseball_club;
  } catch (err) {
    console.error(
      "구단 리스트를 가져오는 중 알 수 없는 에러가 발생했습니다.",
      err.message
    );
    return null;
  }
};