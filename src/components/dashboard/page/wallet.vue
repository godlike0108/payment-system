<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="撥款" name="name1">
                 <Form ref="formCustom" >
                    <FormItem label="帳號" prop="passwd">
                        <Input :value="this.$store.state.transition.to_username" type="text"  @input="updateToUserName"></Input>
                    </FormItem>
                    
                    <FormItem label="金額" prop="age">
                        <Input :value="this.$store.state.transition.amount" type="text" @input="updateToAmount"  ></Input>
                        <div v-if="this.notNaN" style="text-align:left;color:#ed3f14" >請輸入數字</div>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" class="walletButton"  shape="circle" @click="adminTransactions()">送出</Button>
                    </FormItem>
                </Form>
                <Row >
                    <Col v-if="this.$store.state.transition.status.success" style="margin-left:80px">
                    <Icon type="checkmark-circled" class="success" size="20"></Icon>
                        <div class="success">轉帳成功</div>
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
     return {
        notNaN:null,
        columns1: [
                    {
                        title: '申請人',
                        key: 'name'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    },
                    {
                        title: '手機',
                        key: 'mobile'
                    },
                    {
                        title: '申請時間',
                        key: 'updated_at'
                    },
                    {
                        title: '申請確認',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '申請確認'),
                            ]);
                        }
                    }
                ],
    };
  },
   methods: {
       ...mapActions({
        'adminTransactions' : 'adminTransactions',
    }),
       updateToUserName(to_username){
          this.$store.commit('updateToUserName', to_username)
      },
      updateToAmount(amount){
          let r = /^[0-9]*[1-9][0-9]*$/
          if(r.test(amount) === false){
              this.notNaN = true
          }else{
          this.notNaN = false   
            if (amount === 0){

            } else {
            this.$store.commit('updateToAmount', amount)              
            }
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
        
        put_user_id(index){
        this.$store.state.admin.user_review_id_index = this.$store.state.admin.user_review_list[index].id
        this.$store.dispatch('put_user_id')  
        } 
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
