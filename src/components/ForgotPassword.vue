<template>
  <div>
    <Header/>
    <div class="form-body">
      <h1>Forgot Password</h1>
        <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="form-content" id="login">
            <div class="row"><input id="email" v-model="email" v-bind:readonly="isReadOnly" type="text" placeholder="Email address" name="email"> </div> 
            <div class="row"><label>A password reset link will be sent to this email address.</label></div>
            <div class="row"><button v-bind:disabled="isDisabled" v-on:click="sendEmail()">Submit</button></div>
            <div v-if="resend_email">
              <label>An email has been sent. </label>
              <span><a href="#" @click="sendEmail()">Resend Email?</a></span>
            </div>
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
    errors: [],
    email:null,
    auth_status: false,
    reset_token: '',
    resend_email: false,
    isReadOnly: false
    };
  },
  created() {
    this.email = this.$route.query.email;
    if(this.email != null)
      this.isReadOnly = true;
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
      this.errors = [];
      if (this.email==null) {
        this.errors.push('Email required.');
      }
      
      if(this.errors.length == 0)
      {
        console.log("email id entered is:"+this.email);
        await axios.post(process.env.VUE_APP_AMP_URL+ '/forgot-password',
          {
            emailid: this.email
          })
        .then(response => {
          self.auth_status = response.data.success;
          self.errors = response.data.errors;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("auth status is:"+self.auth_status+" and token is:"+self.reset_token);
        if(this.errors.length == 0 && self.auth_status)
        {
          this.resend_email = true;
        }
        else
        {
          this.errors.push('Username not found');
        }
      }
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

  button:hover {
    opacity: 0.8;
  }

  button:disabled,
  button[disabled]{
  background-color: #6d8291;
  color: #E9972D;
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