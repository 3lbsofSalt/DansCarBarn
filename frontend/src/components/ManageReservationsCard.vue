<script setup>
import { computed } from 'vue';
import VehicleClassLabel from './VehicleClassLabel.vue';

const props = defineProps(['imgSrc', 'title', 'class', 'start', 'end', 'email', 'status']);
const emit = defineEmits(['pickup', 'return'])

const buttonTextDict = {
  'SCHEDULED': 'PICKUP',
  'IN_TRANSIT': 'RETURN'
};

const buttonText = computed(() => {
  return buttonTextDict[props.status] ?? 'PICKUP';
});

const onClick = () => {
  if (props.status == 'SCHEDULED') {
    emit('pickup');
  } else {
    emit('return');
  }
}
</script>

<template>
  <v-sheet border rounded class="d-flex flex-row">
    <div class="d-flex">
      <v-img :width="200" :height="150" cover :src="props.imgSrc" />
    </div>

    <div class="car-details d-flex w-100 h-100 flex-column">
      <div>
        <em><b>{{ new Date(props.start).toDateString() }} - {{ new Date(props.end).toDateString() }}</b></em>
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
        <div>
        <span small class="d-flex flex-row flex-grow-1">
          {{ props.email }}
        </span>
        </div>
        <span class="d-flex flex-row flex-grow-1 align-end justify-end">
          <v-btn color="#C1E4E6" @click="onClick">
            {{ buttonText }}
          </v-btn>
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
