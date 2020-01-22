<template>
  <div>
    <Header/>
    <div class="form-body">
      <h1>Login</h1>
      <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="form-content" id="login">
            <div class="row"><input id="email" v-model="email" type="text" placeholder="Enter Email Address" name="email"></div>
            <div class="row"><input id="pswd" v-model="pswd" type="password" placeholder="Enter Password" name="pswd"></div> 
            <div class="row"><label><input type="checkbox" checked="checked" name="remember"> Remember me</label></div>
            <router-link :to="{ name: 'forgot-password', query: { email: name }}">Forgot Password?</router-link>
            <div class="row"><button v-on:click="checkForm()">Sign In</button></div>
            <div class="row"><label>Or</label></div>
            <div class="row"><button v-on:click="registerClicked()" >Sign Up</button></div>		
        </div>
  </div>
  </div>
</template>  

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
export default {
  name: 'LoginComponent',
  components: {
    Header,
  },
  data() {
    return {
		errors: [],
		email: ' ',
    pswd: null,
    auth_status: false
    };
  },
  methods:{
    async checkForm() {
      event.preventDefault();
      let self = this;
      this.errors = [];
      if (!this.email) {
        this.errors.push('Email required.');
      }
      if (!this.pswd) {
        this.errors.push('Password required.');
      }
      if(this.errors.length == 0)
      {
        await axios.post(process.env.VUE_APP_AMP_URL+ '/login',
          {
            emailid: this.email,
            password: this.pswd
          })
        .then(response => {
          self.auth_status = response.data.success;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("auth status is:"+self.auth_status);
        if(self.auth_status)
        {
          this.$router.push("/welcome");
        }
        else
        {
          this.errors.push('Email and password do not match');
        }
      }
    },
    registerClicked() {
      this.$router.push('/register')
    },
    forgotPassword() {
      this.$router.push('/forgot-password')
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