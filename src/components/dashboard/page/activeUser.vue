<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">

    <div class='layout-container'>
      <div class='layout-head'>
        審核會員
      </div>
      <div class='layout-body'>
        <div class="ivu-table-wrapper">
          <div class="ivu-table ivu-table-border">
            <div class="ivu-table-header">
              <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                  <tr>
                    <th class="" v-for="field in fields" :width="field.width">
                      <div  class="ivu-table-cell">
                        <span class="">{{field.label}}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody class="ivu-table-tbody">
                  <tr v-for="user in users" class="ivu-table-row">

                    <td class="" v-for="field in fields">
                      <div class="ivu-table-cell">
                        <span v-if="field.key == 'files'" class="file" @click="showFile(user)">
                          {{user.documents.length}}
                        </span>
                        <span v-else-if="field.key == 'created_at'" class="" v-html="moment(user.created_at)"></span>
                        <span v-else-if="field.key == 'gender'" class="">{{gender(user.gender)}}</span>
                        <span v-else-if="field.key == 'active'" class="">
                          <Select @on-change="changeState(user.id_card_status_id, user.id)" v-model="user.id_card_status_id" style="width:100px;" :class="optionColor(user.id_card_status_id)" :placeholder='optionText(user.id_card_status_id)'>
                              <Option value="-1" ><span class='option-m1'>審核拒絕</span></Option>
                              <Option value="0" ><span class='option-0'>未審核</span></Option>
                              <Option value="1" ><span class='option-1'>送審中</span></Option>
                              <Option value="2" ><span class='option-2'>審核通過</span></Option>
                          </Select>
                        </span>
                        <span v-else class="">{{user[field.key]}}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Page :total="page_total" :page-size='page_size' @on-change="changePage" style="margin:15px"></Page>
        <Modal
            v-model="viewFile"
            okText="關閉"
            cancel-text=""
            :title="selectedUser.name + ' 的檔案'"
            @on-ok="">
            <div>身分證正面照：</div>
            <div v-html='getImageFront'></div>
            <div style='margin-top: 10px;'>身分證背面照：</div>
            <div v-html='getImageBack'></div>
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
import config from '@/envConfig/index.js'
const baseURL = config.baseURL
export default {
  data() {
    return {
      fields: [
        {
          label: '會員名稱',
          key: 'name',
          width: '120xp'
        },
        {
          label: '生日',
          key: 'birthday',
          width: '100px'
        },
        {
          label: '身分證字號',
          key: 'id_number',
          width: '110px'
        },
        {
          label: '性別',
          key: 'gender',
          width: '70px'
        },
        {
          label: '戶籍地址',
          key: 'permanent_address',
          width: '150px'
        },
        {
          label: '發證日期',
          key: 'id_card_issue_date',
          width: '100px'
        },
        {
          label: '加入日期',
          key: 'created_at',
          width: '100xp'
        },
        {
          label: '上傳檔案',
          key: 'files',
          width: '90xp'
        },
        {
          label: '審核',
          key: 'active',
          width: '120px'
        },
      ],
      viewFile: false,
      selectedUser: {},
      image:{
        front: '',
        back: '',
      },
      users: [],
      page_total: 0,
      page_size: 15,
      current_page: 0,
      allow_change_state: false,
    }
  },
  beforeMount: function() {
    this.changePage(0)
  },
  computed: {
    getImageFront(){
      if(this.image.front == 'loading'){
        return '讀取中...'
      }else if(this.image.front){
        return `<img class='responsive' src=${this.image.front} />`
      }
      else{
        return '無照片'
      }
    },
    getImageBack(){
      if(this.image.back == 'loading'){
        return '讀取中...'
      }else if(this.image.back){
        return `<img class='responsive' src=${this.image.back} />`
      }
      else{
        return '無照片'
      }
    },
  },
  methods: {
    changeState(state, id){
      if(this.allow_change_state){
          this.$store.dispatch('changeIDState', {
            id_card_status_id: parseInt(state),
            user: id,
          }).then((res)=>{
            this.$Message.success('修改完成')
          }).catch(()=>{
            this.$Message.error('修改失敗')
            this.changePage(this.current_page)
          })
      }
    },
    optionColor(active){
      switch(active){
        case '0':
          return 'option-0';
          break;
        case '1':
          return 'option-1';
          break;
        case '-1':
          return 'option-m1';
          break;
        case '2':
          return 'option-2';
          break;
      }
    },
    optionText(active){
      switch(active){
        case '0':
          return '未審核';
          break;
        case '1':
          return '送審中';
          break;
        case '2':
          return '審核通過';
          break;
        case '-1':
          return '審核拒絕';
          break;
      }
    },
    changePage(page){
      this.current_page = page
      let self = this
      this.allow_change_state = false
      this.$store.dispatch('getPendingUsers',page).then((res)=>{
        this.users = res.data.data.map((user)=>{
          user.id_card_status_id = user.id_card_status_id + ""
          return user
        })
        this.page_total = res.data.total
        setTimeout(()=>{
          this.allow_change_state = true
        }, 100)
      })
    },
    moment(date){
      return this.$moment(date+' +0000').format('YYYY-MM-DD[</br>]HH:mm:ss')
    },
    gender(data){
      var gender = ''
      switch(data){
        case 1:
          gender = '男'
          break;
        case 2:
          gender = '女'
          break;
        default:
          gender = ''
      }
      return gender
    },
    showFile(user){
      this.selectedUser = user
      this.viewFile = true
      this.image.back = ''
      this.image.front = ''
      this.selectedUser.documents.forEach((doc)=>{
        let type = (doc.type_id)? 'back':'front'
        this.image[type] = 'loading'
        let url = `${baseURL}/api/users/${this.selectedUser.id}/${doc.reference}`
        this.$store.dispatch('getImage', url).then((res)=>{
          this.image[type] = "data:" + res.headers["content-type"] + ";base64," + new Buffer(res.data, 'binary').toString('base64')
        })
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.ivu-table table{
  width: 100%;
}
th, td{
  text-align: center!important;
}
.option-0{

}
.option-2{
  color: green;
}
.option-m1{
  color: red;
}
.ivu-select-item-selected.ivu-select-item-focus,
.ivu-select-item-selected, .ivu-select-item-selected:hover{
  background-color: #eee;
}
.ivu-select-item-selected, .ivu-select-item-selected:hover{
  color: inherit;
}
.file{
  padding: 2px;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
  display: inline-block;
}
.ivu-table-header{
  overflow: auto;
}

</style>
