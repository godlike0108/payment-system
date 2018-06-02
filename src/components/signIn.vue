<template>

<Row  type="flex" justify="center" align="middle">

    <Col  :xs="20" :sm="10" :md="6" :lg="6" class="form_container login">
    
	<i-form ref="formInline" :model="formInline" :rules="ruleInline" >
		<form-item class="icon_group">
            <Row>
                <Col :xs="2" :sm="2" :md="2" :lg="2">
                    <router-link to="/">
                        <icon type="arrow-left-c" size="30"></icon>
                    </router-link>
                </Col>
                <Col  :xs="22" :sm="22" :md="22" :lg="22">
                    <h1 style="display: inline-block">wallet 帳戶申請</h1>
                </Col>
            </Row>
		</form-item>
		<form-item prop="user">
			<i-input  v-model="formInline.user" placeholder="使用者姓名" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		<form-item prop="email">
			<i-input  v-model="formInline.email" placeholder="使用者信箱" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" clearable>
				<icon type="email" size="20" slot="prepend"></icon>    
			</i-input>
		</form-item>
        <form-item prop="phone">
			<i-input  v-model="formInline.phone" placeholder="使用者手機" clearable>
			
                <Icon type="ios-telephone" size="20" slot="prepend"></Icon>
                
			</i-input>
		</form-item>
        <form-item v-show="formInline.phone.length === 10">
            <i-button>取得手機驗證碼</i-button>
        </form-item>
        <form-item v-show="formInline.phone.length === 10">
            <i-input class="phonePassword" v-model="formInline.password" placeholder="請填入驗證碼共四碼"  clearable></i-input>
        </form-item>
		<form-item  v-show="formInline.password.length === 4 || isSubmit === true">
			<i-button class="loginButton" @click="submit()">提出申請</i-button>
         
		</form-item>
	</i-form>
    <Row v-if="isSubmit">
        <Col class="loading">
            <Spin fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </Row>
    </Col>
    
</Row>

</template>

<script>
	export default {
	props : [''],
		data() {
			return {
                isSubmit: false,
				formItem: {
					username: '',
                    password: '',
                   
				},
				formInline: {
					user: '',
                    email: '',
                    phone: '',
                    password: ''
				},
				ruleInline: {
					user: [{
						required: true,
						message: '請填入姓名',
						trigger: 'blur'
					}],
					email: [{
							required: true,
							message: '請填入信箱',
							trigger: 'blur'
						}
                    ],
                    phone:[{
                        required: true,
						message: '請填入電話號碼',
						trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 10,
                        max:10,
                        message: '請填入手機號碼共10碼',
                        trigger: 'blur'
                    }]
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
            submit () {
                this.isSubmit = !this.isSubmit
            }  
		}
	}
</script>

<style scoped>
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
.form_container {
		/* padding: 15px 0px 15px 50px; */
		position: relative;
		z-index: 30;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
	}
    .loading {
        margin: 20px 0 50px 0
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
    .phonePassword {
        width: 100px
    }
    .login {
        padding: 20px
    }
</style>