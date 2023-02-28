<script setup>
const labelDict = {
  gold: 'GOLD',
  silver: 'SILVER',
  bronze: 'BRONZE',
};

const props = defineProps(['class']);
</script>

<template>
  <span class="class-label" :class="props.class">{{
    labelDict[props.class]
  }}</span>
</template>

<style scoped>
.class-label {
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  border-radius: 2px;
}

.gold {
  background-color: #ffd700;
  color: #aa9100;
}

.silver {
  background-color: #c0c0c0;
  color: #737373;
}

.bronze {
  background-color: #cd7f32;
  color: white;
}
</style>
