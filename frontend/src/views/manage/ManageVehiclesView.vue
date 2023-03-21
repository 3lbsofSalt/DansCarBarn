<script setup>
import { reactive, ref, computed } from 'vue';
import ManageVehiclesCard from '../../components/ManageVehiclesCard.vue';

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

const classes = ['Bronze', 'Silver', 'Gold'];

const createVehicleForm = reactive({
  title: '',
  class: '',
  img: null,
});

const imagePreviewUrl = computed(() => {
  if (!createVehicleForm.img) return '';
  return URL.createObjectURL(createVehicleForm.img[0]);
});

const selectedDeleteVehicle = reactive({
  // stores information about the vehicle that was selected for deletion
  id: null,
  title: '',
});

const showCreateDialog = ref(false);
const showDeleteDialog = ref(false);

const createVehicle = () => {
  console.log(
    'TODO: Create vehicle with ',
    createVehicleForm.title,
    createVehicleForm.class,
    createVehicleForm.img,
  );
  showCreateDialog.value = false;
};

const onDelete = (vehicle) => {
  const { id, title } = vehicle;

  selectedDeleteVehicle.id = id;
  selectedDeleteVehicle.title = title;

  // show dialog
  showDeleteDialog.value = true;
};

// TODO: call API to delete vehicle
const deleteVehicle = () => {
  console.log(
    'TODO: Delete vehicle with ',
    selectedDeleteVehicle.id,
    selectedDeleteVehicle.title
  );
  showDeleteDialog.value = false;
};
</script>

<template>
  <div id="manage-vehicles" class="d-flex flex-column">
    <div id="manage-vehicles-header" class="d-flex align-center">
      <h2 class="d-flex flex-grow-1">Vehicles</h2>
      <v-btn icon="mdi-plus" color="secondary" size="small" @click="showCreateDialog = true" />
    </div>

    <v-text-field label="Search" hide-details="auto" />

    <div class="vehicles-list d-flex flex-column">
      <ManageVehiclesCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="vehicle.title"
        :class="vehicle.class"
        :imgSrc="vehicle.imgSrc"
        @delete="() => onDelete(vehicle)"
      />
    </div>
  </div>

  <!-- Create Vehicle Dialog -->
  <v-dialog v-model="showCreateDialog" width="auto">
    <v-card title="Create Vehicle">
      <v-card-text>
        <div class="card-form d-flex flex-column">
          <v-text-field
            label="Title"
            hide-details="auto"
            v-model="createVehicleForm.title"
          />
          <v-combobox
            label="Class"
            :items="classes"
            hide-details="auto"
            v-model="createVehicleForm.class"
          />
          <v-file-input label="Image" v-model="createVehicleForm.img"></v-file-input>
          <v-img v-if="imagePreviewUrl" :src="imagePreviewUrl"></v-img>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="createVehicle()">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Delete Vehicle Dialog -->
  <v-dialog v-model="showDeleteDialog" width="auto">
    <v-card title="Delete Vehicle">
      <v-card-text class="confirm-text">
        Are you sure you want to delete the
        {{ selectedDeleteVehicle.title }}?
      </v-card-text>
      <v-card-actions>
        <v-btn color="red" block @click="deleteVehicle()">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#manage-vehicles {
  width: 100%;
  gap: 16px;
}

.vehicles-list {
  gap: 8px;
}

.card-form {
  min-width: 350px;
  gap: 16px;
}

.confirm-text {
  max-width: 450px;
}
</style>
