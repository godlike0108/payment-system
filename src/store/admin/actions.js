import axios from 'axios'
import router from '@/router'
import { isNull } from 'util'
import { resolve } from 'path'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'

export default {
    userReview({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/users?status=pending&page=${payload}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((respone) => {
            let data = respone.data
            commit('set_user_review', data)
        }).catch((error) => {
            if (error.response.status === 401) {
                commit('log_out')
                router.push('/dashboard')
            }
        })
    },
    show_user({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/users?status=active&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                let data = response.data
                commit('set_user_list', data)
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    put_user_id({ commit, state }) {
        let token = localStorage.getItem('token')
        let id = state.user_review_id_index
        let username = state.user_review_id
        let data = JSON.stringify({ username: username })

        axios.put(`${baseURL}/api/users/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                this.dispatch('userReview', 1)
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }

                if (error.response.data.message) {
                    alert(error.response.data.message);
                }
            })
    },
    put_administrator_id({ commit, state }, index) {
        let token = localStorage.getItem('token')
        let id = state.reset_administrator.administrator_id
        let password = state.reset_administrator.password
        let data = null
        data = JSON.stringify({ password: password })
        state.reset_administrator.nopassword = false
        axios.put(`${baseURL}/api/admins/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                this.dispatch('admins')
                this.commit('reset_administrator_id')
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
            // let username = null
            // if (state.reset_administrator.username === null) {
            //     username = this.state.Admins.admins[index].username
            //     data = JSON.stringify({ username: username, password: password })
            // } else {
            //     username = state.reset_administrator.username
            //     data = JSON.stringify({ username: username, password: password })
            // }
    },
    update_user_id({ commit, state }, index) {
        let token = localStorage.getItem('token')
        let id = state.reset_user.user_id
        let username = state.user_list.data[index].username
        let email = state.reset_user.email
        let phone = state.reset_user.phone
        let password = state.reset_user.password
        let phoneRule = /^8869[0-9]{8}$/
        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
        let put_data = {}

        if (!phoneRule.test(phone) && emailRule.test(email)) {
            Object.assign(put_data, { email: email })
        } else if (phoneRule.test(phone) && !emailRule.test(email)) {
            Object.assign(put_data, { mobile: phone })
        } else if (phoneRule.test(phone) && emailRule.test(email)) {
            Object.assign(put_data, { mobile: phone, email: email })
        }
        if (password != null) {
            Object.assign(put_data, { password: password })
        }
        axios.put(`${baseURL}/api/users/${id}`, put_data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                this.dispatch('show_user', 1)
                this.commit('reset_reset_user_id')
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    approval_levels({ commit, state }) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/approval_levels/2`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            let data = response.data.amount
            commit('set_approval_amount', data)
        }).catch((error) => {
            if (error.response.status === 401) {
                commit('log_out')
                router.push('/dashboard')
            }
        })
    },
    update_approval_amount({ commit, state }) {
        let token = localStorage.getItem('token')
        let amount = state.new_approval_amount
        let data = JSON.stringify({ amount: amount })
        axios.put(`${baseURL}/api/approval_levels/2`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            // let data = response.data.amount
            // this._actions.approval_levels()
            this.dispatch('approval_levels')

        }).catch((error) => {
            if (error.response.status === 401) {
                commit('log_out')
                router.push('/dashboard')
            }
        })
    },
    remove_user({ commit, state }) {
        let token = localStorage.getItem('token')
        let id = state.edit_user_infor
        axios.delete(`${baseURL}/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data.data
                this.dispatch('show_user', 1)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_checkout_history({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/checkouts?status=2&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data
                commit('set_checkout_history', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_checkout_approval({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/checkouts?status=1&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data
                commit('set_checkout_approval', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_checkout_level2({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/checkouts?status=0&role_id=1&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data
                commit('set_checkout_level2', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_checkout_level1({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/checkouts?status=0&role_id=2&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data
                commit('set_checkout_level1', data)
            }).catch((response) => {
                // return Promise.reject('siwkfji')
                return Promise.reject('000')
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })

        // return Promise.resolve('siwkfji')

    },
    put_checkout_review_pudate({ commit, state }, payload) {
        let token = localStorage.getItem('token')
        let status = payload.status
        let data = JSON.stringify({ review_status_id: status })
        axios.put(`${baseURL}/api/checkout-reviews/${payload.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                let data = response.data
                this.dispatch(`get_checkout_${payload.api}`, 1)
                    // commit('set_checkout_level1', data)

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    post_checkout({ commit, state }) {
        let token = localStorage.getItem('token')
        let id = state.checkout_approval.index
        axios.post(`${baseURL}/api/checkout/${id}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then((response) => {
                let data = response.data
                this.dispatch('get_checkout_approval')

            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    add_servies({ commit, state }, user_type) {
        let name = null;
        let type = null;
        let contact = null;
        let token = localStorage.getItem('token')
        if (user_type === 0) {
            name = state.add_vip_servies.name
            type = state.add_vip_servies.type
            contact = state.add_vip_servies.contact
        } else if (user_type === 1) {
            name = state.add_servies.name
            type = state.add_servies.type
            contact = state.add_servies.contact
        }
        let data = JSON.stringify({ type: type, name: name, contact: contact })
        console.log(data)
        axios.post(`${baseURL}/api/customer-services`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_Servies({ commit, state }) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/customer-services?type=1`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    },
    get_vipServies({ commit, state }) {
        let token = localStorage.getItem('token')
        axios.get(`${baseURL}/api/customer-services?type=0`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 401) {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
    }
}