<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app-scaffold" class="d-flex flex-column align-center">
    <div id="app-navbar" class="d-flex">
      <div id="app-navbar-title-box" class="navbar-group d-flex flex-grow-1">
        <span id="app-navbar-title">DCB</span>
      </div>

      <div id="app-navbar-link-box" class="navbar-group d-flex">
        <v-btn variant="flat" :to="{ name: 'browse' }">Browse</v-btn>
        <v-btn variant="flat" :to="{ name: 'reservations' }"
          >Reservations</v-btn
        >
        <v-btn variant="flat" :to="{ name: 'manage' }">Manage</v-btn>
      </div>

      <div
        id="app-navbar-profile-box"
        class="navbar-group d-flex flex-grow-1 justify-end"
      >
        <v-icon icon="mdi-account-circle" size="x-large" />
      </div>
    </div>

    <div id="app-content" class="d-flex">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app-scaffold {
  width: 100%;
}

#app-navbar {
  width: 100%;
  padding: 8px 16px;

  border-bottom: 1px solid #e0e0e0;
}

#app-navbar-title {
  font-size: 20px;
  font-weight: 700;
  padding: 8px;

  color: #ffffff;
  background-color: #000000;
  border-radius: 5px;
}

.navbar-group {
  align-items: center;
  flex-basis: 0%;
  gap: 8px;
}

#app-content {
  width: 100%;
  max-width: 932px;
}
</style>
