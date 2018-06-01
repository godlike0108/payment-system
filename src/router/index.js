import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import sigin from '@/components/signIn'
import userPage from '@/components/page/userPage'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/sigin',
            name: 'login',
            component: sigin
        },
        {
            path: '/userPage',
            name: 'login',
            component: userPage
        }
    ]
})