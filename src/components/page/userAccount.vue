<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
          <div class='layout-container'>
            <div class='layout-head'>
              常用帳戶管理
            </div>
            <div class='layout-body'>
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="24" :md="24" :lg="24">
                    <Table height="450" :columns="columns1" :data="getMyAccount"></Table>
                    <Page :total="get_account_total" @on-change="change" style="margin:15px"></Page>

                    <!-- <ul class="account_list">
                        <li class="head">
                            <Row>
                                <Col :xs="4" :sm="4" :md="4" :lg="4" >常用名稱</Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4" >銀行帳戶名稱</Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4"><span class="currency">銀行名稱</span></Col>
                                <Col :xs="8" :sm="8" :md="8" :lg="8">銀行帳號</Col>
                                 <Col :xs="4" :sm="4" :md="4" :lg="4">修改/刪除</Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in getMyAccount">
                            <Row>
                                <Col :xs="4" :sm="4" :md="4" :lg="4" >{{item.title}}</Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4" >{{item.name}}</Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4">
                                    <span class="currency">{{item.bank}}</span>
                                </Col>
                                <Col :xs="8" :sm="8" :md="8" :lg="8">
                                    <span class="currency">{{item.account}}</span>
                                </Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4">
                                    <Button type="primary"  size="small"  @click="edit_account(index)" >修改</Button>
                                    <Button type="primary" class="delete"  size="small"  @click="remove(index)">刪除</Button>
                                </Col>
                            </Row>
                        </li>
                    </ul> -->
                    <Button type="primary" class="walletButton"  shape="circle" @click="addAccount()">新增常用銀行帳戶</Button>
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
        columns1: [{
                        title: '常用名稱',
                        key: 'title',
                        minWidth:100
                    },
                    {
                        title: '銀行用戶名稱',
                        key: 'name',
                        minWidth:100
                    },
                    {
                        title: '銀行名稱',
                        key: 'bank',
                        minWidth:100
                    },
                    {
                        title: '銀行帳號',
                        key: 'account',
                        minWidth:100
                    },
                    {
                        title: '修改/刪除',
                        minWidth:140,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'

                                    },
                                    style: {
                                        marginRight: '15px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit_account(params.index)
                                        }
                                    }
                                }, '修改'), h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'

                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '刪除')

                            ]);
                        }
                    },


                ]
    }
  },
  computed: {
      getMyAccount(){
          return this.$store.getters.getMyAccount.data
      },
      get_account_total(){
          return this.$store.getters.getMyAccount.page_total
      }
  },
  methods: {
       addAccount () {
        let _vm = this
        this.$Modal.confirm({
            title: `新增常用帳戶`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.post_add_account()
            },
            onCancel:()=>{
                _vm.$store.commit('reset_new_account')
                },
            render: (h) => {
                return h('div',
                {
                style: {
                        marginTop: '15px'
                    },
                },
                [h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '設定此筆名稱'
                    },
                    on: {
                        input: (title) => {
                        if(title.length === 0){
                            this.$store.state.mybank_account.new_account.title = null
                        }else {
                            this.$store.commit('set_account',{title:title})
                        }



                        }
                    },

                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '填寫銀行帳戶名稱'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (name) => {
                            if(name.length === 0){
                            this.$store.state.mybank_account.new_account.name = null
                        }else {
                        this.$store.commit('set_account',{name:name})
                        }
                        }
                    },

                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '填寫銀行名稱'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (bank) => {
                        if(bank.length === 0){
                            this.$store.state.mybank_account.new_account.bank = null
                        }else {
                        this.$store.commit('set_account',{bank:bank})
                        }
                        }
                    },

                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '填寫銀行帳號'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (account) => {
                        if(account.length === 0){
                            this.$store.state.mybank_account.new_account.account = null
                        }else {
                        this.$store.commit('set_account',{account:account})
                        }
                        }
                    },

                })
                ])
            }
        })
    },
     edit_account (index) {
        let _vm = this
        this.$Modal.confirm({
            title: `修改常用帳戶`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.put_edit_account(index)
            },
            onCancel:()=>{
                _vm.$store.commit('reset_edit_account')
                },
            render: (h) => {
                return h('div',
                {
                style: {
                        marginTop: '15px'
                    },
                },
                [h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '修改資料名稱'
                    },
                    on: {
                        input: (edit_title) => {
                        if(edit_title.length === 0){
                            this.$store.state.mybank_account.edit_account.title = null
                        } else {
                            this.$store.commit('set_account',{edit_title})
                        }
                        }
                    },

                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '修改銀行帳戶名稱'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (edit_name) => {
                        if(edit_name.length === 0){
                            this.$store.state.mybank_account.edit_account.name = null
                        }else {
                            this.$store.commit('set_account',{edit_name})
                        }

                        }
                    },

                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '修改銀行名稱'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (edit_bank) => {
                        if(edit_bank.length === 0){
                            this.$store.state.mybank_account.edit_account.bank = null
                        }else {
                            this.$store.commit('set_account',{edit_bank})
                        }

                        }
                    },

                })
                ,h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '修改銀行帳號'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (edit_account) => {
                        if(edit_account.length === 0){
                            this.$store.state.mybank_account.edit_account.account = null
                        }else {
                            this.$store.commit('set_account',{edit_account})
                        }
                        }
                    },

                })
                ])
            }
        })
    },
    remove(index){
        let _vm = this
        let mybank_account = this.$store.state.mybank_account.data
        this.$Modal.confirm({
        title: `刪除常用帳戶 `,
        content: `<p style="font-size:1.4em">確認刪除<h3>${mybank_account[index].title}</h3>這筆常用帳戶嗎？</p>`,
        onOk: () => {
            this.$Message.info('確認送出');
            _vm.$store.dispatch('remove_account',index)
            },
        })
    },
    post_add_account(){
        this.$store.dispatch('post_add_account')
    },
    put_edit_account(index){
       this.$store.dispatch('put_edit_account',index)

    },
    change(page){
        this.$store.dispatch('userGetChekout',page)
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
.delete{
    background: #ed3f14;
    border: 0px;
    line-height: 20px

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
    .account_list{
        list-style: none;
        margin: 20px 0;
        text-align: left;
    }
    .account_list li {
        border-bottom: 1px solid #ddd;
        padding: 10px 20px;
        font-size: 1.3em;
        background: #f5f5f5
    }
   .account_list .head{
        background-image:linear-gradient(to right, #2c91ac 0%, #155d78 100%);
       color: #fff;
       font-size: 0.8em;
       font-weight: 800
   }
</style>
