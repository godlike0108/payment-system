<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="撥款紀錄" name="name1">
                <Table height="500" :columns="columns1" :data="userGetwalletHistories" ></Table>
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
                        title: '會員名稱',
                        key: 'name'
                    },
                    {
                        title: '撥款金額',
                        key: 'amount'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    }, 
                    {
                        title: '撥款時間',
                        key: 'created_at'
                    },  
                   
				]}
		},
		computed:{
			userGetwalletHistories(){
				let data = this.$store.getters.getTransition.data
				console.log(data)
				data.map(item=>{

				})
				 return this.$store.getters.getTransition.data
			}
		},

		created(){
			this.$store.dispatch('userGetwalletHistories')
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
