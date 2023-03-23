<template>
  <div class="audio-player">
    <div class="image-container">
      <img class="sample-image" :src="sample.coverImg" alt="">
      <RouterLink :to="{ name: 'Profile', params: { profileId: sample?.creatorId } }">
        <h6 class="px-4">
          {{ sample.creator?.name }}
        </h6>
      </RouterLink>
    </div>
    <div class="audio-container">
      <h3 class="title">{{ sample.name }}</h3>
      <audio ref="audio" preload="auto" @timeupdate="updateProgressBar">
        <source :src="sample.sampleUrl" type="audio/mpeg">
      </audio>
      <div class="play-pause-button mdi" :class="['mdi-' + (isPlaying ? 'pause' : 'play')]" @click="togglePlayPause">
      </div>
      <div class="progress-bar" @click="seek">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="stream-info">
        <p class="streams">{{ sample.streams }} streams</p>
      </div>
      <div class="stream-info">
        <p class="tempo">{{ sample.tempo }} BPM</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
export default {
  props: { sample: { type: Object, required: true } },
  data() {
    return {
      account: computed(() => AppState.account),
      isPlaying: false,
      progress: 0
    };
  },
  methods: {
    togglePlayPause() {
      const audio = this.$refs.audio;
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false;
      } else {
        audio.play();
        this.isPlaying = true;
      }
    },
    updateProgressBar() {
      const audio = this.$refs.audio;
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      if (duration) {
        this.progress = (currentTime / duration) * 100;
      } else {
        this.progress = 0;
      }
    },
    seek(event) {
      const audio = this.$refs.audio;
      const progressBar = event.currentTarget;
      const boundingClientRect = progressBar.getBoundingClientRect();
      const x = event.clientX - boundingClientRect.left;
      const percentage = (x / boundingClientRect.width) * 100;
      const duration = audio.duration;
      if (duration) {
        audio.currentTime = (percentage / 100) * duration;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.audio-player {
  display: flex;
  align-items: center;
  font-family: sans-serif;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.sample-image {
  max-width: 50%;
  height: 10em;
  border-radius: 50px;
}

.audio-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.play-pause-button {
  width: 60px;
  height: 60px;
  background-color: #2196F3;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 10px;
  position: relative;
}

.play-pause-button:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-style: solid;
  border-width: 0 15px 0 0;
  border-color: transparent;
  height: 20px;
  width: 0;
}

.play-pause-button.playing:before {
  border-width: 0 15px 0 15px;
}

.progress-bar {
  width: 80%;
  height: 10px;
  background-color: #ddd;
  cursor: pointer;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background-color: #b700ff;
}

.stream-info {
  margin-top: 10px;
}

.stream-info p {
  margin: 0;
  font-size: 1rem;
}

.tempo {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}
</style>
