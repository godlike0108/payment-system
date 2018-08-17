<template>
<div class="current">
  <Row type="flex" justify="center" align="middle">
    <Col :xs="24" :sm="18" :md="18" :lg="16">

      <div class='layout-container'>
        <div class='layout-head'>
          匯率轉換
        </div>
        <div class='layout-body'>
          <Row type="flex" align="bottom">
            <Col :xs="24" :sm="10" :md="10" :lg="10">
              <div class='label text-left'>轉出錢包</div>
              <Select ref="from" :placeholder="'請選擇錢包'" @on-change="setFrom" @on-open-change="getWallet" clearable>
                  <Option v-for="(item,index) in wallets" :value="index" :key="index" >{{ item.currencyName }}帳戶 ${{item.balance}}</Option>
              </Select>
            </Col>
            <Col :xs="0" :sm="4" :md="4" :lg="4">
              <Icon class="arrow-icon" type="arrow-right-c"></Icon>
            </Col>
            <Col :xs="24" :sm="10" :md="10" :lg="10">
              <div class='label text-left'>轉入錢包</div>
              <Select ref="to" :placeholder="'請選擇錢包'" @on-change="setTo"  @on-open-change="getWallet" clearable>
                  <Option v-for="(item,index) in wallets" :disabled="!switches[item.currency]" :value="index" :key="index" >{{ item.currencyName }}帳戶 ${{item.balance}}</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span="24" v-if="accountError">
              <Alert type="error" show-icon>{{accountError}}</Alert>
            </Col>
          </Row>
          <Row type="flex" align="top">
            <Col offset="1" :xs="24" :sm="6" :md="6" :lg="6" v-if="('currency' in from) && ('currency' in to)">
              <div class='label text-left'>金額計算貨幣</div>
              <RadioGroup v-model="direction" class='text-left'>
                  <Radio label="1">以匯出金額為準</Radio><br>
                  <Radio label="0">以匯入金額為準</Radio>
              </RadioGroup>
            </Col>

            <Col :xs="24" :sm="8" :md="8" :lg="8" v-if="('currency' in from) && ('currency' in to)">
              <div class='label text-left'>換匯金額</div>
              <Input v-model="exchange.balance" number class='text-right'>
                  <span slot="prepend">{{exchange.currency}} {{exchange.currencyName}}</span>
              </Input>
              <div v-if="target.balance" class='text-right'>
                約等於 {{target.balance}} {{target.currency}} {{target.currencyName}}<br>
                (匯率 {{rate}}, 台銀參考 {{officialRate}})<br>

              </div>
            </Col>
          </Row>
          <Row>
            <Col span="24" v-if="exchangeError">
              <Alert type="error" show-icon>{{exchangeError}}</Alert>
            </Col>
          </Row>
          <Row class='text-left' v-if="exchange.balance && direction && exchangeError == ''">
            <Col offset="1" span="3">
              <Button :disabled="accountError!=''" @click='doExchange'>換匯</Button>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>
<script>
import {
  mapActions,
  mapState,
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'exchange',
  data() {
    return {
      direction: '1',
      from: {},
      to: {},
      exchange: {
        currency: '---'
      },
      target: {},
      accountError: '',
      exchangeError: '',
      rate: 0,
      officialRate: 0,
      officialRates: [],
      wallets: [],
      switches: {},
    };
  },
  beforeMount: function() {
    this.$store.dispatch('getSetting').then((setting)=>{
      setting.currency_exchange_switches.forEach((item)=>{
        this.switches[item.currency] = item.isEnable
      })
    })
  },
  mounted: function(){
    this.getWallet(),
    this.$store.dispatch('getOfficialRate').then((res)=>{
      this.officialRates = res.data
    })
  },
  computed: {

  },
  methods: {
    getWallet() {
      this.$store.dispatch('getWallet').then((res)=>{
        let data = res.data
        data.map(item => {
          switch (item.currency) {
            case 'USD':
              item.currencyName = '美元'
              break;
            case 'TWD':
              item.currencyName = '新台幣'
              break;
            case 'CNY':
              item.currencyName = '人民幣'
              break;
            case 'HKD':
              item.currencyName = '港幣'
              break;
            case 'JPY':
              item.currencyName = '日圓'
              break;
            case 'KRW':
              item.currencyName = '韓圓'
              break;
            default:
              // console.log('getAllWallet fail.')
          }

          if (item.balance) {
            let num = new Number(item.balance);
            let balance = num.toFixed(2)
            item.balance = balance
          }

          return item
        })
        this.wallets = data
      })
    },
    setRate(){
      if(this.exchange.currency != undefined && this.target.currency != undefined){
        this.$store.dispatch('getRate', {
          from: this.exchange.currency,
          to: this.target.currency,
        }).then((res)=>{
          this.rate = res.data.rate
          // this.target.balance = this.exchange.balance * this.rate
        })

      }
    },
    setFrom(index){
      this.from = this.wallets[index];
      if(this.from.currency == this.to.currency) this.accountError='請選擇兩個不同的帳戶';
      else this.accountError = '';
      this.updateExchangeCurrency(this.direction)
    },
    setTo(index){
      this.to = this.wallets[index];
      if(this.from.currency == this.to.currency) this.accountError='請選擇兩個不同的帳戶';
      else this.accountError = '';
      this.updateExchangeCurrency(this.direction)
    },
    updateExchangeCurrency(val){
      this.exchange.currency = (val=='1')? this.from.currency : this.to.currency
      this.exchange.currencyName = (val=='1')? this.from.currencyName : this.to.currencyName
      this.target.currency = (val=='1')? this.to.currency : this.from.currency
      this.target.currencyName = (val=='1')? this.to.currencyName : this.from.currencyName
      this.setRate()
    },
    setTargetBalance(){
      if( this.rate && this.exchange.balance){
        this.target.balance = Math.round(this.rate * this.exchange.balance*100)/100
        this.officialRate = this.officialRates.find((rate)=>{
          return rate.from_currency == this.exchange.currency && rate.to_currency == this.target.currency
        }).rate

        this.exchangeError = ''
        if( this.direction == '1' && this.from.balance < this.exchange.balance){
          this.exchangeError = '錢包餘額不足'
        }
        if( this.direction == '0' && this.from.balance < this.target.balance){
          this.exchangeError = '錢包餘額不足'
        }
      }else return
    },
    doExchange(){
      this.$store.dispatch('exchange', {
        "from_wallet_id" : this.from.id,
      	"to_wallet_id" : this.to.id,
      	"amount" : this.exchange.balance,
      	"base_currency" : this.exchange.currency
      }).then((res)=>{
        this.$Message.success('換匯成功');
        this.$store.dispatch('getNewestWallet')

        this.getWallet()
        setTimeout(()=>{
          this.from = {}
          this.to = {}
          this.target = {}
          this.exchange = {
            currency: '---'
          }
          this.rate = 0
          this.$refs.from.clearSingleSelect()
          this.$refs.to.clearSingleSelect()
          this.$refs.from.$forceUpdate()
          this.$refs.to.$forceUpdate()
        }, 1000)
      })
    },
  },
  watch: {
    direction(val){
      this.updateExchangeCurrency(val)
    },
    'rate': function(){
      this.setTargetBalance()
    },
    'exchange.balance': function(){
      this.setTargetBalance()
    },
  }
}
</script>
<style lang="less" scoped>

.text-right .ivu-input{
  text-align: right!important;
}
.label{
  font-size: 14px;
  padding-bottom: 10px;
  margin-top: 20px;
}
.ivu-row-flex, .ivu-row{
  margin-bottom: 20px;
}
.arrow-icon{
  font-size: 26px;
}
.ivu-radio-group{
  display: block;
}
</style>
