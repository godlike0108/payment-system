<template>


 <div>

     <Row type="flex" justify="end" align="top" class="userLine">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Row type="flex" justify="end" align="top">
            <Col :xs="24" :sm="8" :md="8" :lg="6">用戶：<span class="user">{{this.$store.state.user.name}}</span></Col>
            <Col :xs="24" :sm="8" :md="8" :lg="6">剩餘金額：<span class="money">{{this.$store.state.user.balance}}</span></Col>
            </Row>
        </Col>

        </Row>
        <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="轉帳紀錄" name="name1" class="1">
                <Table height="500" :columns="columns1" :data="getTransition" ></Table>
                <Page :total="get_wallet_page_total" @on-change="change" style="margin:15px" ></Page>
            </TabPane>
            <TabPane label="轉帳" name="name2" class="2">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="16" :md="16" :lg="16">
                        <Form ref="formCustom" >
                            <FormItem label="轉出帳號" >
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
                            <Col v-if="this.$store.state.transition.status.noamount" >
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
    const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('請填入轉出帳號'));
            } else {
                
                callback();
            }
        };
    const validateAge = (rule, value, callback) => {
        if (!value || value <= 0) {
            return callback(new Error('轉出金額不能為空'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('請填入數字'));
            } else {
                    callback();
            }
        }, 1000);
    };
     return {
        isCollapsed: false,
        columns1: [
                    
                    {
                        title: '進/出帳',
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
                        key: 'amount',
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
  computed: {
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      },
     get_wallet_page_total(){
         return this.$store.getters.get_wallet_page_total
     },
      getTransition(){
          let username = ""
         return this.$store.getters.getTransition.map(item=>{
             if(item.type=== 1 ){
                item.type = '轉入'
                
             } else if (item.type===2) {
                 item.type = '轉出'
             };
             if(item.relative_user){
                 item.relative_username = item.relative_user.username
             } else {
                 item.relative_username = ""
             }

             if(item.created_at) {
                 item.created_at = this.$moment
                        .tz(item.created_at, 'Asia/Taipei')
                        .format('YYYY-MM-DD HH:mm:ss')
             }
                // console.log(item)
             
            //  item.updated_at = item.relative_user.updated_at
            // console.log("====")
            //  console.log(item.relative_user.username)
            //  console.log("====")
             return item
          })
      
  }
  },
   methods: {
       change(page){
        this.$store.dispatch('userGetwalletHistories',page)           
        },
       updateToUserName(to_username){
        //   this.$store.commit('non_existent_account', true)
          this.$store.commit('updateToUserName', to_username)
      },
      updateToAmount(amount){
             this.$store.commit('updateToAmount', amount)
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
    ...mapActions({
        // 'userTransactions' : 'userTransactions',
    })
    },
    created(){
        // this.$store.dispatch('userGetChekout')
        // this.$store.dispatch('userGetwalletHistories',1)
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
