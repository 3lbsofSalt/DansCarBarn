<template>
  <div id="Browse Header" class="d-flex flex-grow-1 flex-column">
    <h2>Browse</h2>
    <v-text-field label="Search" filled></v-text-field>
    <div class="dates" style="">
      <VueDatePicker
        v-model="dateRange"
        range
        :enable-time-picker="false"
      ></VueDatePicker>
    </div>
    <div class="gridBrowsePinto">
      <v-card v-for="car of allCars" :key="car.id" elevation="3">
        <v-img
          class="white--text align-end"
          width="100%"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.mecum.com%2Fauctions%2Fpj0617%2Fpj0617-287856%2Fimages%2Fpj0617-287856_3%402x.jpg%3F1496865185000&f=1&nofb=1&ipt=dd41511128908d90568dcdb741dd0ddf28903f35dfa672dfa7310bb80bc0004e&ipo=images"
        />
        <v-card-title>
          <div class="browseCarTitle">
            <div>{{ car.make + ' ' + car.model }}</div>
            <div :class="car.price_class">{{ car.price_class }}</div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div class="browseCarSubTitle">
            <div>
              <div v-if="car.price_class === 'GOLD'">150 R$/day</div>
              <div v-else-if="car.price_class === 'SILVER'">100 R$/day</div>
              <div v-else-if="car.price_class === 'BRONZE'">50 R$/day</div>
              <div class="estimate">
                $<span v-if="car.price_class === 'GOLD'">{{
                  (
                    ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                    150
                  ).toFixed(2)
                }}</span>
                <span v-else-if="car.price_class === 'SILVER'">{{
                  (
                    ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                    100
                  ).toFixed(2)
                }}</span>
                <span v-else-if="car.price_class === 'BRONZE'">{{
                  (
                    ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                    50
                  ).toFixed(2)
                }}</span>
                est total
              </div>
            </div>
            <v-btn class="selectButton"> Select </v-btn>
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const allCars = ref();
const vehiclesUrl = 'http://localhost:3001/vehicle';
const dateRange = ref();

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  dateRange.value = [startDate, endDate];
});

onBeforeMount(async () => {
  allCars.value = (await (await fetch(vehiclesUrl + '/all')).json()).results;
});
</script>

<style scoped>
body {
  margin-left: 256px;
  margin-right: 256px;
}
.show{
  display: ;
}
.hide{

}
.gridBrowsePinto {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.browseCarTitle {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}
.GOLD {
  font-size: 12px;
  background-color: gold;
  color: goldenrod;
  max-height: 100%;
  padding: 0px 10px;
  border-radius: 4px;
}

.SILVER {
  font-size: 12px;
  background-color: silver;
  color: rgb(97, 97, 97);
  max-height: 100%;
  padding: 0px 10px;
  border-radius: 4px;
}

.BRONZE {
  font-size: 12px;
  background-color: rgb(221, 57, 57);
  color: darkred;
  max-height: 100%;
  padding: 0px 10px;
  border-radius: 4px;
}

.browseCarSubTitle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-weight: 700;
}
.selectButton {
  background-color: #e3f2fd;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 1.25px;
}
.estimate {
  font-weight: normal;
  text-decoration: underline;
}
</style>
