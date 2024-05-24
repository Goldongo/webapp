<template>
    <div class="home rubik">
        <greenButton :onClick="logout" msg="Log Out" style="width: 8dvw; position: absolute; top: 3dvw; right: 3dvw;" />
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
                                    <greenButton :onClick="funni" msg="Challenge" style="width: 8dvw" />
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
import greenButton from '@/components/greenButton.vue';
import { getToken } from '@/utils/authUtils';
import axios from 'axios';
import { logout } from '@/utils/authUtils';

export default {
    name: "Home",
    data() {
        return {
            users: []
        }
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
    },
    mounted() {
        this.fetchUsers();
    },
    setup() {
        return { logout }
    }
}
</script>

<style scoped>
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
    margin-top: 0;
    color: var(--goldongo-medium-2);
    font-size: 5dvw;
    background: -webkit-linear-gradient(45deg, var(--goldongo-medium-2), var(--goldongo-medium-3));
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
</style>
