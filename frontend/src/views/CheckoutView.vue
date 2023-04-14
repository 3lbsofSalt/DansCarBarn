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
      {{ total }}
      est total
    </div>
    <v-checkbox v-model="insurance" label="Insurance?  + $10" />
    <v-btn @click="checkout">Checkout</v-btn>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import fetch from '../api';
import { useRoute } from 'vue-router';
import { getSelf } from '../api/user';

const route = useRoute();

const insurance = ref(false);

const params = route.params;

const startDate = new Date(params.startDate);
const endDate = new Date(params.endDate);

const vehiclesUrl = 'http://localhost:3001/vehicle/';

const car = ref('Loading');
const total = ref(0);

let userSelf;


onMounted(() => {
  fetch(vehiclesUrl + params['id'], {})
    .then((r) => r.json())
    .then((r) => {
      car.value = r;
      let carClass = 100;
      if (car.value.price_class === 'GOLD') {
        carClass = 150;
      } else if (car.value.price_class === 'SILVER'){
        carClass = 100;
      } else if (car.value.price_class === 'BRONZE'){
        carClass = 50;
      }
      total.value = (
        ((endDate - startDate) / (1000 * 60 * 60 * 24)) *
        carClass
      ).toFixed(2);
    });
  getSelf()
    .then((r) => r.json())
    .then((r) => (userSelf = r));
});

function checkout() {
  fetch(vehiclesUrl + 'checkout', {
    method: 'POST',
    body: JSON.stringify({
      vehicleId: route['id'],
      userId: userSelf.id,
      total: insurance.value ? total.value + 10 : total.value,
      description: insurance.value
        ? 'This vehicle was reserved with insurance'
        : 'This vehicle was reserved without insurance',
    }),
  });
  
}
</script>

<style scoped></style>
