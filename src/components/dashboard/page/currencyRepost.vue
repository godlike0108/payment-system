<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        貨幣總量
      </div>
      <div class='layout-body'>
        <Table ref='table' :columns="columns" :data="currencies"></Table>
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
  name: 'currencyRepost',
  data() {
    return {
      currencies: [],
      columns: [

        {
          title: '貨幣',
          minWidth: 80,
          render: (h, params) => {
            return h('div', `${params.row.currency} ${this.$store.state.currency[params.row.currency]}`)
          }

        },
        {
          title: '總入金量',
          key: 'checkIn',
          minWidth: 80
        },
        {
          title: '總出金量',
          key: 'checkout',
          minWidth: 80
        },
        {
          title: '系統總量',
          key: 'remains',
          minWidth: 80
        },
      ],
    }
  },
  beforeMount: function() {
    this.$store.dispatch('getCurrency').then((currencies)=>{
      this.currencies = currencies
    })
  },
  computed: {

  },
  methods: {

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
</style>
