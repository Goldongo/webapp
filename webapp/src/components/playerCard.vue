<template>
  <div class="card rubik">
    <img src="@/assets/person.svg" alt="" />
    <p>{{ name }}</p>
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
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 1dvw;
  padding-top: 3dvw;
  font-size: 1dvw;
  color: var(--goldongo-text-alt);
  transition: scale 0.6s cubic-bezier(0.075, 0.82, 0.165, 1),
    opacity 0.1s linear;
  box-shadow: 0 0 1dvw 0.2dvw rgba(10, 10, 10, 0.2);
}
img {
  width: 30%;
}
.card:hover {
  scale: 105%;
  opacity: 0.7;
}
</style>
