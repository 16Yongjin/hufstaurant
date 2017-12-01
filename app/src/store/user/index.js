import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    addUserLikedAndLikedFoods (state, payload) {
      const { key, foodId } = payload
      Object.assign(state.user.liked, { [foodId]: key })
      state.user.likedFoods.push(foodId)
    },
    removeUserLikedAndLikedFoods (state, payload) {
      delete state.user.liked[payload]
      state.user.likedFoods.splice(state.user.likedFoods.indexOf(payload), 1)
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('loadingOn')
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            reviews: [],
            likes: [],
            fbKeys: {},
            name: payload.userName
          }
          return firebase.database().ref(`/users/${user.uid}/`).set(newUser)
        })
        .then(data => {
          commit('loadingOff')
        })
        .catch(error => {
          commit('loadingOff')
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('loadingOn')
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('loadingOff')
          const newUser = {
            id: user.uid,
            reviews: [],
            likes: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('loadingOff')
          commit('setError', error)
          console.log(error)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, reviews: [], fbKeys: {} })
    },
    fetchUserData ({ commit, getters }) {
      commit('loadingOn')
      firebase.database().ref(`/users/${getters.user.id}/`).once('value')
        .then(data => {
          const { id, name, likes } = data.val()
          let liked = {}
          let likedFoods = []
          if (likes) {
            liked = Object.entries(likes).reduce((acc, v) => {
              return Object.assign(acc, { [v[1].foodId]: v[0] })
            }, {})
            likedFoods = Object.entries(likes).map(val => val[1].foodId)
          }
          const foods = getters.foods
          for (let i = 0; i < foods.length; i++) {
            if (likedFoods.includes(foods[i].id)) {
              console.log('addLikeToFood')
              commit('addLikedFood', foods[i])
              commit('addLikeToFood', i)
            }
          }
          const updatedUser = {
            id,
            name,
            liked,
            likedFoods
          }
          commit('loadingOff')
          console.log('updated user', updatedUser)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('loadingOff')
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
