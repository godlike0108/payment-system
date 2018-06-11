import axios from 'axios'
import router from '@/router'
import { isNull } from 'util'
import { resolve } from 'path'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
export default {
    state: {
        user_list: {
            data: [],
            page_total: null
        },
        user_review_list: {
            data: [],
            page_total: null
        },
        user_review_id: null,
        user_review_id_index: null,
        reset_administrator: {
            username: null,
            password: null,
            administrator_id: null,
            nopassword: null
        },
        reset_user: {
            username: null,
            password: null,
            user_id: null,
            nopassword: null,
            phone: null,
            email: null
        },
        edit_user_infor: null,
        approval_levels_amount: null,
        new_approval_amount: null,
        checkout_history: {
            data: null,
            page_total: null
        },
        checkout_approval: {
            data: [],
            page_total: null,
            index: null,
            status: null
        },
        checkout_level2: {
            data: [],
            page_total: null,
            index: null,
            status: null

        },
        checkout_level1: {
            data: [],
            page_total: null,
            index: null,
            status: null
        }

    },
    getters: {
        get_user_list(state) {
            return state.user_list.data
        },
        get_user_list_page_total(state) {
            return state.user_list.page_total
        },
        get_user_review_list(state) {
            return state.user_review_list.data
        },
        get_user_review_list_page_total(state) {
            return state.user_review_list.page_total
        },
        get_approval_amount(state) {
            console.log(state.approval_levels_amount)
            return state.approval_levels_amount
        },
        get_checkout_history(state) {
            return state.checkout_history.data
        },
        get_checkout_history_page_total(state) {
            return state.checkout_history.page_total
        },
        get_checkout_approval(state) {
            return state.checkout_approval.data
        },
        get_checkout_approval_page_total(state) {
            return state.checkout_approval.page_total
        },
        get_checkout_level2(state) {
            return state.checkout_level2.data
        },
        get_checkout_level2_page_total(state) {
            return state.checkout_level2.page_total
        },
        get_checkout_level1(state) {
            return state.checkout_level1.data
        },
        get_checkout_level1_page_total(state) {
            return state.checkout_level1.page_total
        }
    },
    mutations: {
        set_user_list(state, data) {
            state.user_list.data = data.data
            state.user_list.page_total = data.last_page * 10
            console.log(state.user_list.page_total)
        },
        set_user_review(state, data) {
            state.user_review_list.data = data.data
            state.user_review_list.page_total = data.last_page * 10

            // console.log(state.user_review_list)
        },
        set_user_review_id(state, data) {
            console.log(data)
        },
        set_approval_amount(state, data) {
            state.approval_levels_amount = data
        },
        update_new_approval_amount(state, amount) {
            state.new_approval_amount = amount

        },
        set_user_infor_index(state, index) {
            state.edit_user_infor = state.user_list[index].id
            console.log(state.edit_user_infor)
        },
        set_checkout_level1_index(state, index) {
            var checkout_reviews = state.checkout_level1.data[index].checkout_reviews;
            var checkoutReviewID = null;
            for (var i = 0; i < checkout_reviews.length; i++) {
                var checkoutReview = checkout_reviews[i];
                if (checkoutReview.role_id == 2) {
                    checkoutReviewID = checkoutReview.id;
                }
            }
            // console.log("-----" + checkoutReviewID + "-----");
            // console.log(checkout_reviews)
            state.checkout_level1.index = checkoutReviewID
            console.log("-----" + state.checkout_level1.index + "-----")

        },
        set_checkout_level1_status(state, status) {
            state.checkout_level1.status = status
            console.log(status)
        },
        set_checkout_level1(state, data) {
            state.checkout_level1.data = data.data
            state.checkout_level1.page_total = data.last_page * 10
                // console.log(state.checkout_level1.data)
        },
        set_checkout_level2_index(state, index) {
            var checkout_reviews = state.checkout_level2.data[index].checkout_reviews;
            var checkoutReviewID = null;
            for (var i = 0; i < checkout_reviews.length; i++) {
                var checkoutReview = checkout_reviews[i];
                if (checkoutReview.role_id == 1) {
                    checkoutReviewID = checkoutReview.id;
                }
            }
            // console.log("-----" + checkoutReviewID + "-----");
            // console.log(checkout_reviews)
            state.checkout_level2.index = checkoutReviewID
            console.log("-----" + state.checkout_level2.index + "-----")

        },
        set_checkout_level2_status(state, status) {
            state.checkout_level2.status = status
            console.log(status)
        },
        set_checkout_level2(state, data) {
            state.checkout_level2.data = data.data
            state.checkout_level2.page_total = data.last_page * 10
                // console.log(state.checkout_level2.data)
        },
        set_checkout_approval(state, data) {
            state.checkout_approval.data = data.data
            state.checkout_approval.page_total = data.last_page * 10
            console.log(state.checkout_approval)
        },
        set_checkout_approval_index(state, index) {
            state.checkout_approval.index = state.checkout_approval.data[index].id
            console.log(state.checkout_approval.data[index])

        },
        set_checkout_approval_status(state, status) {
            state.checkout_approval.status = status
                // console.log(status)
        },
        set_checkout_history(state, data) {
            state.checkout_history.data = data.data
            state.checkout_history.page_total = data.last_page * 10
                // console.log(state.checkout_history.data)
                // console.log(state.checkout_history.page_total)

        },


    },
    actions: {
        userReview({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/users?status=pending&page=${payload}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((respone) => {
                let data = respone.data
                console.log(data)
                commit('set_user_review', data)
            }).catch((error) => {
                if (error.response.status = '401') {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
        },
        show_user({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/users?page=${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    let data = response.data
                    console.log(data)
                    commit('set_user_list', data)
                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        put_user_id({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let id = state.user_review_id_index
            let username = state.user_review_id
            console.log(id, username)
            let data = JSON.stringify({ username: username })
            axios.put(`${baseURL}/api/users/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    this.dispatch('userReview', 1)
                    console.log(response)
                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        put_administrator_id({ commit, state }, index) {
            let token = sessionStorage.getItem('token')
            let id = state.reset_administrator.administrator_id
            let password = state.reset_administrator.password
            let data = null
            data = JSON.stringify({ password: password })
            console.log(data, id)
            state.reset_administrator.nopassword = false
            axios.put(`${baseURL}/api/admins/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    console.log(response)
                    this.dispatch('admins')
                }).catch((error) => {
                    if (error.response.status = '401') {
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
            let token = sessionStorage.getItem('token')
            let id = state.reset_user.user_id
            let username = state.reset_user.username
            let email = state.reset_user.email
            let phone = state.reset_user.phone
            let password = state.reset_user.password
            let phoneRule = /^8869[0-9]{8}$/
            let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            let put_data = {}

            if (!phoneRule.test(phone) && emailRule.test(email)) {
                put_data = { email: email }
            } else if (phoneRule.test(phone) && !emailRule.test(email)) {
                put_data = { mobile: phone }
            } else if (phoneRule.test(phone) && emailRule.test(email)) {
                put_data = { mobile: phone, email: email }
            }
            if (password != null) {
                Object.assign(put_data, { password: password })
            }
            console.log(put_data, id)
            axios.put(`${baseURL}/api/users/${id}`, put_data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    this.dispatch('show_user', 1)
                    console.log(response)
                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        approval_levels({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/approval_levels/2`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                let data = response.data.amount
                    // console.log(data)
                commit('set_approval_amount', data)
            }).catch((error) => {
                if (error.response.status = '401') {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
        },
        update_approval_amount({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let amount = state.new_approval_amount
                // console.log(amount)
            let data = JSON.stringify({ amount: amount })
            axios.put(`${baseURL}/api/approval_levels/2`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                    // let data = response.data.amount
                    // this._actions.approval_levels()
                this.dispatch('approval_levels')

            }).catch((error) => {
                if (error.response.status = '401') {
                    commit('log_out')
                    router.push('/dashboard')
                }
            })
        },
        remove_user({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let id = state.edit_user_infor
            console.log(id)
            axios.delete(`${baseURL}/api/users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data.data
                        // console.log(data)
                    this.dispatch('show_user', 1)

                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        get_checkout_history({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?status=2&page=${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data
                        // console.log(data)
                    commit('set_checkout_history', data)

                }).catch((error) => {
                    if (staerror.response.statustus = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        get_checkout_approval({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?status=1&page=${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data
                        // console.log(data)
                    commit('set_checkout_approval', data)

                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        get_checkout_level2({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?status=0&role_id=1&page=${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data
                        // console.log(response)
                    commit('set_checkout_level2', data)

                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        get_checkout_level1({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?status=0&role_id=2&page=${payload}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data
                    console.log(data)
                    commit('set_checkout_level1', data)
                }).catch((response) => {
                    // return Promise.reject('siwkfji')
                    console.log(response)
                    return Promise.reject('000')
                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })

            // return Promise.resolve('siwkfji')

        },
        put_checkout_review_pudate({ commit, state }, payload) {
            let token = sessionStorage.getItem('token')
            let status = payload.status
            let data = JSON.stringify({ review_status_id: status })
            console.log(payload)
            axios.put(`${baseURL}/api/checkout-reviews/${payload.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data
                    console.log(response)
                    this.dispatch(`get_checkout_${payload.api}`, 1)
                        // commit('set_checkout_level1', data)

                }).catch((error) => {
                    if (error.response.status = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        },
        post_checkout({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let id = state.checkout_approval.index
            console.log(id)
            axios.post(`${baseURL}/api/checkout/${id}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'application/json',
                        // 'Accept': 'application/json',

                    }
                })
                .then((response) => {
                    let data = response.data
                    console.log(response)
                    this.dispatch('get_checkout_approval')
                        // this.dispatch(`get_checkout_${payload.api}`, 1)
                        //     // commit('set_checkout_level1', data)

                }).catch((error) => {
                    if (staerror.response.statustus = '401') {
                        commit('log_out')
                        router.push('/dashboard')
                    }
                })
        }
    }
};