<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
          <div class='layout-container'>
            <div class='layout-head'>
              出金申請
            </div>
            <div class='layout-body'>
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="22" :sm="16" :md="16" :lg="16">
                        <i-form  >
                          <div v-show='checkoutStep == 1'>
                            <form-item>
                                <Select ref='account' :placeholder="'選擇常用帳戶'" @on-change="selectAccount"  clearable>
                                    <Option v-for=" (item,index) in getMyAccount" :value="index" :key="item.account">{{ item.title }}</Option>
                                </Select>
                            </form-item>
                            <form-item>
                            <Select ref='wallet' :placeholder="'選擇錢包'" @on-change="setWallet"  clearable>
                                <Option v-for="(item,index) in getWallet" :value="index" :key="item.value" >{{ item.currency }}錢包</Option>
                            </Select>
                            </form-item>
                            <form-item v-if="isSelect">
                                餘額：{{getWallet[wIndex].balance}}
                            </form-item>
                            <form-item>
                                <i-input :value="this.$store.state.checkout.name"  @input="setCheckoutName" :placeholder=" '銀行帳戶名稱'"   clearable>
                                    <icon type="card" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>

                            <form-item >
                                <i-input :value="this.$store.state.checkout.amount" @input="setCheckout_amount" :placeholder=" '金額'"   clearable>
                                    <icon type="cash" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input :value="this.$store.state.checkout.bank" @input="setCheckoutBank" :placeholder="'銀行名稱'"    clearable>
                                    <icon type="card" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input :value="this.$store.state.checkout.bank_account"  @input="setCheckout_bank_account" :placeholder=" '銀行帳號'"  clearable >
                                  <icon type="card" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <!-- <i-button class="walletButton" shape="circle" @click="reset()" :disabled="validate">下一步</i-button> -->
                                <i-button class="walletButton" shape="circle" @click="checkoutStep=2;getUserSms()" :disabled="validate">下一步</i-button>
                            </form-item>
                          </div>
                          <div v-show='checkoutStep == 2'>
                            <div class='code-title'>
                              創建新用戶
                            </div>
                            <div class='code-content'>
                              手機驗證碼已發送至<br>
                              +{{$store.state.user.mobile}}<br>
                              請輸入驗證碼共五碼完成用戶申請<br>
                            </div>
                            <form-item>
                              <div class='passcode-container'>
                                <input ref='passcode' v-for='(code, index) in passcode' class='passcode' v-model='passcode[index]' @input='enterPasscoe(index)' maxlength=1/>
                              </div>
                                <i-input v-show='false' :value="this.$store.state.checkout.sms" @input="setCheckout_sms" class="phonePassword"  placeholder="請填入驗證碼共五碼"  clearable></i-input>
                            </form-item>

                            <form-item>
                                <!-- <i-button type="primary" class="walletButton" shape="circle"  @click="checkoutStep=3;" :disabled="!this.$store.state.checkout.sms || this.$store.state.checkout.sms.length != 5">送出申請</i-button> -->
                                <i-button type="primary" class="walletButton" shape="circle"  @click="checkoutStep=3;userCheckout()" >送出申請</i-button>
                            </form-item>
                            <form-item >
                              <div class="line-word">
                                <span>或</span>
                              </div>
                              <hr class='line' />
                            </form-item>
                            <form-item >
                                <i-button class="walletButton backButton"  shape="circle"  @click="checkoutStep=1">回上一步</i-button>
                            </form-item>
                          </div>
                          <div v-show='checkoutStep == 3'>
                            <img class='bigCheck' src='../../assets/bigCheck@3x.png' />
                            <div class='checkout-success-title'>完成出金申請</div>
                            <div class='checkout-success-content'>本頁面將在3秒內轉跳至登入頁面</div>
                            <div @click='reset' class="checkout-immediately ">立即轉跳</div>
                          </div>
                        </i-form>
                    </Col>
                </Row>
                <Row >
                    <Col v-if="this.$store.state.checkout.success">
                    <Icon type="checkmark-circled" class="success" size="20"></Icon>
                        <div class="success">出金申請成功</div>
                    </Col>
                </Row>
                <Row >
                    <Col v-if="this.$store.state.checkout.error">
                    <Icon type="close-circled" class="error" size="20"></Icon>
                        <div class="error">申請資料有誤，請輸入正確資料</div>
                    </Col>
                </Row>
                <Row >
                    <Col v-if="Insufficient_balance">
                    <Icon type="close-circled" class="error" size="20"></Icon>
                        <div class="error">錢包餘額不足</div>
                    </Col>
                </Row>
              </div>
            </div>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'Checkout',
  data () {
     return {
        checkoutStep: 1,
        passcode: ['', '', '', '', ''],
        psaacodeFocus: '0',
        Insufficient_balance: false,
        wIndex: 0,
        isSelect:false,
        currency:['USD','TWD','CNY','HKD','JPY','KRW'],
        columns1: [
                    {
                        title: '銀行用戶名稱',
                        key: 'name',
                        minWidth:120
                    },
                    {
                        title: '銀行名稱',
                        key: 'bank',
                        minWidth:100
                    },
                    {
                        title: '銀行帳號',
                        key: 'bank_account',
                        minWidth:100
                    },
                    {
                        title: '出金金額',
                        key: 'amount',
                        minWidth:100
                    },
                    {
                        title: '貨幣',
                        key: 'wallet_currency',
                        minWidth:110,
                        render: (h, params)=>{
                          var _vm = this;
                          return h('div', params.row.wallet_currency + ' ' + _vm.$store.state.currency[params.row.wallet_currency])
                        }
                    },
                    {
                        title: '處理狀態',
                        key: 'checkout_status_id',
                        minWidth:100
                    },
                    {
                        title: '最後更新時間',
                        key: 'updated_at',
                        minWidth:150
                    }
                ]
    };
  },
  mounted: function(){
    if(!this.$store.state.user.privileges.find(item => item.operation == 'checkout').isEnable){
      this.$Message.error('使用者不允許進入此頁面')
      this.$router.push('/index')
    }
    this.$refs.passcode[0].focus()
  },
  computed: {
      ...mapState({
          walletIndex:state => state.checkout.walletIndex
      }),
      validate(){
        return (
          !this.$store.state.checkout.name ||
          !this.$store.state.checkout.amount ||
          !this.$store.state.checkout.bank ||
          !this.$store.state.checkout.bank_account
        )
      },
      getCheckout: function(){
          let data = this.$store.getters.getCheckout.data
         return data.map(item=>{

             switch(item.checkout_status_id){
                 case 0 :
                 item.checkout_status_id = '審核中'
                 break;
                 case -1 :
                 item.checkout_status_id = '拒絕'
                 break;
                 case 1 :
                 item.checkout_status_id = '撥款中'
                 break;
                 case 2 :
                 item.checkout_status_id = '已撥款'
                 break;
             }

             if (item.created_at){
               item.created_at = this.$moment(item.created_at+' +0000')
               .format('YYYY-MM-DD HH:mm:ss')
             }
             if(item.amount){
                let num = new Number(item.amount);
                let amount = num.toFixed(2)
                item.amount = amount
             }
             return item
          })
      },
      get_checkout_total(){
          return this.$store.getters.getCheckout.page_total
      },
      getMyAccount(){
          return this.$store.getters.getMyAccount.data
      },
      getWallet(){
          let data = this.$store.getters.getAllWallet
          data.map(item=>{
              if(item.balance){
                  let num = new Number(item.balance)
                  let balance = num.toFixed(2)
                  item.balance = balance
              }
              return item
          })
          return data
      }
  },
  methods: {
        ...mapActions({
          'getUserSms' : 'getUserSms',
          'userCheckout':'userCheckout'
        }),
        reset(){
          this.setCheckoutName('')
          this.setCheckout_amount('')
          this.setCheckoutBank('')
          this.setCheckout_bank_account('')
          this.setCheckout_sms('')
          this.checkoutStep = 1
          this.passcode = ['', '', '', '', '']
          this.psaacodeFocus = '0'
          this.Insufficient_balance = false
          this.wIndex = 0
          this.isSelect = false
          this.$refs.account.clearSingleSelect()
          this.$refs.wallet.clearSingleSelect()
        },
        enterPasscoe(i){
          this.setCheckout_sms(this.passcode.join(''))
          if(i==4) return;
          this.psaacodeFocus = (i+1)
          this.passcode[this.psaacodeFocus] = ''
          this.$refs.passcode[this.psaacodeFocus].focus()
        },
        setCheckoutName(name){
            this.$store.commit('setCheckout',{name})
        },
        setCheckoutBank(bank){
            this.$store.commit('setCheckout',{bank})
        },
        setCheckout_bank_account(account){
            this.$store.commit('setCheckout',{account})
        },
        setCheckout_amount(amount){
            let walletIndex = this.walletIndex
            let balance
            if(walletIndex === 0 || walletIndex){
                balance =  this.$store.state.user.wallet[walletIndex].balance
                if(balance - amount < 0){
                    this.Insufficient_balance = true
                }else {
                    this.Insufficient_balance = false
                    this.$store.commit('setCheckout',{amount})
                }
            }else{
                this.$store.commit('setCheckout',{amount})
            }

        },
        setCheckout_sms(sms){
            this.$store.commit('setCheckout',{sms})
        },
        setWallet(index){
            this.wIndex = index
            this.isSelect = true
            this.$store.commit('setCheckout',{index})
        },
        change(page){
        this.$store.dispatch('userGetChekout',page)
        },
        selectAccount(index){
            this.$store.commit('selectAccount',index)
        },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 2em
}
.success {
		color: #19be6b;
		font-size: 1.2em
	}
.error {
		color:#ed3f14;
		font-size:1.2em
	}
.user {
  font-size: 2em
}
.title {
  color: #fff;
  font-size: 2em;
  font-weight: 600
}
.userLine {
  margin: 10px 0 20px 0
}
.phonePassword {
        width: 150px
    }
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        min-height: 100vh
    }
    .container {
      min-height:100vh
    }
    .layout-header-bar{
        background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
     .walletButton {
		width: 220px;
		height: 38px;
		color: #fff;
		/* background-color: rgb(238, 238, 238); */
		background-image:linear-gradient(to bottom, #2c91ac 0%, #155d78 100%);
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
    width: 20%;
    margin-bottom: 20px;
  }
  .checkout-success-title{
    font-size: 30px;
    margin-bottom: 16px;
    color: rgb(74, 74, 74);
  }
  .checkout-success-content{
    font-size: 14px;
    margin-bottom: 20px;
    color: rgb(74, 74, 74);
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
  .checkout-immediately{
    font-size: 14px;
    color: rgb(70, 154, 212);
    cursor: pointer;
  }
</style>
