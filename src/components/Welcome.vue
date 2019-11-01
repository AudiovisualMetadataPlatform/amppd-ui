<template id = "welcome" >
	<div class="form">
    <Header></Header>
		<form id="app" v-on:submit="signout" action="index.html" method="post">
      <div class="container" id="welcome">
          <div class="row"><h1>Welcome to AMP!</h1> </div>
          <div class="row"><button type="submit">Logout</button></div>
      </div>
    </form>
	</div>
</template>

<script>
import Header from "./Header";
export default {
  name: 'WelcomeComponent',
  components: {
    Header
    },
  data() {
    return {
      errors: [],
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
  /* Bordered form */
  form {
    /* border: 3px solid #f1f1f1; */
    height:auto;
    width:auto;
    margin-block-start: 110px;
  }

  /* Full-width inputs */
  input[type=text], input[type=password] {
    border-radius: 5px;
    padding: 15px 20px;
    margin: 20px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    align-content: center;
  }

  /* Set a style for all buttons */
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

  /* Add a hover effect for buttons */
  button:hover {
    opacity: 0.8;
  }

  /* Center the avatar image inside this container */
  .imgcontainer, img {
  height: 100%;
  width: 100%;
  }


  /* Add padding to containers */
  .container {
    border-radius: 25px;
    border: 1px solid;
    padding: 20px 20px;
    width: 40%;
    display: inline-block
  }

  .error {
    padding: 20px 100px;
    color: red;
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

  .form {
    text-align: center;
  }

  .row {
    text-align: center;
    padding:5px 10px;
  }
</style>