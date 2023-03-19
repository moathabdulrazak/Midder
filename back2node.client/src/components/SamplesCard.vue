<template>
  <div class="component">
    <div class="image-container">
      <img class="sample-image" :src="sample.coverImg" alt="">
    </div>
    <div class="audio-container">
      <h3 class="title">{{ sample.name }}</h3>
      <audio controls :src="sample.sampleUrl"></audio>
      <div class="stream-info">
        <p class="streams">{{ sample.streams }} streams</p>
      </div>
    </div>
    <div class="creator-info">
      <img class="profile-pic" :src="sample.creator?.picture" alt="">
      <div class="creator-details">
        <h3 class="name">{{ sample.creator?.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed } from 'vue';

export default {
  props: { sample: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
};
</script>

<style lang="scss" scoped>
.component {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 2px solid purple;
  padding: 20px;
  border-radius: 10px;
}

.image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sample-image {
  height: 20vh;
  border-radius: 10px;
}

.audio-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.title {
  margin-top: 0;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
}

.stream-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.streams {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 10px;
}

.creator-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.creator-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}
</style>
