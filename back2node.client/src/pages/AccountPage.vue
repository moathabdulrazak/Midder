<template>
  <EditAccountModal />

  <ActiveKeepModal />
  <div class="col-12 pt-3">
    <div class=" img-fluid img-vfx rounded-3 pt-1 " :style="{ backgroundImage: `url(${account?.picture})` }">
      <button type="button" class="btn mdi mdi-book-edit text-light " data-bs-toggle="modal"
        data-bs-target="#accountModal">
        mange account
      </button>
      <div class="about text-center  text-white fw-bold">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded-acc" :src="account?.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { AppState } from '../AppState'
import EditAccountModal from "../components/EditAccountModal.vue";
export default {
  setup(props) {
    const editable = ref({});
    return {
      editable,
      account: computed(() => AppState.account),
      // profile: computed(() => AppState.activeProfile),
    };
  },
  components: { EditAccountModal }
}
</script>
<style scoped>
img {
  max-width: 100px;
}

.rounded-acc {
  border-radius: 50%;
}
</style>
