<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="uploadSample()">
            <div class="form-group">
              <label for="name">sample name</label>
              <input v-model="editable.name" type="text" class="form-control" id="name" aria-describedby="emailHelp"
                placeholder="Enter name">
            </div>
            <div class="form-group">
              <label for="genre">genre </label>
              <input v-model="editable.genre" type="text" class="form-control" id="genre" aria-describedby="genre"
                placeholder="Enter genre">
            </div>
            <div class="form-group">
              <label for="genre">desription </label>
              <input v-model="editable.description" type="text" class="form-control" id="description"
                aria-describedby="description" placeholder="Enter description">
            </div>
            <div class="form-group">
              <label for="img">img? </label>
              <input v-model="editable.coverImg" type="url" class="form-control" id="img" aria-describedby="img"
                placeholder="img url">
            </div>

            <div class="form-group">
              <label class="btn-dark" for="formFile">choose a sample</label>
              <input @change="setSample" name="file" type="file" class="form-control input file p-2 " id="songLink"
                accept="audio/*" required aria-describedby="emailHelp" placeholder="upload song">
              <button class="btn mt-2 btn btn-light">upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { sampleService } from "../services/SamplesService.js";
import { firebaseService } from "../services/FirebaseService.js";
import { Modal } from "bootstrap";
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const editable = ref({})
    const images = ref([])
    const samples = ref({})
    return {
      editable,


      setSample(e) {
        samples.value = e.target.files
        logger.log('New Sample: ', samples.value)
      },
      async uploadSample() {
        try {
          const url = await firebaseService.uploadSample(samples.value[0])
          editable.value.sampleUrl = url
          await this.createSample()
        } catch (error) {
        }

      },

      async createSample() {
        try {
          await sampleService.createSample(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide();
        } catch (error) {
          Pop.error(error);
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>