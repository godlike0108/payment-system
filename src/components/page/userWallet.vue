<template>


 <div>

     <Row type="flex" justify="end" align="top" class="userLine">
        <Col :xs="24" :sm="3" :md="3" :lg="3" >
            <router-link to="/index/currentWallet" class="back"><Icon type="arrow-left-c"></Icon><span>重新選擇錢包</span></router-link>
        </Col>
        <Col :xs="20" :sm="{span:16,offset:5}" :md="{span:16,offset:5}" :lg="{span:16,offset:5}" :offset-lg="5">
            <Row type="flex" justify="end" align="top">
            <!-- <Col :xs="24" :sm="8" :md="8" :lg="6">用戶：<span class="user">{{this.$store.state.user.name}}</span></Col> -->
            <Col :xs="24" :sm="12" :md="8" :lg="8">剩餘金額：{{getCurrentWallet.currency}}<span class="money">{{getCurrentWallet.balance}}</span></Col>
            </Row>
        </Col>

        </Row>
        <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="金流紀錄" name="name1" class="1">
                <Table ref='table' stripe :columns="columns1" :data="getTransition" class="pg-table" @on-row-click="triggerExpand"></Table>
                <Page :total="get_wallet_page_total" @on-change="change" style="margin:15px" ></Page>
            </TabPane>
        </Tabs>
        </Col>
    </Row>

 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('請填入轉出帳號'));
            } else {

                callback();
            }
        };
    const validateAge = (rule, value, callback) => {
        if (!value || value <= 0) {
            return callback(new Error('轉出金額不能為空'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
            if (!Number.isInteger(value)) {
                callback(new Error('請填入數字'));
            } else {
                    callback();
            }
        }, 1000);
    };
     return {
        columns1: [
                    {
                        title: '時間',
                        key: 'shortTime',
                        width: 90,
                        className: 'date'
                    },
                    // {
                    //     title: '內容',
                    //     key: 'type',
                    //     minWidth:100
                    // },
                    {
                        title: '進/出帳號',
                        key: 'relative_username',
                        className: 'text-left content',
                        render: (h, params)=>{
                          return h(
                            'div',
                            [
                                h(
                                  'div',
                                  {
                                    class: 'account'
                                  },
                                  `對方帳戶  ID ${params.row.relative_username}`
                                ),
                                h( 'div',
                                  {
                                    class: 'balance'
                                  },
                                  `本帳戶餘額 ${params.row.wallet_balance}`
                                )
                            ]
                          )
                        }
                    },
                    {
                        title: '金額',
                        key: 'relative_amount',
                        width:110,
                        className: ['text-right last-td'],
                        render: (h, params)=>{
                          return h(
                            'div',
                            [
                                h(
                                  'div',
                                  {
                                    class: 'amount'
                                  },
                                  `$${params.row.relative_amount}`
                                ),
                                h( 'div',
                                  {
                                    class: ['type', params.row.color]
                                  },
                                  params.row.type
                                )
                            ]
                          )
                        }
                    },
                    {
                      type: 'expand',
                      width: -1,
                      render: (h, params) => {
                          return h( 'div',
                          [
                            h( 'div', { class: 'expand-label'}, '進/出帳' ),
                            h( 'div', { class: 'expand-value'}, params.row.type ),
                            h( 'div', { class: 'expand-label'}, '時間' ),
                            h( 'div', { class: 'expand-value'}, params.row.created_at ),
                            h( 'div', { class: 'expand-label'}, '進/出帳號' ),
                            h( 'div', { class: 'expand-value'}, params.row.relative_username ),
                            h( 'div', { class: 'expand-label'}, '進/出帳金額' ),
                            h( 'div', { class: 'expand-value'}, '$'+params.row.relative_amount ),
                            h( 'div', { class: 'expand-label'}, '本帳戶餘額' ),
                            h( 'div', { class: 'expand-value'}, '$'+params.row.wallet_balance ),
                          ])
                      }
                    }
                    // {
                    //     title: '餘額',
                    //     key: 'wallet_balance',
                    //     minWidth:100
                    // },

                ]
    };
  },
  computed: {
    getCurrentWallet(){
        let data = this.$store.getters.getCurrentWallet
        // console.log(data)
        // if(data.balance){
        //         let num = new Number(data.balance)
        //         let balance = num.toFixed(2)
        //         data.balance = balance
        //     }
        return data
    },
    getBalance(){
        let data = this.$store.getters.getBalance
        let balance = num.toFixed(2)
        return balance
    },
     get_wallet_page_total(){
         return this.$store.getters.getTransition.page_total
     },
      getTransition(){
          let username = ""
          let wallet_balance

          let data = this.$store.getters.getTransition.histories
          // console.log(data)
         return data.map(item=>{
             // console.log(item)
             item._expanded = false
             switch(item.operation_type){
                 case 0:
                 item.type = '內部轉入'
                 item.color = 'green'
                 break;
                 case 1:
                 item.type = '內部轉出'
                 item.color = 'blue'
                 break;
                 case 2:
                 item.type = '入金'
                 item.color = 'green'
                 break;
                 case 3:
                 item.type = '申請出金'
                 item.color = 'blue'
                 break;
                 case 4:
                 item.type = '內部轉入'
                 item.color = 'green'
                 break;
                 case 5:
                 item.type = '內部轉出'
                 item.color = 'blue'
                 break;
                 case 6:
                 item.type = '匯率轉出'
                 item.color = 'blue'
                 break;
                 case 7:
                 item.type = '匯率轉入'
                 item.color = 'green'
                 break;
             }

             if(item.relative_user){
                 item.relative_username = item.relative_user.username
             } else {
                 item.relative_username = ""
             }
             if(item.operation_type == 4) item.relative_username = '預扣出金退回'
             if(item.operation_type == 5) item.relative_username = '申請出金預扣'

             if (item.wallet_balance){
                let num = new Number(item.wallet_balance);
                let balance = num.toFixed(2)
                 item.wallet_balance = balance
             }

             if(item.created_at) {
               item.shortTime = this.$moment(item.created_at+' +0000')
               .format('MM/DD')
               item.created_at = this.$moment(item.created_at+' +0000')
               .format('YYYY-MM-DD HH:mm:ss')
             }

             return item
          })

  }
  },
   methods: {
      change(page){
        this.$store.dispatch('userGetwalletHistories',page)
      },
      triggerExpand(row, index){
        this.$refs.table.toggleExpand(index)
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 1.9em;
  padding: 0 3px
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
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
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
    .back {
        color: #666;
        font-size: 1.2em;
        margin: 10px;
        display: block
    }


</style>
