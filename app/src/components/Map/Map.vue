<template>
<v-container grid-list-md fill-height>
  <v-layout row wrap align-center>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card>
        <v-card-title class="headline amber--text">주변 맛집</v-card-title>
        <gmap-map
          :center="{lat:37.596448, lng:127.060262}"
          :zoom="18"

          style="width: 100%; height: 75vh"
        >
            <gmap-marker
              :key="index"
              v-for="(food, index) in foods"
              :position="{lat:+food.lat, lng:+food.lng}"
              :clickable="true"
              :icon="'https://firebasestorage.googleapis.com/v0/b/foodle-add-ict.appspot.com/o/Assets%2Fthumb_marker.png?alt=media&token=aa12f075-04e1-47e9-8186-c8a0f233e6e3'"
              @click="clickedMarker = food.idx"
            >
            <gmap-info-window v-if="clickedMarker === food.idx">
              {{ food.name }}
              <v-btn icon class="ma-0" >
                <v-icon>info</v-icon>
              </v-btn>
            </gmap-info-window>
            
            </gmap-marker>
            
        </gmap-map>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
/*eslint-disable */


export default {
  data () {
    return {
      clickedMarker: null
    }
  },
  computed: {
    foods () {
      return this.$store.getters.foods
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>