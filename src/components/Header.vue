<template>
  <div class="header">
      <img alt="AMP Logo" src="../assets/amp_horizontal_cropped.jpg">
      <!-- <div class="right-pane"><button type = "button" v-on:click="signout()">Logout</button></div> -->
  </div>
</template>

<script>
export default {
  name: 'ampheader',
  /* data() {
    return {
      errors: [],
      name: null,
      pswd: null
    }
  }, */
  methods:{
    signout() {  
      this.$router.push("/");
    }
  },
  mounted() {
    //console.log("IT WORKS");
  }
};
</script>

<style scoped>
.header {
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    height:100px;
    z-index: 1000;
    background-color: #133C4E;
}
.header .container {
    background: blue;
    height: 100px;
}
.header img{
    height:100px;
    left:0;
    top: 0;
    position: fixed;
    color: #F9871D;
}

div button {
    margin-top:30px;
    float: right;
    background-color: #E9972D;
    color: #2C5B7F;
}
</style>