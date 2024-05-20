<template>
  <div class="auth">
    <h1 class="title teko">GOLDONGO</h1>
    <div v-if="isSignup" class="auth-form">
      <input type="text" v-model="email" placeholder="Email" class="input rubik">
      <input type="text" v-model="username" placeholder="Username" class="input rubik">
      <input type="password" v-model="password" placeholder="Password" class="input rubik">
      <button @click="signup" class="auth-button rubik">Sign Up</button>
    </div>
    <div v-else class="auth-form">
      <input type="text" v-model="email" placeholder="Email" class="input rubik">
      <input type="password" v-model="password" placeholder="Password" class="input rubik">
      <button @click="login" class="auth-button rubik">Sign In</button>
    </div>
    <div class="auth-switch rubik">
      <p>{{ isSignup ? "Already have an account?" : "Don't have an account?" }}</p>
      <a href="#" @click.prevent="toggleAuthMode">
        &nbsp;{{ isSignup ? "Sign in." : "Sign up." }}
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getToken, checkAuth, saveToken } from '@/utils/authUtils';

export default {
  name: "Auth",
  data() {
    return {
      isSignup: true,
      email: '',
      username: '',
      password: ''
    };
  },
  methods: {
    toggleAuthMode() {
      this.isSignup = !this.isSignup;
    },
    async signup() {
      try {
        const response = await axios.post(process.env.VUE_APP_API_USERS_IP + "/auth/signup", {
          username: this.username,
          display_name: this.email,
          password: this.password
        }, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        });
        console.log('Signup successful');
        try {
          const formData = new URLSearchParams();
          formData.append('username', this.email);
          formData.append('password', this.password);

          const followup = await axios.post(process.env.VUE_APP_API_USERS_IP + "/auth/login", formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              "Access-Control-Allow-Origin": "*"
            }
          });

          saveToken(followup);
          console.log('Login successful');
          this.$router.push('/home');
        }
        catch (error) {
          console.error('Login failed:', error);
        }
      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
    async login() {
      try {
        const formData = new URLSearchParams();
        formData.append('username', this.email);
        formData.append('password', this.password);

        const response = await axios.post(process.env.VUE_APP_API_USERS_IP + "/auth/login", formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*"
          }
        });

        saveToken(response);
        console.log('Login successful');
        this.$router.push('/home');


      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Danfo:ELSH@0..100&family=Rubik:ital,wght@0,300..900;1,300..900&family=Teko:wght@300..700&display=swap');

.danfo {
  font-family: "Danfo", serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "ELSH" 0;
}

.teko {
  font-family: "Teko", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.rubik {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.auth {
  height: 100%;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  box-sizing: border-box;
  color: var(--goldongo-text);
  background-color: var(--goldongo-background);
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

.auth-button {
  height: 3em;
  width: 21dvw;
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

.auth-button:hover {
  border: 0.2dvw solid var(--goldongo-text)
}

.input {
  background-color: var(--goldongo-foreground);
  color: var(--goldongo-text);
  border: transparent;
  outline: transparent;
  height: 3em;
  width: 21dvw;
  border-radius: 2dvw;
  box-sizing: border-box;
  padding: 0em 1em;
  font-size: 1dvw;
  margin-bottom: 1dvw;
}

.auth-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

a {
  text-decoration: none;
  color: var(--goldongo-medium-2);
  font-weight: 600;
  font-size: 1dvw;
  background: -webkit-linear-gradient(45deg, var(--goldongo-medium-2), var(--goldongo-medium-3));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 1dvw;
}

.auth-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  box-sizing: content-box;
}
</style>