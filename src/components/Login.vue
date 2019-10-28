<template id = "app">
	<form id="app" v-on:submit="checkForm" action="/RegisterComponent/register.html" method="post">
	<div class="form">
		<div class="imgcontainer">
			<img src="../assets/amp_horizontal.jpg" >
		</div>
		<div class="error">
		<p v-if="errors.length">
			<b>Please correct the following error(s):</b>
			<ul>
				<li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
			</ul>
		</p>
		</div>
		<div class="container" id="login">
				<div class="row"><input id="name" v-model="name" type="text" placeholder="Enter Username" name="name"> </div>
				<div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Enter Password" name="pswd"></div> 
				<div class="row"><label><input type="checkbox" checked="checked" name="remember"> Remember me</label></div>
				<div class="row"><span><a href="#">Forgot Password?</a></span></div>
				<div class="row"><button type = "submit">Sign In</button></div>
				<div class="row"><label>Or</label></div>
				<router-link to="/register" tag="button">Sign Up</router-link>
				<!-- <div class="row"><button v-on:click="" >Sign Up</button></div> -->
		
		</div>
	</div>
	</form>

</template>

<script>
export default {
	name: 'LoginComponent',
  	data: function() {
      return {
		errors: [],
		name: null,
    pswd: null
    }
  },
  methods:{
    checkForm: function(e) {
      /* if (this.name && this.pswd) {
        return true;
      } */

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }

      else{
        this.$router.push("/welcome");
      }
      if(this.errors.length == 0)
      {
        this.$router.push("/welcome"); 
      }
      //console.log("checkform WORKS");
      e.preventDefault();
    }
  },
  mounted() {
            //console.log("IT WORKS");
        }
}
</script>

<style scoped>
/* Bordered form */
form {
  /* border: 3px solid #f1f1f1; */
  height:auto;
  width:auto;
  
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