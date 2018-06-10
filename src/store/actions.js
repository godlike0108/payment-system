import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
let token = sessionStorage.getItem('token')
export default {
    login({ commit, state }) {
        // console.log(commit, state)
        // console.log(state.user)
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
                let password = state.user.password
                let role_id = data.role_id
                let balance
                let user_status_id = data.user_status_id
                let id = data.id


                console.log(response)
                sessionStorage.setItem('password', password)
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
                console.log("====")
                console.log(response)
                console.log("====")
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
            console.log(response)
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
        })
    },
    getSms({ commit, state }) {
        axios.post(`${baseURL}/api/sms`, {
                mobile: 886 + state.signIn.mobile
            })
            .then((response) => {
                console.log(response)
            })
            .catch(() => {

            })
    },
    getUserSms({ commit, state }) {
        axios.post(`${baseURL}/api/sms`, {
                mobile: state.user.mobile
            })
            .then((response) => {
                console.log(response)
            })
            .catch(() => {

            })
    },
    submitSignIn({ commit, state }) {
        if (state.signIn.email === null) {

        } else {
            axios.post(`${baseURL}/api/signup`, {
                    name: state.signIn.name,
                    email: state.signIn.email,
                    mobile: 886 + state.signIn.mobile,
                    sms: state.signIn.sms,
                })
                .then((response) => {
                    console.log(response)

                    if (status = '200') {
                        commit('success_signup')
                    }
                }).catch((error) => {
                    console.log(error.response.status)
                    if (error.response.status === 400) {
                        commit('wrong_signup_sms')
                    } else if (error.response.status === 422) {
                        commit('phone_is_singup')
                    }
                })
        }
    },
    updateProfile({ commit, state }) {
        let data = JSON.stringify({
            name: this.state.user.name,
            username: this.state.user.username,
            password: this.state.user.password
        });
        let id = sessionStorage.getItem('id')
        let token = sessionStorage.getItem('token')
        console.log(state.user.name, state.user.username, state.user.password)
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
                this.dispatch('login')
                    // console.log(password, username, name)
            })
    },
    userGetChekout({ commit, state }, payload) {
        let role_id = sessionStorage.getItem('role_id')
        let token = sessionStorage.getItem('token')

        axios.get(`${baseURL}/api/checkouts?role_id=${role_id}?page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data
                    // console.log(response)
                commit('userChekout', data)

            })
    },
    userGetwalletHistories({ commit, state }, payload) {
        // let role_id = sessionStorage.getItem('role_id')
        // console.log(payload)
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
                    // console.log(response)
                commit('userGetwalletHistories', data)

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
                console.log(response)
                commit('success_transactions')
                this.dispatch('front_end_show_user')
            }).catch(() => {
                if (error.response.status === 404) {
                    commit('wrong_transactions')
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
        console.log(data)
        axios.post(`${baseURL}/api/checkouts`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }

            })
            .then((response) => {
                console.log(response)
                this.dispatch('userGetChekout', 1)
                commit('reset_user_checkout')

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
                    // console.log(data)
                commit('setAdmins', data)

            })
    },
    getAlluser({ commit, state }) {
        axios.get(`${baseURL}/api/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data.data
                    // console.log(data)
                commit('setAllusers', data)

            })
    },
    put_firstChagePassword({ commit, state }) {
        let id = sessionStorage.getItem('id')
        let password = state.user.password
        let data = JSON.stringify({ password: password })
        console.log(data)
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
                    // commit('setData', data)
                this.dispatch('login')
            })
    }

}