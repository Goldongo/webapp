<template>
    <div class="home">
        <div class="top-bar">
            <logoutButton />
        </div>
        <div class="bottom">
            <div class="team-selector">
                <div v-for="team in teams" :key="team.id"
                    :class="['team rubik', { selected: team.id === selectedTeamLeft }]"
                    @click="selectTeam('left', team.id)">
                    {{ team.name }}
                </div>
            </div>
            <button class="simulate-button rubik" @click="simulate">Simulate</button>
            <div class="team-selector">
                <div v-for="team in teams" :key="team.id"
                    :class="['team rubik', { selected: team.id === selectedTeamRight }]"
                    @click="selectTeam('right', team.id)">
                    {{ team.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import logoutButton from '@/components/logoutButton.vue';

export default {
    name: 'Home',
    components: {
        logoutButton
    },
    setup() {
        const teams = ref([]);
        const selectedTeamLeft = ref(null);
        const selectedTeamRight = ref(null);

        const fetchTeams = async () => {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_TEAMS_IP}/teams`);
                teams.value = response.data;
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        const selectTeam = (side, teamId) => {
            if (side === 'left') {
                selectedTeamLeft.value = teamId;
            } else if (side === 'right') {
                selectedTeamRight.value = teamId;
            }
        };

        const simulate = async () => {
            if (selectedTeamLeft.value === null || selectedTeamRight.value === null) {
                alert("Two teams must be selected!");
                return;
            }
            try {
                const le = teams.value[selectedTeamLeft.value - 1];
                const ri = teams.value[selectedTeamRight.value - 1];
                const team1_json = {
                    name: le.name,
                    players: le.players
                };
                const team2_json = {
                    name: ri.name,
                    players: ri.players
                };
                const response = await axios.post(`${process.env.VUE_APP_API_SIMULATOR_IP}/game/`, {
                    team1_json, team2_json
                });

                console.log(response.data);
            } catch (error) {
                console.error("Error simulating match", error);
            }
        };

        onMounted(() => {
            fetchTeams();
        });

        return {
            teams,
            selectedTeamLeft,
            selectedTeamRight,
            selectTeam,
            simulate
        };
    }
};
</script>

<style scoped>
.rubik {
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
}

.home {
    height: 100%;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background: transparent;
    align-items: center;
    flex-direction: column;
    background-color: var(--goldongo-background);
    padding: 2dvw;
}

.simulate-button {
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

.simulate-button:hover {
    border: 0.2dvw solid var(--goldongo-text);
}

.top-bar {
    flex: 1;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-end;
    align-items: flex-start;
}

.bottom {
    height: 90%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.team-selector {
    width: 30dvw;
    height: 40dvw;
    overflow: auto;
    background-color: var(--goldongo-foreground);
    border-radius: 2dvw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 2dvw;
}

.team {
    width: 100%;
    height: 5dvw;
    background-color: var(--goldongo-foreground);
    box-shadow: 0 0 0.1dvw 0.1dvw var(--goldongo-background);
    border-radius: 1dvw;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 1dvw;
    transition: background-color 0.1s linear, outline 0.1s linear;
    color: var(--goldongo-text);
    background-origin: border-box;
    margin-bottom: 2dvw;
}

.team:hover {
    outline: 0.2dvw solid var(--goldongo-text);
}

.selected {
    background-color: var(--goldongo-medium-3);
}
</style>