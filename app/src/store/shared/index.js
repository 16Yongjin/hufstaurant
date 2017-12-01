export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
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
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}
