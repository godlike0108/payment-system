<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        行政費用
      </div>
      <div class='layout-body'>
        <Tabs value="tab_1">
          <TabPane label="換匯手續費" name="tab_1">
            <Table border :columns="columnsExchange" :data="exchangeFees"></Table>
            <Page :total="exchange_page_total" :page-size='exchange_page_size' @on-change="exchangeChangePage" style="margin:15px"></Page>
          </TabPane>
          <TabPane label="轉帳手續費" name="tab_2">
            <Table border :columns="columnsTransfer" :data="transferFees"></Table>
            <Page :total="transfer_page_total" :page-size='transfer_page_size' @on-change="exchangeChangePage" style="margin:15px"></Page>
          </TabPane>
        </Tabs>
      </div>
    </div>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  data() {
    return {
      columnsExchange: [
        {
            title: '單號',
            key: 'id'
        },
        {
            title: '幣別',
            key: 'profit_currency',
            render: (h, params) => {
              return h('div', `${params.row.profit_currency} ${this.$store.state.currency[params.row.profit_currency]}`)
            }
        },
        {
            title: '原始金額',
            key: 'system_amount'
        },
        {
            title: '成交金額',
            key: 'transaction_amount'
        },
        {
            title: '獲利金額',
            key: 'profit'
        },
        {
            title: '日期',
            key: 'created_at',
            render: (h, params) => {
              return h('div', this.$moment(params.row.created_at+' +0000').format('YYYY-MM-DD HH:mm:ss'))
            }
        },
      ],
      columnsTransfer: [
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: '轉帳金額',
            key: 'transfer_amount'
        },
        {
            title: '手續費類型',
            key: 'fee_type',
            render: (h, params) => {

              let types = {
                'fixed': '固定',
                'percentage': '百分比',
              }
              return h('div', `${types[params.row.fee_type]}`)
            }
        },
        {
            title: '手續費計算',
            key: 'fee_value'
        },
        {
            title: '手續費',
            key: 'fee'
        },
        {
            title: '日期',
            key: 'created_at',
            render: (h, params) => {
              return h('div', this.$moment(params.row.created_at+' +0000').format('YYYY-MM-DD HH:mm:ss'))
            }
        },
      ],
      exchangeFees: [],
      transferFees: [],
      exchange_page_total: 0,
      exchange_page_size: 15,
      transfer_page_total: 0,
      transfer_page_size: 15,
    }
  },
  name: 'adjustment',
  beforeMount: function() {
    this.exchangeChangePage(0)
    this.transferChangePage(0)
  },
  computed: {

  },
  methods: {
    exchangeChangePage(page){
      this.$store.dispatch('getExchangeLog', page).then((res)=>{
        this.exchangeFees = res.data.data
        this.exchange_page_total = res.data.total
      })
    },
    transferChangePage(page){
      this.$store.dispatch('getReportTransferFee', page).then((res)=>{
        this.transferFees = res.data.data
        this.transfer_page_total = res.data.total
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
