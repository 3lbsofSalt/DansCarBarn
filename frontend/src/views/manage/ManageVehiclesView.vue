<script setup>
import { reactive, ref, computed } from 'vue';
import { getVehicles } from '../../api/manage/vehicles';
import ManageVehiclesCard from '../../components/ManageVehiclesCard.vue';

const vehicles = ref([
  {
    id: 1,
    make: 'Ford',
    model: 'Pinto',
    year: 1972,
    class: 'gold',
    imgSrc:
      'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  },
  {
    id: 2,
    make: 'Ford',
    model: 'Pinto',
    year: 1972,
    class: 'gold',
    imgSrc:
      'https://www.oldcarsweekly.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cq_auto:good%2Cw_1200/MTcyODc1NjA2NTcxMDk5MzM0/1972-ford-pinto.png',
  },
]);

const refreshVehicles = async () => {
  vehicles.value = (await getVehicles()).map(vehicle => ({
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    class: vehicle.price_class.toLowerCase(),
    imgSrc: vehicle.image,
  }));
}

const makeVehicleTitle = (vehicle) =>
  `${vehicle.make} ${vehicle.model} ${vehicle.year}`;

const classes = ['Bronze', 'Silver', 'Gold'];

const createVehicleForm = reactive({
  make: '',
  model: '',
  year: null,
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
  make: 'Ford',
  model: 'Pinto',
  year: 1972,
});

const showCreateDialog = ref(false);
const showDeleteDialog = ref(false);

const createVehicle = () => {
  console.log(
    'TODO: Create vehicle with ',
    createVehicleForm.make,
    createVehicleForm.model,
    createVehicleForm.year,
    createVehicleForm.class,
    createVehicleForm.img
  );
  showCreateDialog.value = false;
};

const onDelete = (vehicle) => {
  const { id, make, model, year } = vehicle;

  selectedDeleteVehicle.id = id;
  selectedDeleteVehicle.make = make;
  selectedDeleteVehicle.model = model;
  selectedDeleteVehicle.year = year;

  // show dialog
  showDeleteDialog.value = true;
};

// TODO: call API to delete vehicle
const deleteVehicle = () => {
  console.log(
    'TODO: Delete vehicle with ',
    selectedDeleteVehicle.id,
    selectedDeleteVehicle.make,
    selectedDeleteVehicle.model,
    selectedDeleteVehicle.year
  );
  showDeleteDialog.value = false;
};

refreshVehicles();
</script>

<template>
  <div id="manage-vehicles" class="d-flex flex-column">
    <div id="manage-vehicles-header" class="d-flex align-center">
      <h2 class="d-flex flex-grow-1">Vehicles</h2>
      <v-btn
        icon="mdi-plus"
        color="secondary"
        size="small"
        @click="showCreateDialog = true"
      />
    </div>

    <v-text-field label="Search" hide-details="auto" />

    <div class="vehicles-list d-flex flex-column">
      <ManageVehiclesCard
        v-for="vehicle in vehicles"
        :key="vehicle.id"
        :title="makeVehicleTitle(vehicle)"
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
            label="Make"
            hide-details="auto"
            v-model="createVehicleForm.make"
          />
          <v-text-field
            label="Model"
            hide-details="auto"
            v-model="createVehicleForm.model"
          />
          <v-text-field
            label="Year"
            type="number"
            hide-details="auto"
            v-model="createVehicleForm.year"
          />
          <v-combobox
            label="Class"
            :items="classes"
            hide-details="auto"
            v-model="createVehicleForm.class"
          />
          <v-file-input
            label="Image"
            v-model="createVehicleForm.img"
          ></v-file-input>
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
        {{ makeVehicleTitle(selectedDeleteVehicle) }}?
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
