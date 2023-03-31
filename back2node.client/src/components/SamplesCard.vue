<template>
  <div class="audio-player pt-2">
    <div class="image-container">
      <img class="sample-image" :src="sample.creator?.picture" alt="">
      <RouterLink :to="{ name: 'Profile', params: { profileId: sample?.creatorId } }">
        <h6 class="px-4">
          {{ sample.creator?.name }}
        </h6>
      </RouterLink>
    </div>
    <div class="audio-container">
      <div class="title-container">
        <h3 class="title">{{ sample.name }}</h3>
      </div>
      <audio ref="audio" preload="auto" @timeupdate="updateProgressBar" @ended="onAudioEnded">
        <source :src="sample.sampleUrl" type="audio/mpeg">
      </audio>
      <div class="play-pause-button" @click="togglePlayPause">
        <i :class="isPlaying ? 'mdi mdi-pause' : 'mdi mdi-play'"></i>
      </div>
      <div class="progress-bar" @click="seek">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="download-container">
        <button class="btn download-button" @click="downloadSample">
          <i class="mdi mdi-download"></i> Download
        </button>
      </div>
      <div class="stream-info">
        <p class="streams">{{ sample.streams }} streams</p>
        <p class="streams">{{ sample.key }} </p>
        <p class="tempo">{{ sample.tempo }} BPM</p>
        <p class="tempo">{{ (getCreatedAtString()) }}</p>
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
    getCreatedAtString() {
      const createdAt = new Date(this.sample.createdAt)
      const now = new Date()
      const diff = now - createdAt

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(hours / 24)

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      } else {
        return `just now`
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
    },
    downloadSample() {
      const download = new XMLHttpRequest();
      download.responseType = 'blob';
      download.onload = () => {
        const file = new Blob([download.response], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.sample.name}.mp3`;
        link.click();
        URL.revokeObjectURL(url);
      };
      download.open('GET', this.sample.sampleUrl);
      download.send();
    },
    onAudioEnded() {
      this.isPlaying = false;
    }
  }
};
</script>

<style>
.audio-player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #512da8;
  padding: 1rem;
  margin-bottom: 1rem;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1rem;
}

.sample-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  /* border-radius: 50%; */
}

h6 {
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
}

.audio-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.title {
  margin-top: 0;
  margin-bottom: 1rem;
}

audio {
  width: 100%;
}

.download-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.download-button {
  margin-left: 10px;
}

.play-pause-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #512da8;
  color: #fff;
  cursor: pointer;
  margin: 1rem auto;
  transition: background-color 0.2s ease-in-out;
}

.play-pause-button:hover {
  background-color: #311b92;
}

.play-pause-button i {
  font-size: 1.5rem;
}

.progress-bar {
  height: 4px;
  background-color: #eee;
  margin-top: 1rem;
  cursor: pointer;
}

.progress {
  height: 100%;
  background-color: #512da8;
}

.stream-info {
  margin-top: 1rem;
}

.streams,
.tempo {
  display: inline-block;
  margin-right: 1rem;
}

.btn {
  display: inline-block;
  border-radius: 4px;
  background-color: #512da8;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #311b92;
}

.download-button {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .audio-player {
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    margin-right: 0;
  }

  .sample-image {
    width: 80%;
    height: auto;
  }
}
</style>