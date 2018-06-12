import axios from 'axios'
import router from '@/router'
import { isNull } from 'util'
import actions from './actions'
import { resolve } from 'path'

const baseURL = 'http://wallet-staging.ap-northeast-1.elasticbeanstalk.com'
export default {
    state: {
        user_list: {
            data: [],
            page_total: null
        },
        user_review_list: {
            data: [],
            page_total: null
        },
        user_review_id: null,
        user_review_id_index: null,
        reset_administrator: {
            username: null,
            password: null,
            administrator_id: null,
            nopassword: null
        },
        reset_user: {
            username: null,
            password: null,
            user_id: null,
            nopassword: null,
            phone: null,
            email: null
        },
        edit_user_infor: null,
        approval_levels_amount: null,
        new_approval_amount: null,
        checkout_history: {
            data: [],
            page_total: null
        },
        checkout_approval: {
            data: [],
            page_total: null,
            index: null,
            status: null
        },
        checkout_level2: {
            data: [],
            page_total: null,
            index: null,
            status: null

        },
        checkout_level1: {
            data: [],
            page_total: null,
            index: null,
            status: null
        }

    },
    getters: {
        get_user_list(state) {
            return state.user_list.data
        },
        get_user_list_page_total(state) {
            return state.user_list.page_total
        },
        get_user_review_list(state) {
            return state.user_review_list.data
        },
        get_user_review_list_page_total(state) {
            return state.user_review_list.page_total
        },
        get_approval_amount(state) {
            return state.approval_levels_amount
        },
        get_checkout_history(state) {
            return state.checkout_history.data
        },
        get_checkout_history_page_total(state) {
            return state.checkout_history.page_total
        },
        get_checkout_approval(state) {
            return state.checkout_approval.data
        },
        get_checkout_approval_page_total(state) {
            return state.checkout_approval.page_total
        },
        get_checkout_level2(state) {
            return state.checkout_level2.data
        },
        get_checkout_level2_page_total(state) {
            return state.checkout_level2.page_total
        },
        get_checkout_level1(state) {
            return state.checkout_level1.data
        },
        get_checkout_level1_page_total(state) {
            return state.checkout_level1.page_total
        }
    },
    mutations: {
        set_user_list(state, data) {
            state.user_list.data = data.data
            state.user_list.page_total = data.last_page * 10
        },
        set_user_review(state, data) {
            state.user_review_list.data = data.data
            state.user_review_list.page_total = data.last_page * 10

        },
        set_user_review_id(state, data) {},
        set_approval_amount(state, data) {
            state.approval_levels_amount = data

        },
        update_new_approval_amount(state, amount) {
            state.new_approval_amount = amount

        },
        set_user_infor_index(state, index) {
            state.edit_user_infor = state.user_list[index].id
        },
        set_checkout_level1_index(state, index) {
            var checkout_reviews = state.checkout_level1.data[index].checkout_reviews;
            var checkoutReviewID = null;
            for (var i = 0; i < checkout_reviews.length; i++) {
                var checkoutReview = checkout_reviews[i];
                if (checkoutReview.role_id == 2) {
                    checkoutReviewID = checkoutReview.id;
                }
            }
            state.checkout_level1.index = checkoutReviewID

        },
        set_checkout_level1_status(state, status) {
            state.checkout_level1.status = status
        },
        set_checkout_level1(state, data) {
            state.checkout_level1.data = data.data
            state.checkout_level1.page_total = data.last_page * 10
        },
        set_checkout_level2_index(state, index) {
            var checkout_reviews = state.checkout_level2.data[index].checkout_reviews;
            var checkoutReviewID = null;
            for (var i = 0; i < checkout_reviews.length; i++) {
                var checkoutReview = checkout_reviews[i];
                if (checkoutReview.role_id == 1) {
                    checkoutReviewID = checkoutReview.id;
                }
            }
            state.checkout_level2.index = checkoutReviewID

        },
        set_checkout_level2_status(state, status) {
            state.checkout_level2.status = status
        },
        set_checkout_level2(state, data) {
            state.checkout_level2.data = data.data
            state.checkout_level2.page_total = data.last_page * 10
        },
        set_checkout_approval(state, data) {
            state.checkout_approval.data = data.data
            state.checkout_approval.page_total = data.last_page * 10
        },
        set_checkout_approval_index(state, index) {
            state.checkout_approval.index = state.checkout_approval.data[index].id

        },
        set_checkout_approval_status(state, status) {
            state.checkout_approval.status = status
        },
        set_checkout_history(state, data) {
            state.checkout_history.data = data.data
            state.checkout_history.page_total = data.last_page * 10

        },
        reset_reset_user_id(state) {
            state.reset_user.phone = null
            state.reset_user.email = null
            state.reset_user.username = null
            state.reset_user.user_id = null
            state.reset_user.password = null
            console.log(state.reset_user)
        },
        reset_administrator_id(state) {
            state.reset_administrator.username = null
            state.reset_administrator.password = null
            console.log(state.reset_administrator)

        }


    },
    actions
};