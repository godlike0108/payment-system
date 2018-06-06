<template>
    <div class="layout">
        <Layout class="container">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                  
                    <MenuItem name="1-1"  @click.native="toIndex()">
                        <Icon type="ios-navigate" ></Icon>
                        <span>轉帳</span>
                    </MenuItem>
                  
                    <MenuItem name="1-2" @click.native="toTranstion()">
                        <Icon type="ios-calculator" size="18"></Icon>
                        <span>出金</span>
                    </MenuItem>
                    <MenuItem name="1-3" @click.native="toProfile()">
                        <Icon type="happy"></Icon>
                        <span>用戶設定</span>
                    </MenuItem>
                  
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                  <Row type="flex" justify="start" align="middle">
                    <Col :xs="4" :sm="4" :md="4" :lg="4">
                    <span class="title" @click="getData()">Wallet</span> </Col>
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
      toProfile(){
          this.$router.push('/index/userProfile')
      },
      toIndex(){
         
          this.$router.push('/index/')
      },
      toTranstion(){
        this.$router.push('/index/checkout')
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
    this.$store.dispatch('userGetChekout')
    this.$store.dispatch('userGetwalletHistories')
    
 
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
