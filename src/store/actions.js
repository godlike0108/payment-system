import axios from 'axios'
import router from '@/router'

const baseURL = 'wallet.code4idea.com'

export default {
    login({ commit, state }) {
        console.log('login')
            // console.log(commit, state)
        console.log(state.user)
        axios.post(`http://${baseURL}/api/login`, {


                username: state.user.username,
                password: state.user.password

            })
            .then((response) => {
                commit('setToken', response.data)
                router.push('/index')
            }).catch(() => {
                console.log('帳號密碼錯誤')
            })
    }
}