<template>
    <div class="team-building">
        <div class="left">
            <div class="area"></div>
        </div>
        <div class="right">
            <div class="top">
                <div class="top1">
                    <h1 class="title teko">CREATE-A-TEAM</h1>
                    <p class="rubik">Drag players from the left panel and add them to your team by dropping them onto
                        the right one.
                        Choose a memorable name, as
                        you won't be
                        able to change it!</p>
                </div>
                <div class="top2">
                    <input class="input rubik" type="text" v-model="team_name" placeholder="Team Name" maxlength="64" />
                    <greenButton :onClick="logout" msg="Create Team" style="width: 12dvw;" />
                </div>
            </div>
            <div class="bottom">
                <div class="area"></div>
            </div>
        </div>
    </div>
</template>

<script>
import greenButton from '@/components/greenButton.vue';
import { logout } from '@/utils/authUtils';

export default {
    name: 'TeamBuilding',
    components: {
        greenButton
    },
    data() {
        return {
            team_name: ''
        };
    },
    setup() {
        return {
            logout
        };
    },
};
</script>

<style scoped>
.team-building {
    height: 100%;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background: transparent;
    align-items: center;
    flex-direction: row;
    background-color: var(--goldongo-background);
    padding: 2dvw;
    color: var(--goldongo-text-alt);
}

.title {
    margin: 0;
    color: var(--goldongo-medium-2);
    font-size: 5dvw;
    background: -webkit-linear-gradient(45deg, var(--goldongo-medium-2), var(--goldongo-medium-3));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
}

.input {
    background-color: var(--goldongo-foreground);
    color: var(--goldongo-text);
    border: transparent;
    outline: transparent;
    height: 3em;
    flex: 1;
    margin-right: 2dvw;
    border-radius: 2dvw;
    box-sizing: border-box;
    padding: 0em 1em;
    font-size: 1dvw;
    margin-bottom: 1dvw;
}

.left {
    height: 100%;
    width: 50%;
    position: relative;
    padding-right: 1dvw;
    box-sizing: border-box;
}

.right {
    height: 100%;
    width: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 1dvw;
    box-sizing: border-box;
}

.top {
    width: 100%;
    height: 30%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.top1 {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start
}

.top2 {
    width: 100%;
    height: fit-content;
    display: flex;
}

.bottom {
    width: 100%;
    height: 70%;
    position: relative;
}

.area {
    border-radius: 2dvw;
    height: 100%;
    width: 100%;
    background-color: var(--goldongo-void);
}

p {
    font-size: 1dvw;
    text-wrap: pretty;
    text-overflow: ellipsis;
    text-align: justify;
    margin: 0;
}
</style>