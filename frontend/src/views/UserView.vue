<template>
  <div class="login-layout d-flex align-center justify-center">
    <div class="login-container d-flex flex-column">
      <h1 class="dcb-title">DCB</h1>

      <!--
      <v-text-field
        v-model="firstname"
        label="First Name"
        type="text"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        v-model="lastname"
        label="Last Name"
        type="text"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        v-model="phonenumber"
        label="Phone Number"
        type="number"
        hide-details="auto"
      ></v-text-field>

      <v-text-field
        v-model="address"
        label="Address"
        type="text"
        hide-details="auto"
      ></v-text-field>

      <v-btn
        variant="tonal"
        size="large"
      >Update Profile</v-btn>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        hide-details="auto"
      ></v-text-field>

      <v-btn
        variant="tonal"
        size="large"
      >Reset Password</v-btn>

      -->
      <v-text-field
        v-model="balance"
        label="Add to Balance"
        type="number"
        hide-details="auto"
      ></v-text-field>

      <v-btn
        variant="tonal"
        size="large"
        @click="updateBalance"
      >Update Balance</v-btn>
      <p
        v-if="added"
      >Balance Updated</p>
      <v-btn
        variant="tonal"
        size="large"
        href="/"
        link
        @click="logout"
      >Logout</v-btn>
    </div>
  </div>
</template>

<script>
 import { addBalance, getSelf } from '../api/user.js';
 import { useRouter } from 'vue-router';
 export default {
   data: () => ({
     firstname: '',
     lastname: '',
     phonenumber: '',
     address: '',
     password: '',
     balance: '',
     userId: '',
     added: false
   }),
   mounted: function() {
     this.getUser();
   },
   methods: {
     getUser: function() {
       getSelf()
        .then((res) => {
          this.userId = res.user.id;
        });
     },
     logout: function() {
       localStorage.removeItem('auth');
     },
     updateBalance: function() {
       if(this.userId === '') return
       addBalance(this.userId, this.balance)
        .then(() => {
          this.added = true;
        });
     }
   },
 };
</script>

<style scoped>
.login-layout {
  width: 100%;
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
