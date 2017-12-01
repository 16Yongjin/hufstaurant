<template>
<div style="height: 100%">
<v-container grid-list-md fill-height>
  <v-layout row wrap align-center>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
      <v-card>
        <!-- <v-card-media
          v-if="food.imageUrl"
          src=""
          height="50vh"
        ></v-card-media> -->
        <v-carousel v-show="!showMap" hide-delimiters style="height: 50vh;">
          <v-carousel-item v-for="(item,i) in images" v-bind:src="item" :key="i"></v-carousel-item>
        </v-carousel>
        <gmap-map
          v-show="showMap"
          :center="{lat:+food.lat, lng:+food.lng}"
          :zoom="18"
          style="width: 100%; height: 50vh">
            <gmap-marker
              :position="{lat:+food.lat, lng:+food.lng}"
              :clickable="true"
              :icon="'https://firebasestorage.googleapis.com/v0/b/foodle-add-ict.appspot.com/o/Assets%2Fthumb_marker.png?alt=media&token=aa12f075-04e1-47e9-8186-c8a0f233e6e3'">
              <gmap-info-window>
                {{ food.name }}
              </gmap-info-window>
          </gmap-marker>
        </gmap-map>
        <v-card-title style="position: relative;">
                <v-btn
              absolute
              dark
              fab
              top
              right
              color="amber darken-1"
              @click="getAnotherFood"
            >
              <v-icon>replay</v-icon>
            </v-btn>
          <span class="headline amber--text" v-text="food.name"></span>
        </v-card-title>
        <v-card-text class="pb-0 pt-0">
          <v-icon>access_time</v-icon> <span  class="subheading" v-text="food.time"></span>
        </v-card-text>
        <v-card-text class="pl-0 pr-0">
            <v-expansion-panel class="ma-0 elevation-0">
              <v-expansion-panel-content>
                <div slot="header"><v-icon>format_list_bulleted</v-icon> 메뉴</div>
                <ul class="pa-4 grey lighten-3">
                  <li v-text="menu" v-for="menu in food.menu.split(',')" :key="menu"></li>
                </ul>
              </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="user" icon @click="onLike">
            <v-icon :color="liked ? 'red' : ''">favorite</v-icon>
          </v-btn>
          <v-btn icon @click="share=true">
            <v-icon >share</v-icon>
          </v-btn>

          
          <v-btn v-if="food.lat" icon @click="showMap=!showMap">
            <v-icon>{{showMap ? 'image' : 'near_me'}}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>


<v-bottom-sheet v-model="share">
  <v-list>
    <v-subheader>Open in</v-subheader>
    <v-list-tile
      v-for="tile in shareItems"
      :key="tile.title"
      @click="share = false"
    >
      <v-list-tile-avatar>
        <v-avatar size="32px" tile>
          <img :src="`https://vuetifyjs.com/static/doc-images/bottom-sheets/${tile.img}`" :alt="tile.title">
        </v-avatar>
      </v-list-tile-avatar>
      <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
    </v-list-tile>
  </v-list>
</v-bottom-sheet>
  
</div>
</template>

<script>
  export default {
    data () {
      return {
        liked: false,
        showMap: true,
        share: false,
        shareItems: [
          { img: 'keep.png', title: 'Keep' },
          { img: 'inbox.png', title: 'Inbox' },
          { img: 'hangouts.png', title: 'Hangouts' },
          { img: 'messenger.png', title: 'Messenger' },
          { img: 'google.png', title: 'Google+' }
        ],
        images: [
          'http://sakurahouse-blog.com/kr/files/2015/04/food.jpg',
          'http://img.kormedi.com/news/article/__icsFiles/artimage/2015/05/23/c_km601/432212_540.jpg',
          'http://rimage01.commutil.kr/imagesphp/5/20170107171833242690901_20170107175551_01.jpg'
        ]
      }
    },
    computed: {
      food () {
        return this.$store.getters.randomFood
      },
      user () {
        return this.$store.getters.user
      }
    },
    created () {
      this.$store.dispatch('changeRandomFood')
      if (!this.food.lat) {
        this.showMap = false
      }
    },
    methods: {
      onLike () {
        this.liked = !this.liked
        if (this.food.liked) {
          console.log('dislikeFood', this.food.liked)
          this.$store.dispatch('dislikeFood', this.food)
          return
        }
        console.log('likeFood', this.food.liked)
        this.$store.dispatch('likeFood', this.food)
      },
      getAnotherFood () {
        this.$store.dispatch('changeRandomFood')
      }
    }
  }
</script>

<style scoped>

</style>