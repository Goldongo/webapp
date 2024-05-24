<template>
  <div class="home rubik">
    <div v-if="showOverlay" class="overlay">
      <div class="results-screen">
        <button class="close-button" @click="hideOverlay">
          <img src="@/assets/close.svg" />
        </button>
        <div class="result-wrapper">
          <h1 class="name teko">{{ matchResults.final_score[0] }}&nbsp;</h1>
          <h1 class="title teko">VS</h1>
          <h1 class="name teko">&nbsp;{{ matchResults.final_score[2] }}</h1>
        </div>
        <div class="result-wrapper">
          <h1 class="score teko">{{ matchResults.final_score[1] }}&nbsp;</h1>
          <h1 class="title teko">-</h1>
          <h1 class="score teko">&nbsp;{{ matchResults.final_score[3] }}</h1>
        </div>
        <div class="result-wrapper" style="flex-direction: column">
          <div
            style="display: flex; width: 100%; justify-content: center"
            v-for="event in matchResults.team1_events.concat(
              matchResults.team2_events
            )"
          >
            <p>{{ event[0] }}&nbsp;-&nbsp;{{ event[1] }}</p>
          </div>
        </div>
      </div>
    </div>
    <greenButton
      :onClick="logout"
      msg="Log Out"
      style="width: 8dvw; position: absolute; top: 3dvw; right: 3dvw"
    />
    <h1 class="title teko">MATCHMAKING</h1>
    <div class="user-list">
      <div class="table-wrapper">
        <div class="table-container">
          <table class="area">
            <thead>
              <tr>
                <th class="rubik">User</th>
                <th class="rubik">Team</th>
                <th class="rubik"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.display_name }}</td>
                <td>{{ user.team_name }}</td>
                <td>
                  <greenButton
                    @click="simulate(user.id)"
                    msg="Challenge"
                    style="width: 8dvw"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import greenButton from "@/components/greenButton.vue";
import { getToken } from "@/utils/authUtils";
import axios from "axios";
import { logout } from "@/utils/authUtils";

export default {
  name: "Home",
  data() {
    return {
      users: [],
      showOverlay: false,
      matchResults: null,
    };
  },
  components: { greenButton },
  methods: {
    async fetchUsers() {
      try {
        const allUsers = await axios.get(
          process.env.VUE_APP_API_USERS_IP + "/matchmaking",
          {
            headers: {
              Authorization: "Bearer " + getToken(),
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log("Players fetched");
        this.users = allUsers.data;
        console.log(this.users);
      } catch (error) {
        console.error("Could not fetch players:", error);
      }
    },
    hideOverlay() {
      this.showOverlay = false;
    },
    async simulate(other_id) {
      // Fetch self data
      try {
        const myResponse = await axios.get(
          process.env.VUE_APP_API_USERS_IP + "/user/me/team",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + getToken(),
            },
          }
        );
        console.log(myResponse.data);

        const myTeam = {
          name: myResponse.data.name,
          players: myResponse.data.player_ids,
        };
        // Other team
        try {
          const otherResponse = await axios.get(
            process.env.VUE_APP_API_USERS_IP + "/user/" + other_id + "/team",
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + getToken(),
              },
            }
          );

          const otherTeam = {
            name: otherResponse.data.name,
            players: otherResponse.data.player_ids,
          };

          const gameSent = { team1_json: myTeam, team2_json: otherTeam };
          console.log(gameSent);
          try {
            const gameResult = await axios.post(
              process.env.VUE_APP_API_SIMULATOR_IP + "/game",
              gameSent,
              {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
              }
            );
            console.log(gameResult.data);
            this.matchResults = gameResult.data;
            this.showOverlay = true; // Show the overlay
          } catch (error) {
            console.log("Error while simulating:", error);
          }
        } catch (error) {
          console.log("Error while fetching other team:", error);
        }
      } catch (error) {
        console.log("Error while fetching self team:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
  setup() {
    return { logout };
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--goldongo-text-alt);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.results-screen {
  background-color: var(--goldongo-background);
  border-radius: 2dvw;
  display: flex;
  width: 50%;
  height: 70%;
  position: relative;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 2dvw;
  user-select: none;
}

.name {
  margin: 0;
  font-size: 4dvw;
  color: var(--goldongo-text-alt);
}

.score {
  margin: 0;
  font-size: 8dvw;
  color: var(--goldongo-text-alt);
}

.close-button {
  position: absolute;
  top: 2dvw;
  right: 2dvw;
  background-color: transparent;
  border: transparent;
  outline: transparent;
  cursor: pointer;
  padding: 0;
  aspect-ratio: 1/1;
  height: 2dvw;
  img {
    padding: 0;
    aspect-ratio: 1/1;
    height: 100%;
  }
}

.home {
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background-color: transparent;
  color: var(--goldongo-text);
  padding: 2dvw;
  padding-bottom: 4dvw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0;
  color: var(--goldongo-medium-2);
  font-size: 5dvw;
  background: -webkit-linear-gradient(
    45deg,
    var(--goldongo-medium-2),
    var(--goldongo-medium-3)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-list {
  height: 100%;
  width: 50%;
  position: relative;
  box-sizing: border-box;
}

.area {
  width: 100%;
  background-color: var(--goldongo-void);
  box-sizing: border-box;
  overflow: hidden;
}

.area th,
.area td {
  padding: 0.5dvw 1dvw;
  text-align: center;
  font-size: 1dvw;
}

.area th {
  background-color: var(--goldongo-foreground);
}

.area tbody tr {
  background-color: var(--goldongo-foreground);
}

.table-container {
  border-radius: 2dvw;
  height: 70vh;
  /* Set a fixed height for the container */
  overflow: auto;
  /* Enable vertical scrolling */
  width: 100%;
  /* Ensure the table fills the container */
}

.table-wrapper {
  border-radius: 2dvw;
  height: fit-content;
  /* Set a fixed height for the container */
  overflow: hidden;
  /* Enable vertical scrolling */
  width: 100%;
  /* Ensure the table fills the container */
  box-shadow: 0 0 1dvw 0.2dvw rgba(10, 10, 10, 0.5);
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

.result-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: fit-content;
}

p {
  font-size: 1dvw;
  text-wrap: pretty;
  text-overflow: ellipsis;
  text-align: justify;
  margin-bottom: 0.3dvw;
}
</style>
