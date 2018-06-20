<template>
 <div>
    
        <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            
            <TabPane label="VIP" name="name1">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="20" :md="20" :lg="20">
                    <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="8" :sm="8" :md="8" :lg="8" >VIP客服人員名稱</Col>
                                <Col :xs="16" :sm="16" :md="16" :lg="16"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_vipServies">
                            <Row>
                                <Col :xs="8" :sm="8" :md="8" :lg="8" >{{item.name}}</Col>
                                <Col :xs="12" :sm="12" :md="12" :lg="12">
                                    <span class="currency">{{item.contact}}</span>
                                </Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4">
                                    <Button type="primary"  size="small"  @click="edit_servies({id:0,index:index})" >修改</Button>
                                    <Button type="primary" class="delete"  size="small"  @click="remove({id:0,index:index})">刪除</Button>
                                </Col>
                            </Row>
                        </li>
                    </ul>
                    <Button type="primary" class="walletButton"  shape="circle" @click="vipHandleRender(0)">新增 VIP 客服員</Button>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="客服" name="name2">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="20" :md="20" :lg="20">
                    <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="8" :sm="8" :md="8" :lg="8" >一般客服人員名稱</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_servies">
                            <Row>
                                <Col :xs="8" :sm="8" :md="8" :lg="8" >{{item.name}}</Col>
                                <Col :xs="12" :sm="12" :md="12" :lg="12"><span class="currency">{{item.contact}}</span></Col>
                                <Col :xs="4" :sm="4" :md="4" :lg="4">
                                    <Button type="primary"  size="small"  @click="edit_servies({id:1,index:index})" >修改</Button>
                                    <Button type="primary" class="delete"  size="small"  @click="remove({id:1,index:index})">刪除</Button>
                                </Col>
                            </Row>
                        </li>
                    </ul>
                        <Button type="primary" class="walletButton"  shape="circle" @click="HandleRender(1)">新增客服員</Button>                       
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
        isCollapsed: false,
        eyesIcon: 'eye-disabled',
    }
  },
  computed: {
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''

          ]
      },
      get_servies(){
          console.log(this.$store.getters.get_servies)
          return this.$store.getters.get_servies
      },
      get_vipServies(){
          return this.$store.getters.get_vipServies
      }
  },
  methods: {
     vipHandleRender (user_type) {
        let _vm = this
        this.$Modal.confirm({
            title: `新增 VIP 客服員`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.add_servies(user_type)
            },
            onCancel:()=>{
                    _vm.$store.commit('reset_vipServies')
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
                        placeholder: '填寫 VIP 客服員名稱'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('set_vipServies_name',val)
                        }
                    },
                    
                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '填寫 VIP 客服員聯絡資料'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('set_vipServies_contact',val)
                        }
                    },
                    
                })
                ])
            }
        })
    },
    HandleRender (user_type) {
        let _vm = this
        this.$Modal.confirm({
            title: `新增客服員`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.add_servies(user_type)
            },
            onCancel:()=>{
                _vm.$store.commit('reset_servies')
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
                        placeholder: '填寫客服員名稱'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('set_servies_name',val)  
                        }
                    },
                    
                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '填寫客服員聯絡資料'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('set_servies_contact',val)
                        }
                    },
                    
                })
                ])
            }
        })
    },
    edit_servies ({id:id,index:index}) {
        let _vm = this
        this.$Modal.confirm({
            title: `修改客服新訊`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.set_edit_servies({id:id,index:index})
                
            },
            onCancel:()=>{
                _vm.$store.commit('reset_edit_servies')
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
                        placeholder: '修改客服員名稱'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('edit_servies_name',val)  
                        }
                    },
                    
                }),h('Input', {
                    props: {
                        value: this.value,
                        autofocus: true,
                        placeholder: '修改客服員聯絡資料'
                    },
                    style: {
                        marginTop: '15px'
                    },
                    on: {
                        input: (val) => {
                        this.$store.commit('edit_servies_contact',val)
                        }
                    },
                    
                })
                ])
            }
        })
    },
    add_servies(user_type){
       this.$store.dispatch('add_servies',user_type)
        this.$store.commit('reset_vipServies')
        this.$store.commit('reset_servies')

    },
    set_edit_servies({id:id,index:index}){
        this.$store.dispatch('edit_servies',{id:id,index:index})
        this.$store.commit('reset_edit_servies')
    },
    remove({id:id,index:index}){
        let _vm = this
        if(id === 0){
            this.$Modal.confirm({
            title: `刪除 VIP 客服人員資料 `,
            content: `<p style="font-size:1.4em">確認刪除<h2>${this.$store.state.admin.add_vip_servies.member[index].name}</h2>的客服人員資料嗎？</p>`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.$store.dispatch('remove_servies',{id:id,index:index})
                // _vm.$store.commit('set_user_infor_index',index)
                // _vm.$store.dispatch('remove_user')
                },
            })
        }else if(id === 1){
            this.$Modal.confirm({
            title: `刪除客服人員資料 `,
            content: `<p style="font-size:1.4em">確認刪除<h2>${this.$store.state.admin.add_servies.member[index].name}</h2>的客服人員資料嗎？</p>`,
            onOk: () => {
                this.$Message.info('確認送出');
                _vm.$store.dispatch('remove_servies',{id:id,index:index})
                // _vm.$store.commit('set_user_infor_index',index)
                // _vm.$store.dispatch('remove_user')
                },
            })
        }
        

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
    .servies_member{
        list-style: none;
        margin: 20px 0;
        text-align: left;
    }
    .servies_member li {
        border-bottom: 1px solid #ddd;
        padding: 10px 20px;
        font-size: 1.3em;
        background: #f5f5f5
    }
   .servies_member .head{
        background-image:linear-gradient(to right, #2c91ac 0%, #155d78 100%);
       color: #fff;
       font-size: 0.8em;
       font-weight: 800
   }
</style>
