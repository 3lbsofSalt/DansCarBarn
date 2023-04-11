<template>
  <div id="Browse Header" class="d-flex flex-grow-1 flex-column">
    <h2>Browse</h2>
    <v-text-field
      label="Search"
      filled
      v-model="search"
      @keyup.enter="filterCars"
    ></v-text-field>
    <div class="dates" style="">
      <VueDatePicker
        v-model="dateRange"
        range
        :enable-time-picker="false"
        @change="filterDate"
      ></VueDatePicker>
    </div>
    <div class="gridBrowsePinto">
      <v-card v-for="car of carsFiltered" :key="car.id" elevation="3">
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
            <v-btn class="selectButton" @click="currentVehicleForDialog(car)">
              Select
            </v-btn>
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
  </div>
  <v-dialog v-model="dialogOpen" width="auto">
    <v-card>
      <v-img
        class="white--text align-end"
        width="100%"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.mecum.com%2Fauctions%2Fpj0617%2Fpj0617-287856%2Fimages%2Fpj0617-287856_3%402x.jpg%3F1496865185000&f=1&nofb=1&ipt=dd41511128908d90568dcdb741dd0ddf28903f35dfa672dfa7310bb80bc0004e&ipo=images"
      />
      <div class="dialog">
        <v-card-title style="font-weight: 700">
          {{
            currentVehicleDialog.make +
            ' ' +
            currentVehicleDialog.model +
            ' ' +
            currentVehicleDialog.year
          }}
        </v-card-title>
        <div class="dialogMoneyStuff">
          <div
            style="font-weight: 700"
            v-if="currentVehicleDialog.price_class === 'GOLD'"
          >
            150 R$/day
          </div>
          <div
            style="font-weight: 700"
            v-else-if="currentVehicleDialog.price_class === 'SILVER'"
          >
            100 R$/day
          </div>
          <div
            style="font-weight: 700"
            v-else-if="currentVehicleDialog.price_class === 'BRONZE'"
          >
            50 R$/day
          </div>
          <div class="estimate">
            $<span v-if="currentVehicleDialog.price_class === 'GOLD'">{{
              (
                ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                150
              ).toFixed(2)
            }}</span>
            <span v-else-if="currentVehicleDialog.price_class === 'SILVER'">{{
              (
                ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                100
              ).toFixed(2)
            }}</span>
            <span v-else-if="currentVehicleDialog.price_class === 'BRONZE'">{{
              (
                ((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)) *
                50
              ).toFixed(2)
            }}</span>
            est total
          </div>
          <div>
            <div>Start Date: {{ dateRange[0].toLocaleDateString() }}</div>
            <div>End Date: {{ dateRange[1].toLocaleDateString() }}</div>
          </div>
        </div>
      </div>
      <v-btn @click="checkoutVehicle(currentVehicleDialog.id)">Checkout</v-btn>
    </v-card>
    <v-btn @click="dialogOpen = false"> Close </v-btn>
  </v-dialog>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRouter } from 'vue-router';
import fetch from '../api';
const allCars = ref();
const vehiclesUrl = 'http://localhost:3001/vehicle/browse';
const dateRange = ref();
const search = ref('');
const carsFiltered = ref();
const dialogOpen = ref(false);
const currentVehicleDialog = ref();
const router = useRouter();

const filterCars = () => {
  let returnCars = [];
  for (const car of allCars.value) {
    if (
      car.make === search.value ||
      car.model === search.value ||
      car.model + ' ' + car.make === search.value ||
      search.value === ''
    ) {
      returnCars.push(car);
    }
  }

  carsFiltered.value = returnCars;
};

const filterDate = async () => {
  let url = new URL(vehiclesUrl);
  url.searchParams.append('start', dateRange.value[0]);
  url.searchParams.append('end', dateRange.value[1]);
  allCars.value = (await (await fetch(vehiclesUrl,{})).json()).results;
};

function checkoutVehicle(id){
  console.log('here');
  console.log(id);
  router.push({ name: 'checkout-vehicle', params: { id } });
}

function currentVehicleForDialog(car) {
  currentVehicleDialog.value = car;
  dialogOpen.value = true;
}

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  dateRange.value = [startDate, endDate];
});

onBeforeMount(async () => {
  allCars.value = (await (await fetch(vehiclesUrl,{})).json()).results;
  carsFiltered.value = (await (await fetch(vehiclesUrl,{})).json()).results;
});
</script>

<style scoped>
body {
  margin-left: 256px;
  margin-right: 256px;
}
.show {
  visibility: visible;
}
.hide {
  visibility: hidden;
}
.dialog {
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 50px;
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
.dialogCarSubtitle {
  display: flex;
  flex-direction: column;
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
