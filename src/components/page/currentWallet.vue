<template>
    <div class="current currentWallet">
        <Row type="flex" justify="center" align="middle">
            <Col :xs="24" :sm="16" :md="16" :lg="16">
              <div class='layout-container'>
                <div class='layout-head'>
                  <div>我的帳戶號碼</div>
                  <div class='bank_account'>{{$store.state.user.bank_account | account}}</div>
                </div>
                <div class='layout-body'>
                        <ul class="allWallet">
                            <li v-for="(item,index) in getAllWallet" @click="selectWallet(index)">
                                <Row>
                                    <Col :xs="24" :sm="8" :md="8" :lg="8" class="currencyName" >
                                      <div class='bank_account'>{{$store.state.user.bank_account | account}}</div>
                                      {{item.currencyName}}
                                    </Col>
                                    <Col :xs="14" :sm="14" :md="14" :lg="14">
                                    <ul>
                                        <li><span class="title">餘額</span></li>
                                        <li>
                                          <span class="currency">{{item.currency}}</span>{{item.balance}}
                                        </li>
                                    </ul>
                                    </Col>
                                    <Col :xs="{span:2,offset:0}" :sm="{span:2,offset:0}" :md="{span:2,offset:0}" :lg="{span:2,offset:0}" style="line-height:60px"><Icon type="arrow-right-c" size="22"></Icon></Col>
                                </Row>
                            </li>
                        </ul>
                </div>
              </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
     return {
        isCollapsed: false
    };
  },
  mounted: function(){
    this.$store.dispatch('front_end_show_user')
  },
  computed:{
      getAllWallet(){
          let data = this.$store.getters.getAllWallet

          data.map(item=>{
              switch(item.currency){
                  case 'USD':
                  item.currencyName = '美元帳戶'
                  break;
                  case 'TWD':
                  item.currencyName = '新台幣帳戶'
                  break;
                  case 'CNY':
                  item.currencyName = '人民幣帳戶'
                  break;
                  case 'HKD':
                  item.currencyName = '港幣帳戶'
                  break;
                  case 'JPY':
                  item.currencyName = '日圓帳戶'
                  break;
                  case 'KRW':
                  item.currencyName = '韓圓帳戶'
                  break;
                  default:
                  // console.log('getAllWallet fail.')
              }

              if(item.balance){
                let num = new Number(item.balance);
                let balance = num.toFixed(2)
                 item.balance = balance
              }

            return item
          })
          return data
      }
  },
  methods:{
      selectWallet(index){
          this.$store.commit('selectWallet',index)
          this.$router.push('/index/')
      }
  }
  }
</script>
<style scope>
.allWallet{
    margin: 20px 0
}
.allWallet > li {
    border: 1px solid #ddd;
    padding: 10px ;
    text-align: left;
    transition: all 0.5s;
    font-size: 1.5em;
    cursor: pointer;
}
.allWallet > li:hover {
    background: #f9f9f9
}
.title{
    font-size: 0.6em;
}
.currency{
    font-size: 0.8em;
    padding-right:  5px
}
.currencyName {
    line-height:45px;
    padding-left:20px
}
@media (max-width: 767px) {
    .currencyName {
        line-height:40px;
        padding-left:0px
    }
}
ul {
    list-style-type:none
}
.currentWallet .layout-head{
  height: 80px!important;
}
.layout-head .bank_account{
  font-size: 16px;
}
.allWallet .bank_account{
  font-size: 14px;
  height: 20px;
  line-height: 32px;
}
</style>
