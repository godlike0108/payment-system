import axios from 'axios'
import router from '@/router'
import { isNull } from 'util'
import actions from './actions'
import { resolve } from 'path'

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
        },
        add_vip_servies: {
            name: null,
            contact: null,
            type: 0,
            member: [],
            page_total: null
        },
        add_servies: {
            name: null,
            contact: null,
            type: 1,
            member: [],
            page_total: null

        },
        edit_servies: {
            name: null,
            contact: null,
            type: null,
            id: null
        }

    },
    getters: {
        get_user_list(state) {
            return state.user_list
        },
        get_user_review_list(state) {
            return state.user_review_list
        },
        get_approval_amount(state) {
            return state.approval_levels_amount
        },
        get_checkout_history(state) {
            return state.checkout_history
        },
        get_checkout_approval(state) {
            return state.checkout_approval
        },
        get_checkout_level2(state) {
            return state.checkout_level2
        },
        get_checkout_level1(state) {
            return state.checkout_level1
        },
        get_servies(state) {
            return state.add_servies.member
        },
        get_vipServies(state) {
            return state.add_vip_servies.member
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
        },
        reset_administrator_id(state) {
            state.reset_administrator.username = null
            state.reset_administrator.password = null

        },
        set_vipServies_name(state, val) {
            state.add_vip_servies.name = val
        },
        set_vipServies_contact(state, val) {
            state.add_vip_servies.contact = val
        },
        set_vipServies_infor(state, data) {
            state.add_vip_servies.member = data.data
            state.add_vip_servies.page_total = data.last_page
        },
        reset_vipServies(state) {
            state.add_vip_servies.contact = null
            state.add_vip_servies.name = null

        },
        set_servies_name(state, val) {
            state.add_servies.name = val
        },
        set_servies_contact(state, val) {
            state.add_servies.contact = val
        },
        set_servies_infor(state, data) {
            state.add_servies.member = data.data
            state.add_servies.page_total = data.last_page
        },
        reset_servies(state) {
            state.add_servies.contact = null
            state.add_servies.name = null
        },
        edit_servies_name(state, val) {
            state.edit_servies.name = val
        },
        edit_servies_contact(state, val) {
            state.edit_servies.contact = val
        },
        reset_edit_servies(state) {
            state.edit_servies.contact = null
            state.edit_servies.name = null
            state.edit_servies.type = null
            state.edit_servies.id = null
        },


    },
    actions
};