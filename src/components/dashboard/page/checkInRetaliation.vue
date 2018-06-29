<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="入金回報" name="name1">
                <Table height="500" :columns="columns1" :data="getCheckIn" ></Table>
            </TabPane>
            </Tabs>
        <Page :total="getChekInPage" @on-change="change" style="margin:15px"></Page>
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
                        key: 'name',
                        minWidth:100

                    },
                    {
                        title: '入金金額',
                        key: 'amount',
                        minWidth:100

                    },
                    {
                        title: '核可金額',
                        key: 'approved_amount',
                        minWidth:100

                    },
                    {
                        title: '貨幣',
                        key: 'currency',
                        minWidth:60
                    }, 
					{
                        title: '銀行帳戶後五碼',
                        key: 'account',
                        minWidth:130

                    },
                    
                    {
                        title: '聯絡方式',
                        key: 'contact',
                        width: 120,
                    },
                    {
                        title: '業務',
                        key: 'sales',
                        width: 120,
					},
                    {
                        title: '回報狀態',
                        key: 'status',
                        minWidth:60
                    },
                     
                   
				]}
		},
		computed:{
			getCheckIn(){
                let data = this.$store.getters.getCheckIn.data
                // console.log(data)
				data.map(item=>{

                    switch(item.status){
                        case 0:
                        item.status = '審核中'
                        break;
                        case -1:
                        item.status = '拒絕'
                        break;
                        case 1:
                        item.status = '已入金'
                        break;
                    }
                    if (item.created_at){

                        item.created_at = this.$moment
                        .tz(item.created_at, 'Asia/Taipei')
                        .format('YYYY-MM-DD HH:mm:ss')
                    }
                    if(item.amount){
                        let num = new Number(item.amount);
                        let amount = num.toFixed(2)
                        item.amount = amount
                    }
                    if(!item.approved_amount){
                        item.approved_amount = item.amount
                    }
					return item
				})
				 return data
               
            },
            getChekInPage(){
                return this.$store.getters.getCheckIn.page_total
            }
        },
        methods: {
            change(page){
            this.$store.dispatch('getCheckIn',{ page, status: '' })           
            },
        },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
