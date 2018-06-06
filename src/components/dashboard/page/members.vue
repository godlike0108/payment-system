<template>
 <div>
 	<Row type="flex" justify="center" align="middle">
        <Col :xs="20" :sm="16" :md="16" :lg="16">
            <Tabs value="name1">
            <TabPane label="會員清單" name="name1">
                <Table height="500" :columns="columns1" :data="get_user_list" ></Table>
            </TabPane>
            
        </Tabs>
        </Col>
    </Row>
 </div>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
export default {
  name: 'members',
  data () {
     return {
       columns1: [
                    
                    {
                        title: '會員名稱',
                        key: 'name'
                    },
                    {
                        title: '手機',
                        key: 'mobile'
                    },
                    {
                        title: 'email',
                        key: 'email'
                    }, 
                    {
                        title: '創建時間',
                        key: 'created_at'
                    },  
                   
                ]
    }
  },
  computed: {
	  get_user_list(){
		  return this.$store.getters.get_user_list
	  }
  },
	created(){
    this.$store.dispatch('show_user')
		
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
