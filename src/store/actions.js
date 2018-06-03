import axios from 'axios'
import router from '@/router'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'

export default {
    login({ commit, state }) {
        console.log('login')
            // console.log(commit, state)
        console.log(state.user)
        axios.post(`${baseURL}/api/login`, {


                username: state.user.username,
                password: state.user.password

            })
            .then((response) => {
                let data = response.data
                let token = response.data.api_token

                sessionStorage.setItem('data', data)
                sessionStorage.setItem('token', token)
                    // console.log(token)
                commit('setToken')
                router.push('/index')
            }).catch(() => {
                console.log('帳號密碼錯誤')
            })
    }
}