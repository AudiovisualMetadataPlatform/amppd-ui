<template>
  <div class="form">
    <Header></Header>
    <form id="app" >
        <div class="error">
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error"><span>{{ error }}</span></li>
          </ul>
        </p>
        </div>
        <div class="container" id="login">
            <div class="row"><input id="email" v-model="email" type="text" placeholder="Email address" name="email"> </div> 
            <div class="row"><label>A reset token will be sent to this email address.</label></div>
            <div class="row"><button v-on:click="sendToken()">Submit</button></div>
        </div>
    
    </form>
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
    email:'',
    auth_status: false,
    reset_token: ''
    };
  },
  methods:{
    async sendToken() {
      event.preventDefault();
      let self = this;
      this.errors = [];
      if (!this.email) {
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
          self.reset_token = response.data.token;
        })
        .catch(e => {
          console.log(e);
        });
        console.log("auth status is:"+self.auth_status+" and token is:"+self.reset_token);
        if(self.auth_status)
        {
          //this.$router.push("/reset-password/"+self.reset_token);
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
    border: 1px solid #ccc;
    align-content: center;
    width: 50%;
  }

  /* Set a style for all buttons */
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