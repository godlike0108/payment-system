<template>
    <div >
	<Row type="flex" justify="start" align="top">
		<Col :xs="12" :sm="12" :md="12" :lg="12" >
		<router-link to="/" tag="div" class="head_btn active">登入</router-link>
		</Col>
		<Col :xs="12" :sm="12" :md="12" :lg="12" >
		<router-link to="/sigup" tag="div"  class="head_btn">註冊</router-link>
		</Col>
	</Row>
	<div class="form_container login">
	<i-form >
		<form-item >
			<i-input type="text" :value="username" @input="updateUsername" placeholder="使用者帳號" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		<form-item prop="password">
			<i-input type="password" :value="password" @input="updatePassword" placeholder="使用者密碼" clearable>
				<icon type="locked" size="20" slot="prepend"></icon>
			</i-input>
			 
		</form-item>
		<form-item>
			<i-button class="loginButton" shape="circle" @click="login()">登入</i-button>
		</form-item>
		<router-link to="/find-password">
			<a href="" class="loginA">無法登入？</a>
            </router-link>
		<div v-show="getWrongLogin" class="worngLogin">
			帳號密碼錯誤!
		</div>
	</i-form>
	</div>
    </div>
   
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
	props : [''],
		data() {
			return {
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
                this.$store.commit('setLogin', {password})
            },
            updateUsername (username) {
                this.$store.commit('setLogin', {username})
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
		background-color: rgba(255, 255, 255, 1);
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
		width: 100%;
		padding: 13px ;
		color: #fff;
		background-image:linear-gradient(to bottom, #1883C3 0%, #013D7E 100%); 
	}
	.loginA {
		color: #2195C1;
		width: 108px;
		display: inline-block;
	}
    .login {
        padding: 48px 22px 50px 22px;
    }
	.head {
	width: 100%;
	height: 75px;
	background-image:linear-gradient(to bottom, #02BEF7 0%, #004A8B 100%)
	}
	.head img {
	margin: 24px 0
	}
	.head_btn{
		color: #fff;
		width: 100%;
		font-size: 16px;
		padding: 23px;
		cursor: pointer;
		background-image:linear-gradient(to bottom, #4498D2 0%, #154C83 100%)
	}
	.active{
		background-image:linear-gradient(to bottom, #1883C3 0%, #013D7E 100%)
	}
</style>