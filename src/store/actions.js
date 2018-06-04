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
                console.log(balance)
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
        axios.post(`${baseURL}/api/users`, {
            name: state.updateProfile.name,
            username: state.updateProfile.username,
            password: state.updateProfile.password,
            email: state.user.email,
            mobile: state.user.mobile,
            role_id: state.user.role_id


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