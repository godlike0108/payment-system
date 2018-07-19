<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        行政費用
      </div>
      <div class='layout-body'>

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
  data() {
    return {
      currency: ['USD', 'TWD', 'CNY', 'HKD', 'JPY', 'KRW'],
      rates: {},
      editRateModal: false,
      selectedRate: {},
    }
  },
  name: 'adjustment',
  beforeMount: function() {
    this.currency.forEach((fromCurrency) => {
      this.rates[fromCurrency] = {}
      this.currency.forEach((toCurrency) => {
        this.rates[fromCurrency][toCurrency] = { rate: ''}
      })
    })
    this.$store.dispatch('getRates').then((res) => {
      res.data.forEach((obj) => {
        this.rates[obj.from_currency][obj.to_currency] = obj
        this.$forceUpdate()
      })
    })
    // this.$store.dispatch('getBankRates').then((res)=>{
    //
    // })
  },
  computed: {

  },
  methods: {
    updateRate(){
      this.$store.dispatch('updateRate', this.selectedRate).then((res)=>{
        this.$Message.success('修改成功')
        this.rates[this.selectedRate.from_currency][this.selectedRate.to_currency] = selectedRate
      })
    },
    selectRate(rate){
      this.selectedRate = rate
      this.editRateModal = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ivu-table table{
  width: 100%;
}
.th .ivu-table-cell{
}
th, td{
  text-align: center!important;
}
.rate{
  text-decoration: none;
  border-bottom:1px dashed #aaa;
  width: 70px;
  margin: 0 auto;
}
</style>
