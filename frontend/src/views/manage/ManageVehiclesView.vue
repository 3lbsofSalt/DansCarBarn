<script setup>
import ManageVehiclesCard from '../../components/ManageVehiclesCard.vue';

const vehicles = [
  {
    id: 1,
    title: 'Ford Pinto 1972',
    class: 'gold',
    imgSrc: 'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  },
  {
    id: 2,
    title: 'Ford Pinto 1972',
    class: 'gold',
    imgSrc: 'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  }
];

const onDelete = id => {
  console.log('DELETE VEHICLE with ID', id);
};
</script>

<template>
  <div id="manage-vehicles" class="d-flex flex-column">
    <div id="manage-users-header" class="d-flex align-center">
      <h2 class="d-flex flex-grow-1">Vehicles</h2>
      <v-btn icon="mdi-plus" color="secondary" size="small" />
    </div>

    <v-text-field label="Search" hide-details="auto" />

    <div class="vehicles-list d-flex flex-column">
      <ManageVehiclesCard
        v-for="vehicle in vehicles"
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
