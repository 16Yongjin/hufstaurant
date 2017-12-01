import * as firebase from 'firebase'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    foods: [],
    loading: false,
    error: null
  },
  mutations: {
    loadFoods (state, payload) {
      state.foods = payload
    },
    loadingOn (state) {
      state.loading = true
    },
    loadingOff (state) {
      state.loading = false
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadFoods ({ commit }) {
      firebase.database().ref(`foods`).once('value')
        .then(data => {
          const foods = Object.entries(data.val()).map((obj, idx) => {
            return {
              id: obj[0],
              ...obj[1],
              idx
            }
          })
          console.log('food!', foods)
          commit('loadFoods', foods)
        })
    },
    uploadFoodImage ({ commit }, payload) {
      const { id, callback } = payload
      commit('loadingOn')
      console.log(payload)
      const filename = payload.image.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      firebase.storage().ref(`foods/${id}${ext}`).put(payload.image)
        .then(fileData => {
          const imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('foods').child(id).update({ imageUrl })
        })
        .then(() => {
          commit('loadingOff')
          callback()
          console.log('uploaded Image')
        })
        .catch(error => {
          commit('loadingOff')
          callback()
          console.log(error)
        })
    },
    updateLocation ({ commit }, payload) {
      const { id, lat, lng, callback } = payload
      firebase.database().ref('foods').child(id).update({ lat, lng })
        .then(data => {
          callback()
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    foods (state) {
      return state.foods
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
