<template>
 <div>
    <Row type="flex" justify="center" align="middle">
        <Col :xs="24" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="全部" name="name1">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="20" :md="20" :lg="20">
                     <Table height="auto" :columns="columns1" :data="get_vipServies" class="service_table"></Table>
                      <Table height="auto" :columns="columns2" :data="get_servies" class="service_table"></Table>
        <!-- <Page :total="get_account_total" @on-change="change" style="margin:15px"></Page> -->
                    <!-- <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >VIP客服人員名稱</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_vipServies">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >{{item.name}}</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14">
                                    <span class="currency">{{item.contact}}</span>
                                </Col>
                               
                            </Row>
                        </li>
                    </ul> -->
                    <!-- <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >一般客服人員名稱</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_servies">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >{{item.name}}</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">{{item.contact}}</span></Col>
                            </Row>
                        </li>
                    </ul> -->
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="VIP" name="name2">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="20" :md="20" :lg="20">
                     <Table height="auto" :columns="columns1" :data="get_vipServies" class="service_table"></Table>
                    <!-- <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >VIP客服人員名稱</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_vipServies">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >{{item.name}}</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14">
                                    <span class="currency">{{item.contact}}</span>
                                </Col>
                               
                            </Row>
                        </li>
                    </ul> -->
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="客服" name="name3">
                <Row type="flex" justify="center" align="middle">
                    <Col :xs="24" :sm="20" :md="20" :lg="20">
                      <Table height="auto" :columns="columns2" :data="get_servies" class="service_table"></Table>
                    <!-- <ul class="servies_member">
                        <li class="head">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >一般客服人員名稱</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">聯絡方式</span></Col>
                            </Row>
                        </li>
                        <li v-for="(item,index) in get_servies">
                            <Row>
                                <Col :xs="10" :sm="10" :md="10" :lg="10" >{{item.name}}</Col>
                                <Col :xs="14" :sm="14" :md="14" :lg="14"><span class="currency">{{item.contact}}</span></Col>
                            </Row>
                        </li>
                    </ul> -->
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
          columns1: [
                    {
                        title: 'VIP客服人員名稱',
                        key: 'name',
                        minWidth:100
                    },
                    {
                        title: '聯絡方式',
                        key: 'contact',
                        minWidth:100
                    },
                   ],
        columns2: [
                    {
                        title: '客服人員名稱',
                        key: 'name',
                        minWidth:100
                    },
                    {
                        title: '聯絡方式',
                        key: 'contact',
                        minWidth:100
                    },
                   ]
    }
  },
  computed: {
      get_servies(){
          return this.$store.getters.get_servies
      },
      get_vipServies(){
          return this.$store.getters.get_vipServies
      }
  },
  methods: {
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
.delete{
    background: #ed3f14;
    border: 0px;
    line-height: 20px
    
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
    .servies_member{
        list-style: none;
        margin: 20px 0;
        text-align: left;
    }
    .servies_member li {
        border-bottom: 1px solid #ddd;
        padding: 10px 20px;
        font-size: 1.3em;
        background: #f5f5f5
    }
   .servies_member .head{
        background-image:linear-gradient(to right, #2c91ac 0%, #155d78 100%);
       color: #fff;
       font-size: 0.8em;
       font-weight: 800
   }
   .service_table{
       margin: 30px auto
   }
</style>
