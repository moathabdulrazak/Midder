<template>
  <div v-if="!filteredSamples.length" class="spinner-wrapper">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  <div class="row justify-content-center pt-2 container-fluid">
    <div class="col-12 col-md-4 pb-3">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search for users or samples" v-model="search">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary mdi mdi-circle" type="button" @click="searchSamples"><i
              class="fa fa-search"></i></button>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 pb-3">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="filterDrop" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          Filter by genre
        </button>
        <div class="dropdown-menu" aria-labelledby="filterDrop">
          <a class="dropdown-item" href="#" @click="setGenre('all')">All</a>
          <a class="dropdown-item" href="#" @click="setGenre('hiphop')">Hip Hop</a>
          <a class="dropdown-item" href="#" @click="setGenre('rock')">Rock</a>
          <a class="dropdown-item" href="#" @click="setGenre('electronic')">Electronic</a>
        </div>
      </div>
    </div>
    <div class="col-11" v-if="filteredSamples.length > 0">
      <div v-for="s in filteredSamples">
        <SamplesCard :sample="s" />
      </div>
    </div>
    <div v-else class="col-11 text-center">
      <p>No results found</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { sampleService } from "../services/SamplesService.js";
import { logger } from "../utils/Logger.js";
import SamplesCard from "../components/SamplesCard.vue";
import Pop from "../utils/Pop.js";

export default {
  components: {
    SamplesCard,
  },
  setup() {
    const search = ref("");
    const genre = ref("all");

    async function getAllSamples() {
      try {
        const samples = await sampleService.getAllSamples();
      } catch (error) {
        logger.log(error.message);
        Pop.error(error.message);
      }
    }

    function setGenre(selectedGenre) {
      genre.value = selectedGenre;
      searchSamples();
    }

    function filterSamples(samples, genre, search) {
      if (!samples) {
        return [];
      }

      return samples.filter(sample => {
        if (genre !== "all" && sample.genre !== genre) {
          return false;
        }
        if (search && !sample.name.toLowerCase().includes(search.toLowerCase()) && !sample.creator.name.toLowerCase().includes(search.toLowerCase())) {
          return false;
        }
        return true;
      });
    }

    function searchSamples() {
      AppState.samples = filterSamples(
        AppState.samples,
        genre.value,
        search.value
      );
    }

    onMounted(() => {
      getAllSamples();
    });

    return {
      search,
      genre,
      filteredSamples: computed(() =>
        filterSamples(AppState.samples, genre.value, search.value)
      ),
      setGenre,
      searchSamples,
    };
  },
};
</script>

<style scoped lang="scss">
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
}

.spinner-border {
  animation-duration: 10s;
}

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
