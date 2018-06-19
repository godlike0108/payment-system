<template>
    <div class="current">
        <Row type="flex" justify="center" align="middle">
            <Col :xs="24" :sm="16" :md="16" :lg="16">

                <Tabs value="name1">
                    <TabPane label="貨幣帳戶" name="name1">
                        <ul class="allWallet">
                            <li v-for="(item,inde) in getAllWallet">
                                <Row>
                                    <Col :xs="8" :sm="8" :md="8" :lg="8" style="line-height:60px;padding-left:20px">{{item.currencyName}}</Col>
                                    <Col :xs="16" :sm="16" :md="16" :lg="16">
                                    <ul>
                                        <li><span class="title">餘額</span></li>
                                        <li>
                                          <span class="currency">{{item.currency}}</span>{{item.balance}}
                                        </li>
                                    </ul>
                                    
                                    </Col>
                                </Row>
                            </li>
                        </ul>
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
     return {
        isCollapsed: false
    };
  },
  computed:{
      getAllWallet(){
         
          let data = this.$store.getters.getAllWallet
          data.map(item=>{
              if(item.currency === 'TWD'){
                  item.currencyName = '新台幣帳戶'
                
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
  }
  }
</script>
<style>
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
ul {
    list-style-type:none
}
</style>
