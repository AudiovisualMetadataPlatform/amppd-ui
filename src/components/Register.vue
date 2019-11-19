<template id = "register">
	<div class="form">
    <Header></Header>
     <form id="register" >
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
        <div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Create Password" name="psw" ></div> 
        <div class="row"><input id="cpswd" v-model="confirm_pswd" type="password" placeholder="Confirm Password" name="cpsw" ></div>
        <div class="row"><button type="submit" v-on:click="validateRegisterForm()">Sign Up</button></div> 
        <div class="row"><label>Or</label></div>
        <div class="row"><span><a href="#" v-on:click="login()">Already a User?</a></span></div> 
      </div>
	</form>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
  export default {
    name: 'RegisterComponent',
    components: {
      Header
      },
    data: function() {
      return {
      errors: [],
      name: null,
      pswd: null,
      confirm_pswd: null,
      register_status: 0
    }
  },
  methods:{
    async validateRegisterForm() {
      event.preventDefault();
      let self = this;
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
        await axios.get(process.env.VUE_APP_AMP_URL + '/amp/register?name='+this.name+'&pswd='+this.pswd)// eslint-disable-line
        .then(response => {
          self.register_status = response.data;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("register result is:"+self.register_status);
        if(self.register_status)
        {
          this.$router.push("/workflow");
        }
        else
        {
          this.errors.push('Register Unsuccessful as the usename might already exist or due to network error');
        }
      }
    },

    login(){
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
    margin-block-start: 100px;
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
    width: 50%;
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