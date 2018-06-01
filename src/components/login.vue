<template>
<Row  type="flex" justify="center" align="middle">
    <Col  :xs="20" :sm="10" :md="6" :lg="6" class="form_container login">
    
	<i-form ref="formInline" :model="formInline" :rules="ruleInline" >
		<form-item class="icon_group">
			<h1 >wallet 登入</h1>
		</form-item>
		<form-item prop="user">
			<i-input type="text" v-model="formInline.user" placeholder="使用者帳號" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		<form-item prop="password">
			<i-input type="password" v-model="formInline.password" placeholder="使用者密碼" clearable>
				<icon type="locked" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		
		<form-item style="margin-bottom:4px;">
            <router-link to="/sigin">
			<a href="" class="loginA">申請帳號</a>
            </router-link>
		</form-item>
		<form-item>
            <router-link to="/userPage">
			<i-button class="loginButton" >登录</i-button>
            </router-link>
		</form-item>
	</i-form>
    </Col>
</Row>
</template>

<script>
	export default {
	props : [''],
		data() {
			return {
				formItem: {
					username: '',
					password: '',
				},
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [{
						required: true,
						message: '請填入帳號',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '請填入密碼',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: '密碼至少6位數',
							trigger: 'blur'
						}
					],
					// code: [{
					// 		required: true,
					// 		message: 'Please fill in the code.',
					// 		trigger: 'blur'
					// 	},
					// 	{
					// 		type: 'string',
					// 		min: 4,
					// 		max: 4,
					// 		message: 'code must be 4',
					// 		trigger: 'blur'
					// 	}
					// ]
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
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
        padding: 20px
    }
</style>