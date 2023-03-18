<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    upload
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
            <div class="modal-body">
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.name" type="text" required class="form-control" id="title"
                  placeholder="event name">
                <label for="name">sample name</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.key" type="text" required class="form-control" id="key" placeholder="location">
                <label for="key">key</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.description" type="text" required class="form-control" id="description"
                  placeholder="description?">
                <label for="description">description</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.genre" type="text" required class="form-control" id="genre" placeholder="genre">
                <label for="genre">genre</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
                  placeholder="Cover Image">
                <label for="coverImg">Cover Image</label>
              </div>
              <div class="form-group">
                <label class="btn-dark" for="formFile">choose a song</label>
                <input @change="setAudio" name="file" type="file" class="form-control inputfile p-2 " id="songLink"
                  accept="audio/*" required aria-describedby="emailHelp" placeholder="upload song">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
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
import { Modal } from "bootstrap";
import { sampleService } from "../services/SamplesService.js";
import { firebaseService } from "../services/FirebaseService.js";
export default {
  setup() {
    const editable = ref({})
    const media = ref({})
    return {
      editable,
      setAudio(e) {
        media.value = e.target.files
        logger.log('New audo: ', media.value)
      },
      async uploadSample() {
        try {
          const url = await firebaseService.uploadSong(media.value[0])
          editable.value.sampleUrl = url
          await this.createSample()
        } catch (error) {
        }

      },
      async createSample() {
        try {
          const sample = await sampleService.createSample(editable.value)
          editable.value = {}
          Modal.getOrCreateInstance('#exampleModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>