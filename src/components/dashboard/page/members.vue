<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col :xs="24" :sm="20" :md="20" :lg="20">
    <Tabs value="name1">
      <TabPane label="會員清單" name="name1">
        <div class='text-left' style='float: left; margin-bottom: 10px;'>
          <label style='width: 200px;'>
            搜尋名稱：
          </label>
          <Input v-model="query" style='width: 200px;'></Input>
          <Button @click="change(1)">搜尋</Button>
        </div>
        <div class='text-right' style='float: right; margin-bottom: 10px;'>
          <label style='width: 200px;'>
            篩選群組：
          </label>
          <Select class='text-center' style='width: 150px;' v-model="selectedGroup" @on-change="changeGroup" placeholder='全部'>
            <Option value="all"><span>全部</span></Option>
            <Option v-for="group in groups" :key="group.id" :value="group.id"><span>{{group.name}}</span></Option>
          </Select>
        </div>
        <div class='clearfix'></div>
        <Table ref='table' height="500" :columns="columns1" :data="get_user_list"></Table>
      </TabPane>
    </Tabs>
    <Page :total="get_user_list_page_total" @on-change="change" style="margin:15px"></Page>
    </Col>
    <Modal v-model="showGroupsModal" okText="修改" cancel-text="取消" title="設定群組" @on-ok="updateGroup">
      <i-form :label-width="80">
        <FormItem label="群組名稱">
          <RadioGroup v-model="selectedMemberGroup">
            <Radio v-for="group in groups" :key="group.id" :label="group.id">
                <span>{{group.name}}{{group.id}}</span>
            </Radio>
        </RadioGroup>
        </FormItem>
      </i-form>
    </Modal>
    <Modal v-model="showWalletsModal" cancel-text="" okText="關閉" title="使用者錢包">
      <div v-for="wallet in wallets">
        <div class='wallet-label'>{{wallet.currency}} {{$store.state.currency[wallet.currency]}}錢包</div>
        <div class='wallet-value'>{{wallet.balance}}</div>
      </div>
    </Modal>
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
  name: 'members',
  data() {
    return {
      query: '',
      groups: [],
      wallets: [],
      selectedGroup: 'all',
      selectedPage: 0,
      selectedMember: {},
      selectedMemberGroup: '',
      showGroupsModal: false,
      showWalletsModal: false,
      columns1: [

        {
          title: '會員名稱',
          key: 'name',
          minWidth: 80

        },
        {
          title: '會員代號',
          key: 'username',
          minWidth: 80

        },
        {
          title: '手機',
          key: 'mobile',
          minWidth: 100

        },
        // {
        //     title: '餘額',
        //     key: 'balance',
        //     minWidth:100
        //
        // },
        {
          title: 'email',
          key: 'email',
          width: 170,
        },
        {
          title: '創建時間',
          key: 'created_at',
          width: 100,
        },
        {
          title: '修改/刪除',
          minWidth: 190,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'default',
                  size: 'small'

                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showWalletsModal = true
                    this.wallets = []
                    this.$store.dispatch('getMember', params.row.id).then((res)=>{
                      this.wallets = res.data.wallets
                    })
                  }
                }
              }, '錢包'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'

                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showGroupsModal = true
                    this.$store.dispatch('getMember', params.row.id).then((res)=>{
                      res.data.groups = res.data.groups.map(obj => obj.group_id)
                      this.selectedMember = res.data
                      this.selectedMemberGroup = res.data.groups[0]
                    })
                  }
                }
              }, '群組'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'

                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$store.commit('reset_reset_user_id')
                    this.show(params.index)
                  }
                }
              }, '修改')
              , h('Button', {
                props: {
                  type: 'error',
                  size: 'small'

                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '刪除')

            ]);
          }
        }

      ]
    }
  },
  beforeMount: function() {
    this.getGroups()
  },
  computed: {
    get_user_list() {
      return this.$store.getters.get_user_list.data.map(item => {
        if (item.wallets[0] != undefined) {
          item.balance = item.wallets[0].balance
        } else {
          item.balance = '0'
        }
        if (item.created_at) {
          item.created_at = this.$moment(item.created_at + ' +0000')
            .format('YYYY-MM-DD HH:mm:ss')
        }
        if (item.balance) {
          let num = new Number(item.balance);
          let balance = num.toFixed(2)
          item.balance = balance
        }
        return item

      })
    },
    get_user_list_page_total() {
      return this.$store.getters.get_user_list.page_total
    }
  },
  methods: {
    change(page) {
      if(page) this.selectedPage = page
      this.$store.dispatch('show_user', {page: this.selectedPage, group: this.selectedGroup, query: this.query, callback: ()=>{
        this.$refs.table.$forceUpdate()
      }})
    },
    show(index) {
      let _vm = this
      this.$Modal.confirm({
        onOk: () => {
          var phone = _vm.$store.state.admin.reset_user.phone
          var email = _vm.$store.state.admin.reset_user.email

          let phoneRule = /^886[0]?9[0-9]{8}$/
          let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

          if (phone && !phoneRule.test(phone)) {
            this.$Message.error('電話格式錯誤')
          } else if (email && !emailRule.test(email)) {
            this.$Message.error('Email 格式錯誤')
          } else {
            this.$Message.info('確認送出');
            _vm.reset_user_id(index)
          }

        },
        onCancel: () => {
          _vm.$store.commit('reset_reset_user_id')
        },
        render: (h) => {
          return h('div', [
            h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '用戶密碼 6~12位英文數字'
              },
              style: {
                marginTop: '15px'
              },
              on: {
                input: (val) => {
                  this.$store.state.admin.reset_user.password = val
                }
              },

            }), , h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '請輸入用戶手機新 格式為：886'
              },
              style: {
                marginTop: '15px'
              },
              on: {
                input: (val) => {

                  this.$store.state.admin.reset_user.phone = val
                }
              },

            }), , h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '請輸入用戶新 e-mail '
              },
              style: {
                marginTop: '15px'
              },
              on: {
                input: (val) => {
                  this.$store.state.admin.reset_user.email = val
                }
              },

            })
          ])
        }
      })
    },
    remove(index) {
      let _vm = this
      let _index = index
      this.$Modal.confirm({
        title: `刪除會員資料 `,
        content: `<p style="font-size:1.4em">確認刪除<h2>${this.$store.state.admin.user_list.data[index].name}</h2>的會員資料嗎？</p>`,
        onOk: () => {
          this.$Message.info('確認送出');
          _vm.$store.dispatch('remove_user', { id: _index, callback: ()=>{
            this.change()
          }})
        },
      })

    },
    reset_user_id(index) {
      let phone = this.$store.state.admin.reset_user.phone
      let email = this.$store.state.admin.reset_user.email
      this.$store.state.admin.reset_user.user_id = this.$store.state.admin.user_list.data[index].id

      this.$store.dispatch('update_user_id', {index, callback: ()=>{
        this.change()
      }})
    },
    updateGroup(){
      this.$store.dispatch('joinGroups', {user: this.selectedMember.id, group: this.selectedMemberGroup}).then((res)=>{
        this.$Message.success('修改完成')
        this.showGroupsModal = false
        this.selectedMember = {}
      })
    },
    getGroups(){
      this.$store.dispatch('getGroups').then((res)=>{
        this.groups = res.data
      })
    },
    changeGroup(group_id){
      this.change(this.selectedPage)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-radio-group-item{
  width: 100%;
}
.wallet-label{
  display: inline-block;
  width: 120px;
  margin-bottom: 10px;
  margin-right: 20px;
  text-align: right;
}
.wallet-value{
  display: inline-block;
}
</style>
