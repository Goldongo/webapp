<template>
  <div class="auth">
    <h1 class="title teko">GOLDONGO</h1>
    <form v-if="isSignup" class="auth-form" @submit.prevent="signup">
      <input type="text" v-model="email" placeholder="Email" class="input rubik">
      <input type="text" v-model="username" placeholder="Username" class="input rubik">
      <input type="password" v-model="password" placeholder="Password" class="input rubik">
      <greenButton :onClick="signup" msg="Sign Up" />
    </form>
    <form v-else class="auth-form" @submit.prevent="login">
      <input type="text" v-model="email" placeholder="Email" class="input rubik">
      <input type="password" v-model="password" placeholder="Password" class="input rubik">
      <greenButton :onClick="login" msg="Log In" />
    </form>
    <div class="auth-switch rubik">
      <p>{{ isSignup ? "Already have an account?" : "Don't have an account?" }}</p>
      <a class="prompt" href="#" @click.prevent="toggleAuthMode">
        &nbsp;{{ isSignup ? "Sign in." : "Sign up." }}
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { saveToken } from '@/utils/authUtils';
import greenButton from '@/components/greenButton.vue';

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
  components: {
    greenButton
  },
  methods: {
    toggleAuthMode() {
      this.isSignup = !this.isSignup;
    },
    async login() {
      try {
        const formData = new URLSearchParams();
        formData.append("username", this.email);
        formData.append("password", this.password);
        const loginResponse = await axios.post
          (
            process.env.VUE_APP_API_USERS_IP + "/auth/login",
            formData,
            {
              headers:
              {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
        saveToken(loginResponse);
        console.log('Login successful');
        this.$router.push('/teambuilding');
      }
      catch (error) {
        console.error('Login failed:', error);
      }
    },
    async signup() {
      try {
        const signupResponse = await axios.post
          (
            process.env.VUE_APP_API_USERS_IP + "/auth/signup",
            {
              username: this.username,
              display_name: this.email,
              password: this.password
            },
            {
              headers:
              {
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
        console.log('Signup successful');
        this.login();
      }
      catch (error) {
        console.error('Signup failed:', error);
      }
    },
  }
};
</script>

<style scoped>
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

.auth-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  box-sizing: content-box;
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

.prompt {
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
</style>