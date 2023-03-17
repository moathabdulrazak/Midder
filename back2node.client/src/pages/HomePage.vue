<template>
  <h1>Midder start</h1>

  <UploadSample />

  <audio
    src="https://firebasestorage.googleapis.com/v0/b/midder-2414c.appspot.com/o/samples%2Fbeatsbyslade%20%2B%20beris%20-%20habibi%20-%20160.mp3?alt=media&token=71691395-fbde-42be-b848-a5095d76779d"></audio>

  <div v-for="s in samples">
    <SamplesCard :sample="s" />

  </div>
</template>

<script>
import { async } from "@firebase/util";
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import { sampleService } from "../services/SamplesService.js";
import { logger } from "../utils/Logger.js";
import SamplesCard from "../components/SamplesCard.vue"
import Pop from "../utils/Pop.js";
import UploadSample from "../components/UploadSample.vue";

export default {
  setup() {
    async function getAllSamples() {
      try {
        await sampleService.getAllSamples();
      }
      catch (error) {
        logger.log(error.message);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getAllSamples();
    });
    return {
      samples: computed(() => AppState.samples),
    };
  },
  components: { UploadSample }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
