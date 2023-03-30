<template>
  <div class="login-layout d-flex align-center justify-center">
    <div class="login-container d-flex flex-column">
      <h1 class="dcb-title">DCB</h1>
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        hide-details="auto"
      ></v-text-field>
      <v-btn variant="tonal" size="large" @click="login">Login</v-btn>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login.js';
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login: function () {
      login(this.email, this.password).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.login-layout {
  height: 100%;
}

.login-container {
  width: 100%;
  max-width: 360px;
  gap: 16px;
}

.dcb-title {
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  border-radius: 5px;

  color: #ffffff;
  background-color: #000000;
}
</style>
