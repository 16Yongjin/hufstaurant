<template>
  <v-tabs fixed centered>
    <v-tabs-bar class="primary" dark style="z-index: 2;">
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item href="#tab-inmun">
        인문관
      </v-tabs-item>

      <v-tabs-item href="#tab-kyosu">
        교수회관
      </v-tabs-item>
    </v-tabs-bar>
    
    <v-tabs-items>
      <v-tabs-content id="tab-inmun">
        <v-container grid-list-lg fill-height>
          <v-layout row wrap align-center>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
              <v-card class="mb-3" v-for="menu in inmun" :key="menu.title">
                <v-card-title>
                  <span class="headline amber--text" v-text="menu.title"></span>
                </v-card-title>
                <v-card-text>
                  <p v-for="text in menu.text" :key="text" class="ma-2">
                    {{ text }}
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tabs-content>

      <v-tabs-content id="tab-kyosu">
        <v-container grid-list-lg fill-height>
          <v-layout row wrap align-center>
            <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
              <v-card v-for="menu in kyosu" :key="menu.title">
                <v-card-title>
                  <span class="headline amber--text" v-text="menu.title"></span>
                </v-card-title>
                <v-card-text>
                  <p v-for="text in menu.text" :key="text" class="ma-2">
                    {{ text }}
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  export default {
    data: () => ({
      inmun: [
        {
          title: '중식(1)',
          text: `11:00~14:30\n떡만두국\n1/2공기밥\n부추파전\n김치\n우육;호주,돈:국내산\n724 Kcal\n2,500원`.split(/\s/g)
        },
        {
          title: '중식(2)',
          text: `11:00~14:30\n\n치킨까스\n크림스프\n곁들임야채\n샐러드\n닭:국내산\n750 Kcal\n2,500원`.split(/\s/g)
        },
        {
          title: '중식(면) ',
          text: `11:30~14:00\n\n짬뽕\n540 Kcal\n1,500원`.split(/\s/g)
        }
      ],
      kyosu: [
        {
          title: '교수회관',
          text: '중식 11:00~13:30\n\n곤드레밥\n돼지갈비양념찜(돈갈비,돈정육:국내산)\n순두부새우젓국\n오징어김치전\n파래김*양념장\n콩나물무침\n포기김치\n야쿠르트\n903 Kcal\n4,500원'.split(/\s/g)
        }
      ]
    })
  }
</script>

<style scoped>

</style>