import Vue from 'vue'
import Vuex from 'vuex'
import loading from 'vuex-loading-plug';
import actions from './actions'
import admin from './admin/index'

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
        balance: '',
        id: ''
    },
    updateProfile: {
        name: '',
        username: '',
        password: '',
        success: false
    },
    checkout: {
        data: [],
        name: null,
        bank: null,
        bank_account: null,
        amount: null,
        sms: null,
        page_total: null,
        success: false,
        error: false
    },
    transition: {
        data: [],
        to_username: null,
        amount: null,
        status: {
            success: false,
            wrongUserName: null,
            noamount: false,
            nouserid: false,
        },

    },
    wallet: {
        histories: [],
        page_total: null
    },
    Admins: {
        admins: []
    },
    Allusers: []
}
const getters = {
    getData() {
        // let data = sessionStorage.getItem('data')
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

        return state.checkout.data

    },
    getTransition() {
        return state.wallet.histories
    },
    get_wallet_page_total() {
        return state.wallet.page_total
    },
    get_checkout_total() {
        return state.checkout.page_total
    }
}
const mutations = {
    wrong_login(state) {
        state.login.wrongLogin = true,
            state.login.success = false
    },
    success_login(state) {
        state.login.wrongLogin = false
    },
    checkout_success(state) {
        state.checkout.success = true
        setTimeout(() => {
            state.checkout.success = false
        }, 2000)
    },
    checkout_error(state) {
        state.checkout.error = true
        setTimeout(() => {
            state.checkout.error = false
        }, 4000)
    },
    updateProfile_success(state) {
        state.updateProfile.success = true
        setTimeout(() => {
            state.updateProfile.success = false
        }, 2000)
    },
    wrong_transactions(state) {
        state.transition.wrongUserName = true,
            state.transition.success = false
    },
    success_transactions(state) {
        state.transition.status.wrongUserName = false,
            state.transition.status.success = true
        setTimeout(() => {
            state.transition.status.success = false
        }, 2000)

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
        let user_status_id = sessionStorage.getItem('user_status_id');
        let balance = sessionStorage.getItem('balance')
        let id = sessionStorage.getItem('id')

        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id
        state.user.user_status_id = user_status_id
        state.user.balance = balance
        state.user.id = id

        state.updateProfile.name = name
        state.updateProfile.username = username
        state.updateProfile.password = password

    },
    updatePassword(state, password) {
        state.user.password = password

    },
    updateUsername(state, username) {
        state.user.username = username
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
    },
    updateToUserName(state, to_username) {
        state.transition.to_username = to_username
    },
    updateToAmount(state, amount) {
        state.transition.amount = amount
    },
    non_existent_account(state, status) {
        state.transition.status.nouserid = status
        setTimeout(() => {
            state.transition.status.nouserid = false
        }, 1500)
    },
    Insufficient_balance(state, status) {
        state.transition.status.noamount = status
        setTimeout(() => {
            state.transition.status.noamount = false
        }, 2000)
    },
    removeTransactionsInput(state) {
        state.transition.to_username = null
        state.transition.amount = null

    },
    firstChagePassword(state, password) {
        state.user.password = password
            // console.log(state.user.password)
    },
    userChekout(state, data) {
        state.checkout.data = data.data
        state.checkout.page_total = data.last_page * 10

    },
    userGetwalletHistories(state, data) {

        state.wallet.histories = data.data
        state.wallet.page_total = data.last_page * 10
    },
    setProfileName(state, name) {
        state.user.name = name
    },
    setProfileUsername(state, username) {
        state.user.username = username
    },
    setProfilePassword(state, password) {
        state.updateProfile.password = password
        console.log(state.updateProfile.password)
    },
    removeProfileInput(state) {
        state.updateProfile.name = null
        state.updateProfile.username = null
        state.updateProfile.password = null
    },
    //commit checkout input value
    setCheckoutName(state, name) {
        state.checkout.name = name
    },
    setCheckoutBank(state, bank) {
        state.checkout.bank = bank
    },
    setCheckout_bank_account(state, bank_account) {
        state.checkout.bank_account = bank_account
    },
    setCheckout_amount(state, amount) {
        state.checkout.amount = amount
    },
    setCheckout_sms(state, sms) {
        state.checkout.sms = sms
    },
    removeCheckoutInput(state) {
        state.checkout.name = null
        state.checkout.bank = null
        state.checkout.bank_account = null
        state.checkout.amount = null
        state.checkout.sms = null
    },
    log_out(state) {
        let email = sessionStorage.removeItem('email')
        let token = sessionStorage.removeItem('token')
        let mobile = sessionStorage.removeItem('mobile')
        let name = sessionStorage.removeItem('name')
        let username = sessionStorage.removeItem('username')
        let password = sessionStorage.removeItem('password')
        let role_id = sessionStorage.removeItem('role_id')
        let user_status_id = sessionStorage.removeItem('user_status_id');

        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id
        state.user.user_status_id = user_status_id
        this.commit('removeCheckoutInput')
        this.commit('removeProfileInput')
        this.commit('removeTransactionsInput')
    },
    setAdmins(state, data) {
        state.Admins.admins = data
    },
    setAllusers(state, data) {
        state.Allusers = data
    }


}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        admin: admin
    }
})