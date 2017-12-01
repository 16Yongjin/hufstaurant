import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App'
import router from './router'
import { store } from './store'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify, { theme: {
  primary: '#FFC107',
  secondary: '#FFECB3',
  accent: '#FEE4AE',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBnc84pTidsGThd_IruvfUcPa0Rwzop_go',
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
Vue.component('app-alert', AlertCmp)

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

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        console.log('load user data')
        this.$store.dispatch('fetchUserData')
      } else {
        console.log('No user is signed in')
      }
    })

    console.log('load Food')
    this.$store.dispatch('loadFoods')
    this.$store.dispatch('loadReviews')
  }
})
