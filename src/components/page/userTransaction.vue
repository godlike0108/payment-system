<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
          <div class='layout-container'>
            <div class='layout-head'>
              轉帳
            </div>
            <div class='layout-body'>
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="16" :md="16" :lg="16">
                        <Form ref="formCustom" >
                            <form-item>
                            <Select :placeholder="'選擇錢包'" @on-change="setWallet"  clearable>
                                <Option v-for="(item,index) in getWallet" :value="index" :key="index" >{{ item.currency }}錢包</Option>
                            </Select>
                            </form-item>
                            <form-item v-if="isSelect">
                                餘額：{{getWallet[wIndex].balance}}
                            </form-item>
                            <FormItem label="帳戶號碼" >
                                <Input :value="this.$store.state.transition.to_username" type="text"  @input="updateToUserName"></Input>
                            </FormItem>

                            <FormItem label="轉出金額" >
                                <Input :value="this.$store.state.transition.amount" type="text" @input="updateToAmount"  ></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" class="walletButton" shape="circle" @click="userTransactions()">送出</Button>
                                <!-- <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重新設定</Button> -->
                            </FormItem>
                        </Form>
                        <Row >
                            <Col v-if="this.$store.state.transition.status.success" >
                            <Icon type="checkmark-circled" class="success" size="20"></Icon>
                                <div class="success">轉帳成功</div>
                            </Col>
                        </Row>
                        <Row >
                            <Col v-if="Insufficient_balance">
                            <Icon type="close-circled" class="error" size="20"></Icon>
                                <div class="error">錢包餘額不足</div>
                            </Col>
                        </Row>
                        <Row >
                            <Col v-if="this.$store.state.transition.status.nouserid" >
                            <Icon type="close-circled" class="error" size="20"></Icon>
                                <div class="error">沒有此用戶帳號</div>
                            </Col>
                        </Row>
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
  name: 'HelloWorld',
  data () {
     return {
        isCollapsed: false,
        Insufficient_balance: false,
        wIndex: 0,
        isSelect:false,
        columns1: [

                    {
                        title: '內容',
                        key: 'type',
                        minWidth:100
                    },
                    {
                        title: '進/出帳號',
                        key: 'relative_username',
                        minWidth:100
                    },
                    {
                        title: '金額',
                        key: 'relative_amount',
                        minWidth:100
                    },
                    {
                        title: '餘額',
                        key: 'wallet_balance',
                        minWidth:100
                    },
                    {
                        title: '時間',
                        key: 'created_at',
                        minWidth:100
                    }
                ]
    };
  },
  mounted(){
    if(!this.$store.state.user.privileges.find(item => item.operation == 'transfer').isEnable){
      this.$Message.error('使用者不允許進入此頁面')
      this.$router.push('/index')
    }
  },
  computed: {
      ...mapState({
          walletIndex:state => state.transition.walletIndex
      }),
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      },
    getBalance(){
        let data = this.$store.getters.getBalance
        var num = new Number(data);
        let balance = num.toFixed(2)
        return balance
    },
    getCurrentWallet(){
        let wallet = this.$store.getters.getCurrentWallet
        return wallet
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
    change(page){
        this.$store.dispatch('userGetwalletHistories',page)
    },
    updateToUserName(to_username){
        //   this.$store.commit('non_existent_account', true)
        to_username = this.$options.filters.account(to_username.replace(/-/g, ''))
        this.$store.commit('setTransition', {to_username})
    },
    updateToAmount(amount){
        let walletIndex = this.walletIndex
            let balance
            if(walletIndex === 0 || walletIndex){
                balance =  this.$store.state.user.wallet[walletIndex].balance
                if(balance - amount < 0){
                    this.Insufficient_balance = true
                }else {
                    this.Insufficient_balance = false
                    this.$store.commit('setTransition', {amount})
                }
            }else{
                this.$store.commit('setTransition', {amount})
            }

    },
    handleSubmit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    handleReset (name) {
        this.$refs[name].resetFields();
    },
    userTransactions(){
        this.$store.dispatch('userTransactions')
        this.$store.commit('removeTransactionsInput')

    },
    setWallet(index){
        this.wIndex = index
        this.isSelect = true
        this.$store.commit('setTransition',{index})
    },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 1.9em;
  padding: 0 3px
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
