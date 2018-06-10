import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import sigup from '@/components/signIn'
import store from '@/store'
import index from '@/components/page/index'
import userIndex from '@/components/page/userIndex'
import userProfile from '@/components/page/userProfile'
import checkout from '@/components/page/checkout'
import firstlogin from '@/components/firstLogin'

import dashboard_login from '@/components/dashboard/login'
import dashboard_signin from '@/components/dashboard/signIn'
import dashboard_index from '@/components/dashboard/page/index'

import signup_requests from '@/components/dashboard/page/signupRequests'
import admins from '@/components/dashboard/page/admins'
import members from '@/components/dashboard/page/members'
import signupRequests from '@/components/dashboard/page/signupRequests'
import checkoutsLevel1 from '@/components/dashboard/page/checkoutsLevel1'
import checkoutsLevel2 from '@/components/dashboard/page/checkoutsLevel2'
import checkoutsApproval from '@/components/dashboard/page/checkoutsApproval'
import distributions from '@/components/dashboard/page/distributions'
import wallet from '@/components/dashboard/page/wallet'
import walletHistories from '@/components/dashboard/page/walletHistories'



Vue.use(Router)

const vueRouter = new Router({
    mode: '',
    base: __dirname,
    routes: [{
            path: '/',
            name: 'login',
            component: login,
            meta: { requiresAuth: false },
        },
        {
            path: '/sigup',
            name: 'sigup',
            component: sigup
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
                    name: 'signup_requests',
                    component: signup_requests,
                    meta: { requiresAuth: true },
                },
                {
                    path: 'admins',
                    name: 'dashboard_admins',
                    component: admins
                },
                {
                    path: 'members',
                    name: 'dashboard_members',
                    component: members
                },
                {
                    path: 'checkoutsLevel1',
                    name: 'dashboard_checkoutsLevel1',
                    component: checkoutsLevel1
                },
                {
                    path: 'checkoutsLevel2',
                    name: 'dashboard_checkoutsLevel2',
                    component: checkoutsLevel2
                },
                {
                    path: 'checkoutsApproval',
                    name: 'dashboard_checkoutsLevel1',
                    component: checkoutsApproval
                },
                {
                    path: 'distributions',
                    name: 'dashboard_distributions',
                    component: distributions
                },
                {
                    path: 'wallet',
                    name: 'dashboard_wallet',
                    component: wallet
                },
                {
                    path: 'walletHistories',
                    name: 'dashboard_walletHistories',
                    component: walletHistories
                },
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
    let user_status_id = sessionStorage.getItem('user_status_id');

    // console.log('to=', to.fullPath, '| from=', from.fullPath);
    // console.log(from, to)

    if (to.matched.some(record => {

            return record.meta.requiresAuth;
        })) {
        if (to.fullPath === null) {
            if (from.fullPath === '/index' || from.fullPath === '/index/checkout' || from.fullPath === '/iindex/userProfile') {
                store.commit('setData')
                store.dispatch('userGetChekout', 1)
                store.dispatch('userGetwalletHistories', 1)
                next()
            } else {
                store.dispatch('admins')
                store.dispatch('show_user')
                store.dispatch('userGetwalletHistories', 1)
                store.dispatch('userReview')
                store.dispatch('get_checkout_level1', 1)
                store.dispatch('get_checkout_level2', 1)
                store.dispatch('get_checkout_approval', 1)
                store.dispatch('get_checkout_history', 1)
                store.dispatch('approval_levels')
                store.dispatch('getAlluser')
                next()
            }

        }
        if (to.fullPath === '/index') {
            store.dispatch('userGetChekout', 1)
            store.dispatch('userGetwalletHistories', 1)

            next()
        }
        if (from.fullPath === '/index/checkout' || from.fullPath === '/index/userProfile') {
            if (to.fullPath === '/index/') {
                store.dispatch('show_user')
            }
        }
        if (to.fullPath === '/index/checkout') {
            store.dispatch('userGetChekout', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index') {
            // store.commit('setData')
            // actionB ({ dispatch, commit }) {
            //     return dispatch('actionA').then(() => {
            //       commit('someOtherMutation')
            //     })
            store.dispatch('admins')
            store.dispatch('show_user')
            store.dispatch('userGetwalletHistories', 1)
            store.dispatch('userReview')
            store.dispatch('get_checkout_level1', 1)
            store.dispatch('get_checkout_level2', 1)
            store.dispatch('get_checkout_approval', 1)
            store.dispatch('get_checkout_history', 1)
            store.dispatch('approval_levels')
            store.dispatch('getAlluser')
            next()
        }
        if (to.fullPath === '/dashboard/index/checkoutsLevel1') {
            store.dispatch('get_checkout_level1', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/checkoutsLevel2') {
            store.dispatch('get_checkout_level2', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/checkoutsApproval') {
            store.dispatch('get_checkout_approval', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/checkoutsApproval') {
            store.dispatch('get_checkout_history', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/wallet') {
            store.dispatch('userReview').then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/walletHistories') {
            store.dispatch('userGetwalletHistories', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/members') {
            store.dispatch('show_user').then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/admins') {
            store.dispatch('admins').then(() => {
                store.dispatch('admins').then(() => {
                    next()
                })
            })
        }
        if (token === null) {
            // 轉跳到 login page
            next({ path: '/' });
        } else if (user_status_id === '1') {
            next({ path: '/firstlogin' });
        } else {
            next(); // 往下繼續執行
        }
    } else {
        next(); // 往下繼續執行
    }

});