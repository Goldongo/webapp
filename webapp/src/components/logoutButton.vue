<template>
    <button @click.prevent="logoutWrapper" class="logout-button rubik">Log Out</button>
</template>

<script>
import { logout } from '@/utils/authUtils';
export default {
    name: "logoutButton",
    setup() {
        const logoutWrapper = () => {
            logout();
        }
        return { logoutWrapper };
    }
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Danfo:ELSH@0..100&family=Rubik:ital,wght@0,300..900;1,300..900&family=Teko:wght@300..700&display=swap');

.rubik {
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

.logout-button {
    height: 3em;
    width: 10dvw;
    font-size: 1dvw;
    border-radius: 2dvw;
    background: -webkit-linear-gradient(45deg, var(--goldongo-medium-2), var(--goldongo-medium-3));
    outline: transparent;
    border: 0.2dvw solid transparent;
    background-origin: border-box;
    cursor: pointer;
    transition: border 0.1s linear;
    color: var(--goldongo-text);
    font-weight: 400;
}

.logout-button:hover {
    border: 0.2dvw solid var(--goldongo-text)
}
</style>
