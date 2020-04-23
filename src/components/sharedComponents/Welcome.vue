<template>
<div>
  <Header/>
  <Logout/>
  <div class="form-body">
    <h1>Welcome</h1>      
        <div class="form-content">
          <div class="row"><router-link :to="{ name: 'batch-ingest'}">Batch Ingest</router-link></div>
          <div class="row"><router-link :to="{ name: 'workflow', query: { email: name }}">Workflow Selection</router-link></div>
        </div>
    </div>
</div>
</template>

<script>
import Header from "@/components/sharedComponents/Header";
import Logout from '@/components/sharedComponents/Logout.vue'
export default {
  name: 'WelcomeComponent',
  components: {
    Header,
    Logout
    },
  data() {
    return {
      name: null,
      pswd: null
    }
  },
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
 .form-body{
  margin-block-start: 100px;
  width: auto;
  height: auto;
  text-align: center;
  }

  h1 {
  text-align: center;
  }

  .form-content{
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 50%;
    display: inline-block;
  }

  input[type=text], input[type=password] {
    border-radius: 5px;
    padding: 15px 20px;
    margin: 20px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    align-content: center;
  }

  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bold;
    padding: 14px 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: none;
    cursor: pointer;
    border-radius: 15px;
  }

  button:hover {
    opacity: 0.8;
  }

  ul{
  list-style: none;
  } 

  li span {
    width : 70%;
    padding-left: 100px;
    padding-right: 100px;
  }

  p {
    width:70%;
    text-align: center;
    margin:auto;
  }

  .row {
    text-align: left;
    padding:5px 10px;
  }
</style>
