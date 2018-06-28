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
                let wallets = data.wallets
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
                localStorage.setItem('wallets', JSON.stringify(wallets));

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
        let token = localStorage.getItem('token')
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
            let wallets = data.wallets

            localStorage.setItem('password', password)
            localStorage.setItem('email', email)
            localStorage.setItem('mobile', mobile)
            localStorage.setItem('name', name)
            localStorage.setItem('username', username)
            localStorage.setItem('role_id', role_id)
            localStorage.setItem('user_status_id', user_status_id)
            localStorage.setItem('id', id)
            localStorage.setItem('balance', balance)
            localStorage.setItem('wallets', JSON.stringify(wallets));

            commit('setData', data)
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
        axios.post(`${baseURL}/api/sms`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {})
            .catch((error) => {

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
        let data = JSON.stringify({
            mobile: '886' + mobile,
            sms: sms
        })
        axios.post(`${baseURL}/api/users/reset-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
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
        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {

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
    userGetwalletHistories({ commit, state, getters }, payload) {
        let token = localStorage.getItem('token')
            // let wallets = localStorage.getItem('wallets')
            // let id = JSON.parse(wallets)["0"].id
        let id = getters.getCurrentWallet.id
            // console.log(id)
        axios.get(`${baseURL}/api/wallets/${id}/histories?page=${payload}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((response) => {
                let data = response.data
                console.log(data)
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
        let wallets = localStorage.getItem('wallets')
        let walletIndex = state.transition.walletIndex
        let id = JSON.parse(wallets)[walletIndex].id
        let balance = state.user.balance
        let amount = state.transition.amount
        let username = state.transition.to_username
        let data = JSON.stringify({
                to_username: username,
                amount: amount
            })
            // console.log(id)
        if (parseFloat(balance) - parseFloat(amount) < 0) {
            commit('Insufficient_balance', true)
        } else {
            axios.post(`${baseURL}/api/wallets/${id}/transfer`, data, {
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
                    this.dispatch('getNewestWallet')
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
        }
    },
    adminGetwalletHistories({ commit, state }, payload) {
        let token = localStorage.getItem('token')
            // let wallets = localStorage.getItem('wallets')
            // let id = JSON.parse(wallets)["0"].id
            // let id = state.user.wallet[0].id
            // console.log(id)
        axios.get(`${baseURL}/api/wallets/1/histories?operation_type=1&page=${payload}`, {
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
    adminTransactions({ commit, state }) {
        let token = localStorage.getItem('token')
        let wallets = localStorage.getItem('wallets')
        let id = JSON.parse(wallets)["0"].id
        let balance = state.user.balance
        let amount = state.transition.amount
        let username = state.transition.to_username
        let data = JSON.stringify({
            to_username: username,
            amount: amount
        })
        console.log(balance)
            // if (parseFloat(balance) - parseFloat(amount) < 0) {
            //     commit('Insufficient_balance', true)
            // } else {
        axios.post(`${baseURL}/api/check-in`, data, {
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
                    // this.dispatch('userGetwalletHistories', 1)
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
            // }
    },
    userCheckout({ commit, state }) {
        let data = JSON.stringify({
            name: state.checkout.name,
            bank: state.checkout.bank,
            bank_account: state.checkout.bank_account,
            amount: state.checkout.amount,
            sms: state.checkout.sms
        })
        let walletIndex = state.checkout.walletIndex
        let wallets = localStorage.getItem('wallets')
        let token = localStorage.getItem('token')
        let id = JSON.parse(wallets)[walletIndex].id
            // console.log(data, id)
        axios.post(`${baseURL}/api/wallets/${id}/checkout`, data, {
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
                this.dispatch('getNewestWallet')

            }).catch((error) => {
                commit('checkout_error')
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/')
                }
            })
    },
    userCheckIn({ commit, state }) {
        let token = localStorage.getItem('token')
        let data = JSON.stringify({
            currency: state.checkIn.currency,
            amount: state.checkIn.amount,
            sales: state.checkIn.sales,
            contact: state.checkIn.contact,
            name: state.checkIn.name,
            account: state.checkIn.account,
            note: state.checkIn.note,
        })
        console.log(data)
        axios.post(`${baseURL}/api/deposits`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log(response)
            commit('setCheckIn', { success: true })
            commit('removeCheckInInput')
            this.dispatch('getCheckIn', { page: 1 })

        })
    },
    getNewestWallet({ commit, state }) {
        let token = localStorage.getItem('token')
        let id = localStorage.getItem('id')
        axios.get(`${baseURL}/api/users/${id}/wallets`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {

            let data = response.data
                // let wallets = data.wallets
            localStorage.setItem('wallets', JSON.stringify(data));
            commit('setData')
                // console.log(data)
        })
    },
    getCheckIn({ commit }, { page: page, status: status }) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/deposits?status=${status}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            let data = response.data.data
            let page_total = response.data.last_page
            commit('setCheckIn', { data })
            commit('setCheckIn', { page_total })

        })
    },
    putCheckIn({ commit, state }, { index: index, status: status }) {
        let token = localStorage.getItem('token')
        let id = state.checkIn.data[index].id
        let amount = Number(state.checkIn.approved_amount) || 0

        if (status === -1) {
            amount = null
        } else if (status === 1 && amount === 0) {
            amount = Number(state.checkIn.data[index].amount)
        }
        let data = JSON.stringify({
            status: status,
            approved_amount: amount
        })
        console.log(data)
        axios.put(`${baseURL}/api/deposits/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }).then(response => {
            console.log(response)
            this.dispatch('getCheckIn', { page: 1, status: 0 })
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
    },
    post_add_account({ commit, state }) {
        let new_data = state.mybank_account.new_account
        let token = localStorage.getItem('token')
        let data = JSON.stringify(new_data)
        axios.post(`${baseURL}/api/bank-accounts`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(() => {
                commit('reset_new_account')
                this.dispatch('get_account')
            })
    },
    get_account({ commit, state }, page) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/bank-accounts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {

            let new_data = response.data.data
            let new_page = response.data.last_page
            commit('set_account', { new_data })
            commit('set_account', { new_page })
        })
    },
    put_edit_account({ commit, state }, index) {
        let token = localStorage.getItem('token')
        let edit_account = state.mybank_account.edit_account
        let id = state.mybank_account.data[index].id
        let data = JSON.stringify(edit_account)
        console.log(edit_account)
        axios.put(`${baseURL}/api/bank-accounts/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            commit('reset_edit_account')
            this.dispatch('get_account')
        })
    },
    remove_account({ commit, state }, index) {
        let id = state.mybank_account.data[index].id
        let token = localStorage.getItem('token')
        console.log(id)
        axios.delete(`${baseURL}/api/bank-accounts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then(response => {

            this.dispatch('get_account')
        })
    }

}