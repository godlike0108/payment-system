<template>
    <div class="layout" >
        <Layout class="container">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                  
                    <MenuItem name="1-1"  @click.native="toIndex()">
                    <Icon type="person-add" size="18"></Icon>
                        <span>註冊申請</span>
                    </MenuItem>
                  
                    <MenuItem  name="1-2" @click.native="toCheckoutsLevel1()">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金初審</span>
                    </MenuItem>
                    <MenuItem v-if="this.$store.state.user.role_id === '1'" name="1-3" @click.native="toCheckoutsLevel2()">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金覆核</span>
                    </MenuItem>
                    <MenuItem name="1-4" @click.native="toCheckoutsApproval()">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>待撥款項</span>
                    </MenuItem>
                    <MenuItem name="1-5" @click.native="toDistributions()">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金紀錄</span>
                    </MenuItem>
                    <MenuItem name="1-6" @click.native="toWallet()">
                        <Icon type="filing" size="18"></Icon>
                        <span>撥款</span>
                    </MenuItem>
                    <MenuItem name="1-9" @click.native="toWalletHistories()">
                        <Icon type="filing" size="18"></Icon>
                        <span>撥款紀錄</span>
                    </MenuItem>
                    <MenuItem name="1-10" @click.native="toMembers()">
                       <Icon type="person-stalker" size="18"></Icon>
                        <span>會員管理</span>
                    </MenuItem>
                    <MenuItem v-if="this.$store.state.user.role_id === '1'" name="1-11" @click.native="toAdmins()">
                        <Icon type="coffee" size="18"></Icon>
                        <span>後台管理</span>
                    </MenuItem>
                  
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                  <Row type="flex" justify="start" align="middle">
                    <Col :xs="4" :sm="4" :md="4" :lg="4">
                    <span class="title" @click="getData()">白金線上支付帳戶 管理介面</span> </Col>
                    <Col :xs="16" :sm="16" :md="16" :lg="16"></Col>
                    <Col :xs="4" :sm="4" :md="4" :lg="4" >
                    <Icon @click="log_out()" type="log-out" size="22" :style="{color: '#fff'}"></Icon></Col>
                  </Row>
                   
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '220px',padding:'20px'}">
                  <router-view></router-view>
                  
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
     return {
        isCollapsed: false
    };
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
    toSignupRequests(){
      this.$router.push('/dashboard/index/signupRequests');
    },
    toCheckoutsLevel1(){
      this.$router.push('/dashboard/index/checkoutsLevel1');
    },
    toCheckoutsLevel2(){
      this.$router.push('/dashboard/index/checkoutsLevel2');
    },
    toCheckoutsApproval(){
      this.$router.push('/dashboard/index/checkoutsApproval');;
    },
    toDistributions(){
      this.$router.push('/dashboard/index/distributions');
    },
    toWallet(){
      this.$router.push('/dashboard/index/wallet');
    },
    toWalletHistories(){
      this.$router.push('/dashboard/index/walletHistories');
    },
    toAdmins(){
      this.$router.push('/dashboard/index/admins');
    },
    toMembers(){
      this.$router.push('/dashboard/index/members');
    },
    toIndex(){
        this.$router.push('/dashboard/index/')
    },
    log_out(){
        this.$store.commit('log_out')
        this.$router.push('/dashboard')

    },
    ...mapGetters({
      'getData': 'getData'
    }),
  },
   created() {
    //    console.log('created')
    this.$store.commit('setData')
   
    
    
    
 
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
        background-image: linear-gradient(to left, #1e3c72 0%, #2a5298 100%);
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
