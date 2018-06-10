<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="出金紀錄" name="name1">
                <Table height="500" :columns="columns1" :data="get_checkout_history" ></Table>
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
                        title: '帳號',
                        key: 'user_username'
                    },
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
                   
				]}
		},
		computed:{
			get_checkout_history(){
                let data = this.$store.getters.get_checkout_history
                data.map(item=>{
					item.user_username = item.user.username
					return item
				})
				console.log(this.$store.getters.get_checkout_history)
				 return this.$store.getters.get_checkout_history
            },
            get_checkout_history_page_total(){
            return this.$store.getters.get_checkout_history_page_total
     },
        },
        methods: {
            change(page){
            this.$store.dispatch('get_checkout_history',page)           
            //    console.log(page)
            },
        },

		created(){
			// this.$store.dispatch('get_checkout_history',1)
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
