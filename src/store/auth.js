import firebase from 'firebase/app'
export default {
  actions: {
    async login({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async register({commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearError')
    }
  }
}
