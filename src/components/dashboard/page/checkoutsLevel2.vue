<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="出金審核" name="name1">
                <Table height="500" :columns="columns1" :data="get_checkout_level2" ></Table>
            </TabPane>
            </Tabs>
        <Page :total="get_checkout_level2_page_total" @on-change="change" style="margin:15px"></Page>

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
                        title: '帳號',
                        key: 'user_username',
                        minWidth:100

                    },
                    {
                        title: '帳戶名稱',
                        key: 'name',
                        minWidth:100

                    },
                    {
                        title: '出金金額',
                        key: 'amount',
                        minWidth:100

                    },
                     {
                        title: '貨幣',
                        key: 'wallet_currency',
                        minWidth:110,
                        render: (h, params)=>{
                          var _vm = this;
                          return h('div', params.row.wallet_currency + ' ' + _vm.$store.state.currency[params.row.wallet_currency])
                        }
                    },
					{
                        title: '銀行',
                        key: 'bank',
                        minWidth:100

                    },
                    {
                        title: '銀行帳戶',
                        key: 'bank_account',
                        minWidth:100

                    },

                    {
                        title: '申請時間',
                        key: 'created_at',
                        minWidth:100

					},
					{
                        title: '審核',
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
                                }, '同意'), h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'

                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '拒絕')

                            ]);
                        }
                    }

				]}
		},
		computed:{
			get_checkout_level2(){
				let data = this.$store.getters.get_checkout_level2.data
				data.map(item=>{
                    item.user_username = item.user.username
                    if (item.created_at){
                      item.created_at = this.$moment(item.created_at+' +0000')
                      .format('YYYY-MM-DD HH:mm:ss')
                    }
                    if(item.amount){
                        let num = new Number(item.amount);
                        let amount = num.toFixed(2)
                        item.amount = amount
                    }
					return item
				})
				 return data
            },
            get_checkout_level2_page_total(){
                return this.$store.getters.get_checkout_level2.page_total
            }
		},
		methods: {
            change(page){
            this.$store.dispatch('get_checkout_level2',page)
            },
			show(index){
                 let _vm = this
                this.$Modal.confirm({
                     title: `出金覆核 `,
                    content: `<p style="font-size:1.4em">確認送出<h2>${this.$store.state.admin.checkout_level2.data[index].name}</h2>的出金申請嗎？</p>`,
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.$store.commit('set_checkout_level2_index',index)
                        _vm.$store.commit('set_checkout_level2_status',1)
                        _vm.$store.dispatch('put_checkout_review_pudate',{id:this.$store.state.admin.checkout_level2.index,status:this.$store.state.admin.checkout_level2.status,api:'level2'})

                    },
            })

            },
			remove(index){
                 let _vm = this
                this.$Modal.confirm({
                     title: `出金覆核 `,
                    content: `<p style="font-size:1.4em">確認回絕<h2>${this.$store.state.admin.checkout_level2.data[index].name}</h2>的出金申請嗎？</p>`,
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.$store.commit('set_checkout_level2_index',index)
                        _vm.$store.commit('set_checkout_level2_status',-1)
                        _vm.$store.dispatch('put_checkout_review_pudate',{id:this.$store.state.admin.checkout_level2.index,status:this.$store.state.admin.checkout_level2.status,api:'level2'})

                    },
            })

            },
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
