<template>
  <div class="main-body">
    <Header/>
    <div class="form-body">
      <h1>Welcome to the Audiovisual Metadata Platform</h1>
      <div class="form-content" id="login">
        <h2>Forgot Password</h2>
        <form>
          <div class="form-group">
            <label class="form-errors" v-if="errors.other_errors.length">{{errors.other_errors}}</label>
          </div>
          <div class="form-group">
            <label for="Email">Email address</label>
            <label class="form-errors" v-if="errors.email_error.length">{{errors.email_error}}</label>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Registered Email Address" v-on:click="onClick(`email`)">
          </div>
          
          <button class="btn btn-primary marg-bot-4" v-on:click="sendEmail()">Send Email</button>
          <p class="form-text text-muted">Click to <a href="#" v-on:click="loginClicked()" class="active-link">Sign In</a>.</p>
          <div class="form-group">
            <div v-if="resend_email">
              <label>An email has been sent. </label>
              <span><a href="#" @click="sendEmail()">Resend Email?</a></span>
            </div>
          </div>  
        </form>
      </div>  
  </div>
  </div>
</template>  

<script>
import Header from '@/components/Header.vue';
import axios from 'axios';
export default {
  name: 'ForgotPassword',
  components: {
    Header
  },
  data() {
    return {
    errors: {
      email_error:'',
      other_errors: []
    }, 
    email:null,
    auth_status: false,
    reset_token: '',
    resend_email: false,
    };
  },
  created() {
    this.email = this.$route.query.email;
  },
  computed:{
    isDisabled: function(){
      if(this.email==null || this.email=='')
      {
          return true;
      }
      return false;
    }
  },
  methods:{
    async sendEmail() {
      event.preventDefault();
      let self = this;
      this.errors.other_errors = [];
      if (!this.email) {
        console.log("email blank");
        this.errors.email_error='Email required.';
      }
      
      if(this.errors.email_error == '')
      {
        await axios.post(process.env.VUE_APP_AMP_URL+ '/forgot-password',
          {
            emailid: this.email
          })
        .then(response => {
          self.auth_status = response.data.success;
          self.errors.other_errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("auth status is:"+self.auth_status+" and token is:"+self.reset_token);
        if(this.errors.other_errors.length == 0 && self.auth_status)
        {
          this.resend_email = true;
        }
      }
    },
    loginClicked() {
      this.$router.push('/')
    },
    onClick(data) {
      if(data == 'email')
        this.errors.email_error = '';
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
    margin-top: 2.5rem;
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
    width: 100%;
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
    margin: 0;
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

  .form-errors {
    color: red;
    margin: 0%!important;
    font-size: 0.9rem;
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