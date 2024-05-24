<template>
    <div class="card">
        <p class="rubik">{{ name }}</p>
        <p class="rubik">{{ team_name }}</p>
        <greenButton :onClick="funni" msg="Challenge" style="width: 8dvw" />
    </div>
</template>

<script>

import greenButton from './greenButton.vue';

export default {
    name: "userCard",
    props: {
        name: {
            type: String,
            required: true,
        },
        team_name: {
            type: String,
            required: true
        }
    },
    components: { greenButton }
};
</script>

<style scoped>
.card {
    width: 100%;
    background-color: var(--goldongo-background);
    height: 6dvw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4dvw;
    box-sizing: border-box;
    font-size: 1dvw;
}
</style>