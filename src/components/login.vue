<template>
<Row  type="flex" justify="center" align="middle">
    
    <Col  :xs="20" :sm="10" :md="6" :lg="6" class="form_container login">
    
	<i-form ref="formInline"  :rules="ruleInline" >
		<form-item class="icon_group">
			<h1 >白金線上支付帳戶 登入</h1>
		</form-item>
		<form-item prop="user">
			<i-input type="text" :value="username" @input="updateUsername" placeholder="使用者帳號" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		<form-item prop="password">
			<i-input type="password" :value="password" @input="updatePassword" placeholder="使用者密碼" clearable>
				<icon type="locked" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		
		<form-item style="margin-bottom:4px;">
            <router-link to="/sigup">
			<a href="" class="loginA">申請帳號</a>
            </router-link>
		</form-item>
		<form-item>
			<i-button class="loginButton" @click="login()">登入</i-button>
		</form-item>
		<div v-show="getWrongLogin" class="worngLogin">
			帳號密碼錯誤!
		</div>
	</i-form>
    </Col>
</Row>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
	props : [''],
		data() {
			return {
				
				ruleInline: {
					// user: [{
					// 	required: true,
					// 	message: '請填入帳號',
					// 	trigger: 'blur'
					// }],
					// password: [{
					// 		required: true,
					// 		message: '請填入密碼',
					// 		trigger: 'blur'
					// 	},
					// 	{
					// 		type: 'string',
					// 		min: 6,
					// 		message: '密碼至少6位數',
					// 		trigger: 'blur'
					// 	}
					// ],
				}
			}
        },
        computed:{
             ...mapState({
                    password: state => state.user.password , 
                    username: state => state.user.username
				}),
			...mapGetters({
				getWrongLogin: 'getWrongLogin'
			})
        },
		methods:{
          ...mapActions({
            'login' : 'login'
            }),
            updatePassword (password) {
               
                this.$store.commit('updatePassword', password)
            },
            updateUsername (username) {
                this.$store.commit('updateUsername', username)
            }
		}
	}
</script>

<style scoped>

.worngLogin {
	color: red;
	font-size: 1.2em
}
.form_container {
		/* padding: 15px 0px 15px 50px; */
		position: relative;
		z-index: 30;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
	}
	.ivu-input {
		height: 36px;
	}

	.codeImg {
		width: 60px;
		height: 35px;
		margin: 0px;
		display: inline-block;
	}
	
	.loginButton {
		width: 220px;
		height: 38px;
		background-color: rgb(238, 238, 238);
        
	}
	
	.loginA {
		color: #888;
		width: 108px;
		display: inline-block;
	}
    .login {
        padding: 20px;
        margin-top: 100px
    }
</style>