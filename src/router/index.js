import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import sigin from '@/components/signIn'
import store from '@/store'
import index from '@/components/page/index'
import userIndex from '@/components/page/userIndex'
import userProfile from '@/components/page/userProfile'
import transations from '@/components/page/transations'

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
                    path: 'transations',
                    name: 'transations',
                    component: transations,
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
    console.log('to=', to.fullPath, '| from=', from.fullPath);
    if (to.matched.some(record => {
            // console.log(record.name, record.meta.requiresAuth);
            return record.meta.requiresAuth;
        })) {
        // 如果沒有 token 
        // console.log('token?', token);
        if (token === '') {
            // 轉跳到 login page
            next({ path: '/' });
        } else {
            next(); // 往下繼續執行
        }
    } else {
        next(); // 往下繼續執行
    }

});