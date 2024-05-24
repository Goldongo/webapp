<template>
    <div class="team-building">
        <div class="left">
            <div class="area">
                <div class="scrollable-content">
                    <playerCard v-for="player in players" :key="player.id" :name="player.name"
                        :position="player.position" @click="selectPlayer(player)" />
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="top1">
                    <h1 class="title teko">CREATE-A-TEAM</h1>
                    <p class="rubik">
                        Add and remove players by selecting them on the left and right panel
                        respectively. Remember to choose a memorable name, as you won't be
                        able to change it!
                    </p>
                </div>
                <div class="top2">
                    <input class="input rubik" type="text" v-model="name" placeholder="Team Name" maxlength="64" />
                    <greenButton :onClick="createTeam" msg="Create Team" style="width: 12dvw" />
                </div>
            </div>
            <div class="bottom">
                <div class="area">
                    <div class="scrollable-content">
                        <playerCard v-for="player in selected_players" :key="player.id" :name="player.name"
                            :position="player.position" @click="removePlayer(player)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import greenButton from "@/components/greenButton.vue";
import playerCard from "@/components/playerCard.vue";
import { getToken } from "@/utils/authUtils";
import axios from "axios";

export default {
    name: "TeamBuilding",
    components: {
        greenButton,
        playerCard,
    },
    data() {
        return {
            name: "",
            players: [],
            selected_players: [],
        };
    },
    methods: {
        async fetchPlayers() {
            try {
                const allPlayers = await axios.get(
                    process.env.VUE_APP_API_PLAYERS_IP + "/players",
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );
                console.log("Players fetched");
                this.players = allPlayers.data;
                console.log(this.players);
            } catch (error) {
                console.error("Could not fetch players:", error);
            }
        },
        selectPlayer(player) {
            if (this.selected_players.length < 11) {
                this.selected_players.push(player); // Add selected player to selected_players array
            }
        },
        removePlayer(player) {
            this.selected_players.pop(player); // Add selected player to selected_players array
        },
        async createTeam() {
            try {
                const playerIds = this.selected_players.map((player) => player.id); // Extract only the IDs
                const createTeamResponse = await axios.post(
                    process.env.VUE_APP_API_USERS_IP + "/team",
                    {
                        name: this.name,
                        player_ids: playerIds,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + getToken(),
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );
                console.log("Team created");
                this.$router.push('/home');
            } catch (error) {
                console.error("Team creation failed:", error);
            }
        },
    },
    mounted() {
        this.fetchPlayers();
    },
};
</script>

<style scoped>
.team-building {
    height: 100%;
    width: 100%;
    display: flex;
    box-sizing: border-box;
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
    background: -webkit-linear-gradient(45deg,
            var(--goldongo-medium-2),
            var(--goldongo-medium-3));
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
    justify-content: flex-start;
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

p {
    font-size: 1dvw;
    text-wrap: pretty;
    text-overflow: ellipsis;
    text-align: justify;
    margin: 0;
}

.area {
    border-radius: 2dvw;
    height: 100%;
    width: 100%;
    background-color: var(--goldongo-void);
    box-sizing: border-box;
    display: flex;
    /* Changed from grid to flex for overflow handling */
    overflow: hidden;
    /* Hide overflow to clip scrollbar */
}

.scrollable-content {
    display: grid;
    /* Use grid for the inner content */
    grid-template-columns: repeat(auto-fill, minmax(8dvw, 1fr));
    gap: 2dvw;
    overflow-y: auto;
    /* Enable vertical scrolling within this element */
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2dvw;
    padding-right: 0;
    scroll-behavior: smooth;
    /* Smooth scrolling */
    -webkit-overflow-scrolling: touch;
    /* iOS smooth scrolling */
}

::-webkit-scrollbar {
    width: 0.5dvw;
    cursor: pointer;
}

::-webkit-scrollbar-thumb {
    border-radius: 1dvw;
    background-color: var(--goldongo-foreground);
    color: var(--goldongo-foreground);
    cursor: pointer;
}
</style>
