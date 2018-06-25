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
    current_wallet_index: -1,
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
    checkIn: {
        data: [],
        currency: null,
        amount: null,
        account: null,
        name: null,
        note: '',
        contact: null,
        sales: null,
        success: false,
        error: false,
        page_total: null
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
    mybank_account: {
        data: [],
        page_total: '',
        new_account: {
            title: null,
            name: null,
            bank: null,
            account: null
        },
        edit_account: {
            title: null,
            name: null,
            bank: null,
            account: null
        }
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
        return state.user.wallet[state.current_wallet_index]
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
    getCheckIn() {
        return state.checkIn.data
    },
    getTransition() {
        return state.wallet.histories
    },
    getMyAccount() {
        return state.mybank_account
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
        state.current_wallet_index = index
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
    setLogin(state, {
        password: password,
        username: username
    }) {
        if (password) {
            state.user.password = password
        } else if (username) {
            state.user.username = username
        }

    },

    setSignUp(state, {
        name: name,
        email: email,
        mobile: mobile,
        sms: sms
    }) {
        if (name) {
            state.signIn.name = name
        } else if (email) {
            state.signIn.email = email
        } else if (mobile) {
            state.signIn.mobile = mobile
        } else if (sms) {
            state.signIn.sms = sms
        }

    },
    setTransition(state, {
        to_username: to_username,
        amount: amount
    }) {
        if (to_username) {
            state.transition.to_username = to_username
        } else if (amount) {
            state.transition.amount = amount
        }

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
    userGetwalletHistories(state, data) {

        state.wallet.histories = data.data
        state.wallet.page_total = data.last_page * 10
    },
    setProfile(state, {
        name: name,
        username: username,
        password: password,
        OldPassword: OldPassword
    }) {
        if (name) {
            state.user.name = name
        } else if (username) {
            state.user.username = username
        } else if (password) {
            state.updateProfile.password = password
        } else if (OldPassword) {
            state.updateProfile.oldpassword = OldPassword
        }

    },
    removeProfileInput(state) {
        state.updateProfile.name = null
        state.updateProfile.username = null
        state.updateProfile.password = null
        state.updateProfile.password = null
        state.updateProfile.oldpassword = null
    },
    //commit checkout input value
    userChekout(state, data) {
        state.checkout.data = data.data
        state.checkout.page_total = data.last_page * 10

    },
    setCheckout(state, {
        name: name,
        bank: bank,
        account: account,
        amount: amount,
        sms: sms
    }) {
        if (name) {
            state.checkout.name = name
        } else if (bank) {
            state.checkout.bank = bank
        } else if (account) {
            state.checkout.bank_account = account
        } else if (amount) {
            state.checkout.amount = amount
        } else if (sms) {
            state.checkout.sms = sms
        }

    },
    removeCheckoutInput(state) {
        state.checkout.name = null
        state.checkout.bank = null
        state.checkout.bank_account = null
        state.checkout.amount = null
        state.checkout.sms = null
    },
    selectAccount(state, index) {
        let common_account = state.mybank_account.data[index]
            // console.log(common_account)
        state.checkout.name = common_account.name
        state.checkout.bank = common_account.bank
        state.checkout.bank_account = common_account.account
    },
    userChekIn(state, data) {
        state.checkIn.data = data.data
        state.checkIn.page_total = data.last_page * 10

    },
    setCheckIn(state, {
        currency: currency,
        amount: amount,
        sales: sales,
        contact: contact,
        name: name,
        account: account,
        note: note
    }) {
        if (amount) {
            state.checkIn.amount = amount
        } else if (currency) {
            state.checkIn.currency = currency
        } else if (sales) {
            state.checkIn.sales = sales
        } else if (contact) {
            state.checkIn.contact = contact
        } else if (name) {
            state.checkIn.name = name
        } else if (account) {
            state.checkIn.account = account
        } else if (note) {
            state.checkIn.note = note
        }

    },
    removeCheckInInput(state) {
        state.checkIn.currency = null
        state.checkIn.amount = null
        state.checkIn.business = null
        state.checkIn.bank_username = null
        state.checkIn.bank_account = null
        state.checkIn.mobile = null
        state.checkIn.note = null
    },
    set_account(state, {
        title: title,
        name: name,
        bank: bank,
        account: account,
        edit_title: edit_title,
        edit_name: edit_name,
        edit_bank: edit_bank,
        edit_account: edit_account,
        new_data: new_data,
        new_page: new_page
    }) {
        let mybank_account = state.mybank_account
        let new_account = state.mybank_account.new_account
        let edit_myAccount = state.mybank_account.edit_account
        if (title) {
            new_account.title = title
        } else if (name) {
            new_account.name = name
        } else if (bank) {
            new_account.bank = bank
        } else if (account) {
            new_account.account = account
        } else if (edit_title) {
            edit_myAccount.title = edit_title
        } else if (edit_name) {
            edit_myAccount.name = edit_name
        } else if (edit_bank) {
            edit_myAccount.bank = edit_bank
        } else if (edit_account) {
            edit_myAccount.account = edit_account
        } else if (new_data) {
            mybank_account.data = new_data
        } else if (new_page) {
            mybank_account.page_total = new_page * 10
        }

    },
    reset_new_account(state) {
        state.mybank_account.new_account.title = null
        state.mybank_account.new_account.name = null
        state.mybank_account.new_account.bank = null
        state.mybank_account.new_account.account = null
            // console.log(this.state.mybank_account.new_account)
    },
    reset_edit_account(state) {
        state.mybank_account.edit_account.title = null
        state.mybank_account.edit_account.name = null
        state.mybank_account.edit_account.bank = null
        state.mybank_account.edit_account.account = null

    },
    setAdmins(state, data) {
        state.Admins.admins = data
    },
    setAllusers(state, data) {
        state.Allusers = data
    },
    setData(state, data) {
        let email = localStorage.getItem('email')
        let token = localStorage.getItem('token')
        let mobile = localStorage.getItem('mobile')
        let name = localStorage.getItem('name')
        let username = localStorage.getItem('username')
        let wallets = localStorage.getItem('wallets')

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

        state.user.role_id = role_id
        state.user.user_status_id = user_status_id
        state.user.balance = balance
        state.user.id = id

        state.updateProfile.name = name
        state.updateProfile.username = username
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
        this.commit('removeCheckInInput')

    },

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