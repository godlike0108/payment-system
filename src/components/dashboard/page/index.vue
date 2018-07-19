<template>
    <div class="layout" >
        <Layout class="container">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">

                    <MenuItem name="1-1"  @click.native="toPath('')">
                    <Icon type="person-add" size="18"></Icon>
                        <span>註冊申請</span>
                    </MenuItem>
                    <MenuItem name="1-1-1"  @click.native="toPath('activeUser')">
                    <Icon type="person-add" size="18"></Icon>
                        <span>審核會員</span>
                    </MenuItem>
                    <MenuItem  name="1-2" @click.native="toPath('checkoutsLevel1')">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金初審</span>
                    </MenuItem>
                    <MenuItem v-if="this.$store.state.user.role_id === '1'" name="1-3" @click.native="toPath('checkoutsLevel2')">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金覆核</span>
                    </MenuItem>
                    <MenuItem name="1-4" @click.native="toPath('checkoutsApproval')">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>待撥款項</span>
                    </MenuItem>
                    <MenuItem name="1-5" @click.native="toPath('distributions')">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金紀錄</span>
                    </MenuItem>
                    <MenuItem name="1-6" @click.native="toPath('wallet')">
                        <Icon type="filing" size="18"></Icon>
                        <span>入金</span>
                    </MenuItem>
                    <MenuItem name="1-9" @click.native="toPath('walletHistories')">
                        <Icon type="filing" size="18"></Icon>
                        <span>入金紀錄</span>
                    </MenuItem>
                    <MenuItem name="1-10" @click.native="toPath('checkInApplication')">
                        <Icon type="filing" size="18"></Icon>
                        <span>入金申請</span>
                    </MenuItem>
                    <MenuItem name="1-11" @click.native="toPath('checkInRetaliation')">
                        <Icon type="filing" size="18"></Icon>
                        <span>入金回報</span>
                    </MenuItem>
                    <MenuItem name="2-1" @click.native="toPath('exchangeRate')">
                        <Icon type="calculator" size="18"></Icon>
                        <span>匯率設定</span>
                    </MenuItem>
                    <MenuItem name="2-2" @click.native="toPath('adjustment')">
                        <Icon type="calculator" size="18"></Icon>
                        <span>行政費用</span>
                    </MenuItem>
                    <MenuItem name="1-12" @click.native="toPath('members')">
                       <Icon type="person-stalker" size="18"></Icon>
                        <span>會員管理</span>
                    </MenuItem>
                    <MenuItem v-if="this.$store.state.user.role_id === '1'" name="1-13" @click.native="toPath('admins')">
                        <Icon type="coffee" size="18"></Icon>
                        <span>後台管理</span>
                    </MenuItem>
                    <MenuItem v-if="this.$store.state.user.role_id === '1'" name="1-14" @click.native="toPath('setCustomService')">
                        <Icon type="person-stalker" size="18"></Icon>
                        <span>聯絡我們</span>
                    </MenuItem>

                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                  <Row type="flex" justify="start" align="middle">
                    <Col :xs="13" :sm="4" :md="4" :lg="4">
                    <span class="title" @click="getData()">管理介面</span> </Col>
                    <Col :xs="9" :sm="16" :md="16" :lg="16"></Col>
                    <Col :xs="2" :sm="4" :md="4" :lg="4" >
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
    toPath(path){
        this.$router.push(`/dashboard/index/${path}`)
    },
    log_out(){
        this.$store.commit('log_out')
        this.$router.push('/')

    },
    ...mapGetters({
      'getData': 'getData'
    }),
  },
   created() {
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
  font-size: 1.5em;
  font-weight: 600
}
.userLine {
  margin: 10px 0 20px 0
}
 .layout{
        /* border: 1px solid #d7dde4; */
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
        background-image: linear-gradient(to right, #2c91ac 0%, #155d78 100%);
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
    @media (max-width: 400px){
        .ivu-layout-header {
            padding: 0 20px
        }
    }
</style>
