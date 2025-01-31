import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSearchStore = defineStore("search", () => {
  const keyword = ref(""); // 검색어 상태
  const allPosts = ref([]); // 모든 게시물 데이터 저장

  // 검색어 설정
  const setKeyword = (value) => {
    keyword.value = value;
  };

  // 게시물 데이터 설정 (API 호출 후 저장)
  const setPosts = (posts) => {
    allPosts.value = posts;
  };

  // 한글 초성 검색 지원 함수
  const matchChosung = (text, search) => {
    const chosungMap = {
      ㄱ: "가강거경고구군권근금기",
      ㄴ: "나낙난남노누눈늑능니",
      ㄷ: "다단달담대더도독동두뒤디",
      ㄹ: "라락란람래러로록루류리",
      ㅁ: "마만말망매머모목무문미",
      ㅂ: "바박반발방배버보복부북분불비",
      ㅅ: "사산살삼상새서석선설소속수숙순술시",
      ㅇ: "아안알암애야어언얼엄여역연열영예오온올와요용우운울원유윤율으은을의이익인일임입잉",
      ㅈ: "자작잔잠장재저전절점접정제조족존종주준중지직진질짐집징",
      ㅊ: "차착찬참창채처천철청체초촉총추춘출충취",
      ㅋ: "카코쿠크키",
      ㅌ: "타탁탄탈탑태택탤탭터테토톤통투",
      ㅍ: "파판팔패퍼페포폭표푸프피",
      ㅎ: "하학한할함해허험헤현혈협호혹혼홀화환활황회효후훈훌휘휴흔흘흥히"
    };
    
    return search
      .split("")
      .every((chosung) => 
        chosungMap[chosung] &&
        [...text].some((char) => chosungMap[chosung].includes(char))
      );
  };

  // 검색어로 필터링된 게시물 반환
  const filteredPosts = computed(() => {
    if (!keyword.value.trim()) return allPosts.value;

    const lowerKeyword = keyword.value.toLowerCase();
    const keywords = lowerKeyword.split(" "); // 다중 키워드 검색 지원

    return allPosts.value
      .filter((post) => {
        const title = post.title.toLowerCase();
        const content = post.content.toLowerCase();

        // 대소문자 무시하고 다중 키워드 포함 여부 확인
        const matches = keywords.every(
          (kw) => title.includes(kw) || content.includes(kw) || matchChosung(title, kw)
        );

        return matches;
      })
      .sort((a, b) => {
        // 제목에 키워드 포함되면 우선순위 높이기
        const aTitleMatch = keywords.some((kw) => a.title.toLowerCase().includes(kw));
        const bTitleMatch = keywords.some((kw) => b.title.toLowerCase().includes(kw));

        return bTitleMatch - aTitleMatch; // true(1) > false(0)
      });
  });

  return { keyword, setKeyword, allPosts, setPosts, filteredPosts };
});
