<template>
  <div class="component">
    <audio controls :src="sample.sampleUrl"></audio>

    <div class="background-img" :style="{ backgroundImage: `url(${sample.coverImg})` }">
      <div class="overlay"></div>
      <h3 class="title">{{ sample.name }}</h3>
      <div class="stream-info">
        <p class="streams">{{ sample.streams }} streams</p>
        <div class="separator"></div>
      </div>
    </div>
    <div class="profile">
      <img class="profile-pic" :src="account.picture" alt="">
      <h3 class="name">{{ account.name }}</h3>
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
  flex-direction: column;
  align-items: center;
}

.background-img {
  position: relative;
  height: 40vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
  border-radius: 10px;
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 3rem;
  z-index: 2;
}

audio {
  margin-top: 20px;
  width: 70%;
}

.stream-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.streams {
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 20px;
}

.separator {
  height: 10px;
  width: 1px;
  background-color: white;
  margin: 0 20px;
}

.length {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 20px;
}

.profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.profile-pic {
  height: 8vh;
  border-radius: 50%;
  margin-right: 20px;
}

.name {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
