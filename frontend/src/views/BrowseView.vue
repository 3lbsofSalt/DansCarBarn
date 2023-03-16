<template>
  <div id="Browse Header" class="d-flex flex-grow-1 flex-column">
    <h2>Browse</h2>
    <v-text-field label="Search" filled></v-text-field>
    <div class="gridBrowsePinto">
      <v-card elevation="3">
        <v-img
          class="white--text align-end"
          width="100%"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.mecum.com%2Fauctions%2Fpj0617%2Fpj0617-287856%2Fimages%2Fpj0617-287856_3%402x.jpg%3F1496865185000&f=1&nofb=1&ipt=dd41511128908d90568dcdb741dd0ddf28903f35dfa672dfa7310bb80bc0004e&ipo=images"
        />
        <v-card-title>
          <div class="browseCarTitle">
            <div>Ford Pinto</div>
            <div class="vehicleClass">Gold</div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div class="browseCarSubTitle">
            <div>
              <div>$52/day</div>
              <div class="estimate">$156 est total</div>
            </div>
            <v-btn class="selectButton"> Select </v-btn>
          </div>
        </v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const allCars = ref(fetch());
</script>

<style scoped>
body {
  margin-left: 256px;
  margin-right: 256px;
}
.gridBrowsePinto {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.browseCarTitle {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}
.vehicleClass {
  font-size: 12px;
  background-color: gold;
  color: goldenrod;
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
