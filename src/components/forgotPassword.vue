<template>
    <div  class="form_container signIn">
	<i-form >
		<form-item class="icon_group">
            <Row>
                <Col :xs="2" :sm="2" :md="2" :lg="2">
                    <router-link to="/" @click.native="remove_findPassword">
                        <icon type="arrow-left-c" size="30"></icon>
                    </router-link>
                </Col>
                <Col  :xs="22" :sm="22" :md="22" :lg="22">
                    <h1 style="display: inline-block">忘記密碼</h1>
                </Col>
            </Row>
		</form-item>
        <form-item prop="phone">
			<i-input :value="mobile" @input="updateMobile"  placeholder="使用者手機"  clearable>
				<span slot="prepend">+886</span>
			</i-input>
		</form-item>
        <form-item >
            <i-input  :value="sms" class="phonePassword" @input="updateSms"  placeholder="請填入驗證碼共五碼"   clearable></i-input>
        </form-item>
		<form-item >
            <i-button class="walletButton" shape="circle" @click="getSms()">取得手機驗證碼</i-button>
        </form-item>
		<form-item v-show=" mobile.length >= 9 && sms.length === 5 ">
			<i-button  class="walletButton"  shape="circle" @click="put_findPassword()">提出申請</i-button>

		</form-item>
	</i-form>
    <Row >
        <Col v-if="status_mobile">
		<Icon type="close-circled" class="error" size="20"></Icon>
			<div class="error">手機格式錯誤</div>
		</Col>
		<Col v-if="status_sms">
		<Icon type="close-circled" class="error" size="20"></Icon>
			<div class="error">簡訊驗證碼錯誤</div>
		</Col>
		<Col v-if="find_password_success">
		<Icon type="checkmark-circled" class="success" size="20"></Icon>
			<div class="success">申請成功</div>
		</Col>
    </Row>
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
					mobile: state => state.findPassword.mobile,
					sms : state => state.findPassword.sms,
					status_mobile: state => state.findPassword.status.wrong_mobile,
					status_sms: state => state.findPassword.status.wrong_sms,
					find_password_success: state => state.findPassword.status.success,					
					
				}),
			
        },
		methods:{
			...mapActions({
            'getSms' : 'getSms',
            'put_findPassword':'put_findPassword'
            }),
            remove_findPassword(){
                this.$store.commit('remove_findPassword')
            },
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
				this.$store.commit('updateName', name)
			},
			updateEmail(email){
				this.$store.commit('updateEmail', email)
			},
			updateMobile(mobile){
				this.$store.commit('update_findpassword_mobile', mobile)
			},
			updateSms(sms){
				this.$store.commit('update_findpassword_sms', sms)
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
	.walletButton {
		width: 220px;
		height: 38px;
		color: #fff;
		/* background-color: rgb(238, 238, 238); */
		background-image:linear-gradient(to bottom, #2c91ac 0%, #155d78 100%); 
	}
</style>