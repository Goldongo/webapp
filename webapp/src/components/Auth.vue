<template>
  <div class="Auth">
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
    <div class="switch-auth rubik">
      <p>{{ isSignup ? "Already have an account?" : "Don't have an account?" }}</p>
      <a href="#" @click.prevent="toggleAuthMode" class="a">
        &nbsp;{{ isSignup ? "Sign in." : "Sign up." }}
      </a>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import axios from 'axios';

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
  setup() {
    const isDarkMode = inject('isDarkMode');
    const toggleDarkMode = inject('toggleDarkMode');

    return {
      isDarkMode,
      toggleDarkMode,
    };
  },
  methods: {
    toggleAuthMode() {
      this.isSignup = !this.isSignup;
      // Clear input fields when switching between forms
      this.email = '';
      this.username = '';
      this.password = '';
    },
    async signup() {
      try {
        const response = await axios.post('http://localhost:8000/auth', {
          username: this.username,
          display_name: this.email,
          password: this.password
        });

        // Handle successful signup (e.g., redirect to login page or show a success message)
        console.log('Signup successful:', response.data);
      } catch (error) {
        console.error('Signup failed:', error);
      }
    },
    async login() {
      try {
        const formData = new URLSearchParams();
        formData.append('username', this.email);
        formData.append('password', this.password);

        const response = await axios.post('http://localhost:8000/auth/token', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        console.log('Login successful:', response.data);

        document.cookie = `token=${response.data.access_token};path=/`;

        // TODO REDIRECT TO DASHBOARD

      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.Auth {
  height: 100%;
  width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 10% 0;
  box-sizing: border-box;
  color: var(--goldongo-text);
}

.title {
  color: var(--goldongo-medium-2);
  font-size: 5dvw;
}

.auth-button {
  height: 3em;
  width: 70%;
  font-size: 1dvw;
  background-color: var(--goldongo-medium-2);
  border-radius: 2dvw;
  outline: transparent;
  border: 0.2dvw solid transparent;
  cursor: pointer;
  transition: border 0.1s linear;
  color: var(--goldongo-text);
}

.auth-button:hover {
  border: 0.2dvw solid var(--goldongo-text)
}

.input {
  background-color: var(--goldongo-input);
  color: var(--goldongo-text);
  border: 0.2dvw solid transparent;
  outline: transparent;
  height: 3em;
  width: 70%;
  border-radius: 2dvw;
  box-sizing: border-box;
  padding: 0em 1em;
  font-size: 1dvw;
  transition: border 0.1s linear;
  margin-bottom: 1dvw;
}

.input:focus {
  border: 0.2dvw solid var(--goldongo-medium-2);
  transition: border 0.1s linear;
}

.switch-auth {
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