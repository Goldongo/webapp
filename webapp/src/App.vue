<template>
  <div :class="wrapperClasses">
    <AppContainer />
  </div>
</template>

<script>
import { ref, provide, computed } from 'vue';
import AppContainer from "./components/AppContainer.vue";

export default {
  name: "App",
  components: {
    AppContainer,
  },
  setup() {
    const isDarkMode = ref(true);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };
    provide('isDarkMode', isDarkMode);
    provide('toggleDarkMode', toggleDarkMode);

    const wrapperClasses = computed(() => ({
      'app-wrapper': true,
      'dark': isDarkMode.value,
      'light': !isDarkMode.value
    }))

    return {
      isDarkMode, toggleDarkMode, wrapperClasses
    };
  },
};
</script>

<style>
body {
  max-width: 100%;
  max-height: 100%;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

.app-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--goldongo-background);
  box-sizing: border-box;
  padding: 2vw 4vw;
}

.light {
  --goldongo-light: #A5FD8F;
  --goldongo-medium-1: #54C082;
  --goldongo-medium-2: rgb(40, 174, 107);
  --goldongo-medium-3: #3C907F;
  --goldongo-contrast: #1E3E5E;
  --goldongo-background: rgb(192, 206, 199);
  --goldongo-foreground: rgb(229, 239, 234);
  --goldongo-text: rgb(33, 36, 34);
  --goldongo-text-inverted: rgb(192, 206, 199);
  --goldongo-input: white;
}

.dark {
  --goldongo-light: #A5FD8F;
  --goldongo-medium-1: #54C082;
  --goldongo-medium-3: rgb(40, 174, 107);
  --goldongo-medium-2: #3C907F;
  --goldongo-contrast: #1E3E5E;
  --goldongo-background: rgb(42, 45, 43);
  --goldongo-foreground: rgb(49, 51, 50);
  --goldongo-text: rgb(192, 206, 199);
  --goldongo-text-inverted: rgb(33, 36, 34);
  --goldongo-input: var(--goldongo-background);
}
</style>
