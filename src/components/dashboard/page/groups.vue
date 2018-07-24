<template>
<div>
  <Row type="flex" justify="center" align="middle">
    <Col span="24">
      <div class='layout-container'>
        <div class='layout-head'>
          群組管理
        </div>
        <div class='layout-body'>
          <div class='text-right' style="margin-bottom: 20px;">
            <Button type="primary" @click='createGroup'>新增群組</Button>
          </div>
          <Table border :columns="columns1" :data="groups"></Table>
          <Modal
              v-model="showModal"
              :okText="(selectedGroup.id)? '修改':'新增'"
              cancel-text="取消"
              title="群組資訊"
              @on-ok="updateGroup">
              <i-form :model="selectedGroup" :label-width="80">
                <FormItem label="群組名稱">
                    <Input style="width: 50%;" v-model="selectedGroup.name" placeholder="請輸入群組名稱"></Input>
                </FormItem>
              </i-form>
          </Modal>
        </div>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
export default {
  name: 'groups',
  data() {
    return {
      selectedGroup: {},
      showModal: false,
      groups: [],
      columns1: [
          {
              title: '群組名稱',
              key: 'name'
          },
          {
              title: '修改/刪除',
              key: 'id',
              width: 150,
              render: (h, params) => {
                return h(
                  'div',
                  [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'

                        },
                        style: {
                            marginRight: '15px'
                        },
                        on: {
                            click: () => {
                              this.selectedGroup.name = params.row.name
                              this.selectedGroup.id = params.row.id
                              this.showModal = true
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                              this.$store.dispatch('deleteGroups', params.row.id).then(()=>{
                                this.getGroups()
                              })
                            }
                        }
                    }, '刪除')
                  ]
                )
              }
          }
      ],
    }
  },
  beforeMount: function() {
    this.getGroups()
  },
  computed: {

  },
  methods: {
    getGroups(){
      this.$store.dispatch('getGroups').then((res)=>{
        this.groups = res.data
      })
    },
    createGroup(){
      this.selectedGroup = {
        name: '',
        id: '',
      }
      this.showModal = true
    },
    updateGroup(){
      if(!this.selectedGroup.id){
        this.$store.dispatch('createGroups', this.selectedGroup.name).then((res)=>{
          this.getGroups()
        })
      }else{
        this.$store.dispatch('updateGroups', this.selectedGroup).then((res)=>{
          this.getGroups()
        })
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>
