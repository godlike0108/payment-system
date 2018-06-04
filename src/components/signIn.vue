<template>

<Row  type="flex" justify="center" align="middle">

    <Col  :xs="20" :sm="10" :md="6" :lg="6" class="form_container signIn">
    
	<i-form ref="formInline"  :rules="ruleInline" >
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
			<i-input  :value="name" @input="updateName" placeholder="使用者姓名" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
		</form-item>
		<form-item prop="email">
			<i-input  :value="email" @input="updateEmail" placeholder="使用者信箱"  clearable>
				<icon type='email' size="20" slot="prepend"></icon>    
			</i-input>
			<span v-if="Notemail">email 格式錯誤</span>
		</form-item>
        <form-item prop="phone">
			<i-input  :value="mobile" @input="updateMobile"  placeholder="使用者手機"  clearable>
				<span slot="prepend">+886</span>
                <!-- <Icon  type="ios-telephone" size="20" slot="prepend"></Icon> -->
			</i-input>
			<span v-if="NotMobil">手機格式錯誤</span>
		</form-item>
        <form-item >
            <i-button @click="getSms()">取得手機驗證碼</i-button>
        </form-item>
        <form-item >
            <i-input  :value="sms" class="phonePassword" @input="updateSms"  placeholder="請填入驗證碼共五碼"   clearable></i-input>
        </form-item>
		<form-item  v-show=" name !='' && email != 'null' && mobile.length === 9 && sms.length === 5 ">
			<i-button class="loginButton" @click="submitSignIn()">提出申請</i-button>
         
		</form-item>
	</i-form>
    <Row >
		<Col v-if="status_mobile" >
		<Icon type="close-circled" class="error" size="20"></Icon>
			<div class="error">手機號碼已註冊</div>
		</Col>
		<Col v-if="status_sms">
		<Icon type="close-circled" class="error" size="20"></Icon>
			<div class="error">簡訊驗證碼錯誤</div>
		</Col>
		<Col v-if="sign_success">
		<Icon type="checkmark-circled" class="success" size="20"></Icon>
			<div class="success">註冊成功</div>
		</Col>
        <Col class="loading" v-if="isSubmit">
            <Spin fix >
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </Row>
    </Col>
    
</Row>

</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
	props : [''],
		data() {
			return {
				isSubmit: false,
				Notemail:false,
				NotMobil: false,
				ruleInline: {
					// user: [{
					// 	required: true,
					// 	message: '請填入姓名',
					// 	trigger: 'blur'
					// }],
					// email: [{
					// 		required: true,
					// 		message: '請填入信箱',
					// 		trigger: 'blur'
					// 	}
                    // ],
                    // phone:[{
                    //     required: true,
					// 	message: '請填入電話號碼',
					// 	trigger: 'blur'
                    // }
                    // ]
					
				}
			}
		},
		computed:{
             ...mapState({
                    name: state => state.signIn.name , 
					email: state => state.signIn.email,
					mobile: state => state.signIn.mobile,
					sms : state => state.signIn.sms,
					status_mobile: state => state.signup_status.phone_is_singup,
					status_sms: state => state.signup_status.wrong_sms,
					sign_success: state => state.signup_status.success,					
					
				}),
			
        },
		methods:{
			...mapActions({
			'getSms' : 'getSms',
			'submitSignIn':'submitSignIn'
			}),
			updateName(name){
				this.$store.commit('updateName', name)
			},
			updateEmail(email){
				
				  var reEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				//   console.log(email.match(reEmail))
				//   console.log(email)
				if(email.match(reEmail) === null){
					setTimeout(()=>{
						this.Notemail = true
					},1500)
					this.$store.commit('updateEmail', email.match(reEmail))
				  	
					
				}else{
					this.Notemail = false
					this.$store.commit('updateEmail', email)
					
				}

				
			},
			updateMobile(mobile){
				// if(mobile.length === 10){
				// 	let a = mobile.replace(/0/g, "886");
				// console.log(a)
				let reMobile09 = /^0[0-9]{9}$/
				let reMobile9 = /^9[0-9]{8}$/
				// console.log(mobile.match(reMobile09))
				// console.log(mobile.match(reMobile9))
				if (mobile.match(reMobile9) === null ){
						this.NotMobil = true
				}else {
					this.NotMobil = false
					this.$store.commit('updateMobile', mobile)
				}
			},
			updateSms(sms){
				
				this.$store.commit('updateSms', sms)
			},
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
        width: 140px
    }
    .signIn {
        padding: 20px;
        margin-top: 100px
    }
	.success {
		color: #19be6b;
		font-size: 1.2em
	}
	.error {
		color:#ed3f14;
		font-size:1.2em
	}
</style>