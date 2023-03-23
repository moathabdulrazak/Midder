<template>
  <div class="container-fluid">
    <div class="row container-fluid">
      <div class="row container-fluid">
      </div>
    </div>
    <div>
      <div v-if="profile" class="row container-fluid cover-img" :style="`background-image: url(${profile.coverImg})`">
        <div class="col-12 d-flex align-items-center justify-content-around">
          <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle elevation-5 slide-in">
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


<style lang="scss" scoped>
/* Set up the cover image */
.cover-img {
  height: 300px;
  background-position: center;
  background-size: cover;
}

/* Style the profile picture */
.profile-picture {
  width: 200px;
  height: 200px;
  border: 5px solid white;
  transition: all 0.2s ease-in-out;
}

/* Add a hover effect to the profile picture */
.profile-picture:hover {
  transform: scale(1.1);
}

/* Style the profile name and bio */
h1,
h2 {
  margin: 0;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

h2 {
  font-size: 2rem;
  font-weight: normal;
  color: #666;
}

/* Add some elevation to the profile information */
.elevation-5 {
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
}

/* Add a cool slide-in animation to the profile picture */
.profile-picture.slide-in {
  animation: slide-in 0.5s ease-in-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>