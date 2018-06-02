import Vue from 'vue'
import Vuex from 'vuex'
import loading from 'vuex-loading-plug';
import actions from './actions'

Vue.use(Vuex)
const state = {
    user: {
        username: '',
        password: '',
        name: '',
        email: '',
        token: '',
        creat: ''
    }
}
const getters = {}
const mutations = {
    setToken(state, payload) {
        state.user.name = payload.name
        state.user.email = payload.email
        state.user.token = payload.api_token
            // state.user.creat = payload.name
            // console.log(payload)
    },
    updatePassword(state, password) {
        state.user.password = password
            // console.log(state.user.password)
    },
    updateUsername(state, username) {
        state.user.username = username
            // console.log(state.user.username)
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})