<template>
  <div class="logout">
      <div class="right-pane"><button type = "button" v-on:click="signout()">Logout</button></div>
  </div>
</template>

<script>
export default {
  name: 'logout',
  methods:{
    signout() {  
      this.$router.push("/");
    }
  },
  mounted() { 
  }
};
</script>

<style scoped>
.logout {
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    height:100px;
    z-index: 1000;
    
}
.logout .container {
    background: blue;
    height: 100px;
}

div button {
    margin-top:30px;
    float: right;
    background-color: #E9972D;
    color: #2C5B7F;
}
</style>