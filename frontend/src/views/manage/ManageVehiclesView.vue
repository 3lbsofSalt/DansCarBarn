<script setup>
import ManageVehiclesCard from '../../components/ManageVehiclesCard.vue';

const onDelete = () => {
  console.log('DELETE');
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
        title="Ford Pinto 1972"
        class="gold"
        imgSrc="https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png"
        @delete="onDelete"
      />
      <ManageVehiclesCard
        title="Ford Pinto 1972"
        class="gold"
        imgSrc="https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png"
        @delete="onDelete"
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
