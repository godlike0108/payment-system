<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {

      }
     },
    computed: {
      
    },created(){
      
        let path = this.$router.history.current.fullPath
        if(path === '/'){
          window.document.body.setAttribute("style", "background-image:linear-gradient(to right, #0acffe 0%, #495aff 100%); ");
        }else if (path === '/dashboard') {
          window.document.body.setAttribute("style", "background-image:linear-gradient(to left, #1e3c72 0%, #2a5298 100%);; ");
        }
      
    }
 
}
</script>

<style>
body {
  /* background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%); */

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}


</style>
