import Vue from 'vue'
import Vuex from 'vuex'
import loading from 'vuex-loading-plug';
import actions from './actions'

Vue.use(Vuex)
const state = {
    login: {
        wrongLogin: null
    },
    signIn: {
        name: '',
        email: '',
        mobile: '',
        sms: ''
    },
    user: {
        username: '',
        password: '',
        name: '',
        email: '',
        token: '',
        mobile: '',
        role_id: ''
    },
    updateProfile: {
        name: '',
        username: '',
        password: ''
    },
    checkout: {

    },
    transition: {

    }
}
const getters = {
    getData() {
        // let data = sessionStorage.getItem('data')
        // console.log(data.name)
    },
    getWrongLogin() {
        return state.login.wrongLogin
    }
}
const mutations = {
    wrong_login(state) {
        state.login.wrongLogin = true
    },
    setData(state) {
        let email = sessionStorage.getItem('email')
        let token = sessionStorage.getItem('token')
        let mobile = sessionStorage.getItem('mobile')
        let name = sessionStorage.getItem('name')
        let username = sessionStorage.getItem('username')
        let password = sessionStorage.getItem('password')
        let role_id = sessionStorage.getItem('role_id')

        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id

        state.updateProfile.name = name
        state.updateProfile.username = username
        state.updateProfile.password = password
        console.log(state.user)

    },
    updatePassword(state, password) {
        state.user.password = password
            // console.log(state.user.password)
    },
    updateUsername(state, username) {
        state.user.username = username
            // console.log(state.user.username)
    },
    updateName(state, name) {
        state.signIn.name = name
    },
    updateMobile(state, mobile) {
        state.signIn.mobile = mobile

    },
    updateEmail(state, email) {
        state.signIn.email = email
    },
    updateSms(state, sms) {
        state.signIn.sms = sms
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})