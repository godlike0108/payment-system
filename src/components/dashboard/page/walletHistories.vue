<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="撥款紀錄" name="name1">
                <Table height="281" :columns="columns1" :data="userGetwalletHistories" ></Table>
            </TabPane>
            </Tabs>
        <Page :total="get_checkout_history_page_total" @on-change="change" style="margin:15px"></Page>
			
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
						 title: '轉出管理員',
						 key: 'relative_username'
					 },
                    
                    {
                        title: '帳號',
                        key: 'user_username'
                    },
                    {
                        title: '撥款金額',
                        key: 'amount'
                    },
                    {
                        title: '手機',
                        key: 'user_phone'
                    }, 
                    {
                        title: '撥款時間',
                        key: 'created_at'
                    },  
                   
				]}
		},
		computed:{
			userGetwalletHistories(){
				let data = this.$store.getters.getTransition
				data.map(item=>{
					item.user_username = item.user.username
					item.user_phone = item.user.mobile
					item.relative_username = item.relative_user.username
					console.log(item)
					return item
				})
				 return this.$store.getters.getTransition
			},
			get_checkout_history_page_total(){
				return this.$store.getters.get_wallet_page_total
			}
		},
		methods: {
			change(page){
            this.$store.dispatch('userGetwalletHistories',page)           
            },
		},
		created(){
			// this.$store.dispatch('userGetwalletHistories',1)
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
