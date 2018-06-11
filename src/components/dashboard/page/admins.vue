<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="管理員帳戶" name="name1">
                <Table height="400" :columns="columns1" :data="getAdmins"></Table>
            </TabPane>
			<TabPane label="覆核金額" name="name2">
				<Row type="flex" justify="center" align="middle">
					<Col span="24" class="review_amount">覆核金額限制：{{get_approval_amount}}元</Col>
					<Col span="24"><Input @input="update_new_approval_amount" placeholder="更改覆核金額" clearable style="width: 200px" ></Input></Col>
					<Col span="24" class="review_amount"><Button @click="update_approval_amount" type="primary" >送出設定</Button></Col>					
				</Row>
            </TabPane>
        </Tabs>
        </Col>
    </Row>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
	  return {
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
                        title: '創建時間',
                        key: 'updated_at'
                    },
                    {
                        title: '修改資料',
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
                                }, '修改資料'),
                            ]);
                        }
                    }
                ],
    };
  },
  computed:{
	  getAdmins(){
      
          return this.$store.getters.getAdmins
	  },
	  get_approval_amount(){
		  return this.$store.getters.get_approval_amount
	  }
  },
  methods:{
	  show (index) {
                 
                let _vm = this
                this.$Modal.confirm({
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.put_administrator_id(index)
                    },
                    render: (h) => {
                        return h('div', [h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                disabled: true,
								value: this.$store.state.Admins.admins[index].username,
                                // placeholder: '管理員帳號 6~12位英文數字'
                            },
                            on: {
                                input: (val) => {
                                    // this.value = val;
                                //   set_user_review_id(val)
                                
                                this.$store.state.admin.reset_administrator.username = val
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
                                
                                this.$store.state.admin.reset_administrator.password = val
                                }
                            },
                            
						})
						])
                    }
                })
            },
           put_administrator_id(index){
			this.$store.state.admin.reset_administrator.administrator_id = this.$store.state.Admins.admins[index].id
            this.$store.dispatch('put_administrator_id',index)
            // setTimeout(()=>{
            //     this.$store.dispatch('userReview')  
            // },2500)
		   },
		   update_new_approval_amount (amount) {
                this.$store.commit('update_new_approval_amount', amount)
            },
		   update_approval_amount(){
			   this.$store.dispatch('update_approval_amount')
		   }
		   
  },
  created(){
	// this.$store.dispatch('admins')	
	// this.$store.dispatch('approval_levels')	
	
	  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.review_amount {
	font-size: 1.2em;
	margin: 20px
}
</style>
