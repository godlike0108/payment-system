<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        行政費用
      </div>
      <div class='layout-body'>
        <Table border :columns="columns" :data="log"></Table>
        <Page :total="page_total" :page-size='page_size' @on-change="changePage" style="margin:15px"></Page>
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
      columns: [
        {
            title: '單號',
            key: 'id'
        },
        {
            title: '幣別',
            key: 'base_currency',
            render: (h, params) => {
              return h('div', `${params.row.base_currency} ${this.$store.state.currency[params.row.base_currency]}`)
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
      log: [],
      page_total: 0,
      page_size: 15,
    }
  },
  name: 'adjustment',
  beforeMount: function() {
    this.changePage(0)
  },
  computed: {

  },
  methods: {
    changePage(page){
      this.$store.dispatch('getExchangeLog', page).then((res)=>{
        this.log = res.data.data
        this.page_total = res.data.total
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
