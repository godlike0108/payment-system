<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

      <div class='layout-container'>
        <div class='layout-head'>
          換匯開關
        </div>
        <div class='layout-body text-left'>
          <div class='switch-item' >
            <label>
              全部
            </label>
            <i-switch @on-change="change" />
          </div>
          <div class='divider'></div>
          <div class='switch-item' v-for="item in switches">
            <label>
              {{item.currency + ' ' + $store.state.currency[item.currency]}}
            </label>
            <i-switch v-model="item.isEnable" />
          </div>
          <div class='switch-item button' >
            <label>

            </label>
            <Button size="large" type="primary" @click="update">修改</Button>
          </div>

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
  name: 'exchangeSwitch',
  data() {
    return {
      switches: [],
    }
  },
  beforeMount: function() {
    this.$store.dispatch('getSetting').then((setting)=>{
      this.switches = setting.currency_exchange_switches
    })
  },
  methods: {
    change(status){
      this.switches.forEach((item)=>{
        item.isEnable = status
      })
    },
    update(){
      this.$store.dispatch('setSetting', {
      	"operation":"currency_exchange_switch",
      	"settings": this.switches,
      }).then(()=>{
        this.$Message.success('修改完成')
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .switch-item label{
    text-align: right;
    width: 200px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .divider{
    border-bottom: 2px solid #aaa;
    margin-bottom: 10px;
  }
  .button{
    margin-top: 30px;
  }

</style>
