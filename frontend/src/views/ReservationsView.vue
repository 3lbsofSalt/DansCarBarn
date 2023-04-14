<script setup>
import ReservationsUpcomingCard from '../components/ReservationsUpcomingCard.vue';
import ReservationsCurrPastCard from '../components/ReservationsCurrPastCard.vue';
import { getUserReservations, setReservationStatus } from '../api/reservation';
import { ref, computed } from 'vue';

const vehicles = ref([
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
]);

const loadReservations = async () => {
  vehicles.value = await getUserReservations();
}

const currentReservations = computed(() => vehicles.value.filter(res => res.status == 'IN_TRANSIT'));
const upcomingReservations = computed(() => vehicles.value.filter(res => res.status == 'SCHEDULED'));
const pastReservations = computed(() => vehicles.value.filter(res => res.status == 'RETURNED'));

loadReservations();

const onCancel = async (id) => {
  await setReservationStatus(id, 'CANCELED');
  loadReservations();
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
        v-for="res in upcomingReservations"
        :key="res.Vehicle.id"
        :title="res.Vehicle.title"
        :class="res.Vehicle.class"
        :imgSrc="res.Vehicle.image"
        :start="res.start"
        :end="res.end"
        @cancel="() => onCancel(res.id)"
      />
    </div>

    <b>Current Reservations:</b>

    <div class="vehicles-list d-flex flex-column">
      <ReservationsCurrPastCard
        v-for="res in currentReservations"
        :key="res.Vehicle.id"
        :title="res.Vehicle.title"
        :class="res.Vehicle.class"
        :imgSrc="res.Vehicle.image"
        :start="res.start"
        :end="res.end"
      />
    </div>

    <b>Past Reservations:</b>

    <div class="vehicles-list d-flex flex-column">
      <ReservationsCurrPastCard
        v-for="res in pastReservations"
        :key="res.Vehicle.id"
        :title="res.Vehicle.title"
        :class="res.Vehicle.class"
        :imgSrc="res.Vehicle.image"
        :start="res.start"
        :end="res.end"
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
