<template>
<v-container fill-height grid-list-lg>
      <v-layout row wrap>
        <v-flex pt-4 xs12 sm6 md6 offset-sm3 offset-md3 class="text-xs-center">
          <v-layout align-center>
            <v-flex>
            <v-btn fab dark large class="primary" to="/cafeteria">
              <!-- <v-icon dark>android</v-icon> -->
              <h3>학식</h3>
            </v-btn>
            </v-flex>

            <v-flex>
            <v-btn fab dark large class="primary" to="/reviews">
              <!-- <v-icon dark>android</v-icon> -->
              <h3>리뷰</h3>
            </v-btn>
            </v-flex>

            <v-flex>
            <v-btn fab dark large class="primary" to="/map">
              <!-- <v-icon dark>android</v-icon> -->
              <h3>주변</h3>
            </v-btn>
            </v-flex>
          </v-layout>            
        </v-flex>

        <v-flex xs12 sm6 md6 offset-sm3 offset-md3>
          <v-card ripple height="100%" class="primary" dark to="/food">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex>
                  <div>
                    <div class="headline">랜덤 추첨</div>
                    <div>Random ㅊㅊ</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md6 offset-sm3 offset-md3 >
          <v-card ripple height="100%" color="amber darken-2" dark to="/foodcup">
            <v-container fluid grid-list-lg>
              <v-layout row>
                <v-flex>
                  <div>
                    <div class="headline">푸드컵</div>
                    <div>Foodcup</div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
</template>

<script>
export default {
  methods: {
    log () {
      console.log('hello')
    }
  }
}
</script>

<style scoped>

</style>