<template>
 <div>
     <!-- <Row type="flex" justify="end" align="top" class="userLine">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Row type="flex" justify="end" align="top">
            <Col :xs="24" :sm="8" :md="8" :lg="6">使用者：<span class="user">yoyo</span></Col>
            <Col :xs="24" :sm="8" :md="8" :lg="6">剩餘金額：<span class="money">5000</span></Col>
            </Row>
        </Col>

        </Row> -->
        <Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="用戶設定" name="name1">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="20" :sm="16" :md="16" :lg="16">
                        <i-form ref="formInline" :model="formInline" :rules="ruleInline" >
                            
                            <form-item prop="user">
                                <i-input  v-model="this.$store.state.updateProfile.name" :placeholder="this.$store.state.updateProfile.name || '用戶名稱'"   clearable>
                                    <icon type="happy" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input  v-model="this.$store.state.user.email" :placeholder="this.$store.state.user.email" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" disabled>
                                    <icon type="email" size="20" slot="prepend"></icon>    
                                </i-input>
                            </form-item>
                            <form-item >
                                <i-input  v-model="this.$store.state.user.mobile" :placeholder="this.$store.state.user.mobile" disabled>
                                    <Icon type="ios-telephone" size="20" slot="prepend"></Icon>
                                </i-input>
                            </form-item>
                            <form-item prop="username">
                                <i-input  v-model="this.$store.state.updateProfile.username" :placeholder="this.$store.state.updateProfile.username || '用戶帳號'"   clearable>
                                    <icon type="person" size="20" slot="prepend"></icon>
                                </i-input>
                            </form-item>
                            <form-item prop="password">
                                <i-input ref="togglePassword" :type="type"  v-model="this.$store.state.updateProfile.password" :placeholder="this.$store.state.updateProfile.password || '用戶密碼'"  >
                                    <icon type="locked" size="20" slot="prepend"></icon>
                                    <Icon ref="toggleIcon" @click="toggleIcon" :type="eyesIcon" size="20" slot="append"></Icon>
                                    
                                </i-input>
                            </form-item>
                            <form-item>
                                <i-button type="primary"  @click="updateProfile">儲存變更</i-button>
                            </form-item>
                        </i-form>
                    </Col>
                </Row>
            </TabPane>
            </Tabs>
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
        isCollapsed: false,
        eyesIcon: 'eye-disabled',
        type: 'password',
        formInline: {
            user: 'yoyo',
            email: 'doid@doijd.dsio',
            phone: '09109999999',
            password: '1234',
            username: 'yoyo01'
        },
        ruleInline: {
            user: [{
                required: true,
                message: '請填入姓名',
                trigger: 'blur'
            }],
            email: [{
                    required: true,
                    message: '請填入信箱',
                    trigger: 'blur'
                }
            ],
            phone:[{
                required: true,
                message: '請填入電話號碼',
                trigger: 'blur'
            },
            {
                type: 'string',
                min: 10,
                max:10,
                message: '請填入手機號碼共10碼',
                trigger: 'blur'
            }]
        }
    }
  },
  computed: {
      menuitemClasses: function () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
          ]
      }
  },
  methods: {
        ...mapActions({
        'updateProfile' : 'updateProfile',
        }),
      toggleIcon(){
          this.eyesIcon = this.eyesIcon === 'eye-disabled' ? 'eye' : 'eye-disabled'
          this.type = this.type === 'password' ? 'text' : 'password'
         
        // if (this.eyesIcon = 'eye'){
        //   return  this.eyesIcon = 'eye-disabled'
        // }else {
        //  return  this.eyesIcon = 'eye'
        // }
        
      }
  
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.money {
  color: red;
  font-size: 2em
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
</style>
