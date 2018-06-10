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
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="轉帳紀錄" name="name1">
                <Table height="500" :columns="columns1" :data="getTransition" ></Table>
                <Page :total="get_wallet_page_total" @on-change="change" style="margin:15px"></Page>
            </TabPane>
            <TabPane label="轉帳" name="name2">
                <Form ref="formCustom"  :label-width="80">
                    <FormItem label="轉出帳號" prop="passwd">
                        <Input type="text"  @input="updateToUserName"></Input>
                    </FormItem>
                    
                    <FormItem label="轉出金額" prop="age">
                        <Input type="text" @input="updateToAmount"  ></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formCustom');userTransactions()">送出</Button>
                        <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重新設定</Button>
                    </FormItem>
                </Form>
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
                        key: 'type'
                    },
                    {
                        title: '進/出帳號',
                        key: 'relative_username'
                    },
                    {
                        title: '金額',
                        key: 'amount'
                    }, 
                    {
                        title: '餘額',
                        key: 'wallet_balance'
                    },  
                    {
                        title: '時間',
                        key: 'updated_at'
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
         return this.$store.getters.getTransition.map(item=>{
             if(item.type=== 1 ){
                item.type = '轉入'
                
             } else if (item.type===2) {
                 item.type = '轉出'
             };
             item.relative_username = item.relative_user.username,
             item.updated_at = item.relative_user.updated_at
             return item
          })
      
  }
  },
   methods: {
       change(page){
        this.$store.dispatch('userGetwalletHistories',page)           
        //    console.log(page)
        },
       updateToUserName(to_username){
          this.$store.commit('updateToUserName', to_username)
        //   console.log(to_username)
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
    ...mapActions({
        'userTransactions' : 'userTransactions',
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
</style>
