<template>
<v-container grid-list-md fill-height>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card class="mb-3" v-for="review in reviews" :key="review.title" @click.native="log">
        <v-card-title>
          <span class="headline" v-text="review.title"></span>
        </v-card-title>
        <v-card-media
          :src="!!review.thumbnailUrl ? review.thumbnailUrl : review.imageUrl"
          height="200px"
        ></v-card-media>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="review.liked = !review.liked" >
            <v-icon :color="review.liked ? 'red' : ''">favorite</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-text class="pt-1 pb-1">
          <p>{{ review.description }}</p>
        </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
    <v-btn fab fixed right bottom class="mb-2 mr-2" color="yellow accent-2" to="/reviews/new">
      <v-icon>edit</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
  export default {
    computed: {
      reviews () {
        return this.$store.getters.reviews
      }
    },
    created () {
      console.log(this.$route)
      this.$store.dispatch('loadReviews')
    },
    methods: {
      log () {
        console.log(this.reviews)
      }
    }
  }
</script>

<style scoped>

</style>