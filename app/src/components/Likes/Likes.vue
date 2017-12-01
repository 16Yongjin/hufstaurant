<template>
<v-container grid-list-lg fill-height>
  <v-layout row wrap align-center>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card class="primary mb-3" dark v-for="(food, idx) in foods" :key="food.id">
        <v-card-title>
          <span class="headline" v-text="food.name"></span>
        </v-card-title>
        <v-card-media
          :src="food.src ? food.src : 'http://sakurahouse-blog.com/kr/files/2015/04/food.jpg'"
          height="50vh"
        ></v-card-media>
        <!-- <v-card-text>
          <div  v-text="menu" v-for="menu in food.menu.split(',')" :key="menu"></div>
        </v-card-text> -->
        <v-card-actions class="primary">
          <v-spacer></v-spacer>
          <v-btn icon @click="onLike(food, idx)">
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>share</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>navigation</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    data () {
      return {
        foods: this.$store.getters.likedFoods
      }
    },
    methods: {
      onLike (food, idx) {
        console.log('onLike', food)
        this.$store.dispatch('dislikeFood', food)
        this.foods.splice(idx, 1)
      }
    }
  }
</script>

<style scoped>

</style>