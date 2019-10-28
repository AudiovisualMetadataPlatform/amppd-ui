<template id = "register">
	<form id="register" v-on:submit="validateRegisterForm" action="WelcomeComponent/welcome.html" method="post">
	<div class="form">
		<div class="imgcontainer">
			<img src="Images/amp_header.png" >
		</div>
		<div class="error">
		<p v-if="errors.length">
			<b>Please correct the following error(s):</b>
			<ul>
				<li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
			</ul>
		</p>
		</div>

		<div class="container" >
				<div class="row"><input id="name" v-model="name" type="text" placeholder="Enter Username" name="uname" > </div>
				<div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Create New Password" name="psw" ></div> 
				<div class="row"><input id="pswd" v-model="confirm_pswd" type="password" placeholder="Confirm New Password" name="cpsw" ></div>
				<div class="row"><button type="submit">Sign Up</button></div>
		
		</div>
	</div>
	</form>
</template>

<script>
export default {
	name: 'RegisterComponent',
  	data: function() {
      return {
		errors: [],
		name: null,
		pswd: null,
		confirm_pswd: null
    }
  },
  methods:{
    validateRegisterForm: function(e) {

      this.errors = [];

      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }
      if (!this.confirm_pswd) {
        this.errors.push('Confirm Password required.');
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.push('Passwords do not match.');
      }
      if (this.errors.length == 0)
      {
        this.$router.push("/welcome");
      }

      //console.log("checkform WORKS"+this.errors.length);
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