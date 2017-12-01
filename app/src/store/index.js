import Vue from 'vue'
import Vuex from 'vuex'
import food from './food'
import review from './review'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    food,
    review,
    user,
    shared
  }
})
