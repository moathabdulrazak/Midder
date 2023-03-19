<template>
  <div class="component">
    <h3>{{ sample.name }}</h3>
    <img class="img-fluid img-size" :src="sample.coverImg" alt="">
    <audio controls :src="sample.sampleUrl"></audio>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: { sample: { type: Object, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.img-size {
  height: 30vh;
}
</style>