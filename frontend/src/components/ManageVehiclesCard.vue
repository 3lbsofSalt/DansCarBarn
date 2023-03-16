<script setup>
import VehicleClassLabel from './VehicleClassLabel.vue';

const props = defineProps(['imgSrc', 'title', 'class']);
const emit = defineEmits(['delete']);
</script>

<template>
  <v-sheet border rounded class="d-flex flex-row">
    <div class="d-flex">
      <v-img :width="200" :height="100" cover :src="props.imgSrc" />
    </div>

    <div class="car-details d-flex w-100 h-100 flex-column">
      <div class="d-flex flex-row w-100">
        <span class="car-title d-flex flex-grow-1 font-weight-black">{{
          props.title
        }}</span>
        <VehicleClassLabel :class="props.class" />
      </div>

      <div class="d-flex flex-row flex-grow-1 w-100 align-end justify-end">
        <v-btn
          icon="mdi-delete"
          variant="flat"
          size="small"
          class="text-red"
          @click="emit('delete')"
        />
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>
.car-details {
  padding: 16px 16px 8px 16px;
}
</style>
