<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h4 class="primary--text">Create a new Review</h4>
            </v-flex>
        </v-layout>
        
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateReview">
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3>
                        <img :src="imageUrl" width="100%">
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                      <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
                        <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                        <input 
                          type="file" 
                          style="display: none;" 
                          ref="fileInput" 
                          accept="image/*"
                          @change="onFilePicked">
                      </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="title"
                                id="title"
                                v-model="title"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                multi-line
                                rows="3"
                                required>
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
                            <v-btn 
                                class="primary" 
                                :disabled="!formIsValid || loading"
                                :loading="loading"
                                type="submit">
                                Create Review
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      imageUrl: '',
      description: '',
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreateReview () {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        return
      }
      const { title, image, description } = this
      const reviewData = {
        title,
        image,
        description,
        data: new Date().toISOString(),
        callback: this.goToReviews
      }
      console.log('create review')
      this.$store.dispatch('createReview', reviewData)
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
    goToReviews () {
      this.$router.push('/reviews')
    }
  }
}
</script>

<style scoped>

</style>