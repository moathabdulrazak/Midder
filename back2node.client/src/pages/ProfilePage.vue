<template>
  <div class="component">
    profile page

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

    return {}
  }
};
</script>


<style lang="scss" scoped></style>