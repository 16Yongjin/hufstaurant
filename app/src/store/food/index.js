import * as firebase from 'firebase'

export default {
  state: {
    foods: [],
    likedFoods: [],
    randomIndex: null
  },
  mutations: {
    loadFoods (state, payload) {
      state.foods = payload
    },
    setRandomIndex (state) {
      state.randomIndex = ~~(Math.random() * state.foods.length)
    },
    addLikedFood (state, payload) {
      state.likedFoods.push(payload)
      // Object.assign(state.user.liked, payload.liked)
      // state.user.likedFoods.push(payload.foodId)
      // console.log('add liked food!, local user data:', state.user)
    },
    removeLikedFood (state, payload) {
      state.likedFoods = state.likedFoods.filter(food => food.idx !== payload)
      // delete state.user.liked[payload]
      // state.user.likedFoods.splice(state.user.likedFoods.indexOf(payload), 1)
    },
    addLikeToFood (state, payload) {
      console.log('liked food', state.foods[payload])
      state.foods[payload].liked = true
    },
    removeLikeFromFood (state, payload) {
      state.foods[payload].liked = false
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
    likeFood ({ commit, getters }, food) {
      console.log('likeFood payload', food)
      const userId = getters.user.id
      return Promise.all([
        firebase.database().ref(`/users/${userId}/likes`).push({ foodId: food.id }),
        firebase.database().ref(`/foods/${food.id}/likes`).once('value')
      ])
      .then(results => {
        console.log(results[0].key)
        console.log(results[1].val())
        commit('addUserLikedAndLikedFoods', { key: results[0].key, foodId: food.id })
        commit('addLikedFood', food)
        commit('addLikeToFood', food.idx)
        firebase.database().ref(`/foods/${food.id}`).update({ likes: results[1].val() + 1 })
      })
    },
    dislikeFood ({ commit, getters }, food) {
      console.log('dislike Food payload', food)
      const user = getters.user
      return Promise.all([
        firebase.database().ref(`/users/${user.id}/likes/${user.liked[food.id]}`).remove(),
        firebase.database().ref(`/foods/${food.id}/likes/`).once('value')
      ])
      .then(results => {
        console.log(results[0])
        console.log(results[1].val())
        commit('removeUserLikedAndLikedFoods', food.id)
        commit('removeLikedFood', food.idx)
        commit('removeLikeFromFood', food.idx)
        return firebase.database().ref(`/foods/${food.id}/`).update({ likes: results[1].val() - 1 })
      })
    },
    changeRandomFood ({ commit }) {
      commit('setRandomIndex')
    }
  },
  getters: {
    foods (state) {
      return state.foods
    },
    randomIndex (state) {
      return state.randomIndex
    },
    randomFood (state) {
      return state.foods[state.randomIndex]
    },
    likedFoods (state) {
      return state.likedFoods
    }
  }
}
