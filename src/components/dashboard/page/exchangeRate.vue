<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        匯率轉換
      </div>
      <div class='layout-body'>
        <div class="ivu-table-wrapper">
          <div class="ivu-table ivu-table-border">
            <div class="ivu-table-header">
              <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                  <tr>
                    <th class="">
                      <div class="ivu-table-cell">
                        <span class="">匯率</span>
                      </div>
                    </th>
                    <th class="" v-for="toCurrency in currency">
                      <div  class="ivu-table-cell">
                        <span class="">{{toCurrency}} {{$store.state.currency[toCurrency]}}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="ivu-table-tbody">
                  <tr v-for="fromCurrency in currency" class="ivu-table-row">
                    <th class="">
                      <div class="ivu-table-cell">
                        <span>{{fromCurrency}} {{$store.state.currency[fromCurrency]}}</span>
                      </div>
                    </th>
                    <td class="" v-for="toCurrency in currency">
                      <div class="ivu-table-cell">
                        <span v-if='fromCurrency == toCurrency'>X</span>
                        <span v-else class='clickable' @click="selectRate(rates[fromCurrency][toCurrency])">
                          <!-- {{fromCurrency}} -> {{toCurrency}} -->
                          <div class='rate'>{{rates[fromCurrency][toCurrency].rate}}</div>
                          <div>參考值: 30.131</div>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal
            v-model="editRateModal"
            okText="修改"
            :title="selectedRate.from_currency + ' ' + $store.state.currency[selectedRate.from_currency] + ' => ' + selectedRate.to_currency + ' ' + $store.state.currency[selectedRate.to_currency] "
            @on-ok="updateRate">
            <Form :model="selectedRate" :label-width="80">
              <FormItem label="匯率">
                <Row>
                  <Col span="8">
                    <Input v-model="selectedRate.rate"></Input>
                  </Col>
                  <Col span="8" offset="1">
                    參考值: 30.131
                  </Col>
                </Row>
              </FormItem>
            </Form>
        </Modal>
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
