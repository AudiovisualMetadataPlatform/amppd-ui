<template>
  <div>
    <Header/>
    <div class="form-body">
      <h1>Register</h1>
      <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
      </div>
      <div class="form-content" id="register">
        <div class="row"><input id="name" v-model="name" type="text" placeholder="Enter Username" name="uname" > </div>
        <div class="row"><input id="email" v-model="email" type="text" placeholder="Email Address" name="email" ></div> 
        <div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Create Password" name="psw" ></div> 
        <div class="row"><input id="cpswd" v-model="confirm_pswd" type="password" placeholder="Confirm Password" name="cpsw" ></div>
        <div class="row"><button type="submit" v-on:click="validateRegisterForm()">Sign Up</button></div> 
        <div class="row"><label>Or</label></div>
        <div class="row"><span><a href="#" v-on:click="login()">Already a User?</a></span></div> 
      </div>
  </div>
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
      email: null,
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
      else if(this.name.length < 3){
        this.errors.push('Username must be at least 3 characters');
      }
      if (!this.validateEmail(this.email)) {
        this.errors.push('Invalid email address');
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }
      else if(this.pswd.length < 8){
        this.errors.push('Password must be at least 8 characters');
      }
      if (!this.confirm_pswd) {
        this.errors.push('Confirm Password required.');
      }
      if (this.pswd && this.confirm_pswd && this.confirm_pswd != this.pswd) {
        this.errors.push('Passwords do not match.');
      }
      if (this.errors.length == 0)
      {
        await axios.post(process.env.VUE_APP_AMP_URL + '/register',
        {
          username: this.name,
          password: this.pswd,
          email: this.email  
        })
        .then(response => {
          self.register_status = response.data.success;
          self.errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("register result is:"+self.register_status);
        if(self.register_status)
        {
          this.$router.push("/");
        }
      }
    },
    validateEmail(email){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;// eslint-disable-line
      return re.test(email);
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
  /*padding-top:50px;*/
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
    border: 1px solid #ccc;
    align-content: center;
    width: 50%;
  }

  button {
    background-color: #2C5B7F;
    color: #E9972D;
    font:bolder;
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

  .row {
    text-align: center;
    padding:5px 10px;
  }
</style>