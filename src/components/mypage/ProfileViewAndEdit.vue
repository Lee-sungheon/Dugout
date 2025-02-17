<script setup>
import { ref, computed } from "vue";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/stores/auth";
import { teamByClubID } from "@/constants/index";
import { useImageStore } from "@/stores/useImageStore";
import Camera from "@/assets/icons/camera.svg"
import Signout from "@/assets/icons/signout.svg";
import Setting from "@/assets/icons/setting.svg";
import myTeamToggle from "@/assets/icons/my_team_toggle.svg";
import { updateUserInfoEnCapsulation } from "@/api/supabase-api/userInfo";
import { useRouter } from "vue-router";

const router = useRouter()
const authStore = useAuthStore();
const currentUserData = computed(() => authStore.user || {});
const isLoggedIn = computed(() => authStore.isAuthenticated());
const imageStore = useImageStore();
const isEditingProfile = ref(false);
const isDropdownOpen = ref(false);
const selectedRootTeam = ref(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const changeProfile = () => {
  isEditingProfile.value = true
};


const saveProfileChanges = async () => {
  if (!isEditingProfile.value) return; 

  const newDescription = currentUserData.value.description;
  const newName = currentUserData.value.name;
  
  await updateDescriptionAndNickName(currentUserData.value.id,
    {...currentUserData.value,
    description: newDescription, name: newName});

  isEditingProfile.value = false; // 수정 완료 후 편집 모드 종료
};

const onClickLogout = () => {
  authStore.logout();
  router.push('/');
}

const updateRootTeam = async (newSelectedTeam, newTeamId) => {
  const previousClubId = currentUserData.value.baseball_club_id;

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
  if (!file) return; 

  await imageStore.uploadImage(file, 0); 
  const newProfileImageUrl = imageStore.imageUrls[0]; 
  
  if (newProfileImageUrl) {
    try {
      await updateUserInfoEnCapsulation(currentUserData.value.id, {
        ...currentUserData.value,
        image: newProfileImageUrl,
      });
      console.log("프로필 이미지 업데이트 완료!");
      currentUserData.value.image = newProfileImageUrl;
      imageStore.resetImageData(); 
    } catch (error) {
      console.error("프로필 이미지 업데이트 실패:", error);
    }
  } else {
    console.error("이미지 URL을 가져올 수 없습니다.");
  }
};

const updateDescriptionAndNickName = async (newDescription, newName) => {
  try {
    await updateUserInfoEnCapsulation(currentUserData.value.id, {
      ...currentUserData.value,
      description: newDescription,
      name: newName, // 이름도 함께 업데이트
    });
  } catch (error) {
    console.error("유저 설명 및 이름 업데이트 중 에러 발생", error);
  }
};

</script>
<template>
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
                  'realative inline-flex flex-nowrap whitespace-nowrap items-center w-[173px] h-[39px] px-[15px] gap-[10px] rounded-[10px] bg-white02 text-4 text-black01 transition-all cursor-default',
                  isDropdownOpen &&
                    'rounded-b-[0px] bg-white01 text-gray02 border border-gray02 border-[1px] border-b-transparent',
                  isEditingProfile && 'cursor-pointer'
                )">
                {{ isEditingProfile ? selectedRootTeam ? selectedRootTeam :  "팀을 선택해주세요": teamByClubID[currentUserData.baseball_club_id] }}
                <img
                v-if="isEditingProfile"
                :src="myTeamToggle"
                class="absolute right-10 w-[18px] h-[10.28px]"/>
                </button>
                <div
                    v-if="isDropdownOpen"
                    class="absolute left-0 top-full w-[173px] bg-white01 border border-gray02 border-t-transparent rounded-b-[10px] overflow-hidden transition-all z-10 transform translate-y-[-1px]">
                    <ul>
                        <li
                        v-for="(team,index) in teamByClubID"
                        @click="updateRootTeam(team,index)"
                        :key="index"
                        class="flex-nowrap whitespace-nowrap px-4 py-2 text-gray02 text-4 cursor-pointer"
                        >{{ team }} 팬
                        </li>
                    </ul>
                </div>
          </div>
          <div>
                <div class="flex items-center gap-[10px]">
                    <h2 v-if="!isEditingProfile" class="text-[24px] text-black01 font-bold">{{isLoggedIn? currentUserData.name : "비회원"}}
                        <button  @click="changeProfile">
                        <img :src="Setting" class="w-[16.97px] h-[18px]" />
                    </button>
                    </h2>
                    <input v-else :v-model="currentUserData.name" placeholder="닉네임을 입력해주세요" class="text-[18px] text-black01 font-bold w-[160px]"/>
                </div>
                <div>
                    <p v-if="!isEditingProfile" class="text-[18px] text-gray03 ">
                    {{ isLoggedIn? currentUserData.description : "로그인 후 이용해주세요" }}
                    </p>
                    <input
                     v-else
                        v-model="currentUserData.description"
                        class="text-[18px] text-gray03 p-1 border rounded h-[40px]"
                        placeholder="설명을 입력하세요" 
                        rows="4"/>
                    <button v-if="!isEditingProfile" @click="onClickLogout" class="flex items-center gap-[2.5px]">
                        <img :src="Signout" class="w-[18.28px] h-[16px]" />
                        <p class="text-[18px] text-[#F50000]">로그아웃</p>
                    </button>
                     <div v-else class="text-[18px] flex gap-[5px]">
                        <button @click="saveProfileChanges">저장</button>
                        <button>취소</button>
                     </div>
                </div>
          </div>
        </div>
    </div>
</template>