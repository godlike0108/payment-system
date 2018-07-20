<template>
    <div class="layout">
        <Layout class="container">
            <Sider class="md-hide-up" breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                  <div class='menu-info'>

                    <Row type="flex" justify="start" align="middle" class='menu-head'>
                      <Col :xs="12" :sm="12" class="text-left">
                        <span @click="log_out()">登出</span>
                      </Col>
                      <Col :xs="12" :sm="12" class="text-right">
                        <Icon @click="toggleCollapse()" type="close" size="20" class="menu-close"></Icon>
                      </Col>
                    </Row>
                    <div class="account-id">
                      {{this.$store.state.user.name}}
                    </div>
                  </div>
                  <MenuItem name="1" @click.native="toPath('currentWallet')">
                      <span>賬戶總覽</span>
                  </MenuItem>
                  <Submenu name="2">
                      <template slot="title" >
                          轉賬
                      </template>
                      <MenuItem name="2-1" @click.native="toPath('transaction')">
                          <span>轉賬</span>
                      </MenuItem>
                      <MenuItem name="2-2" @click.native="toPath('currentWallet')">
                          <span>轉帳記錄</span>
                      </MenuItem>
                      <MenuItem name="2-3" @click.native="toPath('exchange')">
                          <span>匯率轉換</span>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="3">
                    <template slot="title" >
                        出金
                    </template>
                    <MenuItem name="3-1" @click.native="toPath('checkout')">
                        <span>出金申請</span>
                    </MenuItem>
                    <MenuItem name="3-2" @click.native="toPath('checkoutList')">
                        <span>出金記錄</span>
                    </MenuItem>
                  </Submenu>
                  <Submenu name="4">
                    <template slot="title" >
                        入金
                    </template>
                    <MenuItem name="4-1" @click.native="toPath('checkIn')">
                        <span>入金申請</span>
                    </MenuItem>
                    <MenuItem name="4-2" @click.native="toPath('checkInList')">
                        <span>入金記錄</span>
                    </MenuItem>
                  </Submenu>

                  <Submenu name="5">
                    <template slot="title" >
                        設置
                    </template>
                    <MenuItem name="5-1" @click.native="toPath('account')">
                        <span>常用帳戶</span>
                    </MenuItem>
                    <MenuItem name="5-2" @click.native="toPath('userProfile')">
                        <span>修改資訊</span>
                    </MenuItem>
                    <MenuItem name="5-3" @click.native="toPath('customerService')">
                        <span>聯絡我們</span>
                    </MenuItem>
                  </Submenu>

                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                  <Row align="middle">
                    <Col :xs="1" :sm="1" :md="0" :lg="0">
                      <span class='menu-trigger'>
                        <i class="ivu-icon ivu-icon-navicon-round" @click="toggleCollapse()"></i>
                      </span>
                    </Col>
                    <Col :xs="23" :sm="23" :md="4" :lg="4">
                      <span class="title" @click="getData()"><img src="../../assets/w.png" alt=""></span>
                    </Col>
                    <Col :xs="0" :sm="0" :md="14" :lg="14">
                      <ul class='main-menu'>
                        <li :class="{active: (menu==0)}" @click="menuActive(0);toPath('currentWallet');"><span>賬戶總覽</span></li>
                        <li :class="{active: (menu==1)}" @click="menuActive(1)">
                          <span>轉賬</span>
                          <Icon type="chevron-down"></Icon>
                          <ul class='main-submenu' v-if="menu==1">
                            <li :class="{active: (submenu==1)}" @click.stop="submenuActive(1);toPath('transaction')">
                              <span>轉賬</span>
                            </li>
                            <li :class="{active: (submenu==2)}" @click.stop="submenuActive(2);toPath('currentWallet')">
                              <span>轉賬記錄</span>
                            </li>
                            <li :class="{active: (submenu==3)}" @click.stop="submenuActive(3);toPath('exchange')">
                              <span>匯率轉換</span>
                            </li>
                          </ul>
                        </li>
                        <li :class="{active: (menu==2)}" @click="menuActive(2)">
                          <span>出金</span>
                          <Icon type="chevron-down"></Icon>
                          <ul class='main-submenu' v-if="menu==2">
                            <li :class="{active: (submenu==1)}" @click.stop="submenuActive(1);toPath('checkout')">
                              <span>出金申請</span>
                            </li>
                            <li :class="{active: (submenu==2)}" @click.stop="submenuActive(2);toPath('checkoutList')">
                              <span>出金記錄</span>
                            </li>
                          </ul>
                        </li>
                        <li :class="{active: (menu==3)}" @click="menuActive(3)">
                          <span>入金</span>
                          <Icon type="chevron-down"></Icon>
                          <ul class='main-submenu' v-if="menu==3">
                            <li :class="{active: (submenu==1)}" @click.stop="submenuActive(1);toPath('checkIn')">
                              <span>入金申請</span>
                            </li>
                            <li :class="{active: (submenu==2)}" @click.stop="submenuActive(2);toPath('checkInList')">
                              <span>入金記錄</span>
                            </li>
                          </ul>
                        </li>
                        <li :class="{active: (menu==4)}" @click="menuActive(4)">
                          <span>設置</span>
                          <Icon type="chevron-down"></Icon>
                          <ul class='main-submenu' v-if="menu==4">
                            <li :class="{active: (submenu==1)}" @click.stop="submenuActive(1);toPath('account')">
                              <span>常用帳戶</span>
                            </li>
                            <li :class="{active: (submenu==2)}" @click.stop="submenuActive(2);toPath('userProfile')">
                              <span>修改資訊</span>
                            </li>
                            <li :class="{active: (submenu==3)}" @click.stop="submenuActive(3);toPath('customerService')">
                              <span>聯絡我們</span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </Col>
                    <Col :xs="0" :sm="0" :md="6" :lg="6" >
                      {{this.$store.state.user.name}} | <span class='clickable' @click="log_out()">登出</span>
                      <!-- <Icon  @click="log_out()" type="log-out" size="22" :style="{color: '#fff'}"></Icon> -->
                    </Col>
                  </Row>
                </Header>
                <div v-if="menu" class='submenu-content'>

                </div>
                <Content :style="{margin: '20px', minHeight: '220px',padding:'20px'}">

                  <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
import '@/theme/frontend.less'
export default {
  name: 'HelloWorld',
  data () {
     return {
        isCollapsed: false,
        menu: 0,
        submenu: 0,
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
      toPath(path){
        if(path == 'checkout' && this.$store.state.user.id_card_status_id != '1'){
            this.$Message.error('出金申請需要經過身份驗證')
            // this.$router.push(`/index/${path}`)
        }else{
          this.$router.push(`/index/${path}`)
        }
      },
      log_out(){
          this.$store.commit('log_out')
          this.$router.push('/')
      },
      ...mapGetters({
        'getData': 'getData'
      }),
      toggleCollapse () {
          this.isCollapsed = !this.isCollapsed
      },
      menuActive(menuIndex){
        this.menu = menuIndex
        this.submenu = 0
      },
      submenuActive(submenuIndex){
        this.submenu = submenuIndex
      }
  },
   created() {
    this.$store.commit('setData')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.money {
  color: red;
  font-size: 2em
}
.user {
  font-size: 2em
}
.title {
  position: relative;
  top: 6px;
}
.userLine {
  margin: 10px 0 20px 0
}
.layout{

  background: #f5f7f9;
  position: relative;
  /* border-radius: 4px; */
  overflow: hidden;
  min-height: 100vh
}
.container {
  min-height:100vh
}
.layout-header-bar{
    background-image: linear-gradient(to bottom, rgb(2,190,247) 0%, rgb(0,74,139) 100%);
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.menu-item{
  padding: 10px;
}
.menu-item > li{
  border-bottom: 1px solid #5C96C2;
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    /* width: 69px; */
    /* text-overflow: ellipsis; */
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
@media (max-width: 400px){
    .ivu-layout-header {
        padding: 0 20px
    }
}
.menu-trigger{
  font-size: 28px;
  color: #fff;
}
.menu-info{
  font-size: 18px;
  color: #fff;
  padding-bottom: 30px;
  border-bottom: 1px solid #5C96C2;
}
.menu-head{
  margin-top: 8px;
  margin-bottom: 28px;
}
.menu-close{
  position: relative;
  top: -2px;
  cursor: pointer;
}

.ivu-layout-header > div{
  max-height: 64px;
}
.layout-header-bar{
  font-size: 18px;
  color: #fff;
}
.main-menu{
  height: 64px;
}
.main-submenu{
  width: 300px;
  line-height: 75px;
}
.main-menu > li, .main-submenu > li{
  float: left;
  width: 100px;
  cursor: pointer;
  list-style: none;
}
.main-submenu > li{
  color: rgb(74,74,74);
  font-size: 18px;
  position: relative;
}
.main-submenu > li.active::after{
  content:' ';
  position: absolute;
  bottom: -18px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 18px 15px 0 15px;
  border-color: #ffffff transparent transparent transparent;
  width: 1px;
  margin: 0 auto;
  left: 0;
  right: 0;
}
.main-menu > li > span{
  border-bottom: 1px solid rgba(0,0,0,0);
}
.main-menu > li:hover > span, .main-menu > li.active > span{
  border-bottom: 1px solid rgb(255,255,255);
}
.submenu-content{
  background: #fff;
  height: 75px;
  width: 100%;
}

// customize
.ivu-layout-sider, .ivu-menu, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-submenu-title,
.ivu-menu-submenu,
.ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover{
  background-color: rgb(0,108,175)!important;
  background-image: none!important;
}
.ivu-layout-sider-zero-width-trigger{
  display: none;
}
.ivu-menu-item,
.ivu-menu-submenu-title{
  text-align: left;
  font-size: 18px;
  padding-left: 16px!important;
  padding-right: 0px!important;
}
.ivu-menu-submenu .ivu-menu-item{
  padding-left: 30px!important;
  padding-top: 0px;
  font-size: 16px;
}




// end

</style>
