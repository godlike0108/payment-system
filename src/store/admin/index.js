import axios from 'axios'
import router from '@/router'
import { isNull } from 'util';

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
        reset_user: {
            username: null,
            password: null,
            user_id: null
        },
        edit_user_infor: null,
        approval_levels_amount: null,
        new_approval_amount: null,
        checkout_history: null,
        checkout_approval: null

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
        },
        get_checkout_history(state) {
            return state.checkout_history
        },
        get_checkout_approval(state) {
            return state.checkout_approval
        }
    },
    mutations: {
        set_user_list(state, data) {
            state.user_list = data
                // console.log(state.user_list)
        },
        set_user_review(state, data) {
            state.user_review_list = data
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
        set_checkout_history(state, data) {
            state.checkout_history = data

        },
        set_checkout_approval(state, data) {
            state.checkout_approval = data

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
                        // console.log(response)
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
                    this.dispatch('userReview')
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
                    this.dispatch('admins')
                    console.log(response)
                })

        },
        update_user_id({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let id = state.reset_user.user_id
            let username = state.reset_user.username
            let password = state.reset_user.password
            console.log(id, username, password)
            let data = JSON.stringify({ username: username, password: password })
            axios.put(`${baseURL}/api/users/${id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    this.dispatch('show_user')
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
                    this.dispatch('show_user')

                })
        },
        get_checkout_history({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?checkout_status_id=2`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data.data
                        // console.log(data)
                    commit('set_checkout_history', data)

                })
        },
        get_checkout_approval({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?checkout_status_id=1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data.data
                    console.log(data)
                        // commit('set_checkout_approval', data)

                })
        },
        get_checkout_level2({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?role_id=1`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data.data
                    console.log(data)
                        // commit('set_checkout_approval', data)

                })
        },
        get_checkout_level1({ commit, state }) {
            let token = sessionStorage.getItem('token')
            axios.get(`${baseURL}/api/checkouts?role_id=2`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    let data = response.data.data
                    console.log(data)
                        // commit('set_checkout_approval', data)

                })
        }
    }
}