<template>
  <div class="container-fluid">
    <div class="row container-fluid">
      <div class="row container-fluid">
      </div>
    </div>
    <div>
      <div v-if="profile" class="row container-fluid cover-img" :style="`background-image: url(${profile.coverImg})`">
        <div class="col-12 d-flex align-items-center justify-content-around">
          <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
          <div class="bg-transparent rounded elevation-5 p-5">
            <h1 class="elevation-1">
              {{ profile.name }}
            </h1>
            <h2>
              {{ profile.bio }}
            </h2>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { profileService } from "../services/ProfilesService.js";
export default {
  setup() {
    const route = useRoute();




    async function getProfile() {
      try {
        await profileService.getProfile(route.params.profileId)
      } catch (error) {
        Pop, error(error)
      }
    }


    onMounted(() => {
      getProfile()
    })

    return {
      profile: computed(() => AppState.activeProfile),
    }
  }
};
</script>


<style lang="scss" scoped></style>