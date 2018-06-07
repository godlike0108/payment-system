<template>
 <div>
    
        <Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="出金申請" name="name1">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="20" :sm="16" :md="16" :lg="16">
                        <i-form ref="formInline" >
                            
                            <form-item>
                                <i-input  @input="setCheckoutName" :placeholder=" '銀行用戶名稱'"   clearable>
                                    <icon type="happy" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            
                            <form-item >
                                <i-input  @input="setCheckout_amount" :placeholder=" '填入出金金額'"   clearable>
                                    <icon type="cash" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input @input="setCheckoutBank" :placeholder="'銀行名稱'"    clearable>
                                    <icon type="card" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input  @input="setCheckout_bank_account" :placeholder=" '銀行帳號'"   > </i-input>
                            </form-item>
                            <form-item >
                                <i-button @click="getUserSms">取得手機驗證碼</i-button>
                                <i-input @input="setCheckout_sms" class="phonePassword"  placeholder="請填入驗證碼共五碼"  clearable></i-input>
                            </form-item>
                            
                            <form-item>
                                <i-button type="primary" @click="userCheckout" >送出申請</i-button>
                            </form-item>
                        </i-form>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="出金回報" name="name2">
            <Table height="400" :columns="columns1" :data="getCheckout"></Table>
            </TabPane>
            </Tabs>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
     return {
        isCollapsed: false,
        eyesIcon: 'eye-disabled',
        type: 'password',
        columns1: [
                    {
                        title: '銀行用戶名稱',
                        key: 'name'
                    },
                    {
                        title: '銀行名稱',
                        key: 'bank'
                    },
                    {
                        title: '銀行帳號',
                        key: 'bank_account'
                    },
                    {
                        title: '出金金額',
                        key: 'amount'
                    },
                    {
                        title: '處理狀態',
                        key: 'checkout_status_id'
                    }
                ],
        formInline: {
            user: '',
            amount: '',
            bank: '',
            bank_account: '',
            sms:''

        },
        
        ruleInline: {
            user: [{
                required: true,
                message: '請填入用戶姓名',
                trigger: 'blur'
            }],
            amount: [{
                required: true,
                message: '請填入金額',
                trigger: 'blur'
            }],
            bank: [{
                required: true,
                message: '請填入銀行名稱',
                trigger: 'blur'
            },
            // {
            //     type: 'number',
            //     min: 3,
            //     max:3,
            //     message: '請填入銀行代碼共3碼',
            //     trigger: 'blur'
            // }
            ],
            bank_account: [{
                required: true,
                message: '請填入銀行帳號',
                trigger: 'blur'
            },
            {
                type: 'number',
                min:11,
                max:14,
                message: '請填入銀行帳號共11~14碼',
                trigger: 'blur'
            }]
        }
    };
  },
  computed: {
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      },
      getCheckout: function(){
         return this.$store.getters.getCheckout.map(item=>{
             if (item.checkout_status_id === 0)
             {
                item.checkout_status_id = '審核中'

             } else if(item.checkout_status_id === -1)
             {
                item.checkout_status_id = '拒絕'

             } else if(item.checkout_status_id === 1)
             {
                item.checkout_status_id = '撥款中'

             }else if(item.checkout_status_id === 2)
             {
                item.checkout_status_id = '已撥款'
             }
            //  console.log(item)
              
             return item
          })
      }
  },
  methods: {
      ...mapActions({
            'getUserSms' : 'getUserSms',
            'userCheckout':'userCheckout'
            }),
        setCheckoutName(name){
            this.$store.commit('setCheckoutName',name)
        },
        setCheckoutBank(bank){
            this.$store.commit('setCheckoutBank',bank)
        },
        setCheckout_bank_account(bank_account){
            this.$store.commit('setCheckout_bank_account',bank_account)
        },
        setCheckout_amount(amount){
            this.$store.commit('setCheckout_amount',amount)
        },
        setCheckout_sms(sms){
            this.$store.commit('setCheckout_sms',sms)
        },
  },
  created(){
    this.$store.dispatch('userGetChekout')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 2em
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
</style>
