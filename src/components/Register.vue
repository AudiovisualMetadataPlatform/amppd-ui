<template>
  <div class="main-body">
    <Header/>
    <div class="form-body">
      <h1>Welcome to the Audiovisual Metadata Platform</h1>
      <div class="error">
        <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
        <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
        </ul>
        </p>
      </div>
      <div class="form-content" id="login">
        <h2>Register</h2>
        <form>
          <div class="form-group">
            <label for="fname">First Name</label>
            <input type="txt" class="form-control" id="fname" v-model="fname" placeholder="First Name">
          </div>
          <div class="form-group">
            <label for="lname">Last Name</label>
            <input type="text" class="form-control" id="lname" v-model="lname" placeholder="Last Name">
          </div>
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter email address">
          </div>
          <div class="form-group">
            <label for="Password1">Password</label>
            <input type="password" class="form-control" id="pswd" v-model="pswd" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="Password2">Confirm Password</label>
            <input type="password" class="form-control" id="cpswd" v-model="confirm_pswd" placeholder="Confirm Password">
          </div>
          <button type="submit" class="btn btn-primary marg-bot-4" v-on:click="validateRegisterForm()">Sign Up</button>
          <p class="form-text text-muted">Already have an account? <a href="#" v-on:click="login()" class="active-link">Sign In</a>.</p>
        </form>
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
      fname: null,
      lname: null,
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
      if (!this.fname) {
        this.errors.push('Name required.');
      }
      else if(this.fname.length < 3){
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
          username: this.fname,
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
  max-width: 960px;
  height: auto;
  text-align: center;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 9em;
  margin-bottom: 2em;
  font-size: 1rem;
  text-align: left;
  line-height: 1.5;
  }

  h1 {
  text-align: center!important;
  font-size: 2.5rem;
  margin-bottom: .5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: #000;

  }

  h2 {
    margin-bottom: .50rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    color: #000;
  }

  btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}

.btn-primary {
    background: #F4871E;
    border-color: #F4871E;
    color: #153c4d;
}

.marg-bot-4 {
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

  .form-content{
    margin-top: 1rem;
    margin-right: auto;
    margin-bottom: 2.5rem;
    margin-left: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    flex: 0 0 50%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 60%;
    width: 100%;
    min-height: 1px;
    padding-right: 25px;
    padding-left: 25px;
    text-align: left;
  }

  .text-muted {
    color: #6c757d!important;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
    cursor: default;
}

.form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

button, input {
    overflow: visible;
    margin:0;
    font-family: inherit;
    
}
button:hover {
    color: #F4871E;
    background-color: #153c4d;
  }

.active-link {
  color: #153c4d;
}

.active-link:hover {
  color: #F4871E;
}

input {
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  cursor: text;
  font: 400 13.3333px Arial;
}

  .error {
    padding: 5px 100px;
    color: red;
    text-align: center!important;
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
    text-align: left;
    margin-bottom: 1rem;
    /* margin:auto; */
  }

  *, ::after, ::before {
    box-sizing: border-box;
}

 .main-body {
  background: #fff;
  height: 100%;
  min-height: 100%;
  margin: 0;
  background-color: #fff;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #404040;
  text-align: left;
  display: block;
 }
  
</style>












