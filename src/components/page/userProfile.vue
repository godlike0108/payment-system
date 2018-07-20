<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
          <div class='layout-container'>
            <div class='layout-head'>
              修改資訊
            </div>
            <div class='layout-body'>
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="16" :md="16" :lg="16">
                        <!-- <Alert v-if='!user.id_card_status_id' type="warning" show-icon>帳號未審核</Alert> -->

                        <i-form :model='user' ref='form' :label-width="90">
                          <!-- <FormItem label="電話">
                              <Input v-model="user.mobile" placeholder=""></Input>
                          </FormItem> -->
                          <FormItem label="姓名">
                              <Input v-model="user.name" placeholder="使用者姓名"></Input>
                          </FormItem>
                          <FormItem label="生日" class='text-left'>
                              <DatePicker type="date" placeholder="請選擇日期" v-model="user.birthday"></DatePicker>
                          </FormItem>
                          <FormItem label="身分證字號">
                              <Input v-model="user.id_number" placeholder="請輸入身分證字號"></Input>
                          </FormItem>
                          <FormItem label="性別" class='text-left'>
                              <RadioGroup v-model="user.gender">
                                  <Radio label="1">男性</Radio>
                                  <Radio label="2">女性</Radio>
                              </RadioGroup>
                          </FormItem>
                          <FormItem label="戶籍地址">
                              <Input v-model="user.permanent_address" placeholder="請輸入戶籍地址"></Input>
                          </FormItem>
                          <FormItem label="發證日期" class='text-left'>
                              <DatePicker type="date" placeholder="請選擇日期" v-model="user.id_card_issue_date"></DatePicker>
                          </FormItem>
                          <FormItem label="新密碼" error="123">
                              <Input type="password" v-model="user.password" placeholder="請輸入新密碼"></Input>
                          </FormItem>
                          <FormItem label="舊密碼" v-show="user.password" :error="old_password_error">
                              <Input type="password" v-model="user.oldpassword" placeholder="若要更新密碼，需要舊密碼"></Input>
                          </FormItem>
                          <FormItem label="身分證正面照" class='text-left' v-if="user.id_card_status_id != 1">
                            <Upload :before-upload="handleUploadFront" action=''>
                                <Button type="ghost" icon="ios-cloud-upload-outline">正面照</Button>
                                <span v-if='files.front.name'> - {{files.front.name}}</span>
                            </Upload>
                          </FormItem>
                          <FormItem label="身分證背面照" class='text-left' v-if="user.id_card_status_id != 1">
                            <Upload :before-upload="handleUploadBack" action=''>
                                <Button type="ghost" icon="ios-cloud-upload-outline">背面照</Button>
                                <span v-if='files.back.name'> - {{files.back.name}}</span>
                            </Upload>
                          </FormItem>
                          <FormItem>
                            <Button type="primary" @click="updateProfile">儲存資料</Button>
                          </FormItem>
                        </i-form>
                    </Col>
                </Row>
            </div>
          </div>
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
       user: {
         password: '',
         oldpassword: '',
       },
       old_password_error: '',
       files:{
         front: {},
         back:{},
       }
    }
  },
  mounted: function(){
    this.$store.dispatch('getUser').then((res)=>{
      this.user = res.data
      this.user.gender = this.user.gender + ""
    })
  },
  computed: {
  },
  methods: {
    handleUploadFront(file){
      this.files.front = file
      return false;
    },
    handleUploadBack(file){
      this.files.back = file
      return false;
    },
    checkPassword(){
      this.old_password_error = (!this.user.oldpassword && this.user.password)? '修改密碼需要輸入舊密碼' : ''
    },
    updateProfile(){
      if(this.old_password_error){
        this.$Message.error('儲存失敗')
      }else{
        this.$store.dispatch('updateProfile', this.user).then((res)=>{
            if(this.files.front.name || this.files.back.name){
              const uploadMsg = this.$Message.loading({
                  content: '檔案上傳中...',
                  duration: 0
              });
              let uploads = [];
              if(this.files.front.name){
                let data = {
                  'id-card': this.files.front,
                  type_id: 0
                }
                uploads.push(this.$store.dispatch('uploadFile', data))
              }
              if(this.files.back.name){
                let data = {
                  'id-card': this.files.back,
                  type_id: 1
                }
                uploads.push(this.$store.dispatch('uploadFile', data))
              }
              Promise.all(uploads).then(()=>{
                uploadMsg()
                this.$Message.success('儲存成功')
              })

            }else{
                this.$Message.success('儲存成功')
            }
        })
      }
    },
  },
  watch: {
    'user.password': function(){
      this.checkPassword()
    },
    'user.oldpassword': function(){
      this.checkPassword()
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 2em
}
.success {
		color: #19be6b;
		font-size: 1.2em
	}
.error {
		color:#ed3f14;
		font-size:1.2em
	}
.user {
  font-size: 2em
}
.title {
  color: #fff;
  font-size: 2em;
  font-weight: 600
}
.userLine {
  margin: 10px 0 20px 0
}
 .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        min-height: 100vh
    }
    .container {
      min-height:100vh
    }
    .layout-header-bar{
        background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .walletButton {
		width: 220px;
		height: 38px;
		color: #fff;
		/* background-color: rgb(238, 238, 238); */
		background-image:linear-gradient(to bottom, #2c91ac 0%, #155d78 100%);
	}
</style>
