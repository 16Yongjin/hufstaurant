<template>
<v-container grid-list-md fill-height class="vs-container">
  <v-layout row wrap align-center>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card ripple class="diagonal-up primary" dark @click.native="selectFood(0)">
        <v-card-title>
          <span class="headline" v-text="food.title"></span>
        </v-card-title>
        <v-card-media
          :src="food.src"
          height="30vh"
        ></v-card-media>
      </v-card>
    </v-flex>
    <div class="vs">
     <h2>VS</h2>
    </div>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card ripple class="diagonal-down primary" dark @click.native="selectFood(1)"> 
        <v-card-media
          :src="food2.src"
          height="30vh"
        ></v-card-media>
        <v-card-title >
          <span class="headline" v-text="food2.title"></span>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      food: { title: '치킨', src: 'http://factoll.com/news_file/1456219273.jpg' },
      food2: { title: '피자', src: 'https://cdn.dominos.co.kr/admin/upload/goods/20161111_w56SKW4F.jpg' }
    }
  },
  methods: {
    selectFood (food) {
      const temp = this.food
      this.food = this.food2
      this.food2 = temp
    }
  }
}
</script>

<style scoped>

.diagonal-up {
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
  transform: translateY(20%);
  border: 2px solid #4DD0E1;
  animation: moveBottom .7s ease-out;
}

.diagonal-down {
  clip-path: polygon(0 50%, 100% 0%, 100% 100%, 0% 100%);
  transform: translateY(-20%);
  text-align: right;
  border: 2px solid #4DD0E1;  
  animation: moveUp .7s ease-out;  
}

.diagonal-down span {
  width: 100%;
}

.vs-container {
  position: relative;
}

.vs {
  position: absolute;
  text-align: center;
  width: 100%;
}


@keyframes moveBottom {
  0% {
    /* opacity: 0; */
    transform: translateY(40%); }
 }
    
@keyframes moveUp {
  0% {
    /* opacity: 0; */
    transform: translateY(-40%); }
 }

</style>