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
    <div v-show='signinStep == 1'>
  		<form-item >
  			<i-input size="large" :value="name" @input="updateName" placeholder="使用者姓名">
  				<icon type="person" size="20" slot="prepend"></icon>
          <Icon v-show="validate(name, 'account')" type="checkmark-round" class="check-success" slot="append"></Icon>
  			</i-input>
  			<span v-if="needname" class="error">使用者姓名不能為空</span>
  		</form-item>
  		<form-item >
  			<i-input size="large" :value="email" @input="updateEmail" placeholder="使用者信箱" >
  				<icon type='email' size="20" slot="prepend"></icon>
          <Icon v-show="validate(email, 'email')" type="checkmark-round" class="check-success" slot="append"></Icon>
  			</i-input>
  			<span v-if="Notemail" class="error">email 格式錯誤</span>
  		</form-item>
      <form-item >
  			<i-input size="large" :value="mobile" @input="updateMobile"  placeholder="使用者手機" >
  				<span slot="prepend">+886</span>
          <Icon v-show="validate(mobile, 'mobile')" type="checkmark-round" class="check-success" slot="append"></Icon>
                  <!-- <Icon  type="ios-telephone" size="20" slot="prepend"></Icon> -->
  			</i-input>
  			<span v-if="NotMobil" class="error">手機格式錯誤</span>
  		</form-item>
      <form-item >
          <i-button class="walletButton"  shape="circle" @click="signinStep=2;getSms()" :disabled="!validate(mobile, 'mobile') || !validate(email, 'email') || !validate(name, 'account')">下一步</i-button>
      </form-item>
    </div>
    <div v-show='signinStep == 2'>
      <div class='code-title'>
        創建新用戶
      </div>
      <div class='code-content'>
        手機驗證碼已發送至<br>
        +886 {{mobile}}<br>
        請輸入驗證碼共五碼完成用戶申請<br>
      </div>
      <form-item >
        <div class='passcode-container'>
          <input ref='passcode' v-for='(code, index) in passcode' class='passcode' v-model='passcode[index]' @input='enterPasscoe(index)' maxlength=1/>
        </div>
          <i-input  v-show='false' :value="sms" class="phonePassword" @input="updateSms"  placeholder="請填入驗證碼共五碼"></i-input>
      </form-item>
      <form-item >
  			<i-button class="walletButton"  shape="circle"  @click="submitSignIn()" :disabled="sms.length != 5">提出</i-button>
  		</form-item>
      <form-item >
        <div class="line-word">
          <span>或</span>
        </div>
        <hr class='line' />
      </form-item>
      <form-item >
          <i-button class="walletButton backButton"  shape="circle"  @click="signinStep=1">回上一步</i-button>
      </form-item>
        <Row >
    		<Col v-if="status_mobile" >
    		<Icon type="close-circled" class="error" size="20"></Icon>
    			<div class="error">手機號碼或信箱已註冊</div>
    		</Col>
    		<Col v-if="status_sms">
    		<Icon type="close-circled" class="error" size="20"></Icon>
    			<div class="error">簡訊驗證碼錯誤</div>
    		</Col>

      </Row>
    </div>
    <div v-show='signinStep == 3'>
      <img class='bigCheck' src='../assets/bigCheck@3x.png' />
      <div class='signin-success-title'>用戶註冊完成</div>
      <div class='signin-success-content'>本頁面將在3秒內轉跳至登入頁面</div>
      <router-link to="/" tag="div" class="login-immediately ">立即登入</router-link>
    </div>



	</i-form>


	</div>
  </div>



</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
  name: 'signIn',
	props : [''],
		data() {
			return {
				isSubmit: false,
				needname:false,
				Notemail:false,
				NotMobil: false,
        signinStep: 1,
        passcode: ['', '', '', '', ''],
        psaacodeFocus: '0',
			}
		},
    mounted: function(){
      this.$refs.passcode[0].focus()
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
      enterPasscoe(i){
        this.updateSms(this.passcode.join(''))
        if(i==4) return;
        this.psaacodeFocus = (i+1)
        this.passcode[this.psaacodeFocus] = ''
        this.$refs.passcode[this.psaacodeFocus].focus()
      },
      validate(value, type){
        var re;
        switch(type){
          case 'email':
            re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            break;
          case 'account':
            re = /[\w]{3,}/g;
            break;
          case 'mobile':
            re = /^0?9[0-9]{8}$/;
            break;
        }
        return re.test(value)
      },
			submitSignIn(){
        this.$store.commit('success_signup');
        return

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
		},
    watch:{
      sign_success: function(success){
        if(success){
            this.signinStep = 3
        }
      }
    }
	}
</script>

<style lang="less" scoped>
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
  .backButton{
    background-image:linear-gradient(to bottom, #1883C3 0%, #013D7E 100%)!important;
    color: #fff!important;
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
  .check-success{
    color: rgb(126, 211, 33);
  }
  .line{
    height: 1px;
    border: 0;
    background-color: rgb(226, 225, 231);
  }
  .line-word{
    position: absolute;
    width: 100%;
    top: -15px;
  }
  .line-word span{
    color: rgb(155, 155, 155);
    width: 50px;
    display: inline-block;
    background-color: #fff;
  }
  .passcode{
    width: 35px;
    height: 45px;
    border-radius: 5px;
    margin: 0 5px;
    text-align: center;
    font-size: 24px;
    &:focus{
      outline: none;
    }
  }
  .code-title{
    font-size: 30px;
    margin-bottom: 10px;
  }
  .code-content{
    font-size: 14px;
    margin-bottom: 10px;
  }
  .bigCheck{
    width: 40%;
    margin-bottom: 20px;
  }
  .signin-success-title{
    font-size: 30px;
    margin-bottom: 16px;
    color: rgb(74, 74, 74);
  }
  .signin-success-content{
    font-size: 14px;
    margin-bottom: 20px;
    color: rgb(74, 74, 74);
  }
  .login-immediately{
    font-size: 14px;
    color: rgb(70, 154, 212);
    cursor: pointer;
  }

</style>
