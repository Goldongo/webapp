<template>
  <button class="green-button rubik" @click="handleClick">{{ msg }}</button>
</template>

<script>
export default {
  name: "greenButton",
  props: {
    onClick: {
      type: Function,
      required: false,
    },
    msg: {
      type: String,
      required: false,
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
};
</script>

<style scoped>
.green-button {
  height: 3em;
  width: 21dvw;
  font-size: 1dvw;
  border-radius: 2dvw;
  background: -webkit-linear-gradient(
    45deg,
    var(--goldongo-medium-2),
    var(--goldongo-medium-3)
  );
  border: 0.2dvw solid transparent;
  background-origin: border-box;
  cursor: pointer;
  transition: border 0.1s linear;
  color: var(--goldongo-text);
  font-weight: 400;
}

.green-button:hover {
  border: 0.2dvw solid var(--goldongo-text);
}
</style>
