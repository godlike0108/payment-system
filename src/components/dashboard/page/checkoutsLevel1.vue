<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="出金初審" name="name1">
                <Table height="500" :columns="columns1" :data="get_checkout_approval" ></Table>
            </TabPane>
            </Tabs>
		</Col>
	</Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
		data() {
			return {
				 columns1: [
                    
                    {
                        title: '帳戶名稱',
                        key: 'name'
                    },
                    {
                        title: '出金金額',
                        key: 'amount'
					},
					{
                        title: '銀行',
                        key: 'bank'
                    },
                    {
                        title: '銀行帳戶',
                        key: 'bank_account'
                    }, 
                    {
                        title: '申請時間',
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
                   
				]}
		},
		computed:{
			get_checkout_approval(){
				console.log(this.$store.getters.get_checkout_approval)
				 return this.$store.getters.get_checkout_approval
			}
		},
		methods: {
			show(index){
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
		},

		created(){
			this.$store.dispatch('get_checkout_level1')
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
