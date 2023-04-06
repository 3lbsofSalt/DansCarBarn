<template>
  <div style="display: block">
    <div>
      <h1>Checkout</h1>
    </div>
    <div>
      <h2>Dates:</h2>
      <div>
        From
        <span class="bold">{{ startDate.toDateString() }}</span>
        To
        <span class="bold">{{ endDate.toDateString() }}</span>
      </div>
    </div>
    <div>
      <div>
        <h2>You're reserving:</h2>
        <div class="bold">
          {{ car.make + ' ' + car.model + ' ' + car.year }}
        </div>
      </div>
      <h2>Total:</h2>
      <div class="bold">
        $<span v-if="car.price_class === 'GOLD'">{{
          (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 150).toFixed(2)
        }}</span>
        <span v-else-if="car.price_class === 'SILVER'">{{
          (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 100).toFixed(2)
        }}</span>
        <span v-else-if="car.price_class === 'BRONZE'">{{
          (((endDate - startDate) / (1000 * 60 * 60 * 24)) * 50).toFixed(2)
        }}</span>
      </div>
    </div>
    <v-checkbox v-model="insurance" label="Add Insurance? + $150"></v-checkbox>
    <v-btn>Checkout!!</v-btn>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const car = ref('');
const route = useRoute();
const insurance = ref(false);

const carId = route.params.id;
onBeforeMount(() => {
  fetch(`http://localhost:3001/vehicle/${carId}`).then(async (r) => {
    car.value = await r.json();
  });
});

function checkout() {
  body = {
    // UserId,
    VehicleId: carId,
    start: startDate,
    end: endDate,
    // status,
  }
}

const params = route.params;

const startDate = new Date(params['startDate']);

const endDate = new Date(params['endDate']);
</script>

<style scoped>
.bold {
  font-weight: 700;
}
</style>
