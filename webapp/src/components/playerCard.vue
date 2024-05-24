<template>
  <div class="card rubik">
    <div class="position">
      <img :src="getImagePath(position)" alt="" />
    </div>
    <div class="img">
      <img src="@/assets/person.svg" alt="" />
    </div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "playerCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  methods: {
    getImagePath(position) {
      return require(`@/assets/${position}.svg`);
    },
  },
};
</script>

<style scoped>
.card {
  height: 10dvw;
  width: 8dvw;
  background-color: var(--goldongo-foreground);
  border-radius: 1dvw;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 1dvw;
  color: var(--goldongo-text-alt);
  transition: scale 0.6s cubic-bezier(0.075, 0.82, 0.165, 1),
    opacity 0.1s linear;
  box-shadow: 0 0 1dvw 0.2dvw rgba(10, 10, 10, 0.2);
  padding: 1dvw;
  user-select: none;
}

.card:hover {
  scale: 105%;
  opacity: 0.7;
}

.img {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-grow: 1;
  img {
    width: 2dvw;
  }
}

.name {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;
  text-wrap: wrap;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.9dvw;
}

.position {
  width: 100%;
  height: 1.5dvw;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  box-sizing: border-box;
  img {
    width: 1.5dvw;
  }
}
</style>
