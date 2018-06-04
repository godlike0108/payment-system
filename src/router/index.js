import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import sigin from '@/components/signIn'
import store from '@/store'
import index from '@/components/page/index'
import userIndex from '@/components/page/userIndex'
import userProfile from '@/components/page/userProfile'
import checkout from '@/components/page/checkout'
import firstlogin from '@/components/firstLogin'

import dashboard_login from '@/components/dashboard/login'
import dashboard_signin from '@/components/dashboard/signIn'
import dashboard_index from '@/components/dashboard/page/index'
import adminsProfile from '@/components/dashboard/page/adminsProfile'
import adminsCheckout from '@/components/dashboard/page/checkout'
import adminIndex from '@/components/dashboard/page/adminIndex'




Vue.use(Router)

const vueRouter = new Router({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            name: 'login',
            component: login,
            meta: { requiresAuth: false },
        },
        {
            path: '/sigin',
            name: 'sigin',
            component: sigin
        },
        {
            path: '/firstlogin',
            name: 'firstlogin',
            component: firstlogin
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: { requiresAuth: true },
            children: [{
                    path: '',
                    name: 'userIndex',
                    component: userIndex,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'userProfile',
                    name: 'userProfile',
                    component: userProfile,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'checkout',
                    name: 'checkout',
                    component: checkout,
                    meta: { requiresAuth: true },
                }
            ]
        },
        {
            path: '/dashboard',
            name: 'dashboard_login',
            component: dashboard_login,
            meta: { requiresAuth: false },
        },
        {
            path: '/dashboard/sigin',
            name: 'dashboard_signin',
            component: dashboard_signin
        },
        // {
        //     path: '/dashboard/firstlogin',
        //     name: 'firstlogin',
        //     component: firstlogin
        // },
        {
            path: '/dashboard/index',
            name: 'dashboard_index',
            component: dashboard_index,
            meta: { requiresAuth: true },
            children: [{
                    path: '',
                    name: 'dashboard_adminIndex',
                    component: adminIndex,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'adminsProfile',
                    name: 'dashboard_adminsProfile',
                    component: adminsProfile,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'checkout',
                    name: 'dashboard_checkout',
                    component: adminsCheckout,
                    meta: { requiresAuth: true },
                }
            ]
        },
        // { path: '/*', redirect: '/login' }
    ]
})



export default vueRouter
vueRouter.beforeEach((to, from, next) => {
    // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
    let token = sessionStorage.getItem('token')
    let role_id = sessionStorage.getItem('role_id')
    console.log('to=', to.fullPath, '| from=', from.fullPath);


    if (to.matched.some(record => {
            // console.log(record.name, record.meta.requiresAuth);
            return record.meta.requiresAuth;
        })) {

        if (token === null) {
            // 轉跳到 login page
            next({ path: '/' });
        } else if (role_id === '0') {
            next({ path: '/firstlogin' });
        } else {
            next(); // 往下繼續執行
        }
    } else {
        next(); // 往下繼續執行
    }

});