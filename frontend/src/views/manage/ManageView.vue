<script setup>
import { useRouter, useRoute, RouterView } from 'vue-router';

const router = useRouter();
const route = useRoute();

const navLinks = [
    {
        title: 'Vehicles',
        value: 'manage-vehicles',
    },
    {
        title: 'Users',
        value: 'manage-users',
    },
    {
        title: 'Reservations',
        value: 'manage-reservations',
    },
];

const onNavSelect = ({id}) => router.push({ name: id });
</script>

<template>
    <div id="manage-view" class="d-flex">
        <div id="manage-nav">
            <v-list :items="navLinks" @click:select="onNavSelect" :selected="[route.name]"></v-list>
        </div>

        <div id="manage-content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
#manage-nav {
    width: 200px;
    border-right: 1px solid #e0e0e0;
}

#manage-content {
    padding: 32px;
}
</style>