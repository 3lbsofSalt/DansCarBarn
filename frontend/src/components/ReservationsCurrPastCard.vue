<script setup>
import VehicleClassLabel from './VehicleClassLabel.vue';

const props = defineProps(['imgSrc', 'title', 'class', 'start', 'end']);
</script>

<template>
  <v-sheet border rounded class="d-flex flex-row">
    <div class="d-flex">
      <v-img :width="200" :height="150" cover :src="props.imgSrc" />
    </div>

    <div class="car-details d-flex w-100 h-100 flex-column">
      <div>
        <em><b>Start Time - End Time</b></em>
      </div>
      <div class="d-flex flex-row w-100">
        <span class="car-title d-flex flex-grow-1 font-weight-black">{{
          props.title
        }}
        </span>
      </div>

      <div class="d-flex w-100">
        <span class="d-flex flex-row flex-grow-1 align-end">
          <VehicleClassLabel :class="props.class" />
        </span>
      </div>
      
    </div>
  </v-sheet>
</template>

<style scoped>
.car-details {
  padding: 16px 16px 8px 16px;
}
</style>
