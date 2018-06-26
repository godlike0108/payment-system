<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="20" :md="20" :lg="20">
            <Tabs value="name1">
            <TabPane label="入金申請" name="name1">
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
                        title: '銀行帳戶後五碼',
                        key: 'account',
                        minWidth:130

                    },
                    {
                        title: '貨幣',
                        key: 'currency',
                        minWidth:60
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
                        title: '審核',
                        width: 140,
                        
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
			getCheckIn(){
                let data = this.$store.getters.getCheckIn.data
				data.map(item=>{
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
            this.$store.dispatch('getCheckIn',{ page, status: 0 })           
            },
			show(index){
                 let _vm = this
                this.$Modal.confirm({
                     title: `同意入金 `,
                    content: `<p style="font-size:1.4em">同意該筆入金申請嗎？</p>`,
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.$store.dispatch('putCheckIn',{index,status:1})
                    },
                    onCancel:()=>{
                    this.$store.state.checkIn.approved_amount = null
                    },
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.$store.getters.getCheckIn.data[index].amount,
                                autofocus: true,
                                placeholder: '輸入入金金額'
                            },
                            style:{
                                'margin-top':'15px'
                            },
                            on: {
                                input: (val) => {
                                this.$store.state.checkIn.approved_amount = val

                                }
                            },
                            
                        })
                    }
            })
               
            },
			remove(index){
                 let _vm = this
                this.$Modal.confirm({
                     title: `回絕入金`,
                    content: `<p style="font-size:1.4em">回絕該筆入金申請嗎？</p>`,
                    onOk: () => {
                        this.$Message.info('確認送出');
                        _vm.$store.dispatch('putCheckIn',{index,status:-1})
                    },
            })
               
            },
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
