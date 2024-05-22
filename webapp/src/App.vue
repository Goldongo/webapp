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
@import url('https://fonts.googleapis.com/css2?family=Danfo:ELSH@0..100&family=Rubik:ital,wght@0,300..900;1,300..900&family=Teko:wght@300..700&display=swap');

.danfo {
  font-family: "Danfo", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "ELSH" 0;
}

.teko {
  font-family: "Teko", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.rubik {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
}

.app-content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--goldongo-background);
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
  --goldongo-text-alt: rgb(3, 3, 3);
  --goldongo-text-inverted: rgb(250, 250, 250);
  --goldongo-void: rgb(240, 240, 240);
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
  --goldongo-text-alt: rgb(180, 180, 180);
  --goldongo-text-inverted: rgb(3, 3, 3);
  --goldongo-void: rgb(16, 16, 16);
}
</style>
