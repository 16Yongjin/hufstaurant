import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDYgB_ZFszhn_yPVSJkNvG97PNIE4YAFFQ',
      authDomain: 'foodle-add-ict.firebaseapp.com',
      databaseURL: 'https://foodle-add-ict.firebaseio.com',
      projectId: 'foodle-add-ict',
      storageBucket: 'foodle-add-ict.appspot.com'
    })

    this.$store.dispatch('loadFoods')
  }
})
