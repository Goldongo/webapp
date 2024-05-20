<template>
  <div class="app-wrapper dark">
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: "App"
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
  box-sizing: border-box;
}

.app-content {
  display: flex;
  justify-content: center;
  background-color: var(--goldongo-background);
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box
}

.light {
  --goldongo-light: #A5FD8F;
  --goldongo-medium-1: #54C082;
  --goldongo-medium-2: rgb(40, 174, 107);
  --goldongo-medium-3: #3C907F;
  --goldongo-contrast: #1E3E5E;
  --goldongo-foreground: rgb(240, 240, 240);
  --goldongo-background: rgb(255, 255, 255);
  --goldongo-text: rgb(3, 3, 3);
  --goldongo-text-inverted: rgb(250, 250, 250);
}

.dark {
  --goldongo-light: #A5FD8F;
  --goldongo-medium-1: #54C082;
  --goldongo-medium-2: rgb(40, 174, 107);
  --goldongo-medium-3: #3C907F;
  --goldongo-contrast: #1E3E5E;
  --goldongo-foreground: rgb(46, 46, 46);
  --goldongo-background: rgb(22, 22, 22);
  --goldongo-text: rgb(250, 250, 250);
  --goldongo-text-inverted: rgb(3, 3, 3);
}
</style>
