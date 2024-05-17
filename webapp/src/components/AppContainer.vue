<template>
  <div class="AppContainer">
    <Auth />
  </div>
</template>

<script>
import { inject } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router'
import Auth from "./Auth.vue";

export default {
  name: "AppContainer",
  components: {
    Auth,
  },
  setup() {
    const isDarkMode = inject('isDarkMode');
    const toggleDarkMode = inject('toggleDarkMode');

    return {
      isDarkMode,
      toggleDarkMode,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AppContainer {
  display: flex;
  justify-content: center;
  background-color: var(--goldongo-foreground);
  height: 100%;
  width: 100%;
  border-radius: 2vw;
}
</style>
