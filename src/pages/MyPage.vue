<script setup>
import Setting from "@/assets/icons/setting.svg";
import myTeamToggle from "@/assets/icons/my_team_toggle.svg";
import { ref, computed, onMounted, watchEffect } from "vue";
import { twMerge } from "tailwind-merge";
import Signout from "@/assets/icons/signout.svg";
import { useAuthStore } from "@/stores/auth";
import { teamID, teamByClubID } from "@/constants/index";
import {
  getCommentedPostsByMemberId,
  getLikedPostsByMemberId,
  getPostsByMemberId,
} from "@/api/supabase-api/getPostsByMyId";
import { useRouter } from "vue-router";
import { updateUserInfoEnCapsulation } from "@/api/supabase-api/userInfo";
import MyPostCard from "@/components/mypage/MyPostCard.vue";
import ActiveTabs from "@/components/mypage/ActiveTabs.vue";
import Camera from "@/assets/icons/camera.svg"
import { useImageStore } from "@/stores/useImageStore";


const router = useRouter()
const authStore = useAuthStore();
const imageStore = useImageStore();
const isEditingProfile = ref(false);
const isDropdownOpen = ref(false);
const isLoggedIn = computed(() => authStore.isAuthenticated());
const selectedRootTeam = ref(null)
const currentUserData = computed(() => authStore.user || {});
const activeTab = ref("posts");

const createdPosts = ref([]);
const commentedPosts = ref([]);
const likedPosts = ref([]);

const displayedData = computed(() => {
  switch (activeTab.value) {
    case "posts":
      return createdPosts.value;
    case "comments":
      return commentedPosts.value;
    case "likes":
      return likedPosts.value;
    default:
      return [];
  }
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeProfile = () => {
  isEditingProfile.value = !isEditingProfile.value;
};

const onClickLogout = () => {
  authStore.logout();
  router.push('/');
}

const updateRootTeam = async (newSelectedTeam, newTeamId) => {
  const previousClubId = currentUserData.value.baseball_club_id;

  // currentUserData가 유효한지 확인
  if (!currentUserData.value || !currentUserData.value.id) {
    console.error("유효하지 않은 사용자 데이터입니다.");
    return;
  }

  try {
    await updateUserInfoEnCapsulation(currentUserData.value.id, {
      ...currentUserData.value,
      baseball_club_id: newTeamId, 
    });
    currentUserData.value.baseball_club_id = newTeamId
    console.log('팀 정보 업데이트 완료');
  } catch (error) {
    currentUserData.value.baseball_club_id = previousClubId;
    console.error('팀 업데이트 실패', error);
  }
  selectedRootTeam.value =  newSelectedTeam;
  isDropdownOpen.value = false
};

const handleProfileImageUpload = async () => {
  // 파일 선택 창을 엽니다.
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  
  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await updateProfileImage(file); // 이미지 업로드 후 프로필 정보 업데이트
    }
  };

  input.click(); // 파일 선택 창을 자동으로 열기
};


const updateProfileImage = async (file) => {
  if (!file) return; // 파일이 없으면 종료

  // 이미지 업로드
  await imageStore.uploadImage(file, 0); // 첫 번째 인덱스에 이미지 업로드
  
  // 업로드 완료 후 URL 가져오기
  const newProfileImageUrl = imageStore.imageUrls[0]; // 업로드된 이미지 URL
  
  if (newProfileImageUrl) {
    try {
      // Supabase에 사용자 프로필 이미지 업데이트
      await updateUserInfoEnCapsulation(currentUserData.value.id, {
        ...currentUserData.value,
        image: newProfileImageUrl,
      });
      console.log("프로필 이미지 업데이트 완료!");
      imageStore.resetImageData(); 
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
    }
  } else {
    console.error("이미지 URL을 가져올 수 없습니다.");
  }
};


// 비동기 데이터 가져오기 (로그인 확인 후 실행)
const fetchUserData = async () => {
  if (!isLoggedIn.value) return; // 로그인 안 되어 있으면 실행 X

  try {
    const userId = currentUserData.value.id;
    const [posts, comments, likes] = await Promise.all([
      getPostsByMemberId(userId),
      getCommentedPostsByMemberId(userId),
      getLikedPostsByMemberId(userId),
    ]);

    console.log("유저 데이터 불러오기 완료", { posts, comments, likes });

    createdPosts.value = posts;
    commentedPosts.value = comments;
    likedPosts.value = likes;
  } catch (error) {
    console.error("유저 데이터 불러오기 중 오류 발생", error);
  }
};

onMounted(async () => {
  await authStore.fetchCurrentUser(); 
  if (!isLoggedIn.value) {
    router.push("/signin");
  } else {
    fetchUserData();
  }
});

</script>
<template>
  <div class="gap-[148px] mt-[152px]">
    <div className="px-[147px] flex flex-col items-center">
      <!-- 프로필 및 개인 정보 수정 -- 응원팀, 프로필 사진, 닉네임, -->
      <div class="flex items-center gap-[20px] mt-[52px]">

        <div
          class="w-[240px] h-[240px] rounded-full sticky flex flex-shrink-0"
          :class="{ 'outline outline-[5px] outline-Twins ': isEditingProfile }"
        >
        <figure class="w-[240px] h-[240px] rounded-full object-cover relative">
          <img v-if="currentUserData.image" :src="currentUserData.image" class="w-[240px] h-[240px] rounded-full object-cover" />
          <!-- 필터: isEditing일 때만-->
        <button @click="handleProfileImageUpload" v-if="isEditingProfile" class="absolute inset-0 bg-black opacity-50 rounded-full flex justify-center items-center">
          <img :src="Camera" alt="프로필 사진 수정 버튼" class="w-[40px] h-auto">
        </button>
        </figure>

        </div>
        <div className="flex flex-col gap-[50px]">
          <div class="relative inline-block w-auto">
            <button
              @click="isEditingProfile ? toggleDropdown() : null"
              :class="
                twMerge(
                  'inline-flex flex-nowrap whitespace-nowrap items-center w-[173px] h-[39px] px-[15px] gap-[10px] rounded-[10px] bg-white02 text-4 text-black01 transition-all cursor-default',
                  isDropdownOpen &&
                    'rounded-b-[0px] bg-white01 text-gray02 border border-gray02 border-[1px] border-b-transparent',
                  isEditingProfile && 'cursor-pointer'
                )
              "
            >
            {{ isEditingProfile ? selectedRootTeam ? selectedRootTeam :  "팀을 선택해주세요": teamByClubID[currentUserData.baseball_club_id] }}
              <img
                v-if="isEditingProfile"
                :src="myTeamToggle"
                class="w-[18px] h-[10.28px]"
              />
            </button>
            <div
              v-if="isDropdownOpen"
              class="absolute left-0 top-full w-[173px] bg-white01 border border-gray02 border-t-transparent rounded-b-[10px] overflow-hidden transition-all z-10 transform translate-y-[-1px]"
            >
              <ul>
                <li
                  v-for="(team,index) in teamByClubID"
                  @click="updateRootTeam(team,index)"
                  :key="index"
                  class="flex-nowrap whitespace-nowrap px-4 py-2 text-gray02 text-4 cursor-pointer"
                >
                  {{ team }} 팬
                </li>
              </ul>
            </div>
     
          </div>
          <div>
            <div class="flex items-center gap-[10px]">
              <h2 className="text-[24px] text-black01 font-bold">{{isLoggedIn? currentUserData.name : "비회원"}}</h2>
              <button @click="changeProfile">
                <img :src="Setting" class="w-[16.97px] h-[18px]" />
              </button>
            </div>
            <div>
              <p className="text-[18px] text-gray03 ">
                {{ isLoggedIn? currentUserData.description : "로그인 후 이용해주세요" }}
              </p>
              <button @click="onClickLogout" class="flex items-center gap-[2.5px]">
                <img :src="Signout" class="w-[18.28px] h-[16px]" />
                <p class="text-[18px] text-[#F50000]">로그아웃</p>
              </button>
            </div>
          </div>
        </div>
        <!-- 게시물, 좋아요, 댓글 탭 -->
        <ActiveTabs  v-model:activeTab="activeTab" :createdPostsCount="createdPosts.length" :commentedPostsCount="commentedPosts.length" :likedPostsCount="likedPosts.length"/>
      </div>

      <!-- 포스트 렌더링 공간 -->
      <div class="w-full max-w-[990px] mt-[40px]">
        <div
          v-if="displayedData"
          className="py-[10px] mb-[100.33px] border-t border-gray01  grid grid-cols-3 gap-[10px]"
        >
         <MyPostCard :displayedData="displayedData"/>
        </div>
      </div>
    </div>
  </div>
</template>
