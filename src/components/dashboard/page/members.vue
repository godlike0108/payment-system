<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="會員清單" name="name1">
                <Table height="500" :columns="columns1" :data="get_user_list" ></Table>
            </TabPane>
        </Tabs>
        <Page :total="get_user_list_page_total" @on-change="change" style="margin:15px"></Page>
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
                        key: 'email',
                        width: 180,
                    }, 
                    {
                        title: '創建時間',
                        key: 'created_at',
                        width: 170,
                    },  
                    {
                        title: '修改/刪除',
                        
                        
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
                                            this.reset_reset_user_id()
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
      },
      get_user_list_page_total(){
          return this.$store.getters.get_user_list_page_total
      }
  },
  methods: {
      change(page){
            this.$store.dispatch('show_user',page)           
               console.log(page)
            },
      show (index) {
          console.log()
            let _vm = this
            this.$Modal.confirm({
                onOk: () => {
                    this.$Message.info('確認送出');
                    _vm.reset_user_id(index)
                },
                onCancel:()=>{
                    _vm.reset_reset_user_id()
                },
                render: (h) => {
                    return h('div', [
                    //     h('Input', {
                    //     props: {
                    //         value: this.value,
                    //         autofocus: true,
                    //         value: this.$store.state.admin.user_list[index].username,
                    //         placeholder: '用戶帳號 6~12位英文數字'
                    //     },
                    //     on: {
                    //         input: (val) => {
                    //             // this.value = val;
                    //         //   set_user_review_id(val)
                            
                    //         this.$store.state.admin.reset_user.username = val
                    //         //    console.log(this.$store.state.admin.user_review_id) 
                    //         }
                    //     },   
                    // }),
                    h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: '用戶密碼 6~12位英文數字'
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
                        
                    }),
                    ,h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: '請輸入用戶手機新 格式為：886'
                        },
                        style: {
                                    marginTop: '15px'
                                },
                        on: {
                            input: (val) => {   
                             
                            this.$store.state.admin.reset_user.phone = val
                            }
                        },
                        
                    }),
                    ,h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: '請輸入用戶新 e-mail '
                        },
                        style: {
                                    marginTop: '15px'
                                },
                        on: {
                            input: (val) => {
                                this.$store.state.admin.reset_user.email = val
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
            })
               
            },
            reset_user_id(index){
            let phone = this.$store.state.admin.reset_user.phone
            let email = this.$store.state.admin.reset_user.email
             this.$store.state.admin.reset_user.user_id = this.$store.state.admin.user_list.data[index].id

             this.$store.dispatch('update_user_id',index)
           },
           reset_reset_user_id(){
               this.$store.state.admin.reset_user.phone = null
               this.$store.state.admin.reset_user.email =null
               this.$store.state.admin.reset_user.username =null
               this.$store.state.admin.reset_user.user_id =null
               this.$store.state.admin.reset_user.password =null
               console.log(this.$store.state.admin.reset_user)
               
           }
  },
	created(){
    // this.$store.dispatch('show_user')
		
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
