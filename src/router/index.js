import Vue from 'vue'
import Router from 'vue-router'
import loading from '@/components/loading'
import sigup from '@/components/signIn'
import login from '@/components/login'
import store from '@/store'
import index from '@/components/page/index'
import userWallet from '@/components/page/userWallet'
import userProfile from '@/components/page/userProfile'
import userActive from '@/components/page/userActive'
import exchange from '@/components/page/exchange'
import userTransaction from '@/components/page/userTransaction'
import currentWallet from '@/components/page/currentWallet'
import customerService from '@/components/page/customerService'
import userAccount from '@/components/page/userAccount'
import checkout from '@/components/page/checkout'
import checkoutList from '@/components/page/checkoutList'
import checkIn from '@/components/page/checkIn'
import checkInList from '@/components/page/checkInList'
import firstlogin from '@/components/firstLogin'
import findPassword from '@/components/forgotPassword'


import dashboard_login from '@/components/dashboard/login'
import dashboard_signin from '@/components/dashboard/signIn'
import dashboard_index from '@/components/dashboard/page/index'

import signup_requests from '@/components/dashboard/page/signupRequests'
import admins from '@/components/dashboard/page/admins'
import members from '@/components/dashboard/page/members'
import exchangeRate from '@/components/dashboard/page/exchangeRate'
import activeUser from '@/components/dashboard/page/activeUser'
import groups from '@/components/dashboard/page/groups'
import signupRequests from '@/components/dashboard/page/signupRequests'
import checkoutsLevel1 from '@/components/dashboard/page/checkoutsLevel1'
import checkoutsLevel2 from '@/components/dashboard/page/checkoutsLevel2'
import checkoutsApproval from '@/components/dashboard/page/checkoutsApproval'
import adjustment from '@/components/dashboard/page/adjustment'
import checkInApplication from '@/components/dashboard/page/checkInApplication'
import checkInRetaliation from '@/components/dashboard/page/checkInRetaliation'
import distributions from '@/components/dashboard/page/distributions'
import wallet from '@/components/dashboard/page/wallet'
import walletHistories from '@/components/dashboard/page/walletHistories'
import setCustomService from '@/components/dashboard/page/setCustomService'

Vue.use(Router)

const vueRouter = new Router({
  mode: '',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'loading',
      component: loading,
      meta: { requiresAuth: false },
      children: [
        {
          path: '/',
          name: 'login',
          component: login
        },
        {
          path: '/sigup',
          name: 'sigup',
          component: sigup
        },
        {
          path: '/find-password',
          name: 'findPassword',
          component: findPassword
        },
        {
          path: '/firstlogin',
          name: 'firstlogin',
          component: firstlogin
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'userWallet',
          component: userWallet,
          meta: { requiresAuth: true }
        },
        {
          path: 'currentWallet',
          name: 'currentWallet',
          component: currentWallet,
          meta: { requiresAuth: true }
        },
        {
          path: 'transaction',
          name: 'userTransaction',
          component: userTransaction,
          meta: { requiresAuth: true }
        },
        {
          path: 'userProfile',
          name: 'userProfile',
          component: userProfile,
          meta: { requiresAuth: true }
        },
        {
          path: 'userActive',
          name: 'userActive',
          component: userActive,
          meta: { requiresAuth: true }
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: checkout,
          meta: { requiresAuth: true }
        },
        {
          path: 'checkoutList',
          name: 'checkoutList',
          component: checkoutList,
          meta: { requiresAuth: true }
        },
        {
          path: 'checkin',
          name: 'checkin',
          component: checkIn,
          meta: { requiresAuth: true }
        },
        {
          path: 'checkInList',
          name: 'checkInList',
          component: checkInList,
          meta: { requiresAuth: true }
        },
        {
          path: 'account',
          name: 'account',
          component: userAccount,
          meta: { requiresAuth: true }
        },
        {
          path: 'customerService',
          name: 'checkout',
          component: customerService,
          meta: { requiresAuth: true }
        },
        {
          path: 'exchange',
          name: 'exchange',
          component: exchange,
          meta: { requiresAuth: true }
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
    {
      path: '/dashboard/index',
      name: 'dashboard_index',
      component: dashboard_index,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'signup_requests',
          component: signup_requests,
          meta: { requiresAuth: true }
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
          path: 'exchangeRate',
          name: 'dashboard_exchangeRate',
          component: exchangeRate
        },
        {
          path: 'adjustment',
          name: 'dashboard_adjustment',
          component: adjustment
        },
        {
          path: 'activeUser',
          name: 'dashboard_activeUser',
          component: activeUser
        },
        {
          path: 'groups',
          name: 'dashboard_groups',
          component: groups
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
          path: 'checkInApplication',
          name: 'dashboard_checkInApplication',
          component: checkInApplication
        },
        {
          path: 'checkInRetaliation',
          name: 'dashboard_checkInRetaliation',
          component: checkInRetaliation
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
        {
          path: 'setCustomService',
          name: 'dashboard_setCustomService',
          component: setCustomService
        },
      ]
    },
  ]
})



export default vueRouter
vueRouter.beforeEach((to, from, next) => {
    // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
    let token = localStorage.getItem('token')
    let role_id = localStorage.getItem('role_id')
    let user_status_id = localStorage.getItem('user_status_id');
    if (to.fullPath === '/') {
        window.document.body.setAttribute("style", "background-image:linear-gradient(to right, #004a8b 0%,#02bef7 50%,#004a8b 100%); ");

        if (token) {
            next({ path: '/index/' });
        }
    }
    if (to.fullPath === '/dashboard') {
        window.document.body.setAttribute("style", "background-image:linear-gradient(to right, #004a8b 0%,#02bef7 50%,#004a8b 100%); ");

        if (token) {
            next({ path: '/dashboard/index' })
        }

    }
    if (to.matched.some(record => {
            return record.meta.requiresAuth;
        })) {
        if (to.fullPath === null) {
            if (from.fullPath === '/index' || from.fullPath === '/index/checkout' || from.fullPath === '/index/userProfile' || from.fullPath === '/index/userActive' || from.fullPath === '/index/wallet') {
                store.commit('setData')
                store.commit('reset_user_checkout')
                store.dispatch('userGetChekout', 1)
                store.dispatch('front_end_show_user')
                    // store.dispatch('userGetwalletHistories', 1)
                next()
            } else {
                store.dispatch('admins')
                store.dispatch('show_user', 1)
                    // store.dispatch('userGetwalletHistories', 1)
                store.dispatch('userReview', 1)
                store.dispatch('get_checkout_level1', 1)
                store.dispatch('get_checkout_level2', 1)
                store.dispatch('get_checkout_approval', 1)
                store.dispatch('get_checkout_history', 1)
                store.dispatch('approval_levels')
                store.dispatch('get_Servies', 1)
                store.dispatch('get_vipServies', 1)
                    // store.dispatch('getAlluser')
                next()
            }

        }
        if (to.fullPath === '/index/' || to.fullPath === '/index') {
            store.dispatch('userGetChekout', 1)
            store.dispatch('get_Servies', 1)
            store.dispatch('get_vipServies', 1)
            store.dispatch('front_end_show_user')
            if (store.state.current_wallet_index === -1) {
                next({ path: '/index/currentWallet' })
            } else {
                store.dispatch('userGetwalletHistories', 1)
                next()
            }

        }
        if (to.fullPath === '/index/transaction') {
            store.dispatch('front_end_show_user')
            store.dispatch('getNewestWallet')
        }
        if (from.fullPath === '/index/currentWallet' && to.fullPath === '/index/') {
            store.dispatch('front_end_show_user')
            if (store.state.current_wallet_index === -1) {
                next({ path: '/index/currentWallet' })
            }
        }
        if (from.fullPath === '/index/checkout' || from.fullPath === '/index/userProfile' || from.fullPath === '/index/userActive') {
            if (to.fullPath === '/index/') {
                store.dispatch('front_end_show_user')
            }
        }
        if (to.fullPath === '/index/checkout') {
            store.dispatch('get_account')
            store.dispatch('getNewestWallet')
            store.dispatch('userGetChekout', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/index/checkIn') {
            store.dispatch('getCheckIn', { page: 1, status: '' }).then(() => {
                next()
            })
        }
        if (to.fullPath === '/index/account') {
            store.dispatch('get_account', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/index/customerService') {
            store.dispatch('get_Servies', 1).then(() => {
                store.dispatch('get_vipServies', 1).then(() => {
                    next()
                })
            })

        }
        if (to.fullPath === '/dashboard/index' || to.fullPath === '/dashboard/index/') {
            store.commit('setData')
            store.dispatch('admins')
            store.dispatch('show_user', 1)
            store.dispatch('adminGetwalletHistories', 1)
            store.dispatch('userReview', 1)
            store.dispatch('get_checkout_level1', 1)
            store.dispatch('get_checkout_level2', 1)
            store.dispatch('get_checkout_approval', 1)
            store.dispatch('get_checkout_history', 1)
            store.dispatch('approval_levels')
            store.dispatch('get_Servies', 1)
            store.dispatch('get_vipServies', 1)
            next()
        }
        if (to.fullPath === '/dashboard/index/checkoutsLevel1') {
            store.dispatch('get_checkout_level1', 1).then(() => {
                next()
            }).catch(err => {
                next({ path: '/dashboard' })
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

        if (to.fullPath === '/dashboard/index/distributions') {
            store.dispatch('get_checkout_history', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/wallet') {
            store.dispatch('userReview', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/checkInApplication') {
            store.dispatch('getCheckIn', { page: 1, status: 0 }).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/checkInRetaliation') {
            store.dispatch('getCheckIn', { page: 1, status: '' }).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/walletHistories') {
            store.dispatch('adminGetwalletHistories', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/members') {
            store.dispatch('show_user', 1).then(() => {
                next()
            })
        }
        if (to.fullPath === '/dashboard/index/admins') {
            store.dispatch('approval_levels')
            store.dispatch('admins').then(() => {
                store.dispatch('admins').then(() => {
                    next()
                })
            })
        }
        if (to.fullPath === '/dashboard/index/setCustomService') {
            store.dispatch('get_vipServies', 1).then(() => {
                store.dispatch('get_Servies', 1)
                next()
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
