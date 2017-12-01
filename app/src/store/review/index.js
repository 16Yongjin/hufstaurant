import * as firebase from 'firebase'

export default {
  state: {
    reviews: []
  },
  mutations: {
    loadReviews (state, payload) {
      state.reviews = payload
    },
    createReview (state, payload) {
      state.reviews.unshift(payload)
    }
  },
  actions: {
    loadReviews ({ commit }) {
      firebase.database().ref(`reviews`).once('value')
        .then(data => {
          if (!data.val()) {
            commit('loadReviews', [])
            return
          }
          const reviews = Object.entries(data.val()).map(obj => {
            return {
              id: obj[0],
              ...obj[1]
            }
          })
          commit('loadReviews', reviews.reverse())
        })
    },
    createReview ({ commit, getters }, payload) {
      const user = getters.user
      console.log(user)
      const { title, description, callback } = payload
      const review = {
        title,
        description
      }
      let imageUrl, key
      commit('loadingOn')
      firebase.database().ref('reviews').push(review)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref(`reviews/${key}${ext}`).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('reviews').child(key).update({ imageUrl })
        })
        .then(() => {
          // commit('createReview', {
          //   ...review,
          //   imageUrl,
          //   id: key
          // })
          commit('loadingOff')
          callback()
        })
        .catch(error => {
          commit('loadingOff')
          console.log(error)
        })
    }
  },
  getters: {
    reviews (state) {
      return state.reviews
    }
  }
}
