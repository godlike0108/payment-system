<template>
    <div class="firstLogin">
        <Row  type="flex" justify="center" align="middle">
            <Col  :xs="20" :sm="10" :md="6" :lg="6" class="form_container login">
            <i-form  ref="formInline" >
                <form-item class="icon_group">
                    <Row>
                        <!-- <Col :xs="2" :sm="2" :md="2" :lg="2">
                            <router-link to="/">
                                <icon type="arrow-left-c" size="30"></icon>
                            </router-link>
                        </Col> -->
                        <Col  :xs="22" :sm="22" :md="22" :lg="22">
                            <h1 style="display: inline-block">首次登入，請更改密碼</h1>
                        </Col>
                    </Row>
                </form-item>
                <form-item >
                    <i-input  @input="firstChagePassword"   placeholder=" 請變更密碼 6~12位英文數字混合" clearable>
                        <icon type="person" size="20" slot="prepend"></icon>
                    </i-input>
                    <div>請變更密碼 6~12位英文數字混合</div>
                </form-item>
                <form-item >
                    <Button type="primary" @click="put_firstChagePassword"  size="large">確認送出</Button>
                </form-item>
             </i-form>
            </Col>
           
        </Row>
    </div>
</template>
<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
    export default {
  name: 'firstLogin',
  data(){
      return {

      }
  },
  computed: {
      ...mapState({
          password: state => state.user.password
      })
  },
  methods:{
      firstChagePassword(password){
        //   console.log(password)
          let reg=/^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/
          if(reg.test(password) && password.length>= 6 && password.length<= 12){
               this.$store.commit('firstChagePassword',password)
          }
        //   
      },
      put_firstChagePassword(){
          if(this.$store.state.user.username.length >0 ){
          this.$store.dispatch('put_firstChagePassword')
          }

      }
  },
   created() {
    this.$store.commit('setData')
 
}
}
</script>
<style>
.form_container {
		/* padding: 15px 0px 15px 50px; */
		position: relative;
		z-index: 30;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 4px;
	}
.login {
        padding: 20px;
        margin-top: 100px
    }
</style>
