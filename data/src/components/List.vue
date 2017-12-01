<template>
<div>
<v-dialog v-model="imageDialog" max-width="500px" @close="log">
  <v-card>
    <v-card-title>
      {{ selectedFood ? selectedFood.name : '' }}
    </v-card-title>
    <form @submit.prevent="onImageUpload">
      <v-card-text>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <img :src="imageUrl" width="100%">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
            <v-btn raised class="primary" @click="onPickFile">{{imageUrl ? 'Change Image' : 'Upload Image'}}</v-btn>
            <input 
              type="file" 
              style="display: none;" 
              ref="fileInput" 
              accept="image/*"
              @change="onFilePicked">
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="closeDialog">Close</v-btn>
        <v-progress-circular v-if="loading" indeterminate v-bind:size="50" color="amber"></v-progress-circular>
        <v-btn color="primary" v-else flat type="submit" :disabled="disableUpload">Upload</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</v-dialog>

<v-dialog v-model="locationDialog" max-width="500px" @close="log">
  <v-card>
    <v-card-title>
      {{ selectedFood ? selectedFood.name : '' }}
    </v-card-title>
    <form @submit.prevent="onUpdateLocation">
      <v-card-text>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
            <v-text-field
              name="input-2"
              label="Latitude ex)37.000"
              v-model="lat"
            ></v-text-field>
            <v-text-field
              name="input-2"
              label="Longitude ex)127.000"
              v-model="lng"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.stop="closeDialog">Close</v-btn>
        <v-progress-circular v-if="loading" indeterminate v-bind:size="50" color="amber"></v-progress-circular>
        <v-btn color="primary" v-else flat type="submit" :disabled="disableLocationUpload">Update</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</v-dialog>
  
<v-list >
  <v-list-tile avatar v-for="food in foods" v-bind:key="food.idx">
    <v-list-tile-avatar @click="openDialog(food, 'image')">
      <img :src="food.thumbnailUrl ? food.thumbnailUrl : food.imageUrl"/>
    </v-list-tile-avatar>
    <v-list-tile-content @click="openDialog(food, 'image')">
      <v-list-tile-title>{{food.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{food.type}}</v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-avatar v-if="!food.lat" @click="openDialog(food)">
      <img src="https://firebasestorage.googleapis.com/v0/b/foodle-add-ict.appspot.com/o/Assets%2Fthumb_marker.png?alt=media&token=aa12f075-04e1-47e9-8186-c8a0f233e6e3"/>
    </v-list-tile-avatar>
  </v-list-tile>
</v-list>

</div>

</template>

<script>
export default {
  data () {
    return {
      imageDialog: false,
      locationDialog: false,
      selectedFood: null,
      imageUrl: null,
      image: null,
      lat: '',
      lng: ''
    }
  },
  computed: {
    foods () {
      console.log('heelo!')
      return this.$store.getters.foods
    },
    disableUpload () {
      if (!this.selectedFood || !this.imageUrl || !this.image) {
        return true
      }
    },
    disableLocationUpload () {
      if (!this.selectedFood || this.lat.length === 0 || !+this.lat || !+this.lng || this.lng.length === 0) {
        return true
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    imageDialog () {
      if (this.imageDialog === false) {
        this.closeDialog()
      }
    },
    locationDialog () {
      if (this.locationDialog === false) {
        this.closeDialog()
      }
    }
  },
  methods: {
    openDialog (food, type) {
      if (type === 'image') {
        this.imageDialog = true
      } else {
        this.locationDialog = true
      }
      this.selectedFood = food
    },
    closeDialog () {
      this.imageDialog = false
      this.locationDialog = false
      this.selectedFood = null
      this.imageUrl = null
      this.image = null
      this.lat = ''
      this.lng = ''
    },
    reloadFood () {
      this.closeDialog()
      this.$store.dispatch('loadFoods')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const { files } = event.target
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    onImageUpload () {
      console.log('upload Image!')
      this.$store.dispatch('uploadFoodImage', {
        id: this.selectedFood.id,
        image: this.image,
        callback: this.reloadFood
      })
    },
    onUpdateLocation () {
      console.log(this.lat, this.lng)
      this.$store.dispatch('updateLocation', {
        id: this.selectedFood.id,
        lat: +this.lat,
        lng: +this.lng,
        callback: this.reloadFood
      })
    },
    log () {
      console.log('close')
    }
  }
}
</script>

<style scoped>

</style>
