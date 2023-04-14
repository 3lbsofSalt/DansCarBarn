<script setup>
import { ref, computed } from 'vue';
import ManageReservationsCard from '../../components/ManageReservationsCard.vue';
import { getAllReservations, setReservationStatus } from '../../api/reservation';

const reservations = ref([]);

const filteredReservations = computed(() => reservations.value.filter((res) => {
  return res.status == 'SCHEDULED' || res.status == 'IN_TRANSIT';
}));

const loadReservations = async () => {
  reservations.value = await getAllReservations();
  console.log(reservations.value);
};

loadReservations();

const makeVehicleTitle = (vehicle) =>
  `${vehicle.make} ${vehicle.model} ${vehicle.year}`;

const onPickup = async (id) => {
  await setReservationStatus(id, 'IN_TRANSIT');
  loadReservations();
};

const onReturn = async (id) => {
  await setReservationStatus(id, 'RETURNED');
  loadReservations();
}
</script>

<template>
  <div id="manage-vehicles" class="d-flex flex-column">
    <div id="manage-users-header" class="d-flex align-center">
      <h2 class="d-flex flex-grow-1">Reservations</h2>
    </div>

    <v-text-field label="Search" hide-details="auto" />

    <div class="vehicles-list d-flex flex-column">
      <ManageReservationsCard
        v-for="res in filteredReservations"
        :key="res.id"
        :title="makeVehicleTitle(res.Vehicle)"
        :class="res.Vehicle.class"
        :imgSrc="res.Vehicle.image"
        :start="res.start"
        :end="res.end"
        :email="res.User.email"
        :status="res.status"
        @pickup="() => onPickup(res.id)"
        @return="() => onReturn(res.id)"
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
