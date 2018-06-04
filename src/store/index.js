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
        sms: '',

    },
    signup_status: {
        success: null,
        phone_is_singup: null,
        wrong_sms: null
    },
    user: {
        username: '',
        password: '',
        name: '',
        email: '',
        token: '',
        mobile: '',
        role_id: '',
        balance: ''
    },
    updateProfile: {
        name: '',
        username: '',
        password: ''
    },
    checkout: null,
    transition: {
        data: null,
        to_username: null,
        amount: null
    },
    Admins: {
        admins: null
    },
    Allusers: null
}
const getters = {
    getData() {
        // let data = sessionStorage.getItem('data')
        // console.log(data.name)
    },
    getWrongLogin() {
        return state.login.wrongLogin
    },
    getAdmins() {
        return state.Admins.admins
    },
    getAllusers() {
        return state.Allusers
    },
    getCheckout() {
        return state.checkout
    },
    getTransition() {
        return state.transition.data
    }
}
const mutations = {
    wrong_login(state) {
        state.login.wrongLogin = true
    },
    success_signup(state) {
        state.signup_status.phone_is_singup = null
        state.signup_status.wrong_sms = null
        state.signup_status.success = true
    },
    wrong_signup_sms(state) {
        state.signup_status.wrong_sms = true
        state.signup_status.phone_is_singup = null
        state.signup_status.success = null
    },
    phone_is_singup(state) {
        state.signup_status.phone_is_singup = true
        state.signup_status.wrong_sms = null
        state.signup_status.success = null
    },
    setData(state) {
        let email = sessionStorage.getItem('email')
        let token = sessionStorage.getItem('token')
        let mobile = sessionStorage.getItem('mobile')
        let name = sessionStorage.getItem('name')
        let username = sessionStorage.getItem('username')
        let password = sessionStorage.getItem('password')
        let role_id = sessionStorage.getItem('role_id')
        let balance = sessionStorage.getItem('balance')


        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id
        state.user.balance = balance

        state.updateProfile.name = name
        state.updateProfile.username = username
        state.updateProfile.password = password
        console.log(state.user)

    },
    updatePassword(state, password) {
        state.user.password = password
        console.log(state.user.password)
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
        console.log(email)
    },
    updateSms(state, sms) {
        state.signIn.sms = sms
    },
    updateToUserName(state, to_username) {
        state.transition.to_username = to_username
        console.log(state.transition.to_username)
    },
    updateToAmount(state, amount) {
        state.transition.amount = amount
        console.log(state.transition.amount)
    },
    firstChagePassword(state, password) {
        state.user.password = password
        console.log(state.user.password)
    },
    userChekout(state, data) {
        state.checkout = data
        console.log(state.checkout)
    },
    userGetTransactions(state, data) {
        state.transition.data = data
        console.log(state.transition)
    },
    setProfileName(state, name) {
        state.updateProfile.name = name
        console.log(state.updateProfile.name)
    },
    setProfileUsername(state, username) {
        state.updateProfile.username = username
        console.log(state.updateProfile.username)
    },
    setProfilePassword(state, password) {
        state.updateProfile.password = password
        console.log(state.updateProfile.password)
    },

    log_out(state) {
        let email = sessionStorage.removeItem('email')
        let token = sessionStorage.removeItem('token')
        let mobile = sessionStorage.removeItem('mobile')
        let name = sessionStorage.removeItem('name')
        let username = sessionStorage.removeItem('username')
        let password = sessionStorage.removeItem('password')
        let role_id = sessionStorage.removeItem('role_id')

        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id
        console.log(state.user)
    },
    setAdmins(state, data) {
        state.Admins.admins = data
        console.log(data)
    },
    setAllusers(state, data) {
        state.Allusers = data
        console.log(data)
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})