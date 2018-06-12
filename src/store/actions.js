import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
let token = sessionStorage.getItem('token')
export default {
    login({ commit, state }) {
        axios.post(`${baseURL}/api/login`, {
                username: state.user.username,
                password: state.user.password
            })
            .then((response) => {
                let data = response.data
                let token = data.api_token
                let email = data.email
                let mobile = data.mobile
                let name = data.name
                let username = data.username
                    // let password = state.user.password
                let role_id = data.role_id
                let balance
                let user_status_id = data.user_status_id
                let id = data.id


                // sessionStorage.setItem('password', password)
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('mobile', mobile)
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('role_id', role_id)
                sessionStorage.setItem('user_status_id', user_status_id)
                sessionStorage.setItem('id', id)


                commit('setData')
                if (role_id === 1 || role_id === 2) {
                    router.push('/dashboard/index')
                    commit('success_login')
                } else if (role_id === 3) {
                    balance = data.wallets["0"].balance
                    sessionStorage.setItem('balance', balance)
                    router.push('/index')
                    commit('success_login')

                }

            }).catch((response) => {
                if (status = '403') {
                    commit('wrong_login')
                }

            })
    },
    front_end_show_user({ commit, state }) {
        let id = sessionStorage.getItem('id', id)
        let token = sessionStorage.getItem('token', token)
        axios.get(`${baseURL}/api/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then((response) => {
            let data = response.data
            let email = data.email
            let mobile = data.mobile
            let name = data.name
            let username = data.username
            let password = state.user.password
            let role_id = data.role_id
            let balance = data.wallets["0"].balance
            let user_status_id = data.user_status_id
            let id = data.id

            sessionStorage.setItem('password', password)
            sessionStorage.setItem('email', email)
            sessionStorage.setItem('mobile', mobile)
            sessionStorage.setItem('name', name)
            sessionStorage.setItem('username', username)
            sessionStorage.setItem('role_id', role_id)
            sessionStorage.setItem('user_status_id', user_status_id)
            sessionStorage.setItem('id', id)
            sessionStorage.setItem('balance', balance)

            commit('setData')
        }).catch((error) => {
            if (error.response.status === 401) {
                commit('log_out')
                router.push('/')
            }
        })
    },
    getSms({ commit, state }) {
        let mobile = state.signIn.mobile
        if (mobile.charAt(0) === '0') {
            mobile = mobile.slice(1, 10)
        }
        let data = JSON.stringify({
            mobile: '886' + mobile,
        })
        console.log(data)
        axios.post(`${baseURL}/api/sms`, data, {

            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    getUserSms({ commit, state }) {
        axios.post(`${baseURL}/api/sms`, {
                mobile: state.user.mobile
            })
            .then((response) => {})
            .catch(() => {

            })
    },
    submitSignIn({ commit, state }) {
        let name = state.signIn.name
        let email = state.signIn.email
        let mobile = state.signIn.mobile
        let sms = state.signIn.sms
        if (mobile.charAt(0) === '0') {
            mobile = mobile.slice(1, 10)
        }
        let data = JSON.stringify({
            name: name,
            email: email,
            mobile: '886' + mobile,
            sms: sms,
        })
        console.log(data)
        axios.post(`${baseURL}/api/signup`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {

                if (status = '200') {
                    commit('success_signup')
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    commit('wrong_signup_sms')
                } else if (error.response.status === 422) {
                    commit('phone_is_singup')
                }
            })

    },
    updateProfile({ commit, state }) {
        let password = state.updateProfile.password
        let oldPassword = state.updateProfile.oldpassword
        let data = JSON.stringify({
            // name: this.state.user.name,
            // username: this.state.user.username,
            password: password
        });
        let id = sessionStorage.getItem('id')
        let token = sessionStorage.getItem('token')
        console.log(data)
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
                commit('removeProfileInput')
                commit('updateProfile_success')

            }).catch((error) => {
                commit('updateProfile_wrong')
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    userGetChekout({ commit, state }, payload) {
        let role_id = sessionStorage.getItem('role_id')
        let token = sessionStorage.getItem('token')

        axios.get(`${baseURL}/api/checkouts?role_id=${role_id}&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data
                commit('userChekout', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    userGetwalletHistories({ commit, state }, payload) {
        // let role_id = sessionStorage.getItem('role_id')
        let token = sessionStorage.getItem('token')

        axios.get(`${baseURL}/api/wallet-histories?page=${payload}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((response) => {
                let data = response.data
                commit('userGetwalletHistories', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    userTransactions({ commit, state }) {
        let data = JSON.stringify({
            to_username: this.state.transition.to_username,
            amount: this.state.transition.amount
        })
        let token = sessionStorage.getItem('token')
        axios.post(`${baseURL}/api/transactions`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((response) => {
                commit('success_transactions')
                commit('removeTransactionsInput')
                this.dispatch('front_end_show_user')
                this.dispatch('userGetwalletHistories', 1)
            }).catch((error) => {
                if (error.response.status === 404) {
                    commit('wrong_transactions')
                }
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    userCheckout({ commit, state }) {
        let data = JSON.stringify({
            name: state.checkout.name,
            bank: state.checkout.bank,
            bank_account: state.checkout.bank_account,
            amount: state.checkout.amount,
            sms: state.checkout.sms
        })
        let token = sessionStorage.getItem('token')
        axios.post(`${baseURL}/api/checkouts`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }

            })
            .then((response) => {
                commit('removeCheckoutInput')
                commit('checkout_success')
                this.dispatch('userGetChekout', 1)


            }).catch((error) => {
                commit('checkout_error')
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    admins({ commit, state }) {
        let token = sessionStorage.getItem('token')
        axios.get(`${baseURL}/api/admins`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data.data
                commit('setAdmins', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    getAlluser({ commit, state }) {
        let token = sessionStorage.getItem('token')
        axios.get(`${baseURL}/api/users`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data.data
                commit('setAllusers', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    put_firstChagePassword({ commit, state }) {
        let id = sessionStorage.getItem('id')
        let token = sessionStorage.getItem('token')
        let password = state.user.password
        let data = JSON.stringify({ password: password })
        console.log(data, id)
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                // commit('setData', data)
                this.dispatch('login')
            })
    }

}