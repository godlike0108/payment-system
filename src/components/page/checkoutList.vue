<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="24" :md="24" :lg="20">
          <div class='layout-container'>
            <div class='layout-head'>
              出金記錄
            </div>
            <div class='layout-body'>
              <Table :columns="columns1" :data="getCheckout"></Table>
              <Page :total="get_checkout_total" @on-change="change" style="margin:15px"></Page>
            </div>
          </div>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'CheckoutList',
  data () {
     return {
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
  computed: {
      ...mapState({
          walletIndex:state => state.checkout.walletIndex
      }),
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
</style>
