<template>
  <div id="Browse Header" class="d-flex flex-grow-1 flex-column">
    <h2 >Browse</h2>
    <v-text-field label="Search" filled></v-text-field>
    <div class="gridBrowsePinto">
      <v-card elevation="3">
        <v-img
          class="white--text align-end"
          width="100%"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.mecum.com%2Fauctions%2Fpj0617%2Fpj0617-287856%2Fimages%2Fpj0617-287856_3%402x.jpg%3F1496865185000&f=1&nofb=1&ipt=dd41511128908d90568dcdb741dd0ddf28903f35dfa672dfa7310bb80bc0004e&ipo=images"
        />
        <v-card-title>
          Ford Pinto
        </v-card-title>
        <v-card-subtitle>
          ya boi
        </v-card-subtitle>

      </v-card>
    </div>
  </div>
</template>

<style scoped>
  body {
    margin-left: 256px;
    margin-right: 256px;
  }
  .gridBrowsePinto{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>