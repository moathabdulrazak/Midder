<template>
  <div class="audio-player">
    <div class="image-container">
      <img class="sample-image img-fluid" :src="sample.coverImg" alt="">
    </div>
    <div class="audio-container">
      <h3 class="title">{{ sample.name }}</h3>
      <audio ref="audio" preload="auto" @timeupdate="updateProgressBar">
        <source :src="sample.sampleUrl" type="audio/mpeg">
      </audio>
      <div class="play-pause-button" @click="togglePlayPause" :class="{ playing: isPlaying }"></div>
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
export default {
  props: { sample: { type: Object, required: true } },
  data() {
    return {
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
}

.play-pause-button {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  border-radius: 50%;
  border: 2px solid #000;
  cursor: pointer;
}

.playing {
  background-color: #000;
}

.progress-bar {
  height: 4px;
  width: 100%;
  background-color: #ccc;
  cursor: pointer;
}

.progress {
  height: 100%;
  background-color: #000;
}
</style>
