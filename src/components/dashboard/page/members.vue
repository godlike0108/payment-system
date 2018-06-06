<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="會員清單" name="name1">
                <Table height="500" :columns="columns1" :data="get_user_list" ></Table>
            </TabPane>
            
        </Tabs>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'members',
  data () {
     return {
       columns1: [
                    
                    {
                        title: '會員名稱',
                        key: 'name'
                    },
                    {
                        title: '手機',
                        key: 'mobile'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    }, 
                    {
                        title: '創建時間',
                        key: 'created_at'
                    },  
                    {
                        title: '修改/刪除',
                        width: 170,
                        
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
                                            this.show(params.index)
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
                    }
                   
                ]
    }
  },
  computed: {
	  get_user_list(){
		  return this.$store.getters.get_user_list
	  }
  },
  methods: {
      show (index) {
          console.log()
            let _vm = this
            this.$Modal.confirm({
                onOk: () => {
                    this.$Message.info('確認送出');
                    _vm.reset_user_id(index)
                },
                render: (h) => {
                    return h('div', [h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            value: this.$store.state.admin.user_list[index].username,
                            placeholder: '管理員帳號 6~12位英文數字'
                        },
                        on: {
                            input: (val) => {
                                // this.value = val;
                            //   set_user_review_id(val)
                            
                            this.$store.state.admin.reset_user.username = val
                            //    console.log(this.$store.state.admin.user_review_id) 
                            }
                        },   
                    }),h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: '管理員密碼 6~12位英文數字'
                        },
                        style: {
                                    marginTop: '15px'
                                },
                        on: {
                            input: (val) => {
                                // this.value = val;
                            //   set_user_review_id(val)
                            
                            this.$store.state.admin.reset_user.password = val
                            //    console.log(this.$store.state.admin.user_review_id) 
                            }
                        },
                        
                    })
                    ])
                }
            })
            },
            remove(index){
                 let _vm = this
                this.$Modal.confirm({
                     title: `刪除會員資料 `,
                    content: `<p style="font-size:1.4em">確認刪除<h2>${this.$store.state.admin.user_list[index].name}</h2>的會員資料嗎？</p>`,
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.$store.commit('set_user_infor_index',index)
                        _vm.$store.dispatch('remove_user')
                    },
                    // render: (h) => {
                    //     return h('div', [h('Input', {
                    //         props: {
                    //             value: this.value,
                    //             autofocus: true,
                    //             value: this.$store.state.admin.user_list[index].username,
                    //             placeholder: '管理員帳號 6~12位英文數字'
                    //         },
                            
                    //     })
                    //     ])
                    // }
            })
               
            },
            reset_user_id(index){
			this.$store.state.admin.reset_user.user_id = this.$store.state.admin.user_list[index].id
            this.$store.dispatch('update_user_id')
		   },
  },
	created(){
    this.$store.dispatch('show_user')
		
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
