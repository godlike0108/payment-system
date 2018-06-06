import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
export default {
    state: {
        user_list: null,
        user_review_list: null,
        user_review_id: null,
        user_review_id_index: null,
        reset_administrator: {
            username: null,
            password: null,
            administrator_id: null
        },
        approval_levels_amount: null,
        new_approval_amount: null
    },
    getters: {
        get_user_list(state) {
            return state.user_list
        },
        get_user_review_list(state) {
            return state.user_review_list
        },
        get_approval_amount(state) {
            console.log(state.approval_levels_amount)
            return state.approval_levels_amount
        }
    },
    mutations: {
        set_user_list(state, data) {
            state.user_list = data
                // console.log(state.user_list)
        },
        set_user_review(state, data) {
            state.user_review_list = data
            console.log(state.user_review_list)
        },
        set_user_review_id(state, data) {
            console.log(data)
        },
        set_approval_amount(state, data) {
            state.approval_levels_amount = data
        },
        update_new_approval_amount(state, amount) {
            state.new_approval_amount = amount
            console.log(state.new_approval_amount)

        }
    },
    actions: {
        userReview({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/users?status=pending`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((respone) => {
                let data = respone.data.data
                    // console.log(data)
                commit('set_user_review', data)
            })
        },
        show_user({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    let data = response.data.data
                        // console.log(data)

                    commit('set_user_list', data)
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
                    dispatch('userReview')
                    console.log(response)
                })
        },
        put_administrator_id({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let id = state.reset_administrator.administrator_id
            let username = state.reset_administrator.username
            let password = state.reset_administrator.password
            let data = JSON.stringify({ username: username, password: password })
            console.log(id, username, password)
            axios.put(`${baseURL}/api/admins/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    dispatch('admins')
                    console.log(response)
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
            })
        },
        update_approval_amount({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let amount = state.new_approval_amount
            console.log(amount)
            let data = JSON.stringify({ amount: amount })
            axios.put(`${baseURL}/api/approval_levels/2`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                // let data = response.data.amount
                console.log(response)
                dispatch('approval_levels')
            })
        },
    }
}