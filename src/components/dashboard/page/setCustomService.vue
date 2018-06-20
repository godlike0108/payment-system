<template>
 <div>
        <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            
            <TabPane label="VIP" name="name1">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="16" :md="16" :lg="16">
                    <ul>
                        <li></li>
                    </ul>
                    <Button @click="vipHandleRender(0)">新增 VIP 客服員</Button>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="客服" name="name2">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="16" :md="16" :lg="16">
                        <Button @click="HandleRender(1)">新增客服員</Button>                       
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
    add_servies(user_type){
       this.$store.dispatch('add_servies',user_type)
        this.$store.commit('reset_vipServies')
        this.$store.commit('reset_servies')

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
