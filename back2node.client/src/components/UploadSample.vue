<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Upload
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Upload Sample</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-dark">
          <form @submit.prevent="uploadSample()">
            <div class="modal-body">
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.name" type="text" required class="form-control" id="title"
                  placeholder="Sample Name">
                <label for="name">Sample Name</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.key" type="text" required class="form-control" id="key" placeholder="Location">
                <label for="key">key</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.description" type="text" required class="form-control" id="description"
                  placeholder="Description">
                <label for="description">Description</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.genre" type="text" required class="form-control" id="genre" placeholder="Genre">
                <label for="genre">Genre</label>
              </div>
              <div class="form-floating mb-3 elevation-5">
                <label for="tempo">Tempo</label>
                <input v-model="editable.tempo" type="hidden" name="tempo">
                <div class="slider-wrapper">
                  <input type="range" min="60" max="240" step="1" v-model="editable.tempo" class="slider"
                    id="tempo-slider">
                </div>
                <label for="tempo-slider" class="slider-label">{{ editable.tempo }} BPM</label>
              </div>
              <div class="form-group mb-3">
                <label class="btn btn-dark form-file-label" for="songLink">
                  <input @change="setAudio" name="file" type="file" class="form-file-input d-none" id="songLink"
                    accept="audio/*" required>
                  Choose a sample
                </label>
                <span v-if="editable.sampleUrl">Selected file: {{ editable.sampleUrl }}</span>
              </div>
              <div class="form-group mb-3">
                <label class="btn btn-dark form-file-label" for="imageLink">
                  <input @change="setImage" name="file" type="file" class="form-file-input d-none" id="imageLink"
                    accept="image/*" required>
                  Choose an image
                </label>
                <span v-if="editable.coverImg">Selected file: {{ editable.coverImg }}</span>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
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
import { logger } from "../utils/Logger.js";
export default {
  setup() {
    const editable = ref({})
    const audio = ref({})
    const image = ref({})

    return {
      editable,
      audio,
      image,
      setAudio(e) {
        audio.value = e.target.files
        editable.value.sampleUrl = audio.value[0].name
        logger.log('New audio:', audio.value)
      },
      setImage(e) {
        image.value = e.target.files
        editable.value.coverImg = image.value[0].name
        logger.log('New image:', image.value)
      },
      async uploadSample() {
        try {
          const audioUrl = await firebaseService.uploadSong(audio.value[0])
          const imageUrl = await firebaseService.uploadImage(image.value[0])
          editable.value.sampleUrl = audioUrl
          editable.value.coverImg = imageUrl
          await this.createSample()
        } catch (error) {
          Pop.error(error)
        }
      },
      async createSample() {
        try {
          debugger
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


<style lang="scss" scoped>
.modal-header {
  background-color: #343a40;
  color: #fff;
}

.modal-title {
  margin: 0;
  font-weight: bold;
}

.modal-body {
  padding: 1rem;
}

.modal-footer {
  justify-content: space-between;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.inputfile {
  display: none;
}

.form-file-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-dark {
  background-color: #ffffff;
  border-color: #000000;
}

.btn-dark:hover {
  background-color: #000000;
  border-color: #000000;
}

.progress {
  height: 10px;
  background-color: #d1d1d1;
  border-radius: 5px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.progress-bar {
  background-color: #007bff;
}
</style>