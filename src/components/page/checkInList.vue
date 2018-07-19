<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="24" :md="20" :lg="18">
          <div class='layout-container'>
            <div class='layout-head'>
              入金記錄
            </div>
            <div class='layout-body'>
              <Table :columns="columns1" :data="getCheckIn"></Table>
              <Page :total="total" @on-change="change" style="margin:15px"></Page>
            </div>
          </div>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'CheckInList',
  data () {
     return {
        isCollapsed: false,
        currency:['USD','TWD','CNY','HKD','JPY','KRW'],
        columns1: [
                    {
                        title: '銀行用戶名稱',
                        key: 'name',
                        minWidth:120
                    },

                    {
                        title: '銀行帳號後五碼',
                        key: 'account',
                        minWidth:120
                    },
                    {
                        title: '貨幣',
                        key: 'currency',
                        minWidth:110,
                        render: (h, params)=>{
                          var _vm = this;
                          return h('div', params.row.currency + ' ' + _vm.$store.state.currency[params.row.currency])
                        }
                    },
                    {
                        title: '入金金額',
                        key: 'amount',
                        minWidth:100
                    },
                    {
                        title: '確認入金',
                        key: 'approved_amount',
                        minWidth:100
                    },
                    {
                        title: '處理狀態',
                        key: 'status',
                        minWidth:100
                    },
                    {
                        title: '業務',
                        key: 'sales',
                        minWidth:100
                    }
                ],
    };
  },
  computed: {
      ...mapState({
          success : state => state.checkIn.success,
          error: state => state.checkIn.error,
          total: state => state.checkIn.page_total,
          amount: state => state.checkIn.amount,
          name: state => state.checkIn.name,
          sales:state => state.checkIn.sales,
          note:state => state.checkIn.note,
          contact:state => state.checkIn.contact,
          account:state => state.checkIn.account,

      }),

      getCheckIn: function(){
         return this.$store.getters.getCheckIn.data.map(item=>{
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
               item.created_at = this.$moment(item.created_at+' +0000')
               .format('YYYY-MM-DD HH:mm:ss')
             }
             if(item.amount){
                let num = new Number(item.amount);
                let amount = num.toFixed(2)
                item.amount = amount
             }
             if(item.approved_amount){
                let num = new Number(item.approved_amount);
                let approved_amount = num.toFixed(2)
                item.approved_amount = approved_amount
             }
             return item
          })
      },
  },
  methods: {
      ...mapActions({
            'userCheckIn':'userCheckIn'
            }),
        setCheckIn_amount(amount){
            this.$store.commit('setCheckIn',{amount})
        },
        setCheckIn_sales(sales){
            this.$store.commit('setCheckIn',{sales})
        },
        setCheckIn_mobile(contact){
            this.$store.commit('setCheckIn',{contact})
        },
        setCheckIn_name(name){
            this.$store.commit('setCheckIn',{name})
        },
        setCheckIn_bank_account(account){
            this.$store.commit('setCheckIn',{account})
        },
        setCheckIn_note(note){
            this.$store.commit('setCheckIn',{note})
        },
        change(page){
            this.$store.dispatch('userGetChekout',page)
        },
        setCurrency(currency){
            this.$store.commit('setCheckIn',{currency})
        }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 2em
}
.success {
		color: #19be6b;
		font-size: 1.2em
	}
.error {
		color:#ed3f14;
		font-size:1.2em
	}
.user {
  font-size: 2em
}
.title {
  color: #fff;
  font-size: 2em;
  font-weight: 600
}
.userLine {
  margin: 10px 0 20px 0
}
.phonePassword {
        width: 150px
    }
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        min-height: 100vh
    }
    .container {
      min-height:100vh
    }
    .layout-header-bar{
        background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
     .walletButton {
		width: 220px;
		height: 38px;
		color: #fff;
		/* background-color: rgb(238, 238, 238); */
		background-image:linear-gradient(to bottom, #2c91ac 0%, #155d78 100%);
	}
</style>
