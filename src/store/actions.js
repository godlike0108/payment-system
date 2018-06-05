import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
let token = sessionStorage.getItem('token')
export default {
    login({ commit, state }) {
        console.log('login')
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
                let balance = data.wallets["0"].balance


                console.log(data)
                sessionStorage.setItem('password', password)
                sessionStorage.setItem('email', email)
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('mobile', mobile)
                sessionStorage.setItem('name', name)
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('role_id', role_id)
                sessionStorage.setItem('balance', balance)

                commit('setData')
                if (role_id === 1 || role_id === 2) {
                    router.push('/dashboard/index')
                } else if (role_id === 3) {
                    router.push('/index')
                }

            }).catch(() => {
                if (status = '403') {
                    commit('wrong_login')
                }

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
        console.log(state.updateProfile.name, state.updateProfile.username, state.updateProfile.password)
        axios.post(`${baseURL}/api/users`, {
                name: state.updateProfile.name,
                username: state.updateProfile.username,
                password: state.updateProfile.password,

            })
            .then((response) => {
                console.log(response)
                    // console.log(password, username, name)
            })
    },
    userGetChekout({ commit, state }) {
        let role_id = sessionStorage.getItem('role_id')
        let token = sessionStorage.getItem('token')

        axios.get(`${baseURL}/api/checkouts?role_id=${role_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data.data
                console.log(response)
                commit('userChekout', data)

            })
    },
    userGetwalletHistories({ commit, state }) {
        // let role_id = sessionStorage.getItem('role_id')
        let token = sessionStorage.getItem('token')

        axios.get(`${baseURL}/api/wallet-histories`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data
                    // console.log(response.data)
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

        axios.post(`${baseURL}/api/checkouts`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }

            })
            .then((response) => {
                console.log(response)
            })
    },
    admins({ commit, state }) {
        axios.get(`${baseURL}/api/admins`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data.data
                commit('setAdmins', data)

            })
    },
    getAlluser({ commit, state }) {
        axios.get(`${baseURL}/api/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data.data
                console.log(data)
                commit('setAllusers', data)

            })
    }
}