import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'

let token = localStorage.getItem('token')
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


                localStorage.setItem('email', email)
                localStorage.setItem('token', token)
                localStorage.setItem('mobile', mobile)
                localStorage.setItem('name', name)
                localStorage.setItem('username', username)
                localStorage.setItem('role_id', role_id)
                localStorage.setItem('user_status_id', user_status_id)
                localStorage.setItem('id', id)


                commit('setData')
                if (role_id === 1 || role_id === 2) {
                    router.push('/dashboard/index')
                    commit('success_login')
                } else if (role_id === 3) {
                    balance = data.wallets["0"].balance
                    localStorage.setItem('balance', balance)
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
        let id = localStorage.getItem('id', id)
        let token = localStorage.getItem('token', token)
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

            localStorage.setItem('password', password)
            localStorage.setItem('email', email)
            localStorage.setItem('mobile', mobile)
            localStorage.setItem('name', name)
            localStorage.setItem('username', username)
            localStorage.setItem('role_id', role_id)
            localStorage.setItem('user_status_id', user_status_id)
            localStorage.setItem('id', id)
            localStorage.setItem('balance', balance)

            commit('setData')
        }).catch((error) => {
            if (error.response.status === 401) {
                commit('log_out')
                router.push('/')
            }
        })
    },
    getSms({ commit, state }) {
        let mobile
        if (router.history.current.fullPath === '/find-password') {
            mobile = state.findPassword.mobile
        } else {
            mobile = state.signIn.mobile
        }

        if (mobile.charAt(0) === '0') {
            mobile = mobile.slice(1, 10)
        }
        let data = JSON.stringify({
            mobile: '886' + mobile,
        })
        console.log(data)
        axios.post(`${baseURL}/api/sms`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)

                commit('wrong_findPassword_mobile')
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
    put_findPassword({ commit, state }) {
        let sms = state.findPassword.sms
        let mobile = state.findPassword.mobile
        if (mobile.charAt(0) === '0') {
            mobile = mobile.slice(1, 10)
        }
        // console.log(sms, mobile)
        let data = JSON.stringify({
            mobile: '886' + mobile,
            sms: sms
        })
        console.log(data)
        axios.post(`${baseURL}/api/users/reset-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
                if (status = '200') {
                    commit('success_findPassword')
                    commit('remove_findPassword')
                    router.push('/')
                }
            }).catch((error) => {
                if (error.response.status === 400) {
                    commit('wrong_findPassword_mobile')
                } else if (error.response.status === 422) {
                    commit('wrong_findPassword_sms')
                }
            })


    },
    updateProfile({ commit, state }) {
        let password = state.updateProfile.password
        let oldPassword = state.updateProfile.oldpassword
        let data = JSON.stringify({
            // name: this.state.user.name,
            // username: this.state.user.username,
            old_password: oldPassword,
            password: password
        });
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
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
        let role_id = localStorage.getItem('role_id')
        let token = localStorage.getItem('token')

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
        let token = localStorage.getItem('token')

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
        let token = localStorage.getItem('token')
        let balance = state.user.balance
        let amount = state.transition.amount
        let username = state.transition.to_username
        let data = JSON.stringify({
            to_username: username,
            amount: amount
        })
        console.log(parseFloat(balance) - parseFloat(amount))
        if (parseFloat(balance) - parseFloat(amount) < 0) {
            commit('Insufficient_balance', true)
        } else {
            // axios.post(`${baseURL}/api/transactions`, data, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Accept': 'application/json',
            //             'Authorization': `Bearer ${token}`,
            //         }
            //     })
            //     .then((response) => {
            //         commit('success_transactions')
            //         commit('removeTransactionsInput')
            //         this.dispatch('front_end_show_user')
            //         this.dispatch('userGetwalletHistories', 1)
            //     }).catch((error) => {
            //         if (error.response.status === 404) {
            //             commit('wrong_transactions')
            //         }
            //     }).catch((error) => {
            //         if (error.response.status === 401) {
            //             commit('log_out')
            //             router.push('/')
            //         }
            //     })
        }
    },
    userCheckout({ commit, state }) {
        let data = JSON.stringify({
            name: state.checkout.name,
            bank: state.checkout.bank,
            bank_account: state.checkout.bank_account,
            amount: state.checkout.amount,
            sms: state.checkout.sms
        })
        let token = localStorage.getItem('token')
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
        let token = localStorage.getItem('token')
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
        let token = localStorage.getItem('token')
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
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        let oldpassword = state.updateProfile.oldpassword
        let password = state.updateProfile.password
        let data = JSON.stringify({ old_password: oldpassword, password: password })
        console.log(data, id)
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                localStorage.setItem('user_status_id', 2)
                commit('removeProfileInput')
                router.push('/index')
            })
    }

}