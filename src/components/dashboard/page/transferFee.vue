<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

      <div class='layout-container'>
        <div class='layout-head'>
          轉帳手續費
        </div>
        <div class='layout-body text-left'>
          <div class='condition'>
            <label>群組</label>
            <Select v-model="selectedGroup" style="width:200px" placeholder="選擇群組" @on-change="setGroupFee">
                <Option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</Option>
            </Select>
          </div>
          <div class='condition'>
            <label>幣別</label>
            <Select v-model="selectedCurrency" style="width:200px" placeholder="選擇幣別" @on-change="setCurrencyFee">
                <Option v-for="currency in Object.keys($store.state.currency)" :value="currency" :key="currency">{{ currency + ' ' + $store.state.currency[currency] }}</Option>
            </Select>
          </div>
          <div class="condition">
            <div class='fee' v-for="(level, index) in levels">
              <label>Level {{index+1}}</label>
              <input v-model="level.floor" disabled class="ivu-input" />
               ~
              <input v-model="level.ceil" class="ivu-input" @input="setCeil(index)" ></Input>
              <span style="margin: 0px 10px">=></span> 手續費 <input v-model="level.fee" class="ivu-input" @input="checkError"/>
              <RadioGroup v-model="level.fee_type">
                  <Radio label="fixed">
                      <span>固定</span>
                  </Radio>
                  <Radio label="percentage">
                      <span>比例</span>
                  </Radio>
              </RadioGroup>
              <div v-if="level.error" class='error-alert'>
                <Alert type="error">數值錯誤</Alert>
              </div>
            </div>
          </div>
          <div class='condition' v-if="this.levels.length">
            <div style="margin-bottom: 20px">
              <label></label>
              <Button type="success" @click="addLevel">+ 增加 Level</Button>
              <Button type="warning"  @click="removeLevel">- 刪除 Level</Button>
            </div>
            <div>
              <label></label>
              <Button size="large" type="primary" @click="update">修改</Button>
            </div>
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
  name: 'transferFee',
  data() {
    return {
      groups: [],
      selectedCurrency: '',
      selectedGroup: '',
      levels: [],
      defaultLevel: {
        floor: '0',
        ceil: '',
        fee_type: 'fixed',
        fee: "0",
        level: 1,
      },
      groupFee: {},
    }
  },
  beforeMount: function() {
    this.$store.dispatch('getGroups').then((groups)=>{
      this.groups = groups.data
    })
  },
  methods: {
    setGroupFee(){
      this.$store.dispatch('getTransferFee', {group_id: this.selectedGroup}).then((data)=>{
        this.groupFee = data
        if(this.selectedCurrency){
          this.setCurrencyFee()
        }
      })
    },
    setCurrencyFee(){
        this.levels = this.groupFee.filter((obj)=>{
          return (obj.currency == this.selectedCurrency)
        })
        let defaultLevel = Object.assign({}, this.defaultLevel)
        if(this.levels.length == 0){
          this.levels.push(defaultLevel)
        }
    },
    setCeil(index){
      if(this.levels.length > index + 1){
        this.levels[index+1].floor = this.levels[index].ceil
      }
      this.checkError()
    },
    checkError(){
      let error = false
      this.levels.forEach((level)=>{
        level.error = false
        if(
          (level.floor) *1 >= (level.ceil) *1 ||
          level.floor == '' ||
          level.ceil == '' ||
          level.fee_type == '' ||
          level.fee == ''
        ){
          level.error = true
          error = true
        }
      })
      return error
    },
    update(){
      if(this.checkError()){
        this.$forceUpdate()
        return
      }
      else{
        this.$store.dispatch('setTransferFee', {
        	"currency": this.selectedCurrency,
        	"group_id": this.selectedGroup,
          "levels": this.levels
        }).then(()=>{
          this.$Message.success('修改完成')
        })
      }
    },
    addLevel(){
      if(this.levels.length >= 5 ){
        this.$Message.error('Level 最高僅能設定五筆')
      }else if(this.levels[this.levels.length - 1].ceil == ''){
        this.$Message.error('需先填完最後一筆 Level')
      }else{
        let defaultLevel = Object.assign({}, this.defaultLevel)
        defaultLevel.floor = this.levels[this.levels.length - 1].ceil
        defaultLevel.level = this.levels.length + 1
        this.levels.push(defaultLevel)
      }

    },
    removeLevel(){
      if(this.levels.length <= 1 ){
        this.$Message.error('Level 最少需要設定一筆')
      }else{
        this.levels.pop()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.condition{
  margin-bottom: 10px;
  label{
    width: 100px;
    text-align: right;
    display: inline-block;
    margin-right: 10px;
  }
  .fee{
    margin-bottom: 10px;
  }
  .ivu-radio-group label{
    width: 40px;
    margin-left: 10px;
  }
  .error-alert{
    padding-left: 110px;
    margin-top: 10px;
  }
}
.ivu-input{
  width: 100px;
  background-color: #ffffff;
  border: 1px solid #dddee1;
}
</style>
