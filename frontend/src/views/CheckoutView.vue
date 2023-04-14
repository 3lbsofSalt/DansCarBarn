<template>
  <div>
    <h1>Checkout your vehicle</h1>
    <h2>
      You'll be checking out a: {{ car.year }} {{ car.make }} {{ car.model }}
    </h2>
    <h2>
      From: {{ startDate.toDateString() }}
      <br />
      To: {{ endDate.toDateString() }}
    </h2>
    <div class="estimate">
      $<span v-if="car.price_class === 'GOLD'">{{
        (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 150).toFixed(2)
      }}</span>
      <span v-else-if="car.price_class === 'SILVER'">{{
        (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 100).toFixed(2)
      }}</span>
      <span v-else-if="car.price_class === 'BRONZE'">{{
        (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 50).toFixed(2)
      }}</span>
      est total
    </div>
    <v-checkbox v-model="insurance" label="Insurance?  + $10" />
    <v-btn>Checkout</v-btn>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import fetch from '../api';
import { useRoute } from 'vue-router';

const route = useRoute();

const insurance = ref(false);

const params = route.params;

const startDate = new Date(params.startDate);
const endDate = new Date(params.endDate);

const vehiclesUrl = 'http://localhost:3001/vehicle/';

const car = ref('Loading');

onMounted(() => {
  fetch(vehiclesUrl + params['id'], {})
    .then((r) => r.json())
    .then((r) => {
      car.value = r;
    });
});
</script>

<style scoped></style>
