<template>
    <div>
		<Row type="flex" justify="start" align="top">
			<Col :xs="12" :sm="12" :md="12" :lg="12" >
			<router-link to="/" tag="div" class="head_btn ">登入</router-link>
			</Col>
			<Col :xs="12" :sm="12" :md="12" :lg="12" >
			<router-link to="/sigup" tag="div"  class="head_btn active">註冊</router-link>
			</Col>
		</Row>
	<div class="form_container signIn">
	<i-form >

		<form-item >
			<i-input  :value="name" @input="updateName" placeholder="使用者姓名" clearable>
				<icon type="person" size="20" slot="prepend"></icon>
			</i-input>
			<span v-if="needname" class="error">使用者姓名不能為空</span>
		</form-item>
		<form-item >
			<i-input  :value="email" @input="updateEmail" placeholder="使用者信箱"  clearable>
				<icon type='email' size="20" slot="prepend"></icon>
			</i-input>
			<span v-if="Notemail" class="error">email 格式錯誤</span>
		</form-item>
        <form-item >
			<i-input  :value="mobile" @input="updateMobile"  placeholder="使用者手機"  clearable>
				<span slot="prepend">+886</span>
                <!-- <Icon  type="ios-telephone" size="20" slot="prepend"></Icon> -->
			</i-input>
			<span v-if="NotMobil" class="error">手機格式錯誤</span>
		</form-item>

        <form-item >
            <i-input  :value="sms" class="phonePassword" @input="updateSms"  placeholder="請填入驗證碼共五碼"   clearable></i-input>
        </form-item>
		<form-item >
            <i-button class="walletButton"  shape="circle" @click="getSms()">取得手機驗證碼</i-button>
        </form-item>
		<form-item v-show=" name.length !=0  && mobile.length >= 9 && sms.length === 5 ">
			<i-button class="walletButton"  shape="circle"  @click="submitSignIn()">提出申請</i-button>

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
			<div class="success">註冊成功，審核通過將發送 email 通知</div>
		</Col>
        <Col class="loading" v-if="isSubmit">
            <Spin fix >
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </Row>
	</div>
    </div>



</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
	props : [''],
		data() {
			return {
				isSubmit: false,
				needname:false,
				Notemail:false,
				NotMobil: false,
			}
		},
		computed:{
             ...mapState({
                    name: state => state.signIn.name ,
					email: state => state.signIn.email,
					mobile: state => state.signIn.mobile,
					sms : state => state.signIn.sms,
					isemail: state => state.signIn.isemail,
					status_mobile: state => state.signup_status.phone_is_singup,
					status_sms: state => state.signup_status.wrong_sms,
					sign_success: state => state.signup_status.success,

				}),

        },
		methods:{
			...mapActions({
			'getSms' : 'getSms',
			}),
			submitSignIn(){
				let reEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
				let reMobile09 = /^09[0-9]{8}$/
				let reMobile9 = /^9[0-9]{8}$/
				let mobile = this.$store.state.signIn.mobile
				let email = this.$store.state.signIn.email
				let name = 	this.$store.state.signIn.name
				if (mobile.match(reMobile9) === null && mobile.match(reMobile09) === null ){
					this.NotMobil = true
					if(reEmail.test(email) === false){
					this.Notemail = true
					}
					if(name.length === 0){
						this.needname =true
					}
				}else{
					this.needname =false
					this.Notemail = false
					this.NotMobil = false
					this.$store.dispatch('submitSignIn')
				}

			},
			updateName(name){
				this.$store.commit('setSignUp', {name})
			},
			updateEmail(email){
				this.$store.commit('setSignUp', {email})
			},
			updateMobile(mobile){
				this.$store.commit('setSignUp', {mobile})
			},
			updateSms(sms){
				this.$store.commit('setSignUp', {sms})
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
		background-color: rgba(255, 255, 255, 1);

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
        padding: 48px 22px 50px 22px;
    }
	.success {
		color: #19be6b;
		font-size: 1.2em
	}
	.error {
		color:#ed3f14;
		font-size:1.2em
	}
	.walletButton {
		width: 100%;
		padding: 13px ;
		color: #fff;
		background-image:linear-gradient(to bottom, #1883C3 0%, #013D7E 100%);
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
