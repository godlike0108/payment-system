<template>
 <div>
     <Row type="flex" justify="end" align="top" class="userLine">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Row type="flex" justify="end" align="top">
            <Col :xs="24" :sm="8" :md="8" :lg="6">身份：<span class="user">{{this.$store.state.user.name}}{{this.$store.state.admin.user}}</span></Col>
            </Row>
        </Col>

        </Row>
        <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="註冊申請" name="name1">
                <Table height="500" :columns="columns1" :data="get_user_review_list"></Table>
            </TabPane>
        </Tabs>
         <Page :total="get_user_review_list_page_total" @on-change="change" style="margin:15px"></Page>
        </Col>
    </Row>
 </div>
</template>

<script>
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

        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('請填入數字'));
            } else {
                    callback();
            }
        }, 1000);
    };
     return {
        bank_account: '',
        username: '',
        columns1: [
                    {
                        title: '申請人',
                        key: 'name',
                        minWidth:100

                    },
                    {
                        title: 'email',
                        key: 'email',
                        minWidth:100

                    },
                    {
                        title: '手機',
                        key: 'mobile',
                        minWidth:100

                    },
                    {
                        title: '申請時間',
                        key: 'updated_at',
                        minWidth:100

                    },
                    {
                        title: '申請確認',
                        minWidth:100,
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
  computed: {
      get_user_review_list(){
          let data = this.$store.getters.get_user_review_list.data
          return data.map(item=>{
              if (item.updated_at){
                item.updated_at = this.$moment(item.created_at+' +0000')
                .format('YYYY-MM-DD HH:mm:ss')
             }
             return item
          })
      },
      get_user_review_list_page_total(){
          return this.$store.getters.get_user_review_list.page_total
      }
  },
   methods: {
       change(page){
            this.$store.dispatch('userReview',page)
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
             show (index) {

                let _vm = this
                this.$Modal.confirm({
                    onOk: () => {
                        if(this.username.length < 6){
                          this.$Message.error('用戶帳號必須為 6~12 位英文數字');
                        }else if(!(/[\d]{5}$/.test(this.bank_account))){
                          this.$Message.error('銀行帳號必須為 5 位數字');
                        }else{
                          this.$Message.info('確認送出');
                          _vm.put_user_id(index)
                        }

                    },
                    onCancel:()=>{
                    this.$store.state.admin.user_review_id = null
                },
                    render: (h) => {
                        return [
                          h('Input', {
                              props: {
                                  value: this.value,
                                  autofocus: true,
                                  placeholder: '用戶帳號 6~12位英文數字'
                              },
                              on: {
                                  input: (val) => {
                                  this.$store.state.admin.user_review_id = val
                                  this.username = val
                                  }
                              },

                          }),
                          h('Input', {
                              style: 'margin-top: 10px',
                              props: {
                                  // value: this.value,
                                  // autofocus: true,
                                  placeholder: '銀行帳號 5 位數字'
                              },
                              on: {
                                  input: (val) => {
                                  this.bank_account = val

                                  }
                              },

                          })
                        ]
                    }
                })
            },
           put_user_id(index){
            this.$store.state.admin.user_review_id_index = this.$store.state.admin.user_review_list.data[index].id
            this.$store.dispatch('put_user_id', {
              username: this.$store.state.admin.user_review_id,
              bank_account: this.bank_account,
            })
           }
        },
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
