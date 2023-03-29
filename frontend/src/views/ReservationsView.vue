<script setup>
import ReservationsUpcomingCard from '../components/ReservationsUpcomingCard.vue';
import ReservationsCurrPastCard from '../components/ReservationsCurrPastCard.vue';

const vehicles = [
  {
    id: 1,
    title: 'Ford Pinto 1972',
    class: 'gold',
    imgSrc:
      'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  },
  {
    id: 2,
    title: 'Ford Pinto 1972',
    class: 'gold',
    imgSrc:
      'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  },
];

const onDelete = (id) => {
  console.log('DELETE VEHICLE with ID', id);
};
</script>

<template>
  <div id="manage-vehicles" class="d-flex flex-column">
    <div id="manage-users-header" class="d-flex align-center">
      <h2 class="d-flex flex-grow-1">Reservations</h2>
    </div>

    <b>Upcoming Reservations:</b>

    <div class="vehicles-list d-flex flex-column">
      <ReservationsUpcomingCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="vehicle.title"
        :class="vehicle.class"
        :imgSrc="vehicle.imgSrc"
        @delete="() => onDelete(vehicle.id)"
      />
    </div>

    <b>Current Reservations:</b>

    <div class="vehicles-list d-flex flex-column">
      <ReservationsCurrPastCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="vehicle.title"
        :class="vehicle.class"
        :imgSrc="vehicle.imgSrc"
        @delete="() => onDelete(vehicle.id)"
      />
    </div>

    <b>Past Reservations:</b>

    <div class="vehicles-list d-flex flex-column">
      <ReservationsCurrPastCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="vehicle.title"
        :class="vehicle.class"
        :imgSrc="vehicle.imgSrc"
        @delete="() => onDelete(vehicle.id)"
      />
    </div>

  </div>
</template>

<style scoped>
#manage-vehicles {
  width: 100%;
  gap: 16px;
}

.vehicles-list {
  gap: 8px;
}
</style>
