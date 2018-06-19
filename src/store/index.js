import Vue from 'vue'
import Vuex from 'vuex'
import loading from 'vuex-loading-plug';
import actions from './actions'
// import getters from './getters'
// import mutations from './mutations'
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
    findPassword: {
        mobile: '',
        sms: '',
        status: {
            wrong_sms: null,
            wrong_mobile: null,
            success: false
        }
    },
    user: {
        username: '',
        // password: '',
        name: '',
        email: '',
        token: '',
        mobile: '',
        role_id: '',
        balance: '',
        id: '',
        wallet: []
    },
    current_wallet: [],
    updateProfile: {
        name: '',
        oldpassword: '',
        username: '',
        password: '',
        success: false,
        wrong: false
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
    getBalance() {
        return state.user.balance
    },
    getAllWallet() {
        return state.user.wallet
    },
    getCurrentWallet() {
        return state.current_wallet
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
    selectWallet(state, index) {
        state.current_wallet = state.user.wallet[index]
            // console.log(state.current_wallet)
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
    updateProfile_wrong(state) {
        state.updateProfile.wrong = true
        setTimeout(() => {
            state.updateProfile.wrong = false
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
    setData(state, data) {
        // console.log(data)

        let email = localStorage.getItem('email')
        let token = localStorage.getItem('token')
        let mobile = localStorage.getItem('mobile')
        let name = localStorage.getItem('name')
        let username = localStorage.getItem('username')
        let wallets = localStorage.getItem('wallets')

        // let password = sessionStorage.getItem('password')
        let role_id = localStorage.getItem('role_id')
        let user_status_id = localStorage.getItem('user_status_id');
        let balance = localStorage.getItem('balance')
        let id = localStorage.getItem('id')
        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.wallet = JSON.parse(wallets)
            // console.log(state.user)
            // state.user.password = password
        state.user.role_id = role_id
        state.user.user_status_id = user_status_id
        state.user.balance = balance
        state.user.id = id

        state.updateProfile.name = name
        state.updateProfile.username = username
            // state.updateProfile.password = password


    },
    update_findpassword_mobile(state, mobile) {
        state.findPassword.mobile = mobile
    },
    update_findpassword_sms(state, sms) {
        state.findPassword.sms = sms
    },
    wrong_findPassword_sms(state) {
        state.findPassword.status.wrong_sms = true
        setTimeout(() => {
            state.findPassword.status.wrong_sms = false
        }, 2000)
    },
    wrong_findPassword_mobile(state) {
        state.findPassword.status.wrong_mobile = true
        setTimeout(() => {
            state.findPassword.status.wrong_mobile = false

        }, 2000)
    },
    success_findPassword(state) {
        state.findPassword.status.success = true
        setTimeout(() => {
            state.findPassword.status.success = false

        }, 2000)
    },
    remove_findPassword(state) {
        state.findPassword.sms = ''
        state.findPassword.mobile = ''

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
        state.updateProfile.password = password
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
    },
    setOldPassword(state, password) {
        state.updateProfile.oldpassword = password
    },
    removeProfileInput(state) {
        state.updateProfile.name = null
        state.updateProfile.username = null
        state.updateProfile.password = null
        state.updateProfile.password = null
        state.updateProfile.oldpassword = null
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
        let email = localStorage.removeItem('email')
        let token = localStorage.removeItem('token')
        let mobile = localStorage.removeItem('mobile')
        let name = localStorage.removeItem('name')
        let username = localStorage.removeItem('username')
        let password = localStorage.removeItem('password')
        let role_id = localStorage.removeItem('role_id')
        let user_status_id = localStorage.removeItem('user_status_id');
        let wallets = localStorage.removeItem('wallets');


        state.user.email = email
        state.user.token = token
        state.user.mobile = mobile
        state.user.name = name
        state.user.username = username
        state.user.password = password
        state.user.role_id = role_id
        state.user.user_status_id = user_status_id
        state.user.wallet = wallets
        state.user.password = null
        state.user.balance = null
        state.user.username = null
        state.user.id = null
        state.user.wallet = []
        state.current_wallet = []
        this.commit('removeCheckoutInput')
        this.commit('removeProfileInput')
        this.commit('removeTransactionsInput')
        this.commit('reset_reset_user_id')
        this.commit('reset_administrator_id')
        console.log(state.user)
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