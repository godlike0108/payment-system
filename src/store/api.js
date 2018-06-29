import axios from 'axios'
import router from '@/router'

let token = localStorage.getItem('token')

export default {
    sendAPI({ type, api, data }) {
        axios.create({
            baseURL: `http://wallet-staging.ap-northeast-1.elasticbeanstalk.com/api/${api}`,
            timeout: 60000,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        console.table(type, api, data)
    }
}